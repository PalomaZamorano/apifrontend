import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import MaterialTable from 'material-table'
import {Link}  from "react-router-dom"; 
import Tooltip from '@material-ui/core/Tooltip';
import {MdFeaturedPlayList}  from "react-icons/md";
import Card from '@material-ui/core/Card';



import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Typography from '@material-ui/core/Typography';


class CursoDetalle extends Component{
    constructor(props){
        super(props);


        this.state={
          results: [],
          profesors:[],
          id:0   
        }
      }
      

    componentDidMount() {

        console.log(this.props.location.state.cursos)
        axios.get('http://localhost:3000/resultCurso/' + this.props.location.state.cursos[0].curso_cod + '/' + this.props.location.state.cursos[0].curso_agno + '/' + this.props.location.state.cursos[0].curso_sem)
        .then(res => {
          const results= res.data[0];
          this.setState({ results });
          this.props.location.state.cursos.map(curso =>{
                this.cursos(curso.id)
          }
          )
         
        })
        
         console.log(this.state.profesors.profesors)
      } 

    cursos(cod){

        axios.get('http://localhost:3000/cursos/' + cod + '.json')
        .then(res => {
         this.state.profesors.push(res.data)
         this.setState(this.state.profesors);
        })
      } 

    render() {

      const percentage = 100;
      if(this.state.results.length === 0){
    
        return(
          <div>
             <CircularProgress size={150} color="secondary" />
          </div>
  
        )
  
      }
      else{
      return (
        
        <div  style={{ marginTop:60 }}>
       
      
           
      <Grid container  
        alignItems="center"
        justify="center" >
            <Grid item md={12} xs ={8}  style={{width: 850, minHeight: '80vh', minWidth: '80vw'  }} >
                <Card  style={{ minWidth: '80vw'  }}> 
            <Typography variant="h4" component="h2">
            {`${this.props.location.state.asignatura}`}
                </Typography>    
            <br/>
                <Grid container   
                spacing={2}
                alignItems="center"
                justify="center" >
                    {/* Grida 1 */}
                
                    {this.state.results.resultadoGeneral ?  
                    
                        <Grid item md={3} xs ={3}>
                        <Paper  elevation={3} >
                            <Typography variant="h6" component="h2">
                                Promedio general encuesta asignatura
                            </Typography>
                        <CircularProgressbar
                            value={percentage}
                            text={`${this.state.results.resultadoGeneral}`}
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

                    {this.state.results.promsd1 ?    

                        <Grid item md={9} xs ={7}>
                        <Paper elevation={3}>
                        <Typography variant="h6" component="h2">
                            Promedio encuesta por dimensión de la asignatura
                        </Typography> 
                        <Grid container spacing={3}>

                        <Grid item xs={3}  md={3}>

                        <CircularProgressbar
                            style = {{width:10, height:10}}
                            value={percentage}
                            text={`${this.state.results.promsd1}`}
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
                    
                    
                        <Grid item xs={3}  md={3}>
                        
                        <CircularProgressbar
                            style = {{width:10, height:10}}
                            value={percentage}
                            text={`${this.state.results.promsd2}`}
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

                        <Grid item xs={3}  md={3}>
                        
                        <CircularProgressbar
                            style = {{width:10, height:10}}
                            value={percentage}
                            text={`${this.state.results.promsd3}`}
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

                        <Grid item xs={3} md={3}>
                        
                        <CircularProgressbar
                            style = {{width:10, height:10}}
                            value={percentage}
                            text={`${this.state.results.promsd4}`}
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
                    
                    {/*Grida 3 */}

                  
                    <Grid item  xs={9} md={12} >
                    <Paper elevation={6}>

                    {this.state.profesors.length === this.props.location.state.cursos.length ?          
                    <MaterialTable
                        columns={[
                        { title: 'Código Curso', field: 'curso_cod' },
                        { title: 'Coordinación', field: 'curso_coord' },
                        { title: 'Sección', field: 'curso_secc' },
                        { title: 'Año', field: 'curso_agno' },
                        { title: 'Semestre', field: 'curso_sem' },
                        { title: 'Profesor(es)',field: 'curso_profesores'},
                        {
                            title: '',
                            field: '',
                            
                            render:  cursos => (
                                    <Tooltip title={`${cursos.profesors[0].id}`} placement="top" style ={{fontSize: 20}}> 
                                    <Link  to={{pathname: '/estadistica/', state : {id: cursos.profesors[0].id} }}>
                                    <MdFeaturedPlayList  style={{ fontSize: '1.50em' }}/>
                                    </Link>
                                    </Tooltip>   
                            )
                        },
                        {
                          title: '',
                          field: '',
                          
                          render:  cursos =>  (
                                  <div>
                                   { cursos.profesors.length === 2 ?
                                      <Tooltip title={`${cursos.profesors[1].id}`} placement="top" style ={{fontSize: 20}}> 
                                      <Link  to={{pathname: '/estadistica/', state : {id: cursos.profesors[1].id} }}>
                                      <MdFeaturedPlayList  style={{ fontSize: '1.50em' }}/>
                                      </Link>
                                      </Tooltip>:
                                    <div></div>}
                                  </div>   
                          )
                      }    
                        ]}
                        data={this.state.profesors}
                        
                        title='Cursos'
                        
                    />:<div><CircularProgress size={30} color="secondary" /></div>}

                    </Paper>
                    </Grid>
                    </Grid>
                    </Card>   
                    </Grid>        
      </Grid>
     

      >
    </div>
      );
        }
        
    }
  }

export default CursoDetalle;
