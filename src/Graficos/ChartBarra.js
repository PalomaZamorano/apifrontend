import React, { Component } from 'react'
import axios from 'axios';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import CircularProgress from '@material-ui/core/CircularProgress';


am4core.useTheme(am4themes_animated);

class ChartBarra extends Component {

    state = {
      results:[],
      ready:false,
      code:0
    }
  
    componentDidMount() {
        axios.get('http://localhost:3000/profsAsign/'+ this.props.id + '/' + this.props.cod + '/' + this.props.agno)
        .then(res => {
            const results = res.data; 
            const code =  this.props.cod; 
            const ready = true;
            this.setState({results, code,ready});

        //Gráfico 

            let chart = am4core.create("chartdiv", am4charts.XYChart);
            const year = new Date().getFullYear()   

            // Add data
            chart.data = [{
            "country": `${year}`,
            "visits":0
            }, {
            "country": `${year-1}`,
            "visits": this.state.results[0].result_prom_general
            }, {
            "country": `${year-2}`,
            "visits": 0
            }];

            // Create axes

            let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
            categoryAxis.dataFields.category = "country";
            categoryAxis.renderer.grid.template.location = 0;
            categoryAxis.renderer.minGridDistance = 30;

            categoryAxis.renderer.labels.template.adapter.add("dy", function(dy, target) {
            if (target.dataItem && target.dataItem.index & 2 == 2) {
                return dy + 25;
            }
            return dy;
            });

            let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

            // Create series
            let series = chart.series.push(new am4charts.ColumnSeries());
            series.dataFields.valueY = "visits";
            series.dataFields.categoryX = "country";
            series.name = "Visits";
            series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
            series.columns.template.fillOpacity = .8;

            let columnTemplate = series.columns.template;
            columnTemplate.strokeWidth = 2;
            columnTemplate.strokeOpacity = 1;    
            this.forceUpdate()

        })   
    }
  
    componentWillUnmount() {
      if (this.chart) {
        this.chart.dispose();
      }
    }

    handleChange(){

        axios.get('http://localhost:3000/profsAsign/'+ this.props.id + '/' + this.props.cod + '/' + this.props.agno)
        .then(res => {
            const results = res.data; 
            const code =  this.props.cod; 
            const ready = true;
            this.setState({results, code, ready});

            //Gráfico 

            let chart = am4core.create("chartdiv", am4charts.XYChart);
            const year = new Date().getFullYear()   

            // Add data
            chart.data = [{
            "country": `${year}`,
            "visits":0
            }, {
            "country": `${year-1}`,
            "visits": this.state.results[0].result_prom_general
            }, {
            "country": `${year-2}`,
            "visits": 0
            }];

            // Create axes

            let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
            categoryAxis.dataFields.category = "country";
            categoryAxis.renderer.grid.template.location = 0;
            categoryAxis.renderer.minGridDistance = 30;

            categoryAxis.renderer.labels.template.adapter.add("dy", function(dy, target) {
            if (target.dataItem && target.dataItem.index & 2 == 2) {
                return dy + 25;
            }
            return dy;
            });

            let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

            // Create series
            let series = chart.series.push(new am4charts.ColumnSeries());
            series.dataFields.valueY = "visits";
            series.dataFields.categoryX = "country";
            series.name = "Visits";
            series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
            series.columns.template.fillOpacity = .8;

            let columnTemplate = series.columns.template;
            columnTemplate.strokeWidth = 2;
            columnTemplate.strokeOpacity = 1;    

        })
        console.log(this.state.results[0])
    }

    componentDidUpdate(prevProps) {

        if (prevProps.cod !== this.props.cod) {
           const ready = false;
            this.setState({ready});
           this.handleChange()
        }
    }
  
    render() {
       
        if(this.state.ready === false ){
    
            return(
              <div> 
                 <CircularProgress size={60} color="secondary" />
                 <br/>
                 <br/>
                 <br/>
                 <br/>
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
  
  export default ChartBarra;