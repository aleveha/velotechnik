import React, {useState} from 'react';
import {
    Button,
    Card,
    CardActionArea,
    CardContent,
    CardMedia, Collapse,
    Dialog, DialogActions,
    DialogTitle, Divider,
    List,
    ListItem,
    makeStyles
} from "@material-ui/core";
import '../../css/pages/priceList.css';
import {ExpandLess, ExpandMore} from "@material-ui/icons";

interface ICategoryGroup {
    label: string,
    group: IElemPrice[]
}

interface IElemPrice {
    name: string,
    price: string
}

interface ICategory {
    name: string,
    image: { id: number, path: string },
    desc?: string,
    priceList: ICategoryGroup[]
}

const useStyles = makeStyles({
    root: {
        minWidth: 250,
        maxWidth: 500,
        width: "20vw",
        minHeight: 200,
        height: "15vw",
        margin: "2rem 1rem"
    },
    media: {
        minHeight: 150,
        height: "70%",
    },
    dialogTitle: {
        backgroundColor: "var(--secondBG)",
        color: "var(--secondText)"
    },
    listElement: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    },
    closeButton: {
        '&:hover': {
            backgroundColor: "var(--buttonHoverBG)",
            color: "var(--secondText)"
        }
    }
});

const getImages = () => {
    function importAll(r: any) {
        return r.keys().map(r);
    }

    const images = importAll(require.context('../../img/price', false, /\.(png|jpe?g|svg)$/));

    return Object.keys(images).map(key => {
        return images[key].default;
    });
}
const imageArray = getImages();
const Images: { id: number, path: string }[] = imageArray.map(image => {
    return (
        {id: imageArray.indexOf(image) + 1, path: image}
    );
});

