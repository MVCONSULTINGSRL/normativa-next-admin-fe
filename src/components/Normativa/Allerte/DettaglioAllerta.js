import React from "react";
import {Card} from "antd";
import {useState} from 'react';
import {List} from "antd";

import NormativaFiles from "../NormativaFiles";
import NormativaLinks from "../NormativaLinks";
import NormativaCountry from "../NormativaCountry";
import NormativaCountries from "../NormativaCountries";

function DettaglioAllerta(props) {

    const hash = props.hash
    var allerta = localStorage.getItem(hash);

    if (allerta) {
        allerta = JSON.parse(allerta)['allerta'];
    } else {}

    const tabList = [
        {
            key: 'tab1',
            tab: 'dati principali'
        }, {
            key: 'tab2',
            tab: 'links e files'
        }
    ];

    const renderCategorie = (data) => {
        return (
            <ul>
                {data.map((c) =>< li > {
                    c.breadcrumb
                } </li>)}
            </ul>
        )
    }

    const renderMainData = (data) => {

        const mainArray = [];

        data.data_pubblicazione !== undefined && mainArray.push({title: 'Data di pubblicazione', description: data.data_pubblicazione, icona: '/assets/icone/data-pubblicazione.svg', iconaHeight: '35px'})
        data.categorie !== undefined && mainArray.push({
            title: 'Categorie',
            description: renderCategorie(data.categorie),
            icona: '/assets/icone/categoria.svg',
            iconaHeight: '35px'
        })
        data.soggetto !== undefined && mainArray.push({title: 'Soggetto', description: data.soggetto, icona: '/assets/icone/soggetto.svg', iconaHeight: '35px'})
        mainArray.push({
            title: 'Paesi interessati', description: <NormativaCountries countries={data.paesi_interessati}/>,
            icona: '/assets/icone/paesi.svg',
            iconaHeight: '45px'
        })
        mainArray.push({
            title: 'Paese notificante', description: <NormativaCountry country={data.paese_notificante}/>,
            icona: '/assets/icone/paesi.svg',
            iconaHeight: '45px'
        })
        mainArray.push({
            title: 'Paese di origine', description: <NormativaCountry country={data.paese_origine}/>,
            icona: '/assets/icone/paesi.svg',
            iconaHeight: '45px'
        })
        data.pericolo !== undefined && mainArray.push({title: 'Pericolo', description: data.pericolo.descrizione, icona: '/assets/icone/pericolo.svg', iconaHeight: '35px'})
        data.azione_intrapresa !== undefined && mainArray.push({title: 'Azione intrapresa', description: data.azione_intrapresa, icona: '/assets/icone/azioni-intraprese.svg', iconaHeight: '35px'})

        return mainArray;

    }

    const contentList = {
        tab1: <List
            itemLayout="horizontal"
            dataSource={renderMainData(allerta)}
            renderItem={item => (
            <List.Item>
                <List.Item.Meta
                    avatar={<img alt="" height = {
                    item.iconaHeight
                }
                src = {
                    item.icona
                }
                style = {{padding: '2px',}}/>}
                    title={< span style = {{fontWeight:"bold"}} > {
                    item.title
                } </span>}
                    description={item.description}/>
            </List.Item>
        )}/>,
        tab2: <p>
                <NormativaFiles category={'allerta'} files={allerta.files}/>
                <NormativaLinks links={allerta.links} skip="0"/>
            </p>
    };

    const [tab,
        setTab] = useState('tab1');

    const onTabChange = (key, type) => {
        setTab(key)
    };

    if (allerta !== undefined) {
        return (
            <Card
                className="gx-card"
                title={< span style = {{whiteSpace:"normal"}} > {
                allerta.soggetto_ita
            } </span>}
                tabList={tabList}
                onTabChange={(key) => {
                onTabChange(key, 'key');
            }}>
                {contentList[tab]}
            </Card>
        );
    } else {
        return (
            <p>Unable to get Allerta data</p>
        )
    }
}

export default DettaglioAllerta;
