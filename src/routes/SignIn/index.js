import React, {useEffect} from "react";
import {Button,  Form, Input} from "antd";
import {useDispatch, useSelector} from "react-redux";
import { useHistory} from "react-router-dom";
import { ClientJS } from "clientjs";
import LoadingOverlay from 'react-loading-overlay-ts';

import {ClockLoader} from 'react-spinners'

import {
  hideSpinner,
  userSignIn,
  showSpinner,
} from "../../appRedux/actions";

import IntlMessages from "util/IntlMessages";


const SignIn = (props) => {



  const dispatch = useDispatch();
  const {authUser} = useSelector(({auth}) => auth);
  const spinner = useSelector(({common}) => common.spinner);
  const history = useHistory();

  var clientjs = new ClientJS();
/**
  console.log("fingerpirnt is " ,
  clientjs.getCPU() , "-", 
  clientjs.getDevice(), "-", 
  clientjs.getDeviceType(), "-",
  clientjs.getDeviceVendor(), "-",
  clientjs.getOS(), "-", 
  clientjs.getOSVersion(), "-", 
  )
 */


  useEffect(() => {
    if (authUser !== null) {
      dispatch(hideSpinner("Autenticazione completata"))
      if (props.location.state !== undefined) {
        console.log("original url is [",props.location.state,"]")
        history.push(props.location.state.from.pathname+props.location.state.from.search);
      } else {
        history.push('/home');
      }
    } 
  });

  const onFinish = (values) => {


    // add fingerprint info to login request
    var cpu = clientjs.getCPU()
    var device = clientjs.getDevice()
    var deviceType = clientjs.getDeviceType()
    var deviceVendor = clientjs.getDeviceVendor()
    var os = clientjs.getOS()
    var osVersion = clientjs.getOSVersion() 
    values["fgp"] = clientjs.getCustomFingerprint(cpu,device,deviceType,deviceVendor,os,osVersion) 
  
    // triggering (dispatching) SIGNIN_USER action, obtaining it
    // from its "action creator" function 
    dispatch(showSpinner("Autenticazione in corso"))
    dispatch(userSignIn(values));
  };


  return (
    <div className="gx-main-content-wrapper">
      <div className="gx-app-login-wrap">
        <LoadingOverlay 
    active={spinner.show}
    text={spinner.message}
     spinner={<ClockLoader color={"#2C2557"}/>}
     styles={{
      overlay: (base) => ({
        ...base,
        background: 'rgba(255, 255, 255, 0.6)'
      }),
      content: (base) => ({
        ...base,
        color: "#2C2557",
        position: "absolute",
        top: "10%", /* Positioned at the top of the parent */
        left: "50%", /* Centered horizontally */
        transform: "translateX(-50%)", /* Adjust for any potential margin/padding */
     
      }),
      }}
     >
        <div className="gx-app-login-container">
        <div className="gx-app-login-main-content">
        <div className="gx-app-login-content">
                <h1><IntlMessages id="app.userAuth.signIn"/></h1>
                <Form
                  name="basic"
                  onFinish={onFinish}
                  className="gx-signin-form gx-form-row0">
                  <Form.Item
                    rules={[{required: true, message: 'Please enter your Username!'}]} name="username">
                    <Input placeholder="Nome utente"/>
                  </Form.Item>
                  <Form.Item
                    rules={[{required: true, message: 'Please enter your Password!'}]} name="password">
                    <Input type="password" placeholder="Password"/>
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" className="gx-mb-0" htmlType="submit">
                      Log in
                    </Button>
                  </Form.Item>
                </Form>
            </div>
          </div>
          </div>
          </LoadingOverlay>
        </div>
    </div>
  );
};

export default SignIn;
