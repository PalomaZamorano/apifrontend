import React, { Component } from 'react'
import MaterialTable from 'material-table'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import {Link}  from "react-router-dom"; 
import CircularProgress from '@material-ui/core/CircularProgress';
import Tooltip from '@material-ui/core/Tooltip';
import { FaChartArea}  from "react-icons/fa";
import {MdPermContactCalendar}  from "react-icons/md";


class ProfesorList2 extends Component {
    _isMounted = false;
    constructor(props){
        super(props);
        this.state={
          ready:false,
          profesors:[],
          rows2:[]
        }
    }       



    componentDidMount() {
        this._isMounted = true;
        axios.get(`http://localhost:3000/profsInfor.json`)
        .then(res => {
          const profesors = res.data;
          if (this._isMounted) {
            if(profesors.length !== 0){
              this.state.rows2.push(profesors.map((profesor,index) =>  
              this.createData1(profesor.prof_nombre_corto, profesor.id),
              )
              );
            }
           
            const ready = true;  
            // console.log(this.state.rows2[0])
            this.setState({ ready });
          }  
         
        })
  }
  
  componentWillUnmount() {
    this._isMounted = false;
  }

createData1(name,id) {

    return {name,id};
} 


   
  render() {

    if(this.state.ready === false && !this._isMounted){
    
        return(
          <div>
             <CircularProgress size={90} color="secondary" />
          </div>
  
        )
  
      }
      else{
    return (
        <div style = {{width:500}} >
        <Paper >
        <Grid container style = {{marginTop : 60}} >
        <Grid item  xs={12} md={12} >
        <MaterialTable 
          columns={[
            { title: 'Nombre', field: 'name' },
            {
                title: '',
                field: '',
                
                render: rows2 => (
                        <Tooltip title="Ir al perfil del profesor" placement="top" style ={{fontSize: 20}}> 
                         <Link  to={{pathname: '/perfil/',state : {id : rows2.id} }}>
                         <MdPermContactCalendar  style={{ fontSize: '1.50em' }}/>
                         </Link>
                         </Tooltip>   
                )
            },
            {
                title: '',
                field: 'avatar',
                render: rows2 => (
                         <Tooltip title="Ir a estadísticas del profesor" placement="top" style ={{fontSize: 20}}> 
                        <Link to={{  pathname: '/estadistica/' , state : {id : rows2.id}   }} >
                         <FaChartArea style={{ fontSize: '1.50em' }} />
                         </Link>
                         </Tooltip>
                )
            }
            
          ]}
          data={this.state.rows2[0]}
          options={{
            sorting: true
          
          }}
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

export default ProfesorList2;

