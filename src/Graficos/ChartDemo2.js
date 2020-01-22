import React, { Component } from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';


am4core.useTheme(am4themes_animated);
let chartReg = {};

class ChartDemo extends Component {

  state = {
    dimensiones: [],
    charge: false
  }

  componentDidMount() {
   // console.log(this.props.profesors)
    axios.get('http://localhost:3000/profesors/'+ this.props.profesors.id +'.json')
    .then(res => {
      const dimensiones = res.data;
      this.setState({ dimensiones });
    //  console.log(this.state.dimensiones)
      // Create chart instance
      let chart = this.createChart("chartdiv", am4charts.XYChart)
    //  let chart = am4core.create("chartdiv", am4charts.XYChart);
      chart.scrollbarX = new am4core.Scrollbar();
 
     // Add data
    chart.data = [{
    "dimension": "D1",
    "promedio":this.props.profesors.prof_proms_d1,
    "dis": "Planificación de actividades docentes"
    }, {
    "dimension": "D2",
    "promedio":this.props.profesors.prof_proms_d2,
    "dis": "Ejecución de actividades docentes"
    }, {
    "dimension": "D3",
    "promedio": this.props.profesors.prof_proms_d3,
    "dis": "Evaluación de aprendizajes"
    }, {
    "dimension": "D4",
    "promedio": this.props.profesors.prof_proms_d4,
    "dis": "Relación con los estudiantes"
    }];

    // Create axes
    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "dimension";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 30;
    categoryAxis.renderer.labels.template.horizontalCenter = "right";
    categoryAxis.renderer.labels.template.verticalCenter = "middle";
    categoryAxis.renderer.labels.template.rotation = 270;
    categoryAxis.tooltip.disabled = true;
    categoryAxis.renderer.minHeight = 50;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.minWidth = 50;

    // Create series
    let series = chart.series.push(new am4charts.ColumnSeries());
    series.sequencedInterpolation = true;
    series.dataFields.valueY = "promedio";
    series.dataFields.categoryX = "dimension";
    series.tooltipText = "{dis} :[{categoryX}: bold]{valueY}[/]";
    series.columns.template.strokeWidth = 0;

    series.tooltip.pointerOrientation = "vertical";

    series.columns.template.column.cornerRadiusTopLeft = 10;
    series.columns.template.column.cornerRadiusTopRight = 10;
    series.columns.template.column.fillOpacity = 0.8;

    // on hover, make corner radiuses bigger
    let hoverState = series.columns.template.column.states.create("hover");
    hoverState.properties.cornerRadiusTopLeft = 0;
    hoverState.properties.cornerRadiusTopRight = 0;
    hoverState.properties.fillOpacity = 1;

    series.columns.template.adapter.add("fill", function(fill, target) {
      return chart.colors.getIndex(target.dataItem.index);
    });

    // Cursor
    chart.cursor = new am4charts.XYCursor();
    }).catch(error => {
      //console.log(error.response)
    })
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }

  createChart(chartdiv, charttype) {
    // Check if the chart instance exists
     this.maybeDisposeChart(chartdiv);  
    // Create new chart
     chartReg[chartdiv] = am4core.create(chartdiv, charttype);
     return chartReg[chartdiv];
  }

  maybeDisposeChart(chartdiv) {
    if (chartReg[chartdiv]) {
      chartReg[chartdiv].dispose();
      delete chartReg[chartdiv];
    }
  }

  render() {
    
    if(this.state.dimensiones.length === 0){
    
      return(
        <div>
           <CircularProgress color="secondary" />
        </div>

      )

    }
    else{
    return (
      <div id="chartdiv" style={{  height: "300px",width:"100%" }}></div>
    );
    }
  }
}

export default ChartDemo;