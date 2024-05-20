import React from "react";

import Generic from "../../containers/NormativaContainers/Generic";
import NormativaList from "../../components/NormativaComponents/List";

import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { getExpiringUsers } from "../../appRedux/actions"

function Home() {

    const columns = [
        {title: 'Cognome', dataIndex: 'cognome', key: 'cognome', /*render: (text,record,index) => renderNormaStato(record)*/},
        {title: 'Nome', dataIndex: 'nome', key: 'nome'},
        {title: 'Azienda', dataIndex: 'azienda', key: 'azienda'},  
        {title: 'Data Scadenza', dataIndex: 'data_scadenza', key: 'data_scadenza'},
        {dataIndex: 'action', key: 'x', /*render: (text,record,index) => renderNormaAction(record)*/},
      ];

    const dispatch = useDispatch();
    useEffect(() => {
    }, []);  

    return (
        <Generic innerContent={<NormativaList columns={columns} onFirstLoad={getExpiringUsers(3)}/>}/>
    );
}

export default Home