import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { ListGroup } from 'react-bootstrap';
//Componentes Gráfico Amcharts
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
//Select
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import Divider from '@material-ui/core/Divider';



am4core.useTheme(am4themes_animated);

class Estadistica2 extends Component {

    constructor(props){
        super(props);
        this.state={
          resultAsign: [1],
          show: false,
          ready:false,
          ready2:false,
          curso:0,
          proms:0,
          profesors:[],
          useStyles: makeStyles(theme => ({
            paper2: {
                minWidth: '100vw',
                elevation: 24
              },
                paper: {
                    padding: theme.spacing(1),
                    textAlign: 'center',
                    color: theme.palette.text.secondary,
                    whiteSpace: 'nowrap',
                    marginBottom: theme.spacing(1),
             },
             formControl: {
                margin: theme.spacing(1),
                minWidth: 120,
                
              }
          }))
        }
    }       


    componentDidMount() {

        axios.get(`http://localhost:3000/profesors/1487.json`)
        .then(res => {
            const profesors = res.data; 
            const ready = true;  
            console.log(profesors.cursos)
            const proms = Math.round(profesors.prof_proms_results)
            this.handleChange2(profesors.cursos[0].curso_cod)
            this.setState({ ready, profesors, proms });

         

        //Gráfico 

            let chart = am4core.create("chartdiv", am4charts.XYChart);

            // Add data
            chart.data = [{
            "country": "USA",
            "visits": 2025
            }, {
            "country": "China",
            "visits": 1882
            }, {
            "country": "Japan",
            "visits": 1809
            }, {
            "country": "Germany",
            "visits": 1322
            }, {
            "country": "UK",
            "visits": 1122
            }, {
            "country": "France",
            "visits": 1114
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


    } 


    componentWillUnmount() {
        if (this.chart) {
          this.chart.dispose();
        }
      }

    showModal = () => {
        this.setState({ show: true });
      };
    
      hideModal = () => {
        this.setState({ show: false });
      };


    handleChange2 = (cod) =>{
        axios.get('http://localhost:3000/profsAsign/1487/' + cod + '/2019')
        .then(res => {
            const resultAsign = res.data; 
             this.setState({resultAsign});
             console.log(this.state.resultAsign[0].result_prom_general)
            
        })    
    }  

    handleChange(event){
                axios.get('http://localhost:3000/profsAsign/1487/' + this.state.profesors.cursos[event.target.value].curso_cod + '/2019')
                .then(res => {
                    const resultAsign = res.data; 
                    this.setState({ resultAsign });
                    
                })
                this.setState({ curso:event.target.value});
                
          

        
    }
  


    percentage(num, total)
      {
        return (num*100)/total;
      }
           
    
   
  render() {

    const percentage = 100; 
    console.log(this.state.resultAsign[0])

    if(this.state.ready === false ){
    
        return(
          <div>
             <CircularProgress size={90} color="secondary" />
          </div>
  
        )
  
      }
      else{
        
        
    return (
     <div style={{marginTop:60}} >
      <Grid container spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            style={{ minHeight: '100vh', minWidth: '100vw'  }}>

        <Grid item md={12} xs ={6}  style={{width: 850, minHeight: '80vh', minWidth: '80vw'  }} >   
        <Card>

          <form >  
            <FormControl  className={this.state.useStyles.formControl} style={{marginLeft:30  }}>
            <InputLabel htmlFor="curso-native-helper">Curso</InputLabel>
            <NativeSelect
            value={this.state.curso}
            onChange ={this.handleChange.bind(this)}            
            inputProps={{
                name: 'curso',
                id: 'curso-native-helper',
            }}
            >
             { this.state.profesors.cursos.map((curso,index) =>       
                <option key= {curso.id} value={index}>{curso.curso_cod} - {curso.curso_coord} - {curso.curso_secc}</option>
             )}
            </NativeSelect>
             <FormHelperText>  Seleccione el curso del que desea conocer resultados</FormHelperText>
            </FormControl>
           </form> 
            <br/>
            <br/>

            <Divider />
            <br/>

        <div >   
            <CardContent >

                <Grid container spacing={2} >
                {/* Grida 1 */}
                    <Grid item md={3} xs ={3}>
                    <Paper className={this.state.useStyles.paper}>
                        <Typography variant="h6" component="h2">
                            Promedio general encuesta del curso
                        </Typography>
                    <CircularProgressbar
                        style = {{width:5, height:5}}
                        value={percentage}
                        text={`${this.state.resultAsign[0].result_prom_general}`}
                        styles={buildStyles({
                        // Text size
                        textSize: '16px',
                        // Colors
                        pathColor: '#51B4D1',
                        textColor: '#4A797E',
                        trailColor: '#F09A68',
                        backgroundColor: '#F09A68',
                        })}
                    />

                    </Paper>
                    </Grid>
                   {/* Grida 2 */}    
                    <Grid item md={9} xs ={9}>
                    <Paper className={this.state.useStyles.paper2}>
                    <Typography variant="h6" component="h2">
                        Promedio por dimensión del curso
                    </Typography> 
                    <Grid container spacing={3}>
                    <Grid item xs={3}>

                    <CircularProgressbar
                        style = {{width:10, height:10}}
                        value={percentage}
                        text={`${this.state.resultAsign[0].result_prom_general}`}
                        styles={buildStyles({
                        // Text size
                        textSize: '16px',
                        // Colors
                        pathColor: '#EA4D04',
                        textColor: '#BD724F',
                        trailColor: '#F09A68',
                        backgroundColor: '#F09A68',
                        })}
                    />
                    <Typography variant="h6" component="h2">
                            D1
                    </Typography>
                    
                    </Grid>

                    <Grid item xs={3}>
                    
                    <CircularProgressbar
                        style = {{width:10, height:10}}
                        value={percentage}
                        text={`${this.state.resultAsign[0].result_prom_general}`}
                        styles={buildStyles({
                        // Text size
                        textSize: '16px',
                        // Colors
                        pathColor: '#EA4D04',
                        textColor: '#BD724F',
                        trailColor: '#F09A68',
                        backgroundColor: '#F09A68',
                        })}
                    />
                    <Typography variant="h6" component="h2">
                            D2
                    </Typography>
                    </Grid>

                    <Grid item xs={3}>
                    
                    <CircularProgressbar
                        style = {{width:10, height:10}}
                        value={percentage}
                        text={`${this.state.proms}`}
                        styles={buildStyles({
                        // Text size
                        textSize: '16px',
                        // Colors
                        pathColor: '#EA4D04',
                        textColor: '#BD724F',
                        trailColor: '#F09A68',
                        backgroundColor: '#F09A68',
                        })}
                    />
                    <Typography variant="h6" component="h2">
                            D3
                    </Typography>

                    </Grid>

                    <Grid item xs={3}>
                    
                    <CircularProgressbar
                        style = {{width:10, height:10}}
                        value={percentage}
                        text={`${this.state.proms}`}
                        styles={buildStyles({
                        // Text size
                        textSize: '16px',
                        // Colors
                        pathColor: '#EA4D04',
                        textColor: '#BD724F',
                        trailColor: '#F09A68',
                        backgroundColor: '#F09A68',
                        })}
                    />
                    <Typography variant="h6" component="h2">
                            D4
                    </Typography>
                    </Grid>
                    </Grid>
                    </Paper>

                    </Grid>

                 {/* Grida 3 */}       
                    <Grid item md={10} xs ={10}>
                    <Paper className={this.state.useStyles.paper}  style={{marginLeft:90 }}>

                    <Typography variant="h6" component="h2">
                            Gráfico resultados historicos
                    </Typography>    
                    <div id="chartdiv" style={{  height: "300px",width:"100%" }}></div>

                    </Paper>
                    </Grid>

                {/* Grida 4  */  }            
                    <Grid item md={12} xs ={10}>

                    <Paper className={this.state.useStyles.paper2}>
                    <Typography variant="h6" component="h2">
                         Valores del curso
                    </Typography> 
                    <ListGroup horizontal >
                        <ListGroup.Item>
                            <ListGroup variant="flush">
                                <ListGroup.Item>Porcentaje Aprobación</ListGroup.Item>
                                <ListGroup.Item>{`${this.percentage(this.state.profesors.cursos[this.state.curso].curso_aprobados,this.state.profesors.cursos[this.state.curso].curso_inscritos)}%`}</ListGroup.Item>
                            </ListGroup>
                        </ListGroup.Item>
                        <ListGroup.Item>
                        <ListGroup variant="flush">
                            <ListGroup.Item>Porcentaje Reprobación</ListGroup.Item>
                            <ListGroup.Item>{`${this.percentage(this.state.profesors.cursos[this.state.curso].curso_reprobados,this.state.profesors.cursos[this.state.curso].curso_inscritos)}%`}</ListGroup.Item>
                        </ListGroup>
                        </ListGroup.Item>
                    <ListGroup.Item>
                        <ListGroup variant="flush">
                            <ListGroup.Item>Nota promedio curso</ListGroup.Item>
                    <ListGroup.Item>{this.state.profesors.cursos[this.state.curso].curso_promedio}</ListGroup.Item>
                            </ListGroup>
                        </ListGroup.Item>
                    <ListGroup.Item>
                        <ListGroup variant="flush">
                            <ListGroup.Item>Inscritos en el curso</ListGroup.Item>
                            <ListGroup.Item>{this.state.profesors.cursos[this.state.curso].curso_inscritos}</ListGroup.Item>
                        </ListGroup></ListGroup.Item>
                    </ListGroup>
                    </Paper>     

                    </Grid>
                </Grid>
           </CardContent>           
            </div>           
          </Card>
          </Grid>
          </Grid>
        </div>

    )
        }
  }
}

export default Estadistica2;