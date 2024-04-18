import React from "react";
import {Area, AreaChart, ResponsiveContainer, Tooltip, XAxis} from "recharts";
import {Col, Row} from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Card} from "antd";

import {
  getDatiGrafico,
} from "../../appRedux/actions"

function GraficoHome(props) {

  const [datiGrafico,setDatiGrafico] = useState('');

  const dispatch = useDispatch();

  const {id,category,title,color,type,hoverable, onClick} = props;

  useEffect(() => {
    dispatch(getDatiGrafico(category));
  }, []);

  const dati = useSelector(({graficiStore}) => graficiStore[category]);
  useEffect(() => {
    if (dati !== undefined) {
      setDatiGrafico(dati)
    }
  }, [dati]);

  const absValue = Math.abs(datiGrafico.totale_periodo_attuale-datiGrafico.totale_periodo_precedente)
  const increase = datiGrafico.totale_periodo_attuale >= datiGrafico.totale_periodo_precedente


  var chartStyle = ""
  var iconStyle = ""
  
  switch (type) {
    case "up": {
      iconStyle = "icon-menu-up"
      if (increase) {
        chartStyle = "gx-chart-up"
      } else {
        chartStyle = "gx-chart-down"
      }
      break
    }
    case "down": {
      iconStyle = "icon-menu-down"
      if (increase) {
        chartStyle = "gx-chart-down"
      } else {
        chartStyle = "gx-chart-up"
      }
      break
    }
    case "neutral": {
      chartStyle = ""
      if (increase) {
        iconStyle = "icon-menu-up"
      } else {
        iconStyle = "icon-menu-down"
      }
      break
    }

    default: {

    }

  }

  
  return (

  <Card id={id} hoverable={hoverable} className="gx-card-widget gx-card-full" onClick={onClick}>
      <div className="gx-d-flex gx-px-4 gx-pt-4 gx-pb-2">
        <p className="gx-text-uppercase gx-chart-title gx-font-weight-bold">{title}</p>
        <p className="gx-ml-auto gx-text-primary">{datiGrafico.totale_periodo_attuale} negli ultimi 12 mesi</p>
      </div>
      <Row>
        <Col lg={12} md={12} sm={24} xs={24}>
        <div className="gx-actchart gx-pb-5 gx-pl-4">
            <h2 className={`gx-fs-xxxl gx-font-weight-medium gx-mb-1 ${chartStyle} gx-text-nowrap`}>{absValue}
            <i className={`icon gx-fs-xxl ${iconStyle}`}/>
            </h2>
            <p className="gx-mb-0">Rispetto ai 12 mesi precedenti</p>
          </div>
        </Col>
        <Col lg={12} md={12} sm={24} xs={24}>
          <ResponsiveContainer width="100%" height={80}>
            <AreaChart data={datiGrafico.lista}
                        margin={{top: 0, right: 20, left: 0, bottom: 0}}>
              <Tooltip/>
              <defs>
                <linearGradient id="color1" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="5%" stopColor="#FF55AA" stopOpacity={0.9}/>
                  <stop offset="95%" stopColor="#E81D27" stopOpacity={0.9}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="periodo" hide="true"/>
              <Area dataKey="valore" strokeWidth={0} stackId="2" stroke='#867AE5' fill={color} fillOpacity={1}/>
            </AreaChart>
          </ResponsiveContainer>
        </Col>
      </Row>
    </Card>
  );  
};

export default GraficoHome;