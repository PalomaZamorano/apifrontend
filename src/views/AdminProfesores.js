import React, { Component } from 'react'
import MaterialTable from 'material-table'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import Tooltip from '@material-ui/core/Tooltip';
import {FaEdit}  from "react-icons/fa";

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Form, Button } from 'react-bootstrap';



class AdminProfesores extends Component {

    constructor(props){
        super(props);
        this.state={
          ready:false,
          profesors:[],
          rows2:[],
          nombre:'',
          id:0,
          show:false,
          validated:false,
          setValidated:false

        }
        this.hideModal = this.hideModal.bind(this);
    }       



    componentDidMount() {

        axios.get(`http://localhost:3000/profesors.json`)
        .then(res => {
          const profesors = res.data;
        
          if(profesors.length !== 0){
            this.state.rows2.push(profesors.map((profesor,index) =>  
            this.createData1(index,profesor.prof_photo,profesor.prof_nombre_corto, profesor.prof_e_mail,profesor.prof_depto,
                profesor.prof_jornada,profesor.prof_area,profesor.id),
            )
            );
          }
           
            const ready = true;  
            //console.log(this.state.rows2[0][1])
            this.setState({ ready });
         
        })
} 

    createData1(index,url,name,mail,depto,jornada,area,id) {

        return {index,url,name,mail,depto,jornada,area,id};
    } 

    hideModal = () => {
        
        this.setState({ show: false });
    };

    showModal = (num) => {

       
        const id = this.state.rows2[0][num].id;
        const nombre = this.state.rows2[0][num].name;
        this.setState({ show: true,id,nombre });
     
        };

    saveValues(url,mail,depto,jornada,area){
        
        const prof = {
            prof_e_mail : mail,
            prof_depto: depto,
            prof_area: area,
            prof_jornada: jornada,
            prof_photo: url,
          };
        
        console.log(prof)

        if (window.confirm('¿Está seguro/a que desea editar las observaciones?')){ 

            axios.put('http://localhost:3000/profesors/' + this.state.id + '.json',  prof )
              .then(res => {
                window.alert("Se han ingresado los datos con éxito");
                this.setState({ show: false });
              })

          }



    }    

    handleSubmit = event => {
        const form = event.currentTarget;
        const data = new FormData(form);
        console.log(data.get('jornada'))

        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        this.setState({ validated: true });
        this.saveValues(data.get('url'),data.get('mail'),data.get('depto'),data.get('jornada'),data.get('area'));
      };
    


   
  render() {

    if(this.state.rows2.length === 0){
    
        return(
          <div>
             <CircularProgress size={90} color="secondary" />
          </div>
  
        )
  
      }
      else{
    return (
        <div  style = {{marginTop : 60}}>

        <Grid container
         alignItems="center"
         justify="center"
        >

        <Grid item  xs={8} md={12} >    
        <Dialog
            open={this.state.show}
            onClose={this.hideModal}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            >
            <DialogTitle id="alert-dialog-title">{`Editar profesor(a): ${this.state.nombre}`}</DialogTitle>
              <DialogContent>
              <Form  noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>

              <Form.Group controlId="formGroupFoto">
                    <Form.Label>Foto</Form.Label>
                    <Form.Control name="url" type="text" placeholder="Ingrese url de la foto" />
                </Form.Group>

                <Form.Group controlId="formGroupEmail">
                    <Form.Label>Mail</Form.Label>
                    <Form.Control name="mail" type="email" placeholder="Ingrese mail" />
                </Form.Group>

                <Form.Group controlId="formGroupPassword">
                    <Form.Label>Departamento</Form.Label>
                    <Form.Control name="depto" type="text" placeholder="Ingrese departamento de origen" />
                </Form.Group>

                <Form.Group controlId="formGroupJornada">
                    <Form.Label>Jornada</Form.Label>
                    <Form.Control name="jornada" as="select">
                         <option>Diurno</option>
                         <option>Vespertino</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="formArea">
                    <Form.Label>Área</Form.Label>
                    <Form.Control name="area" as="select">
                         <option>Inteligencia artificial</option>
                         <option>Informática educativa</option>
                         <option>Ingeniería de software</option>
                         <option>Robótica</option>
                         <option>Análisis de datos</option>
                         <option>Gestíón de proyectos TI</option>
                         <option>Algoritmos</option>
                         <option>Seguridad</option>
                         <option>Redes computacionales</option>
                         <option>Computación paralela</option>
                         <option>Sistemas computacionales</option>
                         <option>Procesos</option>
                         <option>Optimización</option>
                    </Form.Control>
                </Form.Group>
                <Button type="submit" variant="outline-primary">Enviar</Button>  
              </Form>
              
            </DialogContent>
              <DialogActions>
                
                <Button onClick={this.hideModal} variant="outline-primary">
                Cerrar
                </Button>
            </DialogActions>
        </Dialog>
        </Grid>
        </Grid>

        <Grid container
         spacing={0}
         direction="column"
         alignItems="center"
         justify="center"
        >

        <Grid item  xs={5} md={10} >
        <MaterialTable 
        
          columns={[
            {
                title: 'Foto',
                field: '',
                render: rows2 => (
                  <div>
                   {rows2.url ?  
                    <img
                        style={{ height: 36, borderRadius: '50%' }}
                        src={rows2.url}
                    />:
                    <img
                    style={{ height: 36, borderRadius: '50%' }}
                    src= "https://cdn.pixabay.com/photo/2012/04/26/19/43/profile-42914_960_720.png"
                    />}
                  </div>
                )
            },
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
                            <Button   onClick={() => this.showModal(rows2.index)} variant="outline-primary">
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