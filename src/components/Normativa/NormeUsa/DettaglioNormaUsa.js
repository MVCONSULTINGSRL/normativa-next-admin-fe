import React from "react";
import {Card} from "antd";
import {useState} from 'react';
import {List} from "antd";

import NormativaFiles from "../NormativaFiles";
import NormativaLinks from "../NormativaLinks";

function DettaglioNormaUsa(props) {

    const hash = props.hash
    var normaUsa = localStorage.getItem(hash);

    if (normaUsa) {
        normaUsa = JSON.parse(normaUsa)['normaUsa'];
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
            data.forma !== undefined && mainArray.push({
              title: 'Forma', 
              description: data.forma,
              icona: '/assets/icone/forma.svg',
              iconaHeight: '35px'                
            })
            data.categorie !== undefined && mainArray.push({
                title: 'Categorie',
                description: renderCategorie(data.categorie),
                icona: '/assets/icone/categoria.svg',
                iconaHeight: '35px'                  
            })
        return mainArray;

    }

    const contentList = {
        tab1: <List
            itemLayout="horizontal"
            dataSource={renderMainData(normaUsa)}
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
                <NormativaFiles category={'normausa'} files={normaUsa.files}/>
                <NormativaLinks links={normaUsa.links} skip="0"/>
            </p>
    };

    const [tab,
        setTab] = useState('tab1');

    const onTabChange = (key, type) => {
        setTab(key)
    };

    if (normaUsa !== undefined) {
        return (
            <Card
                className="gx-card"
                title={< span style = {{whiteSpace:"normal"}} > {
                normaUsa.titolo
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
            <p>Unable to get NormaUsa data</p>
        )
    }
}

export default DettaglioNormaUsa;
