import React from "react";
import {Tooltip} from "antd";

  // flags from https://github.com/HatScripts/circle-flags/releases

  const NormativaCountry = (props) => {
 
  const {country} = props;
  
  if (country !== undefined) {

    var flagLower = "--"
    if (country.flag !== undefined) {
      flagLower = country.flag.toLowerCase()
    }
    return (
      <Tooltip title={country.countryName}>
        <img height="34px" src={`/assets/flags/${flagLower}.svg`} alt={country.countryName} style={{padding: '2px',}}/>
      </Tooltip>
    )
  }
  return (
    <p></p>
  )
}

export default NormativaCountry;

