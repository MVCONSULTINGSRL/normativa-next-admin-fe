import React from "react";
import {searchNorme, showSpinner} from "../../appRedux/actions";
import {Card} from "antd";
import MappaHome from "../../components/Normativa/MappaHome";
import GraficoHome from "../../components/Normativa/GraficoHome";
import {useState} from "react";
import {useHistory, Link} from 'react-router-dom'

import {DEFAULT_LAST_YEARS} from "../../constants/Api"
import {getLastYears} from "../../constants/Functions"

import {useDispatch} from "react-redux";


function Home() {



    const dispatch = useDispatch();

    const history = useHistory();

    const [isShown,
        setIsShown] = useState({allerte: true, ritiri: false, frodi: false});

    const onClickNorme = () => {
        var searchObject = {
            data_pubblicazione: getLastYears(DEFAULT_LAST_YEARS)
        }
        dispatch(searchNorme(searchObject));
        dispatch(showSpinner("Ricerca norme in corso"))
        history.push({pathname: "/norme/"})
    }

    return (
        <div className="gx-main-content-wrapper">
            <div className="ant-row">
                <div
                    className="ant-col gx-col-full ant-col-xs-12 ant-col-sm-12 ant-col-md-12 ant-col-lg-12 ant-col-xl-6">
                    <GraficoHome
                        onClick={() => setIsShown({allerte: true, ritiri: false, frodi: false})}
                        hoverable="true"
                        type="down"
                        category="allerte"
                        id="graficoAllerte"
                        title="ALLERTE"
                        color="#ED6F07"/>
                </div>
                <div
                    className="ant-col gx-col-full ant-col-xs-12 ant-col-sm-12 ant-col-md-12 ant-col-lg-12 ant-col-xl-6">
                    <GraficoHome
                        onClick={() => setIsShown({allerte: false, ritiri: true, frodi: false})}
                        hoverable="true"
                        type="down"
                        category="ritiri"
                        id="graficoRichiami"
                        title="RICHIAMI"
                        color="#CF2B29"/>
                </div>
                <div
                    className="ant-col gx-col-full ant-col-xs-12 ant-col-sm-12 ant-col-md-12 ant-col-lg-12 ant-col-xl-6">
                    <GraficoHome
                        onClick={() => setIsShown({allerte: false, ritiri: false, frodi: true})}
                        hoverable="true"
                        type="down"
                        category="frodi"
                        id="graficoFrodi"
                        title="FRODI"
                        color="#F4DE61"/>
                </div>
                <div
                    className="ant-col gx-col-full ant-col-xs-12 ant-col-sm-12 ant-col-md-12 ant-col-lg-12 ant-col-xl-6">
                    <GraficoHome
                        onClick={() => onClickNorme()}
                        hoverable="true"
                        type="neutral"
                        category="norme"
                        id="graficoNorme"
                        title="NORME"
                        color="#002447"/>
                </div>
            </div>
            {isShown.allerte && (
                <Card className="gx-card">
                    <MappaHome
                        id="allerteMap"
                        category="allerte"
                        title="ALLERTE"
                        subtitle="Distribuzione per paese di origine negli ultimi 12 mesi"
                        colors={{
                        min: '#EEC29D',
                        max: '#ED6F07'
                    }}/>
                </Card>
            )}
            {isShown.ritiri && (
                <Card className="gx-card">
                    <MappaHome
                        id="ritiriMap"
                        category="ritiri"
                        subtitle="Distribuzione per paese di origine negli ultimi 12 mesi"
                        title="RICHIAMI"
                        colors={{
                        min: '#CFA09E',
                        max: '#CF2B29'
                    }}/>
                </Card>
            )}
            {isShown.frodi && (
                <Card className="gx-card">
                    <MappaHome
                        id="frodiMap"
                        category="frodi"
                        subtitle="Distribuzione per paese di origine negli ultimi 12 mesi"
                        title="FRODI"
                        colors={{
                        min: '#F4EDC7',
                        max: '#F4DE61'
                    }}/>
                </Card>
            )}
            <div className="ant-row">
                <div
                    className="ant-col gx-col-full ant-col-xs-12 ant-col-sm-12 ant-col-md-12 ant-col-lg-12 ant-col-xl-6">
                    <Link
                        to={{
                        pathname: "https://www.mvacademy.it/corsi/"
                    }}
                        target="_blank">
                        <Card
                            className="na-card-homepage"
                            hoverable
                            cover={< img alt = "example" src = "/assets/images/MVACADEMY.png" />}/>
                    </Link>
                </div>
                <div
                    className="ant-col gx-col-full ant-col-xs-12 ant-col-sm-12 ant-col-md-12 ant-col-lg-12 ant-col-xl-6">
                    <Link to={"/assets/docs/Benvenuto-in-Normativa-Alimentare-2.pdf"} target="_blank">
                    <Card
                        hoverable
                        cover={< img alt = "example" src = "/assets/images/GUIDA.jpg" />}
                        className="na-card-homepage"/>
                    </Link>
                </div>
                <div
                    className="ant-col gx-col-full ant-col-xs-12 ant-col-sm-12 ant-col-md-12 ant-col-lg-12 ant-col-xl-6">
                    <Link to={"/newsletter"}>
                        <Card
                            className="na-card-homepage"
                            hoverable
                            cover={< img alt = "example" src = "/assets/images/NEWSLETTER.jpg" />}/>
                    </Link>
                </div>
                <div
                    className="ant-col gx-col-full ant-col-xs-12 ant-col-sm-12 ant-col-md-12 ant-col-lg-12 ant-col-xl-6">
                    <Link
                        to={{
                        pathname: "https://normativaalimentare.it/category/news/"
                    }}
                        target="_blank">
                        <Card
                            className="na-card-homepage"
                            hoverable
                            cover={< img alt = "example" src = "/assets/images/NORMATIVA.png" />}/>
                    </Link>
                </div>
            </div>

        </div>
    );
}

export default Home