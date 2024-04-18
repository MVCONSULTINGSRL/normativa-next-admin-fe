import React from "react";
import {Card, Table} from "antd";
import {useDispatch, useSelector} from "react-redux";
import DonutChart3D from "./DonutChart3D";
import { useEffect, useState } from "react";
import {message} from "antd";

import {
  statisticheRitiriDettaglio,
  hideSpinner
} from "../../../appRedux/actions";

function  SearchResultsRitiri () {

  const [ordineAggregazione, setOrdineAggregazione] = useState(["Categoria","Pericolo","Paese di origine"]);

  const [isShown, setIsShown] = useState({pie:false});

  const [hoveringRow, setHoveringRow] = useState(null);
  const onMouseEnter = (key) => {
    setHoveringRow(key);
  };

  const onMouseLeave = () => {
    setHoveringRow(null);
  };

  const datiStatistiche = useSelector(({statisticheRitiriStore}) => statisticheRitiriStore.datiStatistiche);
  const searchFilters = useSelector(({statisticheRitiriStore}) => statisticheRitiriStore.searchFilters);

  useEffect(() => {
    if (datiStatistiche !== null && datiStatistiche !== undefined) {
      setIsShown({pie:true});
      dispatch(hideSpinner("Generazione statistica richiami completata"))
      if (datiStatistiche.length == 0) {
        message.warning("La ricerca non ha prodotto risultati")
      }
    } else {
      setIsShown({pie:false});
    }
  }, [datiStatistiche]);

  useEffect(() => {
    if (searchFilters !== null && searchFilters !== undefined ) {
      setOrdineAggregazione(searchFilters.ordine_di_aggregazione)
    } else {
      setOrdineAggregazione(["Categoria","Pericolo","Paese di origine"])
    }
  }, [searchFilters]);

  const dispatch = useDispatch();

 // click su elemento sinistro della tabella
 const onClick = (record,singleStat) => {


  if (record.description === "") {
    return
  }

  console.log("clicked on record ", record, "of parent ", singleStat , "with search filters ", searchFilters)

  // reconstructing search filetrs to match the detail search to perform

  // cloning the original search filters
  var detailSearchFilters = { ...searchFilters }

  // update first ordine di aggregazione filter
  // the updating value must be an array
  switch (detailSearchFilters.ordine_di_aggregazione[0]) {
    case "Categoria": {
      detailSearchFilters.categoria=[singleStat.typeId]
      break;
    }
    case "Pericolo": {
      detailSearchFilters.pericolo=[singleStat.typeId]
      break;
    }
    case "Paese di origine": {
      detailSearchFilters.paese_di_origine=[singleStat.typeId]
      break;
    }
    default:{}
  }

  // update second ordine di aggregazione filter
  // the updating value must be an array
  switch (detailSearchFilters.ordine_di_aggregazione[1]) {
    case "Categoria": {
      detailSearchFilters.categoria=[record.typeId]
      break;
    }
    case "Pericolo": {
      detailSearchFilters.pericolo=[record.typeId]
      break;
    }
    case "Paese di origine": {
      detailSearchFilters.paese_di_origine=[record.typeId]
      break;
    }
    default:{}
  }

  console.log("new search filters are", detailSearchFilters)


  // richiedi allo storage o alle api le informazioni di dettaglio per la ricerca selezionata
  // aprile in un nuovo tab

  dispatch(statisticheRitiriDettaglio(detailSearchFilters))

}


  /**
   * definizione delle colonne dela tabella
   * - colonna 1 contiene la chiave relativa al primo ordine di aggregazione
   * - colonna 3 contiene la chiave relativa al secondo ordine di aggregazione
   * - colonna 2 contiene il valore corrispondente all'ordine di aggregazione cui la riga si riferisce 
   *    (se relativo al primo ordine di aggregazione, e' la somma dei valori dei suoi figli)
   */
  const columns = [
    {title: ordineAggregazione[1],dataIndex: 'description',},
    {title: '',dataIndex: 'value',width: '10%',}, 
    {title: ordineAggregazione[2],dataIndex: 'detailDescription',width: '50%',}
  ];
  return (
    <>
    { isShown.pie && datiStatistiche !== null &&  datiStatistiche !== undefined && datiStatistiche.length > 0 && (
      <Card title={"La tua ricerca ha prodotto "+datiStatistiche.length+" risultati"}>
        {(
          datiStatistiche.map((singleStat, index) => (
          <Card title={singleStat.description} key={"lev1"+index}>
            <div className="ant-row">
              <div className="ant-col gx-col-full ant-col-xs-12 ant-col-sm-12 ant-col-md-12 ant-col-lg-12 ant-col-xl-12">
                <Table className="gx-table-responsive" 
                  pagination={false} 
                  columns={columns} 
                  dataSource={singleStat.tabella}
                  rowKey={(record) => record.description+record.detailDescription}
                  onRow={(record, rowIndex) => ({
                      onClick: (event) => {onClick(record,singleStat)}, // click row
                      onDoubleClick: (event) => {}, // double click row
                      onContextMenu: (event) => {}, // right button click row
                      onMouseEnter: (event) => onMouseEnter(record.key), // mouse enter row
                      onMouseLeave:  onMouseLeave,
                      style: { cursor: hoveringRow === record.key && record.description !== "" ? 'pointer' : 'default' }, // mouse leave row
                  })}
                />
              </div>
              <div className="ant-col gx-col-full ant-col-xs-12 ant-col-sm-12 ant-col-md-12 ant-col-lg-12 ant-col-xl-12">
                <DonutChart3D chartTitle={ordineAggregazione[1]} data={singleStat.graficoPie} mykey={"pie"+index}/>
              </div>
            </div>
          </Card>
        )))}
      </Card>
    )}
    </>
  )
}

export default SearchResultsRitiri;