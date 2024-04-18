import React from "react";
import {useState } from "react";
import {useDispatch} from "react-redux";
import {userSignOut} from "../../appRedux/actions";

function UserProfile () {
  const dispatch = useDispatch();

  const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem("user")));

  const renderPacchettiAggiuntivi=(data)=>{ 
    if(data) {
      return(<>
        <li>Pacchetti aggiuntivi:</li>
        <ul>
          {data.map((m)=><li>{m.nome}</li>)}
        </ul>
        </>)
    } else {
      return(<></>)
    }
  }

  return (
    <div className="gx-flex-row gx-align-items-center gx-mb-4 gx-avatar-row">
        <span className="gx-avatar-name">
          <ul>
            <li>Username: {userInfo.username}</li>
            <li>Nome: {userInfo.nome}</li>
            <li>Cognome: {userInfo.cognome}</li>
            <li>Email: {userInfo.email}</li>
            <li>Az: {userInfo.azienda}</li>
            <li>Licenza: {userInfo.licenza}</li>
            <li>Scadenza: {userInfo.data_scadenza}</li>
            {renderPacchettiAggiuntivi(userInfo.pacchetti_aggiuntivi)}
          </ul>
          <span onClick={() => dispatch(userSignOut())}>Logout</span>
        </span>
    </div>
  )
};

export default UserProfile;
