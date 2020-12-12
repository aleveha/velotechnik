import React from 'react';
import '../../css/pages/contacts.css';
import {Services} from "./Booking";
import { YMaps, Map } from 'react-yandex-maps';

const Contacts = () => {
    return (
        <div className="contacts">
            <div>
                {Services.map(service =>
                    <div key={service.id}>
                        <div>
                            <h3>АДРЕС</h3>
                            <p>{service.address}</p>
                        </div>
                        <div>
                            <h3>ТЕЛЕФОН</h3>
                            <a href={`tel:${service.phoneNumber}`}>{service.phoneNumber}</a>
                        </div>
                        <div>
                            <h3>ЭЛ. АДРЕС</h3>
                            <a href={`mailto:${service.email}`}>velotechnik@yandex.ru</a>
                        </div>
                    </div>
                )}
            </div>
            <div>
                <YMaps>
                    <Map
                        defaultState={{ center: [55.75, 37.57], zoom: 9 }}
                    />
                </YMaps>
            </div>
        </div>
    );
};

export default Contacts;