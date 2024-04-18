import React from "react";
import DettaglioGraficoStatRitiri from "./DettaglioGraficoRitiri";
import DettaglioListaStatRitiri from "./DettaglioListaRitiri";

function  DettaglioStatRitiri (props) {

  const {filters,data, hash} = props;

  return (
    <div>
      <DettaglioGraficoStatRitiri hash={hash} data={data.graficoXy} titleX={filters.ordine_di_aggregazione[2]} titleY={"# Ritiri"}/>
      <DettaglioListaStatRitiri hash={hash} data={data.lista}/>
    </div>
  )   

}

export default DettaglioStatRitiri;