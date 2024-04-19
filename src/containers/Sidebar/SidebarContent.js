import React from "react";
import {Menu} from "antd";
import {Link} from "react-router-dom";
import {AppstoreFilled} from '@ant-design/icons';

import { Tooltip } from 'antd';

import CustomScrollbars from "util/CustomScrollbars";
import SidebarLogo from "./SidebarLogo";
import {
  THEME_TYPE_LITE
} from "../../constants/ThemeSetting";
import {useSelector} from "react-redux";

const { SubMenu } = Menu;

const MenuConfig = [
];

const MenuAdmin = [
  {
    label: 'Home',
    link: '/home',
    id: 'home',
    disabled: false,
    link_type: 'internal',
    link_target: '',
  },
  {
    label: 'Anagrafiche',
    link: '/welcome',
    id: 'anagrafiche',
    disabled: false,
    link_type: 'internal',
    link_target: '',
    children : [
      {
        label: 'Licenze',
        link: '/licenze',
        id: 'licenze',
        disabled: false,
        link_type: 'internal',
        link_target: '',
      },
      {
        label: 'Categorie',
        link: '/categorie',
        id: 'categorie',
        disabled: false,
        link_type: 'internal',
        link_target: '',
      },
      {
        label: 'Pericoli',
        link: '/pericoli',
        id: 'pericoli',
        disabled: false,
        link_type: 'internal',
        link_target: '',
      },
    ],
  },
  {
    label: 'Utenze',
    link: '/welcome',
    id: 'utenze',
    disabled: false,
    link_type: 'internal',
    link_target: '',
    children : [
      {
        label: 'Aziende',
        link: '/aziende',
        id: 'aziende',
        disabled: false,
        link_type: 'internal',
        link_target: '',
      },
      {
        label: 'Utenti',
        link: '/utenti',
        id: 'utenti',
        disabled: false,
        link_type: 'internal',
        link_target: '',
      },
    ],
  },
  {
    label: 'Norme',
    link: '/norme',
    id: 'norme',
    disabled: false,
    link_type: 'internal',
    link_target: '',
    children : [
      {
        label: 'Pubblicate',
        link: '/norme-pubblicate',
        id: 'norme-pubblicate',
        disabled: false,
        link_type: 'internal',
        link_target: '',
      },
      {
        label: 'Pending',
        link: '/norme-pending',
        id: 'norme-pending',
        disabled: false,
        link_type: 'internal',
        link_target: '',
      },
      {
        label: 'Importazione',
        link: '/norme-import',
        id: 'norme-import',
        disabled: false,
        link_type: 'internal',
        link_target: '',
      },
    ],
  },
  {
    label: 'Allerte',
    link: '/allerte',
    id: 'allerte',
    disabled: false,
    link_type: 'internal',
    link_target: '',
    children : [
      {
        label: 'Pubblicate',
        link: '/norme-pubblicate',
        id: 'norme-pubblicate',
        disabled: false,
        link_type: 'internal',
        link_target: '',
      },
      {
        label: 'Pending',
        link: '/norme-pending',
        id: 'norme-pending',
        disabled: false,
        link_type: 'internal',
        link_target: '',
      },
      {
        label: 'Importazione',
        link: '/norme-import',
        id: 'norme-import',
        disabled: false,
        link_type: 'internal',
        link_target: '',
      },
    ],
  },
  {
    label: 'Sentenze',
    link: '/sentenze',
    id: 'sentenze',
    disabled: false,
    link_type: 'internal',
    link_target: '',
    children : [
      {
        label: 'Pubblicate',
        link: '/norme-pubblicate',
        id: 'norme-pubblicate',
        disabled: false,
        link_type: 'internal',
        link_target: '',
      },
      {
        label: 'Pending',
        link: '/norme-pending',
        id: 'norme-pending',
        disabled: false,
        link_type: 'internal',
        link_target: '',
      },
      {
        label: 'Importazione',
        link: '/norme-import',
        id: 'norme-import',
        disabled: false,
        link_type: 'internal',
        link_target: '',
      },
    ],
  },
  {
    label: 'Ritiri e Richiami',
    link: '/ritiri',
    id: 'ritiri',
    disabled: false,
    link_type: 'internal',
    link_target: '',
    children : [
      {
        label: 'Pubblicate',
        link: '/norme-pubblicate',
        id: 'norme-pubblicate',
        disabled: false,
        link_type: 'internal',
        link_target: '',
      },
      {
        label: 'Pending',
        link: '/norme-pending',
        id: 'norme-pending',
        disabled: false,
        link_type: 'internal',
        link_target: '',
      },
      {
        label: 'Importazione',
        link: '/norme-import',
        id: 'norme-import',
        disabled: false,
        link_type: 'internal',
        link_target: '',
      },
    ],
  },
  {
    label: 'Frodi',
    link: '/frodi',
    id: 'frodi',
    disabled: false,
    link_type: 'internal',
    link_target: '',
    children : [
      {
        label: 'Pubblicate',
        link: '/norme-pubblicate',
        id: 'norme-pubblicate',
        disabled: false,
        link_type: 'internal',
        link_target: '',
      },
      {
        label: 'Pending',
        link: '/norme-pending',
        id: 'norme-pending',
        disabled: false,
        link_type: 'internal',
        link_target: '',
      },
      {
        label: 'Importazione',
        link: '/norme-import',
        id: 'norme-import',
        disabled: false,
        link_type: 'internal',
        link_target: '',
      },
    ],
  },
  {
    label: 'USA',
    link: '/usa',
    id: 'usa',
    disabled: false,
    link_type: 'internal',
    link_target: '',
    children : [
      {
        label: 'Pubblicate',
        link: '/norme-pubblicate',
        id: 'norme-pubblicate',
        disabled: false,
        link_type: 'internal',
        link_target: '',
      },
      {
        label: 'Pending',
        link: '/norme-pending',
        id: 'norme-pending',
        disabled: false,
        link_type: 'internal',
        link_target: '',
      },
      {
        label: 'Importazione',
        link: '/norme-import',
        id: 'norme-import',
        disabled: false,
        link_type: 'internal',
        link_target: '',
      },
    ],
  },
];