const Categories: ICategory[] = [
    {
        name: "РАМА",
        image: {
            id: Images[0].id,
            path: Images[0].path
        },
        desc: "",
        priceList: [
            {
                label: "ОБЩЕЕ",
                group: [
                    {
                        name: "Выпрессовка подшипников подвески",
                        price: "за шт 250"
                    },
                    {
                        name: "Сварка рамы (сталь)",
                        price: "от 300"
                    },
                    {
                        name: "Сварка рамы (алюминий)",
                        price: "от 350"
                    },
                    {
                        name: "Покраска порошковой краской",
                        price: "от 1500"
                    },
                ]
            },
            {
                label: "ТЕХНИЧЕСКОЕ ОБСЛУЖИВАНИЕ",
                group: [
                    {
                        name: "TO1",
                        price: "1590"
                    },
                    {
                        name: "TO2",
                        price: "2790"
                    },
                    {
                        name: "TO3 (двухподвесы с многошарнирной подвеской)",
                        price: "5650"
                    },
                    {
                        name: "Мойка велосипеда (входит в цену любого ТО)",
                        price: "490"
                    },
                ]
            }
        ]
    },
    {
        name: "АМОРТИЗАТОРЫ",
        image: {
            id: Images[1].id,
            path: Images[1].path
        },
        desc: "",
        priceList: [
            {
                label: "ОБЩЕЕ",
                group: [
                    {
                        name: "Установка/замена + все регулировки (тормоз, оплетка, колесо)",
                        price: "690"
                    },
                    {
                        name: "Укорачивание штока под размер",
                        price: "390"
                    }
                ]
            },
            {
                label: "ТЕХНИЧЕСКОЕ ОБСЛУЖИВАНИЕ",
                group: [
                    {
                        name: "ТО эластомерной вилки",
                        price: "от 890"
                    },
                    {
                        name: "ТО масляной вилки",
                        price: "от 1500 до 4000"
                    },
                    {
                        name: "ТО амортизатора",
                        price: "от 1500 до 4000"
                    }
                ]
            }
        ]
    },
    {
        name: "КОЛЁСА",
        image: {
            id: Images[2].id,
            path: Images[2].path
        },
        desc: "",
        priceList: [
            {
                label: "ПОКРЫШКИ И КАМЕРЫ",
                group: [
                    {
                        name: "Установка/замена камеры или покрышки, перебортирование колеса",
                        price: "250"
                    }
                ]
            },
            {
                label: "ОБОДА, ВТУЛКИ И СПИЦЫ",
                group: [
                    {
                        name: "Сборка/переспицовка колеса",
                        price: "1200"
                    },
                    {
                        name: "Установка/замена спицы/ниппеля (переднее колесо)",
                        price: "490"
                    },
                    {
                        name: "Установка/замена спицы/ниппеля (заднее колесо)",
                        price: "590"
                    },
                    {
                        name: "Центровка колеса/протяжка",
                        price: "350"
                    },
                    {
                        name: "Правка колеса простая: восьмерка до 5мм",
                        price: "350"
                    },
                    {
                        name: "Правка колеса сложная: восьмерка от 5мм",
                        price: "490"
                    },
                    {
                        name: "Переборка втулки переднего колеса со смазкой",
                        price: "390"
                    },
                    {
                        name: "Переборка втулки заднего колеса со смазкой",
                        price: "600"
                    },
                    {
                        name: "Переборка односкоростной дорожной втулки (с ножным тормозом)",
                        price: "790"
                    },
                    {
                        name: "Устранение люфта втулки переднего колеса",
                        price: "150"
                    },
                    {
                        name: "устранение люфта втулки заднего колеса",
                        price: "150"
                    }
                ]
            }
        ]
    },
    {
        name: "ТРАНСМИССИЯ",
        image: {
            id: Images[4].id,
            path: Images[4].path
        },
        desc: "",
        priceList: [
            {
                label: "КАРЕТКИ",
                group: [
                    {
                        name: "Установка/замена каретки",
                        price: "600"
                    },
                    {
                        name: "Ремонт каретки обычной",
                        price: "690"
                    },
                    {
                        name: "Торцевание кареточного стакана рамы",
                        price: "от 1800"
                    },
                    {
                        name: "Обновление/восстановление резьбы в каретке",
                        price: "от 1800"
                    },
                    {
                        name: "Замена каретки PRESS FIT (выпрессовка)",
                        price: "1350"
                    },
                    {
                        name: "Устранение люфта разборной каретки",
                        price: "390"
                    }
                ]
            },
            {
                label: "ШАТУНЫ И ПЕДАЛИ",
                group: [
                    {
                        name: "Установка/замена системы шатунов",
                        price: "390"
                    },
                    {
                        name: "Обновление/восстановление резьбы в шатунах",
                        price: "790"
                    },
                    {
                        name: "Установка/замена педалей",
                        price: "150"
                    }
                ]
            },
            {
                label: "ВЕДУЩИЕ ЗВЁЗДЫ, КАССЕТЫ, ТРЕЩЁТКИ И ЦЕПИ",
                group: [
                    {
                        name: "Установка/замена ведущей звездочки/рокринга в системе",
                        price: "250"
                    },
                    {
                        name: "Установка/замена трещетки/кассеты",
                        price: "390"
                    },
                    {
                        name: "Установка/замена цепи",
                        price: "390"
                    },
                    {
                        name: "Смазка цепи без промывки",
                        price: "150"
                    },
                    {
                        name: "Промывка и смазка трансмиссии",
                        price: "690"
                    }
                ]
            },
            {
                label: "ПЕРЕКЛЮЧАТЕЛИ И МАНЕТКИ",
                group: [
                    {
                        name: "Замена роликов заднего переключателя",
                        price: "200"
                    },
                    {
                        name: "Установка/замена троса/рубашки + настройка",
                        price: "450"
                    },
                    {
                        name: "Настройка переднего переключателя",
                        price: "350"
                    },
                    {
                        name: "Настройка заднего переключателя",
                        price: "350"
                    },
                    {
                        name: "Установка/замена манетки + настройка",
                        price: "450"
                    },
                    {
                        name: "Ремонт и восстановление манетки",
                        price: "от 490"
                    },
                    {
                        name: "Замена петуха",
                        price: "190"
                    },
                    {
                        name: "Правка петуха",
                        price: "390"
                    },
                    {
                        name: "Правка перьев (дропаутов)",
                        price: "от 690"
                    }
                ]
            }
        ]
    },
    {
        name: "УПРАВЛЕНИЕ",
        image: {
            id: Images[5].id,
            path: Images[5].path
        },
        desc: "",
        priceList: [
            {
                label: "РУЛЬ",
                group: [
                    {
                        name: "Укорачивание до требуемой ширины",
                        price: "390"
                    },
                    {
                        name: "Установка/замена",
                        price: "490"
                    },
                    {
                        name: "Установка/замена ручек руля (грипс)",
                        price: "150"
                    }
                ]
            },
            {
                label: "ВЫНОС",
                group: [
                    {
                        name: "Замена",
                        price: "290"
                    },
                    {
                        name: "Снятие/установка проставочных колец",
                        price: "150"
                    }
                ]
            },
            {
                label: "РУЛЕВАЯ КОЛОНКА",
                group: [
                    {
                        name: "Ремонт, техобслуживание, смазка",
                        price: "490"
                    },
                    {
                        name: "Устранение люфта",
                        price: "150"
                    },
                    {
                        name: "Снятие рулевой колонки",
                        price: "590"
                    },
                    {
                        name: "Установка рулевой колонки",
                        price: "590"
                    },
                    {
                        name: "Снятие одноразового якоря",
                        price: "350"
                    },
                    {
                        name: "Установка якоря",
                        price: "300"
                    },
                    {
                        name: "Замена крышки якоря",
                        price: "100"
                    }
                ]
            }
        ]
    },
    {
        name: "ТОРМОЗА",
        image: {
            id: Images[6].id,
            path: Images[6].path
        },
        desc: "",
        priceList: [
            {
                label: "ОБЩЕЕ",
                group: [
                    {
                        name: "Установка, снятие или замена диска",
                        price: "350"
                    },
                    {
                        name: "Обновление/восстановление резьбы в посадочных местах",
                        price: "от 690 до 1500"
                    },
                    {
                        name: "Правка тормозного диска",
                        price: "290"
                    }
                ]
            },
            {
                label: "ОБОДНЫЕ",
                group: [
                    {
                        name: "Замена тормоза в сборе",
                        price: "490"
                    },
                    {
                        name: "Замена колодок + регулировка",
                        price: "390"
                    },
                    {
                        name: "Замена троса или оплетки вместе с настройкой",
                        price: "490"
                    }
                ]
            },
            {
                label: "ДИСКОВЫЕ МЕХАНИЧЕСКИЕ",
                group: [
                    {
                        name: "Замена тормоза в сборе",
                        price: "590"
                    },
                    {
                        name: "Замена колодок + регулировка",
                        price: "450"
                    },
                    {
                        name: "Замена тормозного суппорта",
                        price: "450"
                    },
                    {
                        name: "Замена ручки",
                        price: "250"
                    },
                    {
                        name: "Настройка тормозного суппорта",
                        price: "350"
                    },
                    {
                        name: "Замена троса или оплетки вместе с настройкой",
                        price: "490"
                    }
                ]
            },
            {
                label: "ДИСКОВЫЕ ГИДРАВЛИЧЕСКИЕ",
                group: [
                    {
                        name: "Замена тормоза в сборе",
                        price: "590"
                    },
                    {
                        name: "Замена колодок + регулировка",
                        price: "450"
                    },
                    {
                        name: "Замена тормозного суппорта",
                        price: "450"
                    },
                    {
                        name: "Замена ручки + прокачка",
                        price: "640"
                    },
                    {
                        name: "Замена гидролинии, подгонка длины",
                        price: "490"
                    },
                    {
                        name: "Настройка тормозного суппорта",
                        price: "350"
                    },
                    {
                        name: "Прокачка",
                        price: "390"
                    }
                ]
            }
        ]
    },
    {
        name: "ПОСАДКА",
        image: {
            id: Images[7].id,
            path: Images[7].path
        },
        desc: "",
        priceList: [
            {
                label: "ОБЩЕЕ",
                group: [
                    {
                        name: "Установка/замена седла",
                        price: "250"
                    },
                    {
                        name: "Укорачивание подседельного штыря до требуемой длины",
                        price: "350"
                    },
                    {
                        name: "ТО подсидельного штыря гидро/пневмо",
                        price: "от 1800"
                    }
                ]
            }
        ]
    },
    {
        name: "ДРУГОЕ",
        image: {
            id: Images[8].id,
            path: Images[8].path
        },
        desc: "",
        priceList: [
            {
                label: "САМОКАТЫ",
                group: [
                    {
                        name: "Замена подшипников в колесе",
                        price: "150"
                    },
                    {
                        name: "Переборка рулевой колонки",
                        price: "390"
                    },
                    {
                        name: "Сварка",
                        price: "от 300"
                    },
                    {
                        name: "Замена вилки",
                        price: "450"
                    }
                ]
            },
            {
                label: "ЭЛЕКТРОСАМОКАТЫ",
                group: [
                    {
                        name: "Диагностика (при ремонте у нас)",
                        price: "0"
                    },
                    {
                        name: "Регулировка",
                        price: "от 500"
                    },
                    {
                        name: "Полная протяжка деталей",
                        price: "от 300"
                    },
                    {
                        name: "Замена пайка АКБ",
                        price: "от 400"
                    },
                    {
                        name: "Замена ручки газа",
                        price: "от 200"
                    },
                    {
                        name: "Замена спидометра",
                        price: "от 1000"
                    },
                    {
                        name: "Замена ручки тормоза",
                        price: "от 200"
                    },
                    {
                        name: "Замена суппорта тормозов",
                        price: "от 300"
                    },
                    {
                        name: "Замена корпуса",
                        price: "от 1000"
                    },
                    {
                        name: "Замена подножек",
                        price: "от 100"
                    },
                    {
                        name: "Замена амортизатора",
                        price: "от 150"
                    },
                    {
                        name: "Замена контроллера + адаптация",
                        price: "1200"
                    },
                    {
                        name: "Замена крыльев",
                        price: "от 1000"
                    },
                    {
                        name: "Прокачка гидравлического тормоза",
                        price: "от 500"
                    },
                    {
                        name: "Ремонт контроллера",
                        price: "от 1000"
                    },
                    {
                        name: "Замена замка зажигания",
                        price: "от 200"
                    },
                    {
                        name: "Замена диска тормоза",
                        price: "от 300"
                    },
                    {
                        name: "Замена подшипников",
                        price: "от 200"
                    },
                    {
                        name: "Замена камеры и установка новой покрышки",
                        price: "от 900"
                    },
                    {
                        name: "Ремонт складного механизма",
                        price: "от 1000"
                    },
                    {
                        name: "Ремонт мотор-колеса",
                        price: "от 1000"
                    },
                    {
                        name: "Восстановление или замена аккумулятора",
                        price: "от 900"
                    },
                    {
                        name: "Решение проблем с управляющими электронными платами",
                        price: "от 900"
                    },
                    {
                        name: "Аквазащита электросамоката",
                        price: "от 1000"
                    },
                    {
                        name: "Пайка контактов, соединений или разъемов",
                        price: "от 800"
                    },
                    {
                        name: "Восстановелние механических поврждений",
                        price: "от 1000"
                    },
                    {
                        name: "Замена датчиков Холла",
                        price: "от 1000"
                    },
                    {
                        name: "Ремонт зарядного устройства",
                        price: "от 900"
                    },
                    {
                        name: "Восстановление аккулятора",
                        price: "от 200"
                    },
                    {
                        name: "Профилактика рулевой колонки или замена",
                        price: "1500"
                    },
                    {
                        name: "Замена двигателя",
                        price: "от 1300"
                    },
                    {
                        name: "Замена гнезда зарядного устройства",
                        price: "600"
                    },
                    {
                        name: "Ремонт фар",
                        price: "от 800"
                    },
                    {
                        name: "Замена лампочек",
                        price: "от 300"
                    },
                    {
                        name: "Замена датчиков",
                        price: "от 1000"
                    },
                    {
                        name: "Замена контроллера",
                        price: "от 2500"
                    },
                    {
                        name: "Перепрошивка",
                        price: "от 1500"
                    },
                    {
                        name: "Замена кнопок",
                        price: "от 500"
                    },
                    {
                        name: "Ремонт разъема питания",
                        price: "от 1300"
                    },
                    {
                        name: "Ремонт цепи питания",
                        price: "от 2500"
                    },
                    {
                        name: "Ремонт цепи заряда",
                        price: "от 2500"
                    }
                ]
            },
            {
                label: "БЕГОВЫЕ ЛЫЖИ",
                group: [
                    {
                        name: "Установка креплений",
                        price: "600"
                    },
                    {
                        name: "Демонтаж креплений",
                        price: "250"
                    },
                    {
                        name: "Сверление отверстий под крепление",
                        price: "250"
                    },
                    {
                        name: "Заливка старых отверстий",
                        price: "200"
                    },
                    {
                        name: "Залив трещин скользящей поверхности",
                        price: "390"
                    }
                ]
            },
            {
                label: "ГОРНЫЕ ЛЫЖИ",
                group: [
                    {
                        name: "Заточка канта",
                        price: "450"
                    },
                    {
                        name: "Установка креплений",
                        price: "750"
                    },
                    {
                        name: "Демонтаж креплений с заделкой отверстий",
                        price: "200"
                    },
                    {
                        name: "Ремонт расслоения скользяка + ремонт канта + залив граней",
                        price: "от 350"
                    }
                ]
            },
            {
                label: "СНОУБОРДЫ",
                group: [
                    {
                        name: "Заточка канта",
                        price: "450"
                    },
                    {
                        name: "Парафин",
                        price: "650"
                    },
                    {
                        name: "Залив трещин скользящей поверхности",
                        price: "от 390"
                    },
                    {
                        name: "Установка креплений",
                        price: "от 390"
                    },
                    {
                        name: "Ремонт расслоения скользяка + ремонт канта + залив граней",
                        price: "от 350"
                    }
                ]
            },
            {
                label: "КОНЬКИ",
                group: [
                    {
                        name: "Заточка коньков",
                        price: "250"
                    },
                    {
                        name: "Ремонт ботинка",
                        price: "от 200"
                    },
                    {
                        name: "Замена шнурков (без учёта цены шнурков)",
                        price: "150"
                    }
                ]
            }
        ]
    }
];

