import React, { Component } from 'react'
import MaterialTable from 'material-table'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import {Link}  from "react-router-dom"; 
import CircularProgress from '@material-ui/core/CircularProgress';
import Tooltip from '@material-ui/core/Tooltip';
import {FaEdit}  from "react-icons/fa";

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';


class AdminProfesores extends Component {

    constructor(props){
        super(props);
        this.state={
          ready:false,
          profesors:[],
          rows2:[],
          show:false
        }
    }       



    componentDidMount() {

        axios.get(`http://localhost:3000/profesors.json`)
        .then(res => {
          const profesors = res.data;
        
          if(profesors.length !== 0){
            this.state.rows2.push(profesors.map((profesor,index) =>  
            this.createData1(profesor.prof_nombre_corto, profesor.prof_e_mail,profesor.prof_depto,
                profesor.prof_jornada,profesor.prof_area,profesor.id),
            )
            );
          }
           
            const ready = true;  
         //   console.log(this.state.rows2[0])
            this.setState({ ready });
         
        })
} 

createData1(name,mail,depto,jornada,area,id) {

    return {name,mail,depto,jornada,area,id};
} 

hideModal = () => {
    console.log(this.state.show)
    this.setState({ show: false });
  };

 showModal = () => {
        this.setState({ show: true });
      };

   
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
        <div  style = {{marginTop : 60}}>
        <Dialog
            open={this.state.show}
            onClose={this.hideModal}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            >
            <DialogTitle id="alert-dialog-title">{"Observaciones del profesor"}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                </DialogContentText>:
                <div>
                  <DialogContentText id="alert-dialog-description">
                  El profesor no posee observaciones actualmente
                  </DialogContentText>
                </div>
              
              </DialogContent>
              <DialogActions>
                <Button onClick={this.hideModal} color="primary">
                Cerrar
                </Button>
            </DialogActions>
        </Dialog>

        <Grid container
         spacing={0}
         direction="column"
         alignItems="center"
         justify="center"
        >

        <Grid item  xs={8} md={12} >
        <MaterialTable 
        
          columns={[
            { title: 'Nombre', field: 'name' },
            { title: 'Mail', field: 'mail' },
            { title: 'Depto.', field: 'depto' },
            { title: 'Jornada', field: 'jornada' },
            { title: 'Área', field: 'area' },
            {
                title: '',
                field: '',
                
                render: rows2 => (
                        <Tooltip title="Editar perfil" placement="top" style ={{fontSize: 20}}> 
                            <Button onClick={this.showModal} color="primary">
                                <FaEdit  style={{ fontSize: '1.50em' }}/>
                            </Button>
                         </Tooltip>   
                )
            }
            
          ]}
          data={this.state.rows2[0]}
          options={{
            sorting: true
          
          }}
          title="Editar profesores"
          
        />

        </Grid>
        </Grid> 
        </div>
    )
        }
  }
}

export default AdminProfesores;