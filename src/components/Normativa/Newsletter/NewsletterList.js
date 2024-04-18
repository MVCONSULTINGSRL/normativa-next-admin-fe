import React from "react";
import NormativaNewsletterGridRow from "./NewsletterGridRow";

function NormativaNewsletterList(props) {

  var list = props.list;




  if (list !== undefined) {
    console.log("list is " , list)

    return (
      <p>
        {list.periods.map((f,index)=><NormativaNewsletterGridRow 
          periodo={f} 
          norme={list.norme.data[index]} 
          normeActive={list.norme.active} 
          allerte={list.allerte.data[index]} 
          allerteActive={list.allerte.active} 
          sentenze={list.sentenze.data[index]} 
          sentenzeActive={list.sentenze.active} 
          frodi={list.frodi.data[index]} 
          frodiActive={list.frodi.active} 
          ritiri={list.ritiri.data[index]} 
          ritiriActive={list.ritiri.active} 
          normeusa={list.normeusa.data[index]} 
          normeusaActive={list.normeusa.active} 
        />)}
      </p>
    )
  } else {
    return(<p></p>)
  }

}

export default NormativaNewsletterList;

