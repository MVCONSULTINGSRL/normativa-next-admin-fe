import React, {useState} from "react";

import {Card, Table} from "antd";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

function NormativaList(props) {  

  var columns = props.columns;
  var message = props.message;
  var onFirstLoad = props.onFirstLoad;


  const [lista, setLista] = useState([])
  const [hoveringRow, setHoveringRow] = useState(null);

  const dispatch = useDispatch();
  useEffect(() => {
      dispatch(onFirstLoad);
  }, []);  

  const expiring = useSelector(({usersStore}) => usersStore.expiring);
  useEffect(() => {
    if (expiring !== undefined) {
      console.log("expiring is " + expiring)
      setLista(expiring)
    }
  }, [expiring]);

  const onClick = (hash) => {
  }
  
  const renderLivello2=(data)=>{ 
    return (
      <p>
      {data.licenza !== undefined && <p style={{margin: 0}}>Licenza: <ul><li>{data.licenza}</li></ul></p>}
      </p>
    )
  }

  const onMouseEnter = (key) => {
    setHoveringRow(key);
  };
  const onMouseLeave = () => {
    setHoveringRow(null);
  };

  return (
    <Card title={message}>
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
  )
};
export default NormativaList;
