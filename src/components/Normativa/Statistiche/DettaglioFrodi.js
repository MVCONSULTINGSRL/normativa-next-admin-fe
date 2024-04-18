import React from "react";
import DettaglioGraficoStatFrodi from "./DettaglioGraficoFrodi";
import DettaglioListaStatFrodi from "./DettaglioListaFrodi";

function  DettaglioStatFrodi (props) {

  const {filters,data, hash} = props;

  return (
    <div>
      <DettaglioGraficoStatFrodi hash={hash} data={data.graficoXy} titleX={filters.ordine_di_aggregazione[2]} titleY={"# Frodi"}/>
      <DettaglioListaStatFrodi hash={hash} data={data.lista}/>
    </div>
  )   

}

export default DettaglioStatFrodi;