import React from "react";
import axios from "axios";
import {Button, Tooltip} from "antd";
import {useDispatch} from "react-redux";
import {Badge} from 'antd';


import {WITH_CREDENTIALS} from "../../../constants/Api";
import {API_SERVER} from "../../../constants/Global";

import {showMessage, showSpinner, hideSpinner} from "../../../appRedux/actions/Common";

function NormativaNewsletterFile (props)  {

  const dispatch = useDispatch();

  var {category,hash,count,colorBg,active,colorFg} = props;

    if (colorFg === undefined ) {
      colorFg = '#FFFFFF'
    }

    //console.log("NormativaFile categoria =",category," file =",file)
    
    const downloadFile = (category,hash) => {

      //console.log("downloading file --- categoria =",category," hash =",hash)

      dispatch(showSpinner("Produzione newsletter in corso"))

      axios({
          url: API_SERVER+"/api/v1/files/newsletter/"+category+"/?hash="+hash, //your url
          method: 'GET',
          withCredentials: WITH_CREDENTIALS,
          responseType: 'blob', // important
      }).then((response) => {

        dispatch(hideSpinner("Produzione newsletter completata"))

        // IE
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          window.navigator.msSaveOrOpenBlob(response.data, 'filename');
          return;
        }

        // if you want to support Safari & Opera iOS version
        const blob = new Blob([response.data], { type: 'application/pdf' });
        const fileUrl = URL.createObjectURL(blob);
        if (navigator.userAgent.indexOf('Chrome') !== -1 || navigator.userAgent.indexOf('Firefox') !== -1) {
           const w = window.open(fileUrl, '_blank');
           w && w.focus();
         } else {
           // Safari & Opera iOS
           window.location.href = fileUrl;
         }
      })
      .catch (error => {
        switch (error.response.status) {
          case 404:
            dispatch(showMessage("file non trovato"));
            return
          case 401:
            dispatch(showMessage("sessione scaduta"));
            return
          default :
            dispatch(showMessage("internal server error"));
            return
        }
      });
    }
  
    return (
      <>
        { active &&
          <Button style={{border:'none'}} ghost="true" onClick={(e) => {e.stopPropagation();downloadFile(category,hash);}}>
          <Badge count={count} size={'small'} color={colorBg} style={{color: colorFg}}>
          <img height="50px" src={`/assets/icone/download-newsletter.svg`} alt="download" style={{padding: '2px',}}/>
          </Badge>
          </Button>
        }
        { !active &&
        <Tooltip title="Funzionalita' non prevista nella tua licenza">
          <Button disabled={true} style={{border:'none'}} ghost="true">
          <Badge count={count} size={'small'} color={colorBg} style={{color: colorFg}}>
          <img height="50px" src={`/assets/icone/download-newsletter.svg`} alt="download" style={{padding: '2px',}}/>
          </Badge>
          </Button>
        </Tooltip>
        }
      </>
    )
}

export default NormativaNewsletterFile;