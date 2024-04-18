import React, {useEffect, useState} from "react";
import {Card, Table, Tooltip} from "antd";
import {useDispatch, useSelector} from "react-redux";
import LoadingOverlay from 'react-loading-overlay-ts';
import { useLocation } from "react-router-dom";
import {ClockLoader} from 'react-spinners'

import {message} from "antd";

import {CheckCircleFilled, ClockCircleFilled, CloseCircleFilled} from "@ant-design/icons"

import {
  getNorma,
  getNormaSuccess, 
  searchNorme, 
  hideSpinner,
  showSpinner
} from "../../../appRedux/actions";

import NormativaFile from "../NormativaFile";
import NormativaLink from "../NormativaLink";
import NormativaLinks from "../NormativaLinks";
import SearchNorme from "./SearchNorme";

function ListaNorme(props) {

  var search = props.search;
  if (!search) {
    search = {}
  }

  const [lista, setLista] = useState()

  const columns = [
    {title: 'Stato', dataIndex: 'stato', key: 'stato', render: (text,record,index) => renderNormaStato(record)},
    {title: 'Argomento', dataIndex: 'argomento', key: 'argomento'},
    {title: 'Forma', dataIndex: 'forma', key: 'forma'},  
    {title: 'Titolo', dataIndex: 'titolo', key: 'titolo'},
    {title: 'Categoria', dataIndex: 'categoria', key: 'categoria',render: (text,record,index) => renderCategoria(record)},
    {title: 'Data pubblicazione', dataIndex: 'data_pubblicazione', key: 'data_pubblicazione'},
    {dataIndex: 'action', key: 'x', render: (text,record,index) => renderNormaAction(record)},
  ];

  const dispatch = useDispatch();
  const location = useLocation();

  const listNorme = useSelector(({normeStore}) => normeStore.listNorme);
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
      dispatch(searchNorme(search));
      dispatch(showSpinner("Ricerca norme in corso"));
    }
  }, []);

  useEffect(() => {
    if (listNorme !== undefined) {
      setLista(listNorme);
      dispatch(hideSpinner("Ricerca norme completata"));
      if (listNorme.length == 0) {
        message.warning("La ricerca non ha prodotto risultati")
      }
    }
  }, [listNorme]);

  const onClick = (hash) => {
    //console.log("looking for hash ", hash)
    let norma = localStorage.getItem(hash) 
    if ( norma === null) {
      //console.log("load norma from api")
      dispatch(getNorma({normaId:hash}))
    } else {
      //console.log("norma exixst ", norma)
      dispatch(getNormaSuccess(JSON.parse(norma)))
    }
  }

  const renderCategoria=(data)=>{ 
    if (data.categorie !== undefined) {
      return (
        <ul>
          {data.categorie.map((c)=><li>{c.descrizione}</li>)}
        </ul>
      )
    }
    else {
      return (<p></p>)
    }
  }

  const renderNormaStato=(data)=>{
    return(
      <p>
        {data.stato === 1 && <Tooltip title='In vigore'><CheckCircleFilled style={{fontSize: '30px',color: "#00FF00"}} /></Tooltip>}
        {data.stato === 2 && <Tooltip title='Abrogata'><CloseCircleFilled  style={{fontSize: '30px',color: "#FF0000"}} /></Tooltip>}
        {data.stato === 3 && <Tooltip title='Non ancora in vigore'><ClockCircleFilled  style={{fontSize: '30px',color: "#E0b70c"}} /></Tooltip>}
      </p>
    )
  }

  const renderNormaAction=(data)=>{
    return(
      <p>
      {data.link_principale !== undefined && <NormativaLink link={data.link_principale} />}
      {data.file_principale !== undefined && <NormativaFile category={'norma'} file={data.file_principale} />}
      </p>
    )
  }

  const renderLivello2=(data)=>{ 
    return (
      <p>
      {data.riferimento_della_pubblicazione !== undefined && <p style={{margin: 0}}>Riferimento della pubblicazione: <ul><li>{data.riferimento_della_pubblicazione}</li></ul></p>}
      {data.descrizione !== undefined && <p style={{margin: 0}}>Descrizione: <ul><li>{data.descrizione}</li></ul></p>}
      {data.links !== undefined && data.links.length > 1 && <p style={{margin: 0}}>Links aggiuntivi: {renderLinks(data.links,data.link_principale.id)}</p>}
    </p>
    )
  }

  const renderLinks=(links,skip)=>{ 
    return (
      <ul><br/>
        <NormativaLinks links={links} skip={skip}/>
      </ul>
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
            <SearchNorme />
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
                  expandedRowRender={record => renderLivello2(record)}
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

export default ListaNorme;

