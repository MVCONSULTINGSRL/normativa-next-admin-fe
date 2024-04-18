import React from "react";
import NormativaLink from "./NormativaLink";


function NormativaLinks  (props)  {

  const {links,skip} = props;
  
  if (links !== undefined) {
    return (
      <p>
        {links.map((l)=>l.id !== skip && <div><NormativaLink link={l}/> {l.titolo}</div>)}
      </p>
    )
  }
  return (<p></p>)
}

export default NormativaLinks;

