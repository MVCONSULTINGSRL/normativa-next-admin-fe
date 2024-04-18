import React from "react";

import LoadingOverlay from 'react-loading-overlay-ts';
import {ClockLoader} from 'react-spinners'

import NormativaSearchNewsletter from "./SearchNewsletter";
import NormativaContentNewsletter from "./ContentNewsletter";

import { useSelector} from "react-redux";



function NormativaWrapperNewsletter(props) {


    const spinner = useSelector(({common}) => common.spinner);

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
            <NormativaSearchNewsletter/>
            <NormativaContentNewsletter/>
        </LoadingOverlay>
    )
}

export default NormativaWrapperNewsletter;