import React, {useState} from 'react';
import { Tabs } from "../header/Menu";
import InstagramWhite from '../../socialLogos/white/Instagram_white.svg';
import VKWhite from '../../socialLogos/white/VK_white.svg';
import WhatsAppWhite from '../../socialLogos/white/WhatsApp_white.svg';
import VKColor from '../../socialLogos/color/VK.svg';
import WhatsAppColor from '../../socialLogos/color/WhatsApp.svg';
import { IconButton } from "@material-ui/core";
import {Link} from "react-router-dom";

const Footer = () => {
    return (
        <div className="footer">
            <div className="siteMap">
                {Tabs.map(tab =>
                    <Link key={tab.id} to={tab.path} className="tab">
                        <h3>{tab.name}</h3>
                    </Link>
                )}
            </div>
            <div className="socialMedia">
                <SocialMediaIcon
                    nameWhite={InstagramWhite}
                    nameColor={InstagramWhite}
                    svgColor="#F521B8"
                    href="https://www.instagram.com/velotechnik24/"
                />
                <SocialMediaIcon
                    nameWhite={VKWhite}
                    nameColor={VKColor}
                    href="https://vk.com/velotechnik896"
                />
                <SocialMediaIcon
                    nameWhite={WhatsAppWhite}
                    nameColor={WhatsAppColor}
                    href="https://wa.me/+79160799279"
                />
            </div>
        </div>
    );
};

const SocialMediaIcon = (props: {
    nameColor: string,
    nameWhite: string,
    svgColor?: string,
    href?: string
}) => {
    const [color, setShowColor] = useState<boolean>(false);
    return (
        <IconButton component="a" href={props.href} target="_blank">
            <img
                onMouseEnter={() => setShowColor(true)}
                onMouseLeave={() => setShowColor(false)}
                src={color ? props.nameColor : props.nameWhite}
                style={color ? { borderRadius: "50%", backgroundColor: props.svgColor } : {}}
                className="socialIcon"
                alt="socialMedia"
            />
        </IconButton>
    );
}

export default Footer;