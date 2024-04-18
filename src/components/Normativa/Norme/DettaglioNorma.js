import React from "react";
import {Card} from "antd";
import {useState} from "react";
import { List} from "antd";

import NormativaFiles from "../NormativaFiles";
import NormativaLinks from "../NormativaLinks";

function DettaglioNorma(props) {

    const hash = props.hash
    var norma = localStorage.getItem(hash);

    if (norma) {
        norma = JSON.parse(norma)['norma'];
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

            data.categorie !== undefined && mainArray.push({
                title: 'Categorie',
                description: renderCategorie(data.categorie),
                icona: '/assets/icone/categoria.svg', iconaHeight: '35px'
            })
            data.argomento !== undefined && mainArray.push({title: 'Argomento', description: data.argomento, icona: '/assets/icone/argomento.svg', iconaHeight: '35px'})
            data.forma !== undefined && mainArray.push({title: 'Forma', description: data.forma, icona: '/assets/icone/forma.svg', iconaHeight: '35px'})
            data.riferimento_della_pubblicazione !== undefined && mainArray.push({title: 'Riferimento della pubblicazione', description: data.riferimento_della_pubblicazione, icona: '/assets/icone/riferimento.svg', iconaHeight: '35px'})
            data.descrizione !== undefined && mainArray.push({title: 'Descrizione', description: data.descrizione})
            data.commento !== undefined && mainArray.push({title: 'Commento', description: data.commento})
            data.stato === 1 && mainArray.push({title: 'Stato', description: 'In vigore'})
            data.stato === 2 && mainArray.push({title: 'Stato', description: 'Abrogata'})
            data.stato === 3 && mainArray.push({title: 'Stato', description: 'Non ancora in vigore'})
            data.data_pubblicazione !== undefined && mainArray.push({title: 'Data di pubblicazione', description: data.data_pubblicazione, icona: '/assets/icone/data-pubblicazione.svg', iconaHeight: '35px'})
            data.data_entrata_in_vigore !== undefined && mainArray.push({title: 'In vigore dal', description: data.data_entrata_in_vigore})
            data.data_fine_validita !== undefined && mainArray.push({title: 'Fine validita', description: data.data_fine_validita, icona: '/assets/icone/data-fine-validita.svg', iconaHeight: '35px'})
        return mainArray;

    }

    const contentList = {
        tab1: <List
            itemLayout="horizontal"
            dataSource={renderMainData(norma)}
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
                <NormativaFiles category={'norma'} files={norma.files}/>
                <NormativaLinks links={norma.links} skip="0"/>
            </p>
    };

    const [tab,
        setTab] = useState('tab1');

    const onTabChange = (key, type) => {
        setTab(key)
    };

    if (norma !== undefined) {
        return (
            <Card
                className="gx-card"
                title={< span style = {{whiteSpace:"normal"}} > {
                norma.titolo
            } </span>}
                tabList={tabList}
                onTabChange={(key) => {
                onTabChange(key, 'key');
            }}>
                {contentList[tab]}
            </Card>
        )
    } else {
        return (
            <p>Unable to get Norma data</p>
        )
    }
}

export default DettaglioNorma;
