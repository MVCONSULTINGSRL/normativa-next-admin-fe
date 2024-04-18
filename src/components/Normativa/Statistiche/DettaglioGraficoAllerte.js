import React from "react";
import XYChart from "./XYChart";


function  DettaglioGraficoStatAllerte (props) {

  const {data,titleX,titleY, hash} = props;

  console.log("DettaglioGraficoStatAllerte search ", data)
  console.log("DettaglioGraficoStatAllerte search ", hash)
  
  return (
      <div>  
        <XYChart mykey={hash} data={data} chartTitleX={titleX} chartTitleY={titleY}/>
      </div>
  )   

}

export default DettaglioGraficoStatAllerte;