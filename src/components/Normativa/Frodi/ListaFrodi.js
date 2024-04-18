import React, {useEffect,useState} from "react";
import {Card, Table} from "antd";
import {useDispatch, useSelector} from "react-redux";
import LoadingOverlay from 'react-loading-overlay-ts';
import {ClockLoader} from 'react-spinners'

import {message} from "antd";
import {getFrodeSuccess} from "../../../appRedux/actions";

import {
  getFrode,
  searchFrodi,
  showSpinner,
  hideSpinner, 
} from "../../../appRedux/actions";

import NormativaFile from "../NormativaFile";
import NormativaLink from "../NormativaLink";
import NormativaCountry from "../NormativaCountry";
import SearchFrodi from "./SearchFrodi";
import { useLocation } from "react-router-dom";


function ListaFrodi(props) {

  var search = props.search;
  if (!search) {
    search = {}
  }
  const location = useLocation();

  const [lista, setLista] = useState()

  const columns = [
    {title: 'Data pubblicazione', dataIndex: 'data_pubblicazione', key: 'data_pubblicazione'},
    {title: 'Categoria', dataIndex: 'categoria', key: 'categoria', render: (text,record,index) => renderCategoria(record)},
    {title: 'Soggetto', dataIndex: 'soggetto_ita', key: 'soggetto_ita'},
    {title: 'Paese di origine', dataIndex: 'paese_origine', key: 'paese_origine',render: (text,record,index) => <NormativaCountry country={record.paese_origine}/>},
    {title: 'Pericolo', dataIndex: 'pericolo', key: 'pericolo',render: (text,record,index) => renderPericolo(record)},
    {dataIndex: 'action', key: 'x', render: (text,record,index) => renderActions(record)},
  ];

  const dispatch = useDispatch();
  
  
  const listFrodi = useSelector(({frodiStore}) => frodiStore.listFrodi);
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
      dispatch(searchFrodi(search));
      dispatch(showSpinner("Ricerca frodi in corso"));
    }
  }, []);

  useEffect(() => {
    if (listFrodi !== undefined) {
      setLista(listFrodi);
      dispatch(hideSpinner("Ricerca frodi completata"));
      if (listFrodi.length == 0) {
        message.warning("La ricerca non ha prodotto risultati")
      }
    }
  }, [listFrodi]);

  const onClick = (hash) => {
    //console.log("looking for hash ", hash)
    let frode = localStorage.getItem(hash) 
    if ( frode === null) {
      //console.log("load frode from api")
      dispatch(getFrode({frodeId:hash}))
    } else {
      //console.log("frode exixst ", frode)
      dispatch(getFrodeSuccess(JSON.parse(frode)))
    }
  }

  const renderPericolo=(data)=>{ 
    return (
      <p>
        {data.pericolo !== undefined && <span>{data.pericolo.descrizione}</span>}
      </p>
    )
  }

  const renderLivello2=(data)=>{ 
    return (
      <p>
      {data.riferimento !== undefined && <p style={{margin: 0}}>Riferimento: <ul><li>{data.riferimento}</li></ul></p>}
      </p>
    )
  }

  const renderActions=(data)=>{
    return(
      <p>
      {data.link_principale !== undefined && <NormativaLink link={data.link_principale} />}
      {data.file_principale !== undefined && <NormativaFile category={'frode'} file={data.file_principale} />}
      </p>
    )
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
     >       <SearchFrodi />
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

export default ListaFrodi;

