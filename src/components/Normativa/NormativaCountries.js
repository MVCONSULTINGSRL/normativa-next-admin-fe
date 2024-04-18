import React from "react";
import NormativaCountry from "./NormativaCountry";


const NormativaCountries = (props) => {

  const {countries} = props;
  
  if (countries !== undefined) {
    return (
      <>
          {countries.map((c)=><NormativaCountry country={c} />)}
      </>
    )
  }
  return (<p></p>)
}

export default NormativaCountries;

