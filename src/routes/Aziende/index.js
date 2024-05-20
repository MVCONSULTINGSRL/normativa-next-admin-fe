import React from "react";

import Generic from "../../containers/NormativaContainers/Generic";
import NormativaList from "../../components/NormativaComponents/List";


function Aziende() {
    return (
        <Generic innerContent={<NormativaList />}/>
    );
}

export default Aziende