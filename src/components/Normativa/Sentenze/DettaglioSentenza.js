import React from "react";
import {Card} from "antd";
import {useState} from 'react';
import {List} from "antd";
import NormativaFiles from "../NormativaFiles";
import NormativaLinks from "../NormativaLinks";

function DettaglioSentenza(props) {

    const hash = props.hash
    var sentenza = localStorage.getItem(hash);

    if (sentenza) {
        sentenza = JSON.parse(sentenza)['sentenza'];
        console.log("sentenza is " , sentenza)
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

            data.data_pubblicazione !== undefined && mainArray.push({title: 'Data di pubblicazione', description: data.data_pubblicazione, icona: '/assets/icone/data-pubblicazione.svg', iconaHeight: '35px'})
            data.numero_sentenza !== undefined && mainArray.push({title: 'Numero sentenza', description: data.numero_sentenza, icona: '/assets/icone/numero.svg', iconaHeight: '35px'})
            data.riferimento !== undefined && mainArray.push({title: 'Riferimento', description: data.riferimento, icona: '/assets/icone/riferimento.svg', iconaHeight: '35px'})
            data.categorie !== undefined && mainArray.push({
                title: 'Categorie',
                description: renderCategorie(data.categorie),
                icona: '/assets/icone/categoria.svg', iconaHeight: '35px'
            })
        return mainArray;

    }

    const contentList = {
        tab1: <List
            itemLayout="horizontal"
            dataSource={renderMainData(sentenza)}
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
                <NormativaFiles category={'sentenza'} files={sentenza.files}/>
                <NormativaLinks links={sentenza.links} skip="0"/>
            </p>
    };

    const [tab,
        setTab] = useState('tab1');

    const onTabChange = (key, type) => {
        setTab(key)
    };

    if (sentenza !== undefined) {
        return (
            <Card
                className="gx-card"
                title={< span style = {{whiteSpace:"normal"}} > {
                sentenza.causa
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
            <p>Unable to get Sentenza data</p>
        )
    }
}

export default DettaglioSentenza;
