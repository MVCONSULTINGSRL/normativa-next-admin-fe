import {Tooltip} from "antd";

import {SCRAMBLED_RESPONSE, SCRAMBLING_KEY} from "./Api";

export const unscramblePayloadToJSON = (payload) => {

    if (!SCRAMBLED_RESPONSE) {
        //console.log("Treat response payload as not scrambled. Payload is ",payload)
        return JSON.parse(new TextDecoder().decode(payload))
    }

    //console.log("Unscrambling payload ", payload)
    var unScrambled = new Uint8Array(payload);
    for (var i = 0; i < payload.byteLength; i++) {
        //var org = unScrambled[i]
        unScrambled[i] = unScrambled[i] ^ SCRAMBLING_KEY.charCodeAt(i % SCRAMBLING_KEY.length);
        //console.log("Scrambled = ", org , " Unscrabled = ", unScrambled[i])
    }

    var rawData = new TextDecoder().decode(unScrambled)
    //console.log("raw data are ", rawData)
    var jsonObject = JSON.parse(rawData)
    //console.log("json object is", jsonObject)
    return jsonObject;
}

// look for a target key in an antd tab returns -1 if not found
export const getTargetIndex = (targetKey, tabs) => {
    const idx = tabs.findIndex((pane) => pane.key === targetKey);
    return idx;
}

export const updateStoredPanes = (storedPanes, targetKey) => {
    for (let i = 0; i < storedPanes.length; i++) {
        if (storedPanes[i]['key'] === targetKey) {
            storedPanes.splice(i, 1);
            break
        }
    }
}

export const paneAlreadyStored = (storedPanes, key) => {
    var alreadyStored = false
    for (var storedPane of storedPanes) {
        if (storedPane['key'] === key) {
            alreadyStored = true
            break
        }
    }
    return alreadyStored;
}
export const loadStoredPanes = (panes, storedPanes, Component) => {
    for (var storedPane of storedPanes) {
        panes.push({
            label: <Tooltip title={storedPane['tooltip']}>{storedPane['label']}</Tooltip>,
            children: <Component hash={storedPane['key']}/>,
            key: storedPane['key'],
            closeIcon: false, // !?!?! shouldn't that be true ?
        })
    }
}

export const getLastMonths = (mesiDaSottrarre) => {
    const now = new Date();
    const then = new Date(now.getFullYear(), now.getMonth() - mesiDaSottrarre, now.getDate());

    return [then, now];
}

export const getLastYears = (anniDaSottrarre) => {

    const now = new Date();
    const then = new Date();
    then.setFullYear(now.getFullYear() - anniDaSottrarre);

    return [then, now];
}

export const disabledDate = (date) => {
    // Check if the date is in the future
    return date > new Date();
};

// funzione JavaScript che genera un array di oggetti con due campi: value e
// label. L'array contiene gli ultimi x anni a partire dall'anno corrente
// compreso
export const getAnniRecenti = (numeroAnni) => {
    const annoCorrente = new Date().getFullYear();
    const anni = [];

    for (let i = 0; i < numeroAnni; i++) {
        anni.push({
            value: annoCorrente - i,
            label: `${annoCorrente - i}`
        });
    }

    return anni;
}

export const isDateRangeLessThanDays = (date1, date2, maxDays) => {
    // Check if dates are valid
    if (!date1 instanceof Date || !date2 instanceof Date) {
        //console.log("invalid dates")
        return false
    }

    //console.log("valid dates")

    // Get difference in milliseconds
    const differenceInMs = Math.abs(new Date(date2).getTime() - new Date(date1).getTime());
    var days = differenceInMs / (60 * 60 * 24 * 1000)
    //console.log("difference is ", differenceInMs, " days are " , days)

    // Convert milliseconds to days and compare with maxDays
    return days <= maxDays;
    }
