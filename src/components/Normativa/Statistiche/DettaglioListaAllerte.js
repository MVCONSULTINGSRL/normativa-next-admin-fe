import React, {useEffect, useState} from "react";
import {Table} from "antd";
import {useDispatch} from "react-redux";
import {getAllertaSuccess} from "../../../appRedux/actions";

import {
  getAllerta,
} from "../../../appRedux/actions";

import NormativaFile from "../NormativaFile";
import NormativaLink from "../NormativaLink";
import NormativaCountry from "../NormativaCountry";

function DettaglioListaStatAllerte(props) {

  const {data} = props;

  const [lista, setLista] = useState()

  const columns = [
    {title: 'Data pubblicazione', dataIndex: 'data_pubblicazione', key: 'data_pubblicazione'},
    {title: 'Categoria', dataIndex: 'categoria', key: 'categoria',render: (text,record,index) => renderCategoria(record)},
    {title: 'Soggetto', dataIndex: 'soggetto_ita', key: 'soggetto_ita'},
    {title: 'Paese di origine', dataIndex: 'paese_origine', key: 'paese_origine',render: (text,record,index) => <NormativaCountry country={record.paese_origine}/>},
    {title: 'Pericolo', dataIndex: 'pericolo', key: 'pericolo',render: (text,record,index) => renderPericolo(record)},
    {title: 'Action', dataIndex: 'action', key: 'x', render: (text,record,index) => renderAllerteAction(record)},
  ];

  const dispatch = useDispatch();

  const [hoveringRow, setHoveringRow] = useState(null);
  const onMouseEnter = (key) => {
    setHoveringRow(key);
  };
  const onMouseLeave = () => {
    setHoveringRow(null);
  };
  
  useEffect(() => {
    setLista(data)
    
  }, []);


  const onClick = (hash) => {
    //console.log("looking for hash ", hash)
    let allerta = localStorage.getItem(hash) 
    if ( allerta === null) {
      //console.log("load norma from api")
      dispatch(getAllerta({allertaId:hash}))
    } else {
      //console.log("norma exixst ", norma)
      dispatch(getAllertaSuccess(JSON.parse(allerta)))
    }
  }


  const renderCategoria=(data)=>{ 
    if (data.categorie !== null) {
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

  const renderAllerteAction=(data)=>{
    return(
      <p>
      {data.link_principale !== undefined && <NormativaLink link={data.link_principale} />}
      {data.file_principale !== undefined && <NormativaFile category={'allerta'} file={data.file_principale} />}
      </p>
    )
  }

  const renderPericolo=(data)=>{ 
    return (
      <p>
        {data.pericolo !== undefined && <span>{data.pericolo.descrizione}</span>}
      </p>
    )
  }
  
  return (
    <Table className="gx-table-responsive"
        onRow={(record, rowIndex) => ({
          onClick: (event) => {onClick(record.hash)}, // click row
          onDoubleClick: (event) => {}, // double click row
          onContextMenu: (event) => {}, // right button click row
          onMouseEnter: (event) => onMouseEnter(record.key), // mouse enter row
          onMouseLeave:  onMouseLeave, style: { cursor: hoveringRow === record.key && record.description !== "" ? 'pointer' : 'default' }, // mouse leave row
        })}
        columns={columns}
        // expandedRowRender={record => renderLivello2(record)}
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
  )
}

export default DettaglioListaStatAllerte;