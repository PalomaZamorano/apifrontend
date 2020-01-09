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
//Select
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import Divider from '@material-ui/core/Divider';
import ChartBarra from '../Graficos/ChartBarra'
//Dialog
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
//import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

import { Table } from 'react-bootstrap';
import Tooltip from '@material-ui/core/Tooltip';




class Estadistica2 extends Component {

    constructor(props){
        super(props);
        this.state={
          id:0,
          cod:0,
          agno:0,
          show:false,
          resultAsign: [1],
          preguntas2:[],
          pregtext:["Asistí regularmente a las clases presenciales",
          "Desarrollé oportunamente las distintas actividades planificadas para la asignatura (estudio, lecturas, trabajos y/o ejercicios).",
          "Participé activamente en el desarrollo de las clases realizando preguntas, comentarios y/o sugerencias.",
          "Considerando la carga de trabajo en clases y fuera de clases, ¿Cuánto tiempo dedicó semanalmente en promedio a esta asignatura?",
          "Da a conocer a los/las estudiantes la planificación de sus actividades docentes (clases, talleres, evaluaciones, salidas a terreno, etc.) al inicio del curso.",
          "Organiza las actividades docentes en forma coherente con los objetivos establecidos.",
          "Cumple con el programa según lo planificado, justificando aquellos contenidos que no fueron cubiertos (en caso de que así ocurra).",
          "Entrega documentos (apuntes, guías, artículos, otros) que complementan el desarrollo de las actividades educativas.",
          "Utiliza recursos tecnológicos (presentaciones, internet, etc.) y/o materiales (equipamiento, laboratorios, etc.) que facilitan la comprensión de los contenidos.",
          "Utiliza los recursos bibliográficos definidos en el programa, como referentes para el desarrollo de las clases.",
          "Sugiere recursos bibliográficos complementarios para el desarrollo de los contenidos.",
          "Fomenta la participación de los/las estudiantes en clases (mediante preguntas, debates, ejemplos u otros).",
          "Comunica los contenidos de forma clara.",
          "Contextualiza los contenidos del curso al desempeño profesional futuro de los estudiantes.",
          "Utiliza distintas estrategias de enseñanza para facilitar el logro de los aprendizajes.",
          "Utiliza el horario de clase eficientemente, optimizando el tiempo disponible.",
          "Realiza actividades que le permiten conocer los aprendizajes previos de sus estudiantes al inicio de la asignatura (ya sea de manera escrita, oral, presencial u online). \t",
          "Explica a los/las estudiantes con anterioridad, los criterios de evaluación definidos para cada instancia (pruebas, trabajos, disertaciones, etc.).",
          "Entrega el resultado de las evaluaciones dentro de los 15 días establecidos por reglamento.",
          "Aplica pautas de corrección claras para la revisión de las evaluaciones. ",
          "Retroalimenta las evaluaciones de los/las alumnos(as), permitiéndoles reconocer sus posibles errores.",
          "Utiliza procedimientos evaluativos (pruebas, trabajos, disertaciones, etc.) coherentes con los objetivos del curso.",
          "Favorece un clima de respeto en la relación con sus estudiantes.",
          "Establece una relación cordial con sus estudiantes.",
          "Es accesible para atender las consultas de los/las estudiantes (vía correo electrónico, horario de oficina, entre otros)." ],
          dimensiones:[1 ,1,1, 1,1, 1,1,2,2,2, 2,2, 2, 2,2,2,3,3,3,3, 3,3,4,4,4],
          preguntas:null,
          ready:false,
          ready2:false,
          curso:0,
          asignaturas:[],
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
        axios.get('http://localhost:3000/profesors/' + this.props.id + '.json')
        .then(res => {
            const profesors = res.data; 
            const ready = true;  
            const proms = Math.round(profesors.prof_proms_results)

            profesors.cursos.map(curso =>{
                 profesors.resultado_encuestum.some(res =>{
                    if(curso.curso_cod === res.result_asign){
                        this.state.asignaturas.push(res.result_nombre)
                        return res.result_nombre
                    }
                 }

                 )
                }
            )
            
           console.log(this.state.asignaturas)    

            this.handleChange2(profesors.cursos[0].curso_cod,profesors.cursos[0].curso_agno,
                profesors.cursos[0].curso_aprobados,profesors.cursos[0].curso_reprobados,profesors.cursos[0].curso_promedio )
            this.setState({ ready, profesors, proms });
        })   
    } 


   

    detalle(){
        axios.get('http://localhost:3000/pregResult/' + this.state.profesors.cursos[this.state.curso].curso_cod + '/' + this.state.profesors.cursos[this.state.curso].curso_coord  
        + '/' + this.state.profesors.cursos[this.state.curso].curso_secc + '/' + this.state.profesors.cursos[this.state.curso].curso_agno + '/'
         + this.state.profesors.cursos[this.state.curso].curso_sem + '.json')
        .then(res => {
            const preguntas = res.data; 
            const preguntas2 = []
            //console.log(preguntas);
            if(preguntas.length >= 25){
                preguntas.map((pregunta,index) =>{
                   if (pregunta.preg_profs === this.state.profesors.cursos[this.state.curso].curso_profesores ){
                    preguntas2.push(pregunta)
                   } 

                })

            }
           // console.log(preguntas2)
            this.setState({ preguntas, preguntas2 });
        })
    }

    showModal = () => {
        this.detalle()
        this.setState({ show: true });
      };
    
    hideModal = () => {
        this.setState({ show: false });
    };


    handleChange2 = (cod,agno, apro, repro, prom) =>{
        axios.get('http://localhost:3000/profsAsign/'  + this.props.id + '/' + cod + '/' + agno)
        .then(res => {
            const resultAsign = res.data;
             this.setState({resultAsign});
            // console.log(this.state.resultAsign[0].result_prom_general)
            
        })    
    }  

    handleChange(event){
                axios.get('http://localhost:3000/profsAsign/' +  this.props.id +'/' + this.state.profesors.cursos[event.target.value].curso_cod + '/' + this.state.profesors.cursos[event.target.value].curso_agno)
                .then(res => {
                    const resultAsign = res.data; 
                    this.setState({resultAsign});
                    
                })
                this.setState({ curso:event.target.value});
        
    }
  


    percentage(num, total)
      {
        return Math.round((num*100)/total);
      }
           
    
   
  render() {

    const percentage = 100; 

    if(this.state.ready === false ){
    
        return(
          <div>
             <CircularProgress size={90} color="secondary" />
          </div>
  
        )
  
      }
    else{
            
        return (
        <div >
        <Grid container spacing={0}
                style={{minHeight: '80vh', minWidth: '80vw'  }}>

            <Grid item md={12} xs ={6}  style={{width: 850, minHeight: '80vh', minWidth: '80vw'  }} >   
            <Card>
            <br/>
            <form >  
                <FormControl  className={this.state.useStyles.formControl} style={{marginLeft:30  }}>
                <InputLabel htmlFor="curso-native-helper">Curso</InputLabel>
                <NativeSelect
                style={{width: 400 }}
                value={this.state.curso}
                onChange ={this.handleChange.bind(this)}            
                inputProps={{
                    name: 'curso',
                    id: 'curso-native-helper',
                }}
                >
                { this.state.profesors.cursos.map((curso,index) =>       
                    <option key= {curso.id} value={index}>  {this.state.asignaturas[index]} - {curso.curso_coord} - {curso.curso_secc}</option>
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
                    
                {this.state.resultAsign[0].result_prom_general ?  
                <Typography variant="h4" component="h2">
                {this.state.resultAsign[0].result_nombre}
                </Typography>
                : <div></div>}    
                <br/>
                <br/>   
                    <Grid container spacing={2} >
                    {/* Grida 1 */}
                
                    {this.state.resultAsign[0].result_prom_general ?  
                    
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
                    : <div> <CircularProgress size={30} color="secondary" /> </div> }
                            
                            
                    {/* Grida 2 */}   

                    {this.state.resultAsign[0].result_promg1n ?    

                        <Grid item md={9} xs ={9}>
                        <Paper className={this.state.useStyles.paper2}>
                        <Typography variant="h6" component="h2">
                            Promedio por dimensión del curso  
                        </Typography> 
                      
                        <Tooltip title="Ver detalles de la encuesta" placement="top" style ={{fontSize: 20}}> 
                        <Button variant="outlined" size="small"  onClick={this.showModal}  >
                                    Ver detalle
                        </Button> 
                        </Tooltip>
                        <br/>
                        <Grid container spacing={3}>
                        <Grid item xs={3}>

                        <CircularProgressbar
                            style = {{width:10, height:10}}
                            value={percentage}
                            text={`${this.state.resultAsign[0].result_promg1n}`}
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
                            text={`${this.state.resultAsign[0].result_promg2n}`}
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
                            text={`${this.state.resultAsign[0].result_promg3n}`}
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
                            text={`${this.state.resultAsign[0].result_promg4n}`}
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
                    
                    : <div>
                        <CircularProgress size={30} color="secondary" />
                    </div> }

                   {/* Modal para mostrar detalles preguntas  */}         

                  
                    <Dialog
                        open={this.state.show}
                        onClose={this.hideModal}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        >
                        <DialogTitle id="alert-dialog-title">{"Resultado de la encuesta en detalle: " + this.state.profesors.cursos[this.state.curso].curso_coord + this.state.profesors.cursos[this.state.curso].curso_secc} </DialogTitle>
                        <DialogContent>   
                        {this.state.preguntas ?

                              
                          <Table striped hover bordered size="sm"  style={{  height: "100% " ,width: "100% "}}>
                                <thead> 
                                <tr>
                                <th style={{ fontSize:18 }} >#</th>
                                <th  style={{ fontSize:18 }} >Pregunta</th>
                                <th  style={{ fontSize:18 }} >Dimensión</th>
                                <th style={{ fontSize:18 }} >Nota min.</th>
                                <th style={{ fontSize:18 }} >Nota max.</th>
                                <th style={{ fontSize:18 }} >Promedio</th>
                                </tr>
                                </thead>

                                { this.state.preguntas2.map((pregunta,index) =>   
                                <tbody  key={index}>
                                <tr>
                                <td style={{ fontSize:15 }}>{index+1}</td>
                                <td  style={{ fontSize:15 }} >{this.state.pregtext[index]}</td>
                                <td  style={{ fontSize:15 }} >{this.state.dimensiones[index]}</td>
                                <td style={{ fontSize:15 }} >{pregunta.preg_min}</td>
                                <td style={{ fontSize:15 }} >{pregunta.preg_max}</td>
                                <td style={{ fontSize:15 }} >{ (pregunta.preg_prom*1).toFixed(2)}</td>
                                
                                </tr>
                                </tbody>)}

                            </Table>
                                                         
                            
                        : 
                        <div style={{marginLeft:120}}>
                        <CircularProgress size={30} color="secondary" />
                        </div>
                     } 
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={this.hideModal} color="primary">
                            Cerrar
                        </Button>
                        </DialogActions>
                    </Dialog> 
                    

                    { /* Grida 3 */}    

                   
                        <Grid item md={10} xs ={10}>
                        <Paper className={this.state.useStyles.paper}  style={{marginLeft:90 }}>
                        <Typography variant="h6" component="h2">
                                Gráfico resultados historicos
                        </Typography>    

                        <ChartBarra 
                         curso =  {this.state.curso}
                         id = {this.state.profesors.id}
                         cod = {this.state.profesors.cursos[this.state.curso].curso_cod}
                         agno = {this.state.profesors.cursos[this.state.curso].curso_agno} />

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
                                    <ListGroup.Item>{`${this.percentage(this.state.profesors.cursos[this.state.curso].curso_aprobados,this.state.profesors.cursos[this.state.curso].curso_aprobados + this.state.profesors.cursos[this.state.curso].curso_reprobados)}%`}</ListGroup.Item>
                                </ListGroup>
                            </ListGroup.Item>
                            <ListGroup.Item>
                            <ListGroup variant="flush">
                                <ListGroup.Item>Porcentaje Reprobación</ListGroup.Item>
                                <ListGroup.Item>{`${this.percentage(this.state.profesors.cursos[this.state.curso].curso_reprobados,this.state.profesors.cursos[this.state.curso].curso_aprobados + this.state.profesors.cursos[this.state.curso].curso_reprobados)}%`}</ListGroup.Item>
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
                                <ListGroup.Item>{this.state.profesors.cursos[this.state.curso].curso_aprobados + this.state.profesors.cursos[this.state.curso].curso_reprobados}</ListGroup.Item>
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