import React from "react";
import {Popover} from "antd";
import { useSelector} from "react-redux";
import {Link} from "react-router-dom";
import UserProfile from "../../containers/Sidebar/UserProfile";

function UserInfo () {

  const {authUser} = useSelector(({auth}) => auth);

  if (authUser === null || authUser === undefined) {
    return (
      <Link to="/signin">
        <i className="icon icon-widgets"/>
        <span>Login</span>
      </Link>
    )
  }
  else 
  {
    return (
      <Popover overlayClassName="gx-popover-horizantal" placement="bottomRight" content={<UserProfile/>} trigger="click">
        <img height="55px" src={`/assets/images/user-avatar.svg`} alt="avatar" className={'na-user-avatar'}/>
      </Popover>
    )
  }
}
export default UserInfo;