import React from "react";
import NormativaFile from "./NormativaFile";


const NormativaFiles = (props) => {

  const {category,files} = props;
  
  if (files !== undefined) {
    return (
      <p>
        {files.map((f)=><NormativaFile category={category} file={f} />)}
      </p>
    )
  }
  return (<p></p>)
}

export default NormativaFiles;

