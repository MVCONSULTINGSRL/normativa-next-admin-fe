import React, {useEffect} from "react";
import {Layout} from "antd";
import {Link} from "react-router-dom";

import {message} from "antd";

import {toggleCollapsedSideNav,hideMessage,userSignOut} from "../../appRedux/actions";
import UserInfo from "../../components/UserInfo";

import Auxiliary from "util/Auxiliary";


import {NAV_STYLE_DRAWER, NAV_STYLE_FIXED, NAV_STYLE_MINI_SIDEBAR, TAB_SIZE} from "../../constants/ThemeSetting";
import {useDispatch, useSelector} from "react-redux";

const {Header} = Layout;

function Topbar () {

  const {navStyle} = useSelector(({settings}) => settings);
  const navCollapsed = useSelector(({common}) => common.navCollapsed);
  const width = useSelector(({common}) => common.width);
  const dispatch = useDispatch();

  const aMessage = useSelector(({common}) => common.message);

  useEffect(() => {
    if (aMessage) {
      setTimeout(() => {
        dispatch(hideMessage());
      }, 100);
      dispatch(userSignOut())
    }
  },[aMessage]);

  return (
    <Header>
      {navStyle === NAV_STYLE_DRAWER || ((navStyle === NAV_STYLE_FIXED || navStyle === NAV_STYLE_MINI_SIDEBAR) && width < TAB_SIZE) ?
        <div className="gx-linebar gx-mr-3">
          <i className="gx-icon-btn icon icon-menu"
             onClick={() => {
               dispatch(toggleCollapsedSideNav(!navCollapsed));
             }}
          />
        </div> : null}
      <Link to="/" className="gx-d-block gx-d-lg-none gx-pointer">
        <img alt="" src={("/assets/images/logo_blu.png")}/>
      </Link>

      <ul className="gx-header-notifications gx-ml-auto">

        <Auxiliary>
          <li className="gx-user-nav"><UserInfo/></li>
        </Auxiliary>
      </ul>
      {aMessage ? message.error(aMessage.toString()) : null}
    </Header>
  );
};

export default Topbar;
