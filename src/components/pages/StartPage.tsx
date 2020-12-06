import React from 'react';
import photo1 from '../../img/1.jpg';
import '../../css/pages/startPage.css';
import MyButton from "../common/myButton";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import {Divider} from "@material-ui/core";

interface IInfoBlock {
    label: string,
    main: string,
    desc: string
}

const info: IInfoBlock[] = [
    { label: "ДОСТУПНОСТЬ", main: "4", desc: "ПРОФЕССИОНАЛЬНЫХ СЕРВИСА В МОСКВЕ" },
    { label: "ЗАКАЗЫ", main: "10.000+", desc: "ЧЕЛОВЕК ДОВЕРИЛО НАМ СВОИ БАЙКИ" },
    { label: "ДОВЕРИЕ", main: "98.8%", desc: "КЛИЕНТОВ ВОЗВРАЩАЮТСЯ ЗА ПОМОЩЬЮ К НАМ" },
    { label: "УДОБСТВО", main: "100%", desc: "БЫСТРЫЙ СЕРВИС И КОМФОРТНОЕ ОЖИДАНИЕ" },
]

const StartPage = () => {
    return (
        <div className="startPage">
            <div className="mainPhoto">
                <img src={photo1} alt="mainPhoto" />
                <h1>ГЛАВНЫЙ ЗАГОЛОВОК</h1>
                <MyButton
                    path="/home"
                    content="УЗНАТЬ БОЛЬШЕ"
                    icon={<ArrowForwardIosIcon />}
                />
            </div>
            <Divider />
            <div className="mainInfo">
                {info.map(info =>
                    <InfoBlock
                        key={info.label}
                        label={info.label}
                        main={info.main}
                        desc={info.desc}
                    />
                )}
            </div>
            <Divider />
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

export default StartPage;