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
import '../../css/pages/booking.css';
import {KeyboardDatePicker, KeyboardTimePicker, MuiPickersUtilsProvider} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import ruLocale from "date-fns/locale/ru";
import usLocale from "date-fns/locale/en-US";
import moment from "moment";
import {Keyboard} from "@material-ui/icons";
import MyButton from "../common/myButton";
import {useLocation} from "react-router";

const localeMap: { [key: string]: any } = {
    ru: ruLocale,
    en: usLocale
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

const Booking = () => {
    const classes = useStyles();
    const location = useLocation();
    const [openSnack, setOpenSnack] = useState<boolean>(false);
    const [locale, setLocale] = useState<string>("ru");

    const [reservationInformation, setReservationInformation] = useState<{
        service: string,
        date: string,
        name: string,
        phoneNumber: string,
        email: string
    }>();
    const [selectedService, setSelectedService] = useState<string>("");
    const [selectedDate, setSelectedDate] = useState<Date>(
        new Date()
    );
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
            setOpenSnack(true);
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

    const handleSubmit = (event: any) => {
        event.preventDefault();

        setReservationInformation({
            service: selectedService,
            date: moment(selectedDate).format("DD.MM.YYYY HH:mm"),
            name: name,
            phoneNumber: phoneNumber,
            email: email
        });
    }

    const handleSnackClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnack(false);
    };

    return (
        <div className="booking">
            <h1>ОНЛАЙН ЗАПИСЬ</h1>
            <form autoComplete="off" className="bookingForm">
                <div className="inputs">
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel id="demo-simple-select-outlined-label">ВЫБЕРЕТЕ СЕРВИС</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={selectedService}
                            onChange={onServiceChanged}
                            label="ВЫБЕРЕТЕ СЕРВИС"
                        >
                            {Services.map(service =>
                                <MenuItem key={service.id} value={service.district}>
                                    <span>{service.address}, {service.district}</span>
                                </MenuItem>
                            )}
                        </Select>
                    </FormControl>
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
                                error={openSnack}
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
                    onClick={handleSubmit}
                >
                    <p className={classes.buttonText}>
                        ЗАПИСАТЬСЯ
                    </p>
                </Button>
            </form>
            <Snackbar
                open={openSnack}
                autoHideDuration={6000}
                onClose={handleSnackClose}
            >
                <Alert onClose={handleSnackClose} severity="warning">
                    Нельзя выбрать промежуток прошлого
                </Alert>
            </Snackbar>
        </div>
    );
};

export default Booking;