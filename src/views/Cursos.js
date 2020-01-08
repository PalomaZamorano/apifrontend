import React, { Component } from 'react'
import MaterialTable from 'material-table'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {Link}  from "react-router-dom"; 
import Tooltip from '@material-ui/core/Tooltip';
import {FiList}  from "react-icons/fi";
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';



class Cursos extends Component {

    constructor(props){
        super(props);
        this.state={
          ready:false,
          asignaturas:[],
          rows2:[],
          data:[],
          cursos:[],
          profesors:[]
        }
    }       



componentDidMount(){
    this.props.location.state.cursos.map(curso =>
        axios.get('http://localhost:3000/cursos/' + curso.id +'.json')
            .then(res => {
            this.state.profesors.push(res.data.profesors)
        })
        )

    const ready = true    
    this.setState({ ready});   
}


   
render() {
    console.log(this.state.profesors)    

    if(this.state.ready === false){
    
        return(
          <div>
             <CircularProgress size={90} color="secondary" />
          </div>
  
        )
  
      }
      else{
 
        return (
          <div style = {{height:'100%', width:'100%'}} >
          <Paper>
          <Grid container style = {{marginTop : 60}} >
          <Grid item  xs={12} md={12} >
          <MaterialTable
            columns={[
              { title: 'Código Curso', field: 'curso_cod' },
              { title: 'Coordinación', field: 'curso_coord' },
              { title: 'Sección', field: 'curso_secc' },
              { title: 'Año', field: 'curso_agno' },
              { title: 'Semestre', field: 'curso_sem' },
              { title: 'Profesor(es)',field: 'curso_profesores',}  
            ]}
            data={this.props.location.state.cursos}
            
            title={`${this.props.location.state.asignatura}`}
            
          />
  
          </Grid>
          </Grid> 
              </Paper>
          </div>
          )
      }  
        
        }
}

export default Cursos;