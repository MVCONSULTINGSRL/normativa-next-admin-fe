import React from "react";
import DettaglioGraficoStatAllerte from "./DettaglioGraficoAllerte";
import DettaglioListaStatAllerte from "./DettaglioListaAllerte";

function  DettaglioStatAllerte (props) {

  const {filters,data, hash} = props;

  return (
    <div>
      <DettaglioGraficoStatAllerte hash={hash} data={data.graficoXy} titleX={filters.ordine_di_aggregazione[2]} titleY={"# Allerte"}/>
      <DettaglioListaStatAllerte hash={hash} data={data.lista}/>
    </div>
  )   

}

export default DettaglioStatAllerte;