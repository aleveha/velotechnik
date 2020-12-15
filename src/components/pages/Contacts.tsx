import React from 'react';
import '../../css/pages/contacts.css';
import {Services} from "./Booking";

const Contacts = () => {
    return (
        <div className="contacts">
            <div className="background"/>
            <div className="label">
                <h1>
                    В НАШИХ МАСТЕРСКИХ ВЫ СМОЖЕТЕ ПОЛУЧИТЬ ПРОФЕССИОНАЛЬНУЮ ПОМОЩЬ ПО РЕМОНТУ И ОБСЛУЖИВАНИЮ ВАШЕГО
                    СПОРТИВНОГО ОБОРУДОВАНИЯ
                </h1>
            </div>
            <div className="contactInfo">
                {Services.map(service =>
                    <div key={service.id}>
                        <div>
                            <h3>АДРЕС</h3>
                            <a
                                href={`https://yandex.ru/maps/?pt=${service.coordinates[1]},${service.coordinates[0]}&z=16&l=map`}
                                target="_blank"
                                rel="noreferrer"
                            >
                                {service.address}
                            </a>
                        </div>
                        <div>
                            <h3>ТЕЛЕФОН</h3>
                            <a
                                href={`tel:${service.phoneNumber}`}
                                target="_blank"
                                rel="noreferrer"
                            >
                                {service.phoneNumber}
                            </a>
                        </div>
                        <div>
                            <h3>ЭЛ. АДРЕС</h3>
                            <a
                                href={`mailto:${service.email}`}
                                target="_blank"
                                rel="noreferrer"
                            >
                                {service.email}
                            </a>
                        </div>
                    </div>
                )}
            </div>
            <p>*адрес, номер телефона и электронная почта являются активными ссылками</p>
        </div>
    );
};

export default Contacts;