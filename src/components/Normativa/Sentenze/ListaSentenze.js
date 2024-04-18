import React, {useEffect, useState} from "react";
import {Card, Table} from "antd";
import {useDispatch, useSelector} from "react-redux";
import LoadingOverlay from 'react-loading-overlay-ts';

import {ClockLoader} from 'react-spinners'

import {message} from "antd";
import {getSentenzaSuccess} from "../../../appRedux/actions";
import { useLocation } from "react-router-dom";

import {
  getSentenza,
  searchSentenze,
  showSpinner,
  hideSpinner,
} from "../../../appRedux/actions";

import NormativaFile from "../NormativaFile";
import NormativaLink from "../NormativaLink";
import SearchSentenze from "./SearchSentenze";

function ListaSentenze(props) {

  var search = props.search;
  if (!search) {
    search = {}
  }
  const location = useLocation();

  const [lista, setLista] = useState()

  const columns = [
    {title: 'Data pubblicazione', dataIndex: 'data_pubblicazione', key: 'data_pubblicazione'},
    {title: 'Numero sentenza', dataIndex: 'numero_sentenza', key: 'numero_sentenza'},
    {title: 'Descrizione', dataIndex: 'causa', key: 'causa'},
    {title: 'Riferimento', dataIndex: 'riferimento', key: 'riferimento'},
    {dataIndex: 'action', key: 'x', render: (text,record,index) => renderActions(record)},
  ];

  const dispatch = useDispatch();

  
  const listSentenze = useSelector(({sentenzeStore}) => sentenzeStore.listSentenze);
  const spinner = useSelector(({common}) => common.spinner);
  
  const [hoveringRow, setHoveringRow] = useState(null);
  const onMouseEnter = (key) => {
    setHoveringRow(key);
  };
  const onMouseLeave = () => {
    setHoveringRow(null);
  };

  
  useEffect(() => {
    if (location.state === undefined) {
      dispatch(searchSentenze(search));
      dispatch(showSpinner("Ricerca sentenze in corso"));
    }

  }, []);

  useEffect(() => {
    if (listSentenze !== undefined) {
      setLista(listSentenze);
      dispatch(hideSpinner("Ricerca sentenze completata"));
      if (listSentenze.length == 0) {
        message.warning("La ricerca non ha prodotto risultati")
      }
    }
  }, [listSentenze]);

  const onClick = (hash) => {
    //console.log("looking for hash ", hash)
    let sentenza = localStorage.getItem(hash) 
    if ( sentenza === null) {
      //console.log("load norma from api")
      dispatch(getSentenza({sentenzaId:hash}))
    } else {
      //console.log("norma exixst ", norma)
      dispatch(getSentenzaSuccess(JSON.parse(sentenza)))
    }
  }


  const renderActions=(data)=>{
    return(
      <p>
      {data.link_principale !== undefined && <NormativaLink link={data.link_principale} />}
      {data.file_principale !== undefined && <NormativaFile category={'sentenza'} file={data.file_principale} tooltip={data.numero_sentenza} />}
      </p>
    )
  }


  return (
      <LoadingOverlay 
    active={spinner.show}
    text={spinner.message}
     spinner={<ClockLoader color={"#2C2557"}/>}
     styles={{
      overlay: (base) => ({
        ...base,
        background: 'rgba(255, 255, 255, 0.6)'
      }),
      content: (base) => ({
        ...base,
        color: "#2C2557",
        position: "absolute",
        top: "10%", /* Positioned at the top of the parent */
        left: "50%", /* Centered horizontally */
        transform: "translateX(-50%)", /* Adjust for any potential margin/padding */
     
      }),
      }}
     >        
        <SearchSentenze />
        { lista !== null && lista !== undefined && lista.length > 0 && (
       <Card title={"La tua ricerca ha prodotto "+lista.length+" risultati"}>
       <Table className="gx-table-responsive"
              onRow={(record, rowIndex) => ({
                onClick: (event) => {onClick(record.hash)}, // click row
                onDoubleClick: (event) => {}, // double click row
                onContextMenu: (event) => {}, // right button click row
                onMouseEnter: (event) => onMouseEnter(record.key), // mouse enter row
                onMouseLeave:  onMouseLeave, style: { cursor: hoveringRow === record.key && record.description !== "" ? 'pointer' : 'default' }, // mouse leave row
              })}
              columns={columns}
              //expandedRowRender={record => renderLivello2(record)}
              dataSource={lista}
              rowKey={record => record.hash}
              pagination={{ 
                position: ["topRight","bottomRight"], 
                defaultPageSize: 10, 
                showSizeChanger: true, 
                pageSizeOptions: ['10', '20', '50'],
                onChange: (page, pageSize) => {
                  document.body.scrollTop = 0; // For Safari
                  document.documentElement.scrollTop = 0;
                }
              }}            
        />
      </Card>
        )}
    </LoadingOverlay>
  )
}

export default ListaSentenze;

