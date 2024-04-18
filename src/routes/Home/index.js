import React from "react";
import {searchNorme, showSpinner} from "../../appRedux/actions";
import {Card} from "antd";
import {useState} from "react";
import {useHistory, Link} from 'react-router-dom'

import {DEFAULT_LAST_YEARS} from "../../constants/Api"
import {getLastYears} from "../../constants/Functions"

import {useDispatch} from "react-redux";


function Home() {



    const dispatch = useDispatch();

    const history = useHistory();


    return (
        <div className="gx-main-content-wrapper">
        </div>
    );
}

export default Home