import React, {useEffect, useState} from "react";
import {Card, Table} from "antd";
import {useDispatch, useSelector} from "react-redux";
import LoadingOverlay from 'react-loading-overlay-ts';

import {ClockLoader} from 'react-spinners'
import { useLocation } from "react-router-dom";

import {message} from "antd";
import {getNormaUsaSuccess, hideSpinner, showSpinner} from "../../../appRedux/actions";

import {
  getNormaUsa,
  searchNormeUsa,
  } from "../../../appRedux/actions";

import NormativaFile from "../NormativaFile";
import NormativaLink from "../NormativaLink";
import SearchNormeUsa from "./SearchNormeUsa";

function ListaNormeUsa(props) {

  var search = props.search;
  if (!search) {
    search = {}
  }

  const [lista, setLista] = useState()

  const columns = [
    {title: 'Data pubblicazione', dataIndex: 'data_pubblicazione', key: 'data_pubblicazione'},
    {title: 'Titolo', dataIndex: 'titolo', key: 'titolo'},
    {title: 'Forma', dataIndex: 'forma', key: 'forma'},  
    {dataIndex: 'action', key: 'x', render: (text,record,index) => renderNormaAction(record)},
  ];

  const dispatch = useDispatch();
  const location = useLocation();

  
  const listNormeUsa = useSelector(({normeUsaStore}) => normeUsaStore.listNormeUsa);
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
      dispatch(searchNormeUsa(search));
      dispatch(showSpinner("Ricerca USA in corso"));
    }
  }, []);

  useEffect(() => {
    if (listNormeUsa !== undefined) {
      setLista(listNormeUsa);
      dispatch(hideSpinner("Ricerca USA completata"))
      if (listNormeUsa.length == 0) {
        message.warning("La ricerca non ha prodotto risultati")
      }
    }
  }, [listNormeUsa]);

  const onClick = (hash) => {
    //console.log("looking for hash ", hash)
    let normaUsa = localStorage.getItem(hash) 
    if ( normaUsa === null) {
      //console.log("load normaUsa from api")
      dispatch(getNormaUsa({normaUsaId:hash}))
    } else {
      //console.log("normaUsa exixst ", normaUsa)
      dispatch(getNormaUsaSuccess(JSON.parse(normaUsa)))
    }
  }


  const renderNormaAction=(data)=>{
    return(
      <p>
      {data.link_principale !== undefined && <NormativaLink link={data.link_principale} />}
      {data.file_principale !== undefined && <NormativaFile category={'normausa'} file={data.file_principale} />}
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
        <SearchNormeUsa />
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

export default ListaNormeUsa;

