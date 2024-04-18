import React, {useEffect} from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

import { useRef } from 'react';

am4core.useTheme(am4themes_animated);
am4core.options.autoDispose = true;

function XYChart (props) {

  const {chartTitleX,chartTitleY,data,mykey} = props;

  const chartXY = useRef(null);


  useEffect(() => {

    console.log("series title ", chartTitleY, " key " , mykey)
    am4core.useTheme(am4themes_animated);
    // Themes end
    
    var chart = am4core.create(mykey, am4charts.XYChart);

    //chart.hiddenState.properties.opacity = 0; // this creates initial fade-in
    
        // Add data
    chart.data = data

    // Create axes
    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "description";
    categoryAxis.title.text = chartTitleX;
    categoryAxis.renderer.labels.template.rotation = 315;
    categoryAxis.renderer.labels.template.fontSize = 15;
    categoryAxis.renderer.minGridDistance = 10;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.title.text = chartTitleY;    
    valueAxis.maxPrecision = 0;

    // Create series
    var series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueY = "value";
    series.dataFields.categoryX = "description";
    //series.name = chartTitleY;
    series.columns.template.tooltipText = "{categoryX}: {valueY}";
    //series.columns.template.fill = am4core.color("#00ff00"); // fill

    // as by default columns of the same series are of the same color, we add adapter which takes colors from chart.colors color set
    series.columns.template.adapter.add("fill", function(fill, target){
      return chart.colors.getIndex(target.dataItem.index);
    });

    categoryAxis.sortBySeries = series;

    chartXY.current = chart;


    return () => {
    };
  });


  return (
      <div className="App" id={mykey} style={{ width: "100%", height: "400px" }}></div>
  )
}

export default XYChart;
