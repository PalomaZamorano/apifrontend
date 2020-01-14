import React, { Component } from 'react'
import MaterialTable,{MTableToolbar} from 'material-table'
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import Tooltip from '@material-ui/core/Tooltip';
import {FaEdit}  from "react-icons/fa";
import {MdDelete}  from "react-icons/md";
import {IoMdAddCircle}  from "react-icons/io";
//Para Dialog
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
          rows2:[],
          nombre:'',
          id:0,
          show:false,
          show1:false,
          validated:false,
          setValidated:false,
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
         
        })
    } 

    createData1(index,id,name,mail,rol,cargo) {
        if(cargo === 0){
            cargo = "Subdirector(a)"
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

    //Dialogo Editar
    hideModal = () => {
        
        this.setState({ show: false });
    };

    showModal = (num) => {
        const id = this.state.rows2[0][num].id;
        const nombre = this.state.rows2[0][num].name;
        this.setState({ show: true,id ,nombre });
     
        };

    saveValues(name,mail,rol,cargo){
        //terminar en la casa
        if(cargo === "Subdirecto(a)"){
           cargo = 0
        }
        if(cargo === "Jefe(a) de carrera"){
            cargo = 1
        }
        if(cargo === "Coordinador(a) docente"){
            cargo = 2
        }
        if(rol === "Administrador(a)"){
            rol = 0
        }
        if(rol === "Usuario Natural "){
            rol = 1
        }
        
        const usuario = {
            user_name : name,
            user_mail: mail,
            user_rol: rol,
            user_cargo: cargo,
        };
        
        if (window.confirm('¿Está seguro/a que desea editar al usuario?')){ 

              axios.put('http://localhost:3000/user_tables/' + this.state.id + '.json',  usuario )
                .then(res => {
                  window.alert("Se han ingresado los datos con éxito");
                  this.setState({ show: false, validated: false });
                })
        }
    }    

    handleSubmit = event => {
        const form = event.currentTarget;
        const data = new FormData(form);
        let emailValid = this.state.emailValid;
        emailValid = data.get('mail').match(/^([\w.%+-]+)@(usach)+([\w]{2,})$/i);
        const error = emailValid ? '' : ' is invalid';
        
        if (form.checkValidity() === false ||  error === false || data.get('name') === "" || data.get('mail') === "" || data.get('rol')  === "" || data.get('cargo')  === "" ) {
          window.alert('Debe rellenar todos los datos solicitados e ingresar mail Usach')
          event.preventDefault();
          event.stopPropagation();
        }
        else{
          this.setState({ validated: true });  
          this.saveValues(data.get('name'),data.get('mail'),data.get('rol'),data.get('cargo'));
        }  
    };

    //Dialogo crear

    hideModalCrear = () => {
        
        this.setState({ show1: false });
    };

    showModalCrear = () => {
        this.setState({ show1: true }); 
    };

    Create(name,mail,rol,cargo){

        if(cargo === "Subdirecto(a)"){
           cargo = 0
        }
        if(cargo === "Jefe(a) de carrera"){
            cargo = 1
        }
        if(cargo === "Coordinador(a) docente"){
            cargo = 2
        }
        if(rol === "Administrador(a)"){
            rol = 0
        }
        if(rol === "Usuario Natural "){
            rol = 1
        }
        
        const usuario = {
            user_name : name,
            user_mail: mail,
            user_rol: rol,
            user_cargo: cargo,
        };
        
        if (window.confirm('¿Está seguro/a que desea editar al usuario?')){ 

              axios.post('http://localhost:3000/user_tables.json',  usuario )
                .then(res => {
                  window.alert("Se han ingresado los datos con éxito");
                  this.setState({ show1: false, validated: false });
                })
        }
    }    

    handleSubmitCreate = event => {
        const form = event.currentTarget;
        const data = new FormData(form);
        let emailValid = this.state.emailValid;
        emailValid = data.get('mail1').match(/^([\w.%+-]+)@(usach)+([\w]{2,})$/i);
        const error = emailValid ? '' : ' is invalid';
        
        if (form.checkValidity() === false ||  error === false || data.get('name1') === "" || data.get('mail1') === "" || data.get('rol1')  === "" || data.get('cargo1')  === "" ) {
          window.alert('Debe rellenar todos los datos solicitados e ingresar mail Usach')
          event.preventDefault();
          event.stopPropagation();
        }
        else{
          this.setState({ validated: true });  
          this.Create(data.get('name1'),data.get('mail1'),data.get('rol1'),data.get('cargo1'));
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

        {/* Dialogo para la edición */}    
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

              <Form.Group controlId="formGroupName">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control name="name" type="text" placeholder="Ingrese nombre del usuario" />
                </Form.Group>

                <Form.Group controlId="formGroupEmail">
                    <Form.Label>Mail</Form.Label>
                    <Form.Control name="mail" type="email" placeholder="Ingrese mail" />
                </Form.Group>

                <Form.Group  controlId="formGridCargo">
                    <Form.Label>Cargo</Form.Label>
                    <Form.Control name="cargo" as="select">
                        <option>Subdirector(a)</option>
                        <option>Jefe(a) de carrera</option>
                        <option>Coordinador(a) docente</option>
                        <option>Director(a)</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="formGridRol">
                    <Form.Label>Rol</Form.Label>
                    <Form.Control name="rol" as="select">
                        <option>Administrador</option>
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



        {/* Dialogo para agregar */}    
        <Grid container
         alignItems="center"
         justify="center"
        >    
        <Grid item  xs={8} md={8} >    
        <Dialog
            open={this.state.show1}
            onClose={this.hideModalCrear}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            >
            <DialogTitle id="alert-dialog-title">
            Agregar Usuario
            </DialogTitle>
            
              <DialogContent>
              <Form  noValidate validated={this.state.validated} onSubmit={this.handleSubmitCreate}>

              <Form.Group controlId="formGroupName1">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control name="name1" type="text" placeholder="Ingrese nombre del usuario" />
                </Form.Group>

                <Form.Group controlId="formGroupEmail1">
                    <Form.Label>Mail</Form.Label>
                    <Form.Control name="mail1" type="email" placeholder="Ingrese mail" />
                </Form.Group>

                <Form.Group  controlId="formGridCargo1">
                    <Form.Label>Cargo</Form.Label>
                    <Form.Control name="cargo1" as="select">
                        <option>Subdirector(a)</option>
                        <option>Jefe(a) de carrera</option>
                        <option>Coordinador(a) docente</option>
                        <option>Director(a)</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="formGridRol1">
                    <Form.Label>Rol</Form.Label>
                    <Form.Control name="rol1" as="select">
                        <option>Administrador</option>
                        <option>Usuario Natural</option>
                    </Form.Control>
                </Form.Group>
                
                <Button type="submit" variant="outline-primary">Enviar</Button>  
              </Form>
              
            </DialogContent>
              <DialogActions>
                
                <Button onClick={this.hideModalCrear} variant="outline-primary">
                Cerrar
                </Button>
            </DialogActions>
        </Dialog>
        </Grid>
        </Grid>



        {/* Grida que contiene la tabla */}
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
                            <Button  size="sm" variant="outline-secondary">
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
                            <Button  variant="outline-secondary" size="sm"  
                            style={{float: 'right', marginRight:20}} onClick={() => this.showModalCrear()}>
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