import React, {useEffect} from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

import { useRef } from 'react';

am4core.useTheme(am4themes_animated);
am4core.options.autoDispose = true;

function DonutChart3D (props) {

  const {chartTitle,data,mykey} = props;

  const chart3D = useRef(null);

  function handleHit(target) {
    console.log(target.dataItem.dataContext.typeId);
  }

  useEffect(() => {

    am4core.useTheme(am4themes_animated);
    // Themes end
    
    var chart = am4core.create(mykey, am4charts.PieChart3D);
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in
    
    //chart.legend = new am4charts.Legend();
 
    let title = chart.titles.create();
    title.text = chartTitle;

    chart.data = data;
    
    chart.innerRadius = 50;
    chart.radius=150;
    
    var series = chart.series.push(new am4charts.PieSeries3D());
    series.dataFields.value = "value";
    series.dataFields.category = "description";
    series.colors.step = 2;

    series.slices.template.events.on("hit", event => {
      handleHit(event.target);
    });


    chart3D.current = chart;


    return () => {
    };
  });


  return (
      <div className="App" id={mykey} style={{ width: "100%", height: "500px" }}></div>
  )
}

export default DonutChart3D;
