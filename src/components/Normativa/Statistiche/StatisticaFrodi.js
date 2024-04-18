import React from "react";
import LoadingOverlay from 'react-loading-overlay-ts';

import {ClockLoader} from 'react-spinners'
import { useSelector} from "react-redux";
import { useEffect } from "react";
import SearchFormFrodi from "./SearchFormFrodi";
import SearchResultsFrodi from "./SearchResultsFrodi";

function  StatisticaFrodi () {


  //const [isShown, setIsShown] = useState({pie:false});

  const datiStatistiche = useSelector(({statisticheFrodiStore}) => statisticheFrodiStore.datiStatistiche);
  const spinner = useSelector(({common}) => common.spinner);
 
  useEffect(() => {
    //console.log("---- STATISTICA - dati statistche updated")
    if (datiStatistiche !== null) {
      //console.log("---- STATISTICA - dati statistche is ", datiStatistiche)
    }
  }, [datiStatistiche]);

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
      <SearchFormFrodi />
      <SearchResultsFrodi />
    </LoadingOverlay>
  )   

}

export default StatisticaFrodi;