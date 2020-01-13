import React, { Component } from 'react'
import MaterialTable,{MTableToolbar} from 'material-table'
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import Tooltip from '@material-ui/core/Tooltip';
import {FaEdit}  from "react-icons/fa";
import {MdDelete}  from "react-icons/md";
import {IoMdAddCircle}  from "react-icons/io";


import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Form, Button } from 'react-bootstrap';




class AdminProfesores extends Component {

    constructor(props){
        super(props);
        this.state={
          ready:false,
          usuarios:[],
          profesors:[],
          rows2:[],
          nombre:'',
          id:0,
          show:false,
          jornada:["Diurno", "Vespertino"],
          personJornada:[],
          validated:false,
          setValidated:false,
          area:"",
          jorna:"",
          areas: ["Inteligencia artificial","Informática educativa", "Ingeniería de software","Robótica",
                  "Análisis de datos","Gestíón de proyectos TI","Algoritmos","Seguridad","Redes computacionales",
                  "Computación paralela","Sistemas computacionales","Procesos","Optimización"],
          personAreas:[],
          formErrors: {mail: ''},
          emailValid: false,
          MenuProps : {
            PaperProps: {
              style: {
                maxHeight: 48 * 4.5 + 8,
                width: 250,
              },
            },
          }

        }
        this.hideModal = this.hideModal.bind(this);
    }       



    componentDidMount() {

        axios.get(`http://localhost:3000/user_tables.json`)
        .then(res => {
          const usuarios = res.data;
        
          if(usuarios.length !== 0){
            this.state.rows2.push(usuarios.map((usuario,index) =>  
            this.createData1(index,usuario.id,usuario.user_name,usuario.user_mail,usuario.user_rol,usuario.user_cargo),
            )
            );
          }
           
            const ready = true;  
            this.setState({ ready });
            console.log(this.state.rows2)
         
        })
} 

    createData1(index,id,name,mail,rol,cargo) {
        if(cargo === 0){
            cargo = "Subdirecto(a)"
        }
        if(cargo === 1){
            cargo = "Jefe(a) de carrera"

        }
        if(cargo === 2){
            cargo = "Coordinador(a) docente"
        }
        if(rol === 0){
            rol = "Administrador(a)"
        }
        if(rol === 1){
            rol = "Usuario"
        }    

        return {index,id,name,mail,rol,cargo};
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
          if (window.confirm('¿Está seguro/a que desea editar el perfil del profesor(a)?')){ 

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
        let emailValid = this.state.emailValid;
        emailValid = data.get('mail').match(/^([\w.%+-]+)@(usach)+([\w]{2,})$/i);
        const error = emailValid ? '' : ' is invalid';

        if (form.checkValidity() === false ||  error === false || (data.get('mail') === "" || data.get('depto')  === "" || data.get('url')  === "" || this.state.jorna === "" || this.state.area  === "") ) {
          window.alert('Debe rellenar todos los espacios e ingresar mail usach, inténtalo nuevamente')
          event.preventDefault();
          event.stopPropagation();
        }
        else{
          this.setState({ validated: true });  
          this.saveValues(data.get('url'),data.get('mail'),data.get('depto'),this.state.jorna,this.state.area);
        }  
    };
    
    handleChangeSelect = event => {
      if(event.target.value.length>1){    
        const area = event.target.value[0] + " - " + event.target.value[1]
        this.setState({ personAreas: event.target.value, area});
      }
      else{
        this.setState({ personAreas: event.target.value, area: event.target.value[0] });
      }  
      };
    
    handleChangeSelect2 = event => {

      if(event.target.value.length>1){
        const jorna = event.target.value[0] + " - " + event.target.value[1]
        this.setState({personJornada: event.target.value,jorna }); 
      }
      else{
        this.setState({ personJornada: event.target.value, jorna: event.target.value[0] });
      }  
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

        <Grid item  xs={8} md={8} >    
        <Dialog
            open={this.state.show}
            onClose={this.hideModal}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            >
            <DialogTitle id="alert-dialog-title">
            {`Editar usuario(a): ${this.state.nombre}`}
            </DialogTitle>
            
              <DialogContent>
              <Form  noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>

              <Form.Group controlId="formGroupFoto">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control name="name" type="text" placeholder="Ingrese url de la foto" />
                </Form.Group>

                <Form.Group controlId="formGroupEmail">
                    <Form.Label>Mail</Form.Label>
                    <Form.Control name="mail" type="email" placeholder="Ingrese mail" />
                </Form.Group>

                <Form.Group  controlId="formGridCargo">
                    <Form.Label>Cargo</Form.Label>
                    <Form.Control as="select">
                        <option>Subdirector(a)</option>
                        <option>Jefe(a) de carrera</option>
                        <option>Coordinador(a) docente</option>
                        <option>Director(a)</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="formGridRol">
                    <Form.Label>Rol</Form.Label>
                    <Form.Control as="select">
                        <option>Adminstrador</option>
                        <option>Usuario Natural</option>
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

        <Grid item  xs={5} md={12} >
        <MaterialTable 
        
          
          columns={[
            { title: 'Nombre', field: 'name' },
            { title: 'Mail', field: 'mail' },
            { title: 'Rol', field: 'rol' },
            { title: 'Cargo', field: 'cargo' },
            {
                title: '',
                field: '',
                
                render: rows2 => (
                        <Tooltip title="Editar usuario" placement="top" style ={{fontSize: 20}}> 
                            <Button   onClick={() => this.showModal(rows2.index)} size="sm" variant="outline-secondary">
                                <FaEdit  style={{ fontSize: '1.50em' }}/>
                            </Button>
                         </Tooltip>   
                )
            },
            {
                title: '',
                field: '',
                
                render: rows2 => (
                        <Tooltip title="Eliminar usuario" placement="top" style ={{fontSize: 20}}> 
                            <Button   onClick={() => this.showModal(rows2.index)} size="sm" variant="outline-secondary">
                                <MdDelete  style={{ fontSize: '1.50em' }}/>
                            </Button>
                         </Tooltip>   
                )
            }
            
          ]}
          data={this.state.rows2[0]}
          components={{
            Toolbar: props => (
              <div>
                <MTableToolbar {...props} />
                <div >
                <Tooltip title="Agregar usuario" placement="top" style ={{fontSize: 20}}> 
                            <Button  variant="outline-secondary" size="sm"  style={{float: 'right', marginRight:20}}>
                                <IoMdAddCircle  style={{ fontSize: '1.50em' }}/>
                            </Button>
                        </Tooltip> 
                        <br/> 
                </div>
              </div>
            ),
          }}
          options={{
            sorting: true
          }}
          title="Administrar usuarios"
          
        />

        </Grid>
        </Grid> 
        </div>
    )
        }
  }
}

export default AdminProfesores;