const Price = () => {
    return (
        <div className="priceList">
            {Categories.map(category => {
                return (
                    <Category
                        key={category.name}
                        name={category.name}
                        image={category.image}
                        desc={category.desc}
                        priceList={category.priceList}
                    />
                );
            })}
        </div>
    );
};

const Groups = (props: ICategoryGroup) => {
    const [open, setOpen] = useState<boolean>(false);
    const classes = useStyles();

    const handleOpen = () => {
        setOpen(!open);
    }

    return (
        <div>
            <ListItem className={classes.listElement} button onClick={handleOpen}>
                <h5>{props.label}</h5>
                {open ? <ExpandLess/> : <ExpandMore/>}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List>
                    {props.group.map(groupItem =>
                        <ListItem
                            className={classes.listElement}
                            key={props.group[props.group.indexOf(groupItem)].name}
                        >
                            <p className="dialogPar">{groupItem.name}</p>
                            <p className="dialogPar">{groupItem.price}р.</p>
                        </ListItem>
                    )}
                </List>
            </Collapse>
        </div>
    );
}

const Category = (props: ICategory) => {
    const classes = useStyles();
    const [elev, setElev] = useState<number>(5);
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);

    const handleSelected = () => {
        setElev(15);
    }
    const handleUnFocus = () => {
        setElev(5);
    }

    const handleDialogOpen = () => {
        setDialogOpen(true)
    }
    const handleDialogClose = () => {
        setDialogOpen(false)
    }

    return (
        <div>
            <Card
                className={classes.root}
                elevation={elev}
                onMouseEnter={handleSelected}
                onMouseLeave={handleUnFocus}
                onClick={handleDialogOpen}
            >
                <CardActionArea style={{height: "100%"}}>
                    <CardMedia
                        src={props.image.path}
                        className={classes.media}
                        component="img"
                    />
                    <CardContent>
                        <h2>{props.name}</h2>
                        {props.desc && <p>{props.desc}</p>}
                    </CardContent>
                </CardActionArea>
            </Card>
            <Dialog
                open={dialogOpen}
                onClose={handleDialogClose}
                fullWidth={true}
                maxWidth="md"
            >
                <DialogTitle className={classes.dialogTitle}>
                    {props.name}
                </DialogTitle>
                <List>
                    {props.priceList.map(elem =>
                        <Groups key={elem.label} label={elem.label} group={elem.group}/>
                    )}
                </List>
                <Divider/>
                <DialogActions>
                    <Button
                        variant="contained"
                        onClick={handleDialogClose}
                        className={classes.closeButton}
                    >
                        ЗАКРЫТЬ
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default Price;