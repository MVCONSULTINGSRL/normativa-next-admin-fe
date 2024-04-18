import React, {useEffect,useState} from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { useDispatch, useSelector } from "react-redux";
import {searchAllerte,searchFrodi, searchRitiri, getMappa, showSpinner} from "../../appRedux/actions";
import { useHistory } from 'react-router-dom'

import {DEFAULT_LAST_YEARS} from "../../constants/Api"
import {getLastYears} from "../../constants/Functions"

import { useRef } from 'react';

am4core.useTheme(am4themes_animated);
am4core.options.autoDispose = true;

function MappaHome (props) {
  const history = useHistory();

  const dispatch = useDispatch();

  const {id,category,title,colors,subtitle} = props;

  const chart = useRef(null);

  const [datiMappa,setMappa] = useState('');

  const dati = useSelector(({mappeStore}) => mappeStore[category]);

  useEffect(() => {
    //console.log("get mappa for ", category)
    dispatch(getMappa(category));
  }, []);

  useEffect(() => {
    if (dati !== undefined) {
      setMappa(dati.dati)
      //console.log("dati mappa are " ,datiMappa)
    }
  }, [dati]);

  useEffect(() => {
    var x = am4core.create(id, am4maps.MapChart);
    x.geodata = am4geodata_worldLow;
    x.projection = new am4maps.projections.Mercator();

    var t = x.chartContainer.createChild(am4core.Label);
    t.text = title;
    //t.fontSize = 20;
    t.paddingTop = 10;
    t.align = "center";
    t.zIndex = 100;
    t.userClassName = "gx-chart-title gx-font-weight-bold";
    
    var s = x.chartContainer.createChild(am4core.Label);
    s.text = subtitle;
    //s.fontSize = 10;
    s.paddingTop = 10;
    s.paddingRight = 50;
    s.align = "right";
    s.zIndex = 100;
    s.fill = am4core.color("#038fde");

    var polygonSeries = new am4maps.MapPolygonSeries();

    // add heat legend
    var heatLegend = x.chartContainer.createChild(am4maps.HeatLegend);
    heatLegend.valign = "bottom";
    heatLegend.align = "right";
    heatLegend.width = am4core.percent(22);
    heatLegend.height = 5;
    heatLegend.series = polygonSeries;
    heatLegend.orientation = "horizontal";
    heatLegend.padding(20, 20, 10, 20);
    heatLegend.valueAxis.renderer.labels.template.fontSize = 10;
    heatLegend.valueAxis.renderer.minGridDistance = 40;

          
    var polygonTemplate = polygonSeries.mapPolygons.template;
    polygonTemplate.tooltipText = "{name}: {value.value.formatNumber('#')}";
    
    var hs = polygonTemplate.states.create("hover");
    hs.properties.fill = am4core.color("#002447");

    polygonTemplate.events.on("over", event => {
      //console.log("value : [",event.target.dataItem.value,"]")
      if (event.target.dataItem.value !== undefined) {
        heatLegend.valueAxis.showTooltipAt(event.target.dataItem.value);
        if (dati.active) {
          event.target.cursorOverStyle =  am4core.MouseCursorStyle.pointer;
          event.target.applyCursorStyle()
        }
      }    
    });
    
    polygonTemplate.events.on("hit", event => {
      if (dati.active) {
        handleHit(event.target);
      }
    });
    
    polygonTemplate.events.on("out", event => {
      heatLegend.valueAxis.hideTooltip();
      /**
      if (event.target.isHidden) {
        event.target.show();
      }
       */
    });

    //polygonTemplate.cursorOverStyle = am4core.MouseCursorStyle.pointer;
    polygonTemplate.strokeOpacity = 0.4;
    polygonSeries.useGeodata = true;
    polygonSeries.exclude = ["AQ"];
    polygonSeries.data = datiMappa;

    polygonSeries.heatRules.push({
      "property": "fill",
      "target": polygonTemplate,
      "min": am4core.color(colors.min),
      "max": am4core.color(colors.max)
    });

    x.series.push(polygonSeries);

    x.zoomControl = new am4maps.ZoomControl();
    x.zoomControl.valign = "top";
    x.zoomControl.align = "left";
    
    function handleHit(target) {
      if (!isNaN(target.dataItem.value)) {
        //window.alert(target.dataItem);
        var countryList = JSON.parse(localStorage.getItem('countries'))

        var country = countryList.find(({ iso2 }) => iso2 === target.dataItem.dataContext.id);
        if (country !== undefined ) {

          var from = new Date()
          from.setFullYear(from.getFullYear() -1)
          var searchObject = {
            paese_di_origine: [country.value],
            data_pubblicazione: getLastYears(DEFAULT_LAST_YEARS),
          }

          //console.log("-- search object -- ", searchObject)
          
          switch (category) {
            case "allerte" : {
              dispatch(searchAllerte(searchObject));
              dispatch(showSpinner("Ricerca allerte in corso"))
              break
            }
            case "frodi" : {
              dispatch(searchFrodi(searchObject));
              dispatch(showSpinner("Ricerca frodi in corso"))
              break
            }
            case "ritiri" : {
              dispatch(searchRitiri(searchObject));
              dispatch(showSpinner("Ricerca richiami in corso"))
              break
            }
            default : {}
          }

          //x.dispose();
          history.push({
            pathname:"/"+category,
            state: {aVariable:100}
          })
        } else {
          //console.log("country is undefined")
        }
      }
    }

    chart.current = x;

    return () => {
      //am4core.disposeAllCharts()
      //console.log("disposing chart")
     // x.dispose();
    };
  });


  return (
      <div className="App" id={id} style={{ width: "100%", height: "500px" }}></div>
  )
}

export default MappaHome;
