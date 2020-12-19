import React, {useState} from 'react';
import {
    CircularProgress, createMuiTheme,
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem, MuiThemeProvider,
    Select, Snackbar,
    TextField,
    TextFieldProps
} from "@material-ui/core";
import {Field, FieldProps, Form, Formik, FormikValues} from 'formik';
import DateFnsUtils from "@date-io/date-fns";
import {KeyboardDatePicker, KeyboardTimePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import ruLocale from "date-fns/locale/ru";
import usLocale from "date-fns/locale/en-US";
import * as Yup from 'yup';
import 'yup-phone';
import '../../css/pages/booking.css';
import MuiAlert, {AlertProps} from "@material-ui/lab/Alert";
import MyButton from "../common/myButton";
import {MuiPickersOverrides} from '@material-ui/pickers/typings/overrides';
import emailjs from 'emailjs-com';
import moment from 'moment';
import 'moment/locale/ru';

type overridesNameToClassKey = {
    [P in keyof MuiPickersOverrides]: keyof MuiPickersOverrides[P];
}

declare module '@material-ui/core/styles/overrides' {
    export interface ComponentNameToClassKey extends overridesNameToClassKey {
    }
}

interface IFormValues {
    fullName: string,
    email: string,
    service: string,
    phone: string,
    date: Date
}

interface IService {
    id: number,
    address: string,
    subwayStation: string,
    district: string,
    phoneNumber: string,
    email: string,
    coordinates: number[]
}

const localePickerMap: { [key: string]: any } = {
    ru: ruLocale,
    en: usLocale
};

export const Services: IService[] = [
    {
        id: 1,
        address: "ул. Академика Волгина д.21",
        subwayStation: "м. Беляево",
        district: "Беляево",
        phoneNumber: "+79164959496",
        email: "velotechnik@yandex.ru",
        coordinates: [55.647055, 37.512607]
    },
    {
        id: 2,
        address: "Чечерский проезд д.52",
        subwayStation: "м. Беляево",
        district: "Южное Бутово",
        phoneNumber: "+79856643619",
        email: "velotechnik@yandex.ru",
        coordinates: [55.533333, 37.530687]
    }
];

const validationSchema = Yup.object({
    fullName: Yup.string().required("Обязательно").min(5, "Слишком короткое имя"),
    service: Yup.string().required("Обязательно"),
    email: Yup.string().required("Обязательно").email("Некорректный адрес электронной почты"),
    phone: Yup.string().required("Обязательно").min(10, "Слишком короткий номер").max(10, "Слишком длинный номер").phone("7", undefined, "Некорректный номер"),
    date: Yup.date().required("Обязательно").min(new Date(), "К сожалению, запись в прошлое невозможна")
});

const defaultMaterialTheme = createMuiTheme({
    palette: {
        primary: {
            main: "#3C3C3C"
        }
    },
    overrides: {
        MuiPickersToolbar: {
            toolbar: {
                backgroundColor: "#3C3C3C",
            },
        },
        MuiPickersDay: {
            day: {
                color: "#3C3C3C",
            },
            daySelected: {
                backgroundColor: "#F82323",
            },
            dayDisabled: {
                color: "#9b9b9b",
            },
            current: {
                color: "#F82323",
            },
        }
    },
});

const BookingForm = () => {
    const serviceIdEmailJS = "default_service";
    const templateIdEmailJS = "order_1";
    const templateIdServiceEmailJS = "service_email";
    const userIdEmailJS = "user_ZIonJ648Va8kUbz3lUK1j";
    const [locale, setLocale] = useState<string>("ru");
    const [status, setStatus] = useState<"success" | "error">("error");
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [firstValidation, setFirstValidation] = useState<boolean>(true);
    const initValues: IFormValues = {
        fullName: "",
        email: "",
        service: "",
        phone: "",
        date: new Date()
    }

    const onDialogClose = () => {
        setOpenDialog(false);
    }

    const handleFirstValidation = () => {
        setFirstValidation(false);
    }

    async function SendReservation (values: FormikValues & IFormValues) {
         const userEmail:boolean = await new Promise((resolve, reject) => {
            emailjs.send(serviceIdEmailJS, templateIdEmailJS, {
                fullName: values.fullName,
                email: values.email,
                service: values.service,
                date: moment(values.date).locale(locale).format("L"),
                time: moment(values.date).format("LT")
            }, userIdEmailJS)
                .then(res => {
                    console.log("SUCCESS! User email is sent!", res);
                    resolve(true);
                })
                .catch(err => {
                    console.log("ERROR! User email isn't sent!", err);
                    reject(false);
                });
        });

         const serviceEmail:boolean = await new Promise((resolve, reject) => {
             emailjs.send(serviceIdEmailJS, templateIdServiceEmailJS, {
                 fullName: values.fullName,
                 email: values.email,
                 service: values.service,
                 date: moment(values.date).locale(locale).format("L"),
                 time: moment(values.date).format("LT"),
                 phone: values.phone
             }, userIdEmailJS)
                 .then(res => {
                     console.log("SUCCESS! Service email is sent!", res);
                     resolve(true);
                 })
                 .catch(err => {
                     console.log("ERROR! Service email isn't sent!", err);
                     reject(false);
                 });
         })

        return userEmail && serviceEmail;
    }

    return (
        <Formik
            initialValues={initValues}
            validationSchema={validationSchema}
            validateOnBlur={!firstValidation}
            validateOnChange={!firstValidation}
            onSubmit={(values, {setSubmitting, resetForm}) => {
                setSubmitting(true);
                SendReservation(values).then(() => {
                    setStatus("success");
                    setOpenDialog(true);
                    setSubmitting(false);
                    setFirstValidation(true);
                    resetForm();
                }).catch(() => {
                    setStatus("error");
                    setOpenDialog(true);
                    setSubmitting(false);
                });
            }}
        >
            {({
                  values,
                  errors,
                  handleChange,
                  isSubmitting
              }) => (
                <Form autoComplete="off" className="bookingForm">
                    <div>
                        <div className="bookingField">
                            <FormControl variant="outlined" error={!!errors.service}>
                                <InputLabel id="serviceLabel">ВЫБЕРЕТЕ СЕРВИС</InputLabel>
                                <Select
                                    label="ВЫБЕРЕТЕ СЕРВИС"
                                    labelId="serviceLabel"
                                    name="service"
                                    value={values.service}
                                    onChange={handleChange}
                                >
                                    {Services.map(service =>
                                        <MenuItem key={service.id} value={`${service.address}, ${service.district}`}>
                                            <span>{service.address}, {service.district}</span>
                                        </MenuItem>
                                    )}
                                </Select>
                                {!!errors.service && <FormHelperText>Обязательно</FormHelperText>}
                            </FormControl>
                        </div>
                        <div className="bookingField">
                            <Field
                                name="fullName"
                                label="ФАМИЛИЯ И ИМЯ"
                                placeholder="Иван Иванов"
                                variant="outlined"
                                helperText={errors.fullName}
                                error={!!errors.fullName}
                                as={TextField}
                            />
                        </div>
                        <div className="bookingField">
                            <Field
                                name="email"
                                label="ЭЛЕКТРОННАЯ ПОЧТА"
                                placeholder="ivan.ivanov@yandex.ru"
                                variant="outlined"
                                helperText={errors.email}
                                error={!!errors.email}
                                as={TextField}
                            />
                        </div>
                        <div className="bookingField">
                            <Field
                                name="phone"
                                label="НОМЕР ТЕЛЕФОНА"
                                placeholder="В формате 9001112233"
                                variant="outlined"
                                helperText={errors.phone}
                                error={!!errors.phone}
                                as={TextField}
                            />
                        </div>
                        <MuiThemeProvider theme={defaultMaterialTheme}>
                            <div className="bookingField">
                                <Field
                                    name="date"
                                    component={DatePickerField}
                                    locale={locale}
                                    handleFirstValidation={handleFirstValidation}
                                />
                            </div>
                            <div className="bookingField">
                                <Field
                                    name="date"
                                    component={TimePickerField}
                                    handleFirstValidation={handleFirstValidation}
                                />
                            </div>
                        </MuiThemeProvider>
                    </div>
                    <MyButton
                        content={!isSubmitting ? <span>ПОДТВЕРДИТЬ</span> : <CircularProgress color="inherit"/>}
                        type="submit"
                        disabled={isSubmitting}
                        onClick={handleFirstValidation}
                    />
                    <StatusMessage open={openDialog} handleClose={onDialogClose} status={status}/>
                </Form>
            )}
        </Formik>
    );
};

const DatePickerField = (props: FieldProps & TextFieldProps & { locale: string, handleFirstValidation: () => void }) => {
    const {field, form, locale} = props;
    return (
        <MuiPickersUtilsProvider
            utils={DateFnsUtils}
            locale={localePickerMap[locale]}
        >
            <KeyboardDatePicker
                name="date"
                margin="normal"
                label="ВЫБЕРЕТЕ ДАТУ"
                format="dd.MM.yyyy"
                inputVariant="outlined"
                value={field.value}
                onChange={date => {
                    form.setFieldValue(field.name, date, true);
                    props.handleFirstValidation();
                }}
                disablePast
            />
        </MuiPickersUtilsProvider>
    );
}

const TimePickerField = (props: FieldProps & TextFieldProps & { handleFirstValidation: () => void }) => {
    const {field, form} = props;
    return (
        <MuiPickersUtilsProvider
            utils={DateFnsUtils}
        >
            <KeyboardTimePicker
                name="date"
                margin="normal"
                label="ВЫБЕРЕТЕ ВРЕМЯ"
                format="HH.mm"
                inputVariant="outlined"
                ampm={false}
                minutesStep={10}
                value={field.value}
                onChange={date => {
                    form.setFieldValue(field.name, date, true);
                    props.handleFirstValidation();
                }}
                helperText={form.errors.date}
                error={!!form.errors.date}
            />
        </MuiPickersUtilsProvider>
    );
}

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const StatusMessage = (props: { open: boolean, status: "success" | "error", handleClose: () => void }) => {
    const message = (status: string) => {
        let message = "";

        switch (status) {
            case "success":
                message = "Вы успешно записаны!";
                break;
            case "error":
                message = "Что-то пошло не так! Пропробуйте снова.";
                break;
        }

        return message;
    }

    return (
        <Snackbar
            open={props.open}
            autoHideDuration={4000}
            onClose={props.handleClose}
            anchorOrigin={{vertical: "bottom", horizontal: "center"}}
        >
            <Alert severity={props.status}>
                {message(props.status)}
            </Alert>
        </Snackbar>
    );
}

const Booking = () => {
    return (
        <div className="booking padding">
            <h1>ОНЛАЙН ЗАПИСЬ</h1>
            <BookingForm/>
        </div>
    );
}

export default Booking;