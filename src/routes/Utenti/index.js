import React from "react";

import Generic from "../../containers/NormativaContainers/Generic";
import NormativaList from "../../components/NormativaComponents/List";


function Utenti() {
    //const message = `Hello, ${lista.length}!`; // Placeholder for name
    const message = `Hello`; // Placeholder for name
    return (
        <Generic innerContent={<NormativaList message={message}/>}/>
    );
}

export default Utenti