import React, {Component} from "react";
import Nprogress from "nprogress";
import ReactPlaceholder from "react-placeholder";
import "nprogress/nprogress.css";

import "react-placeholder/lib/reactPlaceholder.css";

import LoadingOverlay from 'react-loading-overlay-ts';
import {ClockLoader} from 'react-spinners'


export default function asyncComponent(importComponent) {
  class AsyncFunc extends Component {
    constructor(props) {
      super(props);
      this.state = {
        component: null
      };
    }

    UNSAFE_componentWillMount() {
      Nprogress.start();
    }

    componentWillUnmount() {
      this.mounted = false;
    }

    async componentDidMount() {
      this.mounted = true;
      const {default: Component} = await importComponent();
      Nprogress.done();
      if (this.mounted) {
        this.setState({
          component: <Component {...this.props} />
        });
      }
    }

    render() {
      const Component = this.state.component || 
      <div className="loader">
      <LoadingOverlay 
      active="true"
      text="caricamento applicazione"
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
          top: "50%", /* Positioned at the top of the parent */
          left: "50%", /* Centered horizontally */
          transform: "translateX(-50%)", /* Adjust for any potential margin/padding */
       
        }),
        }}
       />
      </div>

      return (
        <ReactPlaceholder type="text" rows={7} ready={Component !== null}>
          {Component}
        </ReactPlaceholder>
      );
    }
  }

  return AsyncFunc;
}
