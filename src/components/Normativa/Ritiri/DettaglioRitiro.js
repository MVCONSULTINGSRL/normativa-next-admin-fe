import React from "react";
import {Card} from "antd";
import {useState} from 'react';
import {List} from "antd";
import NormativaFiles from "../NormativaFiles";
import NormativaLinks from "../NormativaLinks";
import NormativaCountry from "../NormativaCountry";
import NormativaCountries from "../NormativaCountries";

function DettaglioRitiro(props) {

    const hash = props.hash
    var ritiro = localStorage.getItem(hash);

    if (ritiro) {
        ritiro = JSON.parse(ritiro)['ritiro'];
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
                {data.map((c) =><li> {
                    c.breadcrumb
                } </li>)}
            </ul>
        )
    }

    const renderMainData = (data) => {

        const mainArray = [];

            data.data_pubblicazione !== undefined && mainArray.push({
              title: 'Data di pubblicazione', 
              description: data.data_pubblicazione,
              icona: '/assets/icone/data-pubblicazione.svg',
              iconaHeight: '35px'              
            })
            data.categorie !== undefined && mainArray.push({
                title: 'Categorie',
                description: renderCategorie(data.categorie),
                icona: '/assets/icone/categoria.svg',
                iconaHeight: '35px'              
              })
            mainArray.push({
              title: 'Paese di origine', 
              description: <NormativaCountry country={data.paese_origine}/>,
              icona: '/assets/icone/paesi.svg',
              iconaHeight: '45px'              
            })
            mainArray.push({
              title: 'Paesi interessati', 
              description: <NormativaCountries countries={data.paesi_interessati}/>,
              icona: '/assets/icone/paesi.svg',
              iconaHeight: '45px'              
            })
            data.pericolo !== undefined && mainArray.push({
              title: 'Pericolo', 
              description: data.pericolo.descrizione,
              icona: '/assets/icone/pericolo.svg',
              iconaHeight: '35px'              
            })
            data.riferimento !== undefined && mainArray.push({
              title: 'Riferimento', 
              description: data.riferimento,
              icona: '/assets/icone/riferimeto.svg',
              iconaHeight: '35px'              
            })
        return mainArray;

    }

    const contentList = {
        tab1: <List
            itemLayout="horizontal"
            dataSource={renderMainData(ritiro)}
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
                <NormativaFiles category={'ritiro'} files={ritiro.files}/>
                <NormativaLinks links={ritiro.links} skip="0"/>
            </p>
    };

    const [tab,
        setTab] = useState('tab1');


    const onTabChange = (key, type) => {
        setTab(key)
    };

    if (ritiro !== undefined) {
        return (
            <Card
                className="gx-card"
                title={< span style = {{whiteSpace:"normal"}} > {
                ritiro.soggetto
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
            <p>Unable to get Ritiro data</p>
        )
    }
}

export default DettaglioRitiro;