const renderMenu=(data)=>{
  return data.map((item)=>{
      if(item.children){
          return(
              // submenus are always enabled
              <SubMenu title={item.label} key={item.id} icon={<AppstoreFilled className="icon icon-widgets"/>}>
                  {renderMenu(item.children)}
              </SubMenu>
          )
      }
      if (item.disabled) {
        return (
            <Menu.Item key={item.id} icon={<AppstoreFilled className="icon icon-widgets"/>}>
                  <Tooltip placement="top" title={item.message}>
                  <span class="ant-menu-horizontal-custom-disabled">{item.label}</span>
                  </Tooltip>
            </Menu.Item>
        )
      }
      // react-router-dom <Link> is not capable to handle external links directly 
      // we must use a workaround here passing the external link through a "pathname" field of an object  
      // possible types are [external|internal]
      if (item.link_type === 'external') {
        return (
          <Menu.Item key={item.id} icon={<AppstoreFilled className="icon icon-widgets"/>}>
              <Link to={{pathname: item.link}} target={item.link_target}>
                <span>{item.label}</span>
              </Link>
          </Menu.Item>
        )
      } else {
        return (
          <Menu.Item key={item.id} icon={<AppstoreFilled className="icon icon-widgets"/>}>
              <Link to={item.link}  target={item.link_target}>
                <span>{item.label}</span>
              </Link>
          </Menu.Item>
        )
      }
  })
}


const SidebarContent = ({sidebarCollapsed, setSidebarCollapsed}) => {
  const {themeType} = useSelector(({settings}) => settings);
  const pathname = useSelector(({common}) => common.pathname);

  /**
  const getNoHeaderClass = (navStyle) => {
    if (navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR || navStyle === NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR) {
      return "gx-no-header-notifications";
    }
    return "";
  };
   */

  const selectedKeys = pathname.substr(1);
  const defaultOpenKeys = selectedKeys.split('/')[1];

  const {authUser} = useSelector(({auth}) => auth);

  if (authUser === null ) {
    
    localStorage.clear();
    const menuTreeNode = renderMenu(MenuConfig);
    return (
      <>
        <SidebarLogo sidebarCollapsed={sidebarCollapsed} setSidebarCollapsed={setSidebarCollapsed}/>
        <div className="gx-sidebar-content">
  
          <CustomScrollbars className="gx-layout-sider-scrollbar">
            <Menu
              defaultOpenKeys={[defaultOpenKeys]}
              selectedKeys={[selectedKeys]}
              theme={themeType === THEME_TYPE_LITE ? 'lite' : 'dark'}
              mode="inline" >
                {menuTreeNode}
            </Menu>
          </CustomScrollbars>
        </div>
      </>
    );
  } else {
    const menuTreeNode = renderMenu(MenuAdmin);
    return (
      <>
        <SidebarLogo sidebarCollapsed={sidebarCollapsed} setSidebarCollapsed={setSidebarCollapsed}/>
        <div className="gx-sidebar-content">
  
          <CustomScrollbars className="gx-layout-sider-scrollbar">
          <Menu
              defaultOpenKeys={[defaultOpenKeys]}
              selectedKeys={[selectedKeys]}
              theme={themeType === THEME_TYPE_LITE ? 'lite' : 'dark'}
              mode="inline" >
                {menuTreeNode }
            </Menu>
          </CustomScrollbars>
        </div>
      </>
    );
  }
};

export default React.memo(SidebarContent);

