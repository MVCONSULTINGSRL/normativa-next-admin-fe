import React from "react";
import axios from "axios";
import {Button, Tooltip} from "antd";
import {FileOutlined} from "@ant-design/icons"
import {useDispatch} from "react-redux";

import {WITH_CREDENTIALS} from "../../constants/Api";
import {API_SERVER} from "../../constants/Global";

import {showMessage} from "../../appRedux/actions/Common";

const NormativaFile = (props) => {

  const dispatch = useDispatch();

    var {category,file,tooltip} = props;

    if (tooltip === "") {
      tooltip = file.path
    }
    //console.log("NormativaFile categoria =",category," file =",file)
    
    const downloadFile = (category,hash) => {

      //console.log("downloading file --- categoria =",category," hash =",hash)

      axios({
          url: API_SERVER+"/api/v1/files/"+category+"/file?hash="+hash, //your url
          method: 'GET',
          withCredentials: WITH_CREDENTIALS,
          responseType: 'blob', // important
      }).then((response) => {


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
  
  if (file !== undefined ) {
    return (
      <p>
        <Tooltip title={tooltip}>
          <Button icon={<FileOutlined />} onClick={(e) => {e.stopPropagation();downloadFile(category,file.hash);}} />
        </Tooltip>
      </p>
    )
  }
}

export default NormativaFile;

