import React from "react";
import XYChart from "./XYChart";


function  DettaglioGraficoStatRitiri (props) {

  const {data,titleX,titleY, hash} = props;

  return (
      <div>  
        <XYChart mykey={hash} data={data} chartTitleX={titleX} chartTitleY={titleY}/>
      </div>
  )   

}

export default DettaglioGraficoStatRitiri;