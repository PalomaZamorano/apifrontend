import React, { Component } from 'react'
import MaterialTable from 'material-table'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import {Link}  from "react-router-dom"; 
import CircularProgress from '@material-ui/core/CircularProgress';
import Tooltip from '@material-ui/core/Tooltip';
import {FiList}  from "react-icons/fi";


class Asignaturas extends Component {

    constructor(props){
        super(props);
        this.state={
          ready:false,
          asignaturas:[],
          rows2:[],
          data:[],
          cursos:[]
        }
    }       



componentDidMount() {

    axios.get(`http://localhost:3000/asignInfo.json`)
        .then(res => {
          const asignaturas = res.data;
          const ready = true
          this.setState({asignaturas, ready});
         
        })
      //  console.log(this.state.asignaturas.cursos)
} 

createData1(name,id) {

    return {name,id};
} 


   
  render() {
 

    if(this.state.ready === false){
    
        return(
          <div>
             <CircularProgress size={90} color="secondary" />
          </div>
  
        )
  
      }
      else{
        return (
          <div style = {{height:'100%', width:500}} >
          <Paper>
          <Grid container style = {{marginTop : 60}} >
          <Grid item  xs={12} md={12} >
          <MaterialTable
            columns={[
              { title: 'Nombre asignatura', field: 'asign_nombre' },
              { title: 'Coordinador(es)', field: 'asign_coordinadores' },
              { title: 'Código', field: 'asign_code' },
              {
                title: '',
                field: '',
                
                render: asignaturas => (
                        <Tooltip title="Cursos de la asignatura" placement="top" style ={{fontSize: 20}}> 
                         <Link  to={{pathname: '/cursosDetalle',state : {asignatura: asignaturas.asign_nombre ,cursos : asignaturas.cursos } }}>
                         <FiList  style={{ fontSize: '1.50em' }}/>
                         </Link>
                         </Tooltip>   
                )
            }  
            ]}
            data={this.state.asignaturas}
            
            title="Profesores"
            
          />
  
          </Grid>
          </Grid> 
              </Paper>
          </div>
          )
        }
  }
}

export default Asignaturas;

