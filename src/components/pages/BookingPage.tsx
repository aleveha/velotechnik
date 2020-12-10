import React, {
    ChangeEvent,
    useContext,
    useEffect,
    useState
} from 'react';
import MuiAlert, {AlertProps} from "@material-ui/lab/Alert";
import {
    Button,
    createStyles,
    FormControl,
    InputLabel,
    makeStyles,
    MenuItem,
    Select,
    TextField,
    Snackbar
} from "@material-ui/core";
import {Formik, useFormik} from 'formik';
import '../../css/pages/booking.css';
import {KeyboardDatePicker, KeyboardTimePicker, MuiPickersUtilsProvider} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import ruLocale from "date-fns/locale/ru";
import usLocale from "date-fns/locale/en-US";
import moment from "moment";
import {Keyboard} from "@material-ui/icons";
import MyButton from "../common/myButton";
import {useLocation} from "react-router";
import * as Yup from 'yup';
import 'yup-phone';

const localeMap: { [key: string]: any } = {
    ru: ruLocale,
    en: usLocale
}

interface IFormValues {
    name: string,
    phoneNumber: string,
    email: string,
    service: string,
    date: Date
}

interface IService {
    id: number,
    address: string,
    district: string
}

const Services: IService[] = [
    {id: 1, address: "ул. Академика Волгина д.21", district: "Беляево"},
    {id: 2, address: "Чечерский проезд д.52", district: "Южное Бутово"}
]

const useStyles = makeStyles(() =>
    createStyles({
        formControl: {
            width: "40vw",
            maxWidth: "500px",
            minWidth: "300px",
        },
        textInput: {
            width: "100%"
        },
        bookingButton: {
            margin: "0 1rem",
            backgroundColor: "var(--buttonBG)",
            '&:hover': {
                backgroundColor: "var(--buttonHoverBG)",
            },
            borderRadius: "20px"
        },
        buttonText: {
            fontSize: "1.7rem"
        }
    }),
);

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const ValidationForm = Yup.object().shape({
    name: Yup.string()
        .min(2, "Слишком короткое имя")
        .max(50, "Слишком длинное имя")
        .required("Обязательно"),
    email: Yup.string()
        .email('Неправильный адрес электронной почты')
        .required("Обязательно"),
    phoneNumber: Yup.string()
        .phone("7")
        .min(11, "Слишком короткий номер")
        .required("Обязательно"),
    service: Yup.string().required(),
    date: Yup.date().min(new Date(), "Нельзя записаться в прошлое")
})

const BookingPage = () => {
    const classes = useStyles();
    const [locale, setLocale] = useState<string>("ru");

    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [selectedService, setSelectedService] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [email, setEmail] = useState<string>("");

    const onServiceChanged = (event: React.ChangeEvent<{ value: unknown }>) => {
        setSelectedService(event.target.value as string);
    };

    const handleDateChange = (date: Date | null) => {
        const now = new Date();
        if (date && date >= now) setSelectedDate(date);
        else {
            // setOpenSnack(true);
            setSelectedDate(now);
        }
    };

    const handleNameChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handlePhoneNumberChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setPhoneNumber(event.target.value);
    };

    const handleEmailChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const formValues: IFormValues = {
        name: name,
        phoneNumber: phoneNumber,
        email: email,
        service: selectedService,
        date: selectedDate
    }

    const formik = useFormik({
        initialValues: formValues,
        validationSchema: ValidationForm,
        onSubmit: (values: IFormValues) => {
            console.log(values);
        }
    })

    return (
        <div>
            <h1>ОНЛАЙН ЗАПИСЬ</h1>
            <form autoComplete="off" className="bookingForm" onSubmit={formik.handleSubmit}>
                <div className="inputs">
                    <InputLabel id="demo-simple-select-outlined-label">ВЫБЕРЕТЕ СЕРВИС</InputLabel>
                    <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={formik.values.service}
                        onChange={formik.handleChange}
                        label="ВЫБЕРЕТЕ СЕРВИС"
                    >
                        {Services.map(service =>
                            <MenuItem key={service.id} value={service.district}>
                                <span>{service.address}, {service.district}</span>
                            </MenuItem>
                        )}
                    </Select>
                    <div className="formElement">
                        <MuiPickersUtilsProvider
                            utils={DateFnsUtils}
                            locale={localeMap[locale]}
                        >
                            <KeyboardDatePicker
                                margin="normal"
                                label="ВЫБЕРЕТЕ ДАТУ"
                                format="dd.MM.yyyy"
                                value={selectedDate}
                                onChange={handleDateChange}
                                inputVariant="outlined"
                                className={classes.textInput}
                                disablePast
                            />
                        </MuiPickersUtilsProvider>
                    </div>
                    <div className="formElement">
                        <MuiPickersUtilsProvider
                            utils={DateFnsUtils}
                            locale={localeMap[locale]}
                        >
                            <KeyboardTimePicker
                                margin="normal"
                                label="ВЫБЕРЕТЕ ВРЕМЯ"
                                format="HH.mm"
                                ampm={false}
                                minutesStep={10}
                                value={selectedDate}
                                onChange={handleDateChange}
                                inputVariant="outlined"
                                className={classes.textInput}
                            />
                        </MuiPickersUtilsProvider>
                    </div>
                    <div className="formElement input">
                        <TextField
                            variant="outlined"
                            type="text"
                            label="ФАМИЛИЯ И ИМЯ"
                            value={name}
                            onChange={handleNameChange}
                            className={classes.textInput}
                            placeholder="Иван Иванов"
                        />
                    </div>
                    <div className="formElement input">
                        <TextField
                            variant="outlined"
                            type="number"
                            label="НОМЕР ТЕЛЕФОНА"
                            value={phoneNumber}
                            onChange={handlePhoneNumberChange}
                            className={classes.textInput}
                            placeholder="В формате +79001112233"
                        />
                    </div>
                    <div className="formElement input">
                        <TextField
                            variant="outlined"
                            type="email"
                            label="ЭЛЕКТРОННАЯ ПОЧТА"
                            value={email}
                            onChange={handleEmailChange}
                            className={classes.textInput}
                            placeholder="ivan.ivanov@yandex.ru"
                        />
                    </div>
                </div>
                <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    className={classes.bookingButton}
                >
                    <p className={classes.buttonText}>
                        ЗАПИСАТЬСЯ
                    </p>
                </Button>
            </form>
        </div>
    );
};

export default BookingPage;