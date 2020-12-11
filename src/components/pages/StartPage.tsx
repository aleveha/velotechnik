import React, {useRef} from 'react';
import avatar from '../../img/avatar.jpg';
import avatarFemale from '../../img/avatarFemale.png';
import takeAway from '../../img/takeAway3.jpeg';
import '../../css/pages/startPage.css';
import MyButton from "../common/myButton";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import {Avatar, Divider} from "@material-ui/core";
import PhotosAutoPlay from "../common/Gallery";
import {Rating} from "@material-ui/lab";
import {Link} from 'react-router-dom';

interface IInfoBlock {
    label: string,
    main: string,
    desc: string
}

interface IReviewBlock {
    score: number,
    text: string,
    name: string,
    sex: 'male' | 'female'
}

const info: IInfoBlock[] = [
    {label: "ДОСТУПНОСТЬ", main: "2", desc: "ПРОФЕССИОНАЛЬНЫХ СЕРВИСА В МОСКВЕ"},
    {label: "ЗАКАЗЫ", main: "10.000+", desc: "ЧЕЛОВЕК ДОВЕРИЛО НАМ СВОИ БАЙКИ"},
    {label: "ДОВЕРИЕ", main: "98.8%", desc: "КЛИЕНТОВ ВОЗВРАЩАЮТСЯ ЗА ПОМОЩЬЮ К НАМ"},
    {label: "УДОБСТВО", main: "100%", desc: "БЫСТРЫЙ СЕРВИС И КОМФОРТНОЕ ОЖИДАНИЕ"},
]

const Reviews: IReviewBlock[] = [
    {
        score: 5,
        text: "Почти невозможное сочетание \"быстро, качественно и за разумные деньги\". Мне очень понравилось внимание к деталям. Сделал ТО и на следующий день уехал на велосипедные сборы. Класс.",
        name: "Николай",
        sex: "male"
    },
    {
        score: 5,
        text: "Делали подготовку к сезону для двух велосипедов. Работой остались довольны, катаемся. Спасибо мастеру Кириллу!",
        name: "Нина",
        sex: "female"
    },
    {
        score: 5,
        text: "Дело свое знают, работают быстро и за умеренные деньги. Вежливые сотрудники.",
        name: "Дмитрий",
        sex: "male"
    },
    {
        score: 5,
        text: "Отдавал ребятам на ремонт велосипед. Отношение к клиенту очень индивидуальное, сделали все быстро, недорого очень качественно! Рекомендую!",
        name: "Александр",
        sex: "male"
    }
]

const StartPage = () => {
    const mainInfoRef = useRef<HTMLInputElement>(null);
    const onButtonClick = () => {
        if (mainInfoRef && mainInfoRef.current) {
            mainInfoRef.current.scrollIntoView({
                behavior: "smooth"
            });
        }
    }

    return (
        <div className="startPage">
            <div className="mainPhoto photoContainer">
                <h1>ГЛАВНЫЙ ЗАГОЛОВОК</h1>
                <div id="learnMore">
                    <MyButton
                        content="УЗНАТЬ БОЛЬШЕ"
                        icon={<ArrowForwardIosIcon/>}
                        onClick={onButtonClick}
                    />
                </div>
            </div>
            <Divider/>
            <div className="mainInfo" ref={mainInfoRef}>
                {info.map(info =>
                    <InfoBlock
                        key={info.label}
                        label={info.label}
                        main={info.main}
                        desc={info.desc}
                    />
                )}
            </div>
            <Divider/>
            <div className="takeAwayService">
                <div className="photoContainer takeAway">
                    <img src={takeAway} alt="takeAwayPhoto"/>
                    <div>
                        <h1 className="label">
                            НЕ ПОЛУЧАЕТСЯ ПРИЕХАТЬ К НАМ? <br/> НЕ БЕДА! МЫ ПРИЕДЕМ К ВАМ САМИ!
                        </h1>
                        <p>
                            УКАЖИТЕ АДРЕС И ТЕЛЕФОН, И В БЛИЖАЙШЕЕ ВРЕМЯ С ВАМИ СВЯЖЕТСЯ НАШ ВЫЕЗДНОЙ МАСТЕР
                        </p>
                    </div>
                    <Link to="/booking">
                        <MyButton content="ЗАПИСАТЬСЯ"/>
                    </Link>
                </div>
            </div>
            <Divider/>
            <PhotosAutoPlay/>
            <Divider/>
            <div className="reviews">
                {Reviews.map((review, index) =>
                    <div key={index}>
                        <ReviewBlock
                            score={review.score}
                            name={review.name}
                            text={review.text}
                            sex={review.sex}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

const InfoBlock = (props: IInfoBlock) => {
    return (
        <div className="infoBlock">
            <h2>{props.label}</h2>
            <h1>{props.main}</h1>
            <p>{props.desc}</p>
        </div>
    );
}

const ReviewBlock = (props: IReviewBlock) => {
    return (
        <div className="reviewBlock">
            <div>
                <Avatar
                    src={props.sex === "male" ? avatar : avatarFemale}
                    alt="avatar"
                    className="avatar"
                />
                <div className="personInfo">
                    <h2>{props.name}</h2>
                    <Rating
                        defaultValue={props.score}
                        precision={0.1}
                        size="large"
                        readOnly
                    />
                </div>
            </div>
            <p>{props.text}</p>
        </div>
    );
}

export default StartPage;