import React, { Component } from 'react'
import MaterialTable from 'material-table'
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import Tooltip from '@material-ui/core/Tooltip';
import {FaAddressCard}  from "react-icons/fa";

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Form, Button } from 'react-bootstrap';
//*MultiSelect*
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';



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
          jornada:["Diurno", "Vespertino"],
          personJornada:[],
          validated:false,
          setValidated:false,
          area:"",
          jorna:"",
          areas: ["Aplicaciones y Sistemas Escalables para la Web","Sistemas Complejos","Redes y Seguridad","Interacción Humano-Computador","Biología y Medicina","Inteligencia artificial","Informática educativa", "Ingeniería de software","Robótica",
                  "Análisis de datos","Ingeniería de sistemas","Gestíón de proyectos TI","Algoritmos","Seguridad","Redes computacionales",
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

        if (form.checkValidity() === false ||  error === false || (data.get('mail') === "" || data.get('depto')  === "" ||  this.state.jorna === "" || this.state.area  === "") ) {
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

        <Grid item  xs={8} md={12} >    
        <Dialog
            open={this.state.show}
            onClose={this.hideModal}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            >
            <DialogTitle id="alert-dialog-title">
            {`Editar profesor(a): ${this.state.nombre}`}
            </DialogTitle>
            
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
                    <br/>
                    <FormControl>
                    <Select
                    style = {{minWidth: 350}}
                    labelId="demo-mutiple-checkbox-label"
                    id="demo-mutiple-checkbox"
                    multiple
                    value={this.state.personJornada}
                    onChange={this.handleChangeSelect2}
                    input={<Input />}
                    renderValue={selected => selected.join(', ')}
                    MenuProps={this.state.MenuProps}
                    >
                    {this.state.jornada.map((jor,index) => (
                        <MenuItem key={index} value={jor}>
                        <Checkbox checked={this.state.personJornada.indexOf(jor) > -1} />
                        <ListItemText primary={jor} />
                        </MenuItem>
                    ))}
                    </Select>
                    </FormControl>
                </Form.Group>

                <Form.Group controlId="formArea">
                    <Form.Label>Área</Form.Label>
                    <br/>
                    <FormControl>
                    <Select
                    style = {{minWidth: 350}}
                    labelId="demo-mutiple-checkbox-label"
                    id="demo-mutiple-checkbox"
                    multiple
                    value={this.state.personAreas}
                    onChange={this.handleChangeSelect}
                    input={<Input />}
                    renderValue={selected => selected.join(', ')}
                    MenuProps={this.state.MenuProps}
                    >
                    {this.state.areas.map((area,index) => (
                        <MenuItem key={index} value={area}>
                        <Checkbox checked={this.state.personAreas.indexOf(area) > -1} />
                        <ListItemText primary={area} />
                        </MenuItem>
                    ))}
                    </Select>
                    </FormControl>
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
                        alt="foto de perfil"
                        style={{ height: 36, borderRadius: '50%' }}
                        src={rows2.url}
                    />:
                    <img
                        alt="foto de perfil"
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
                        <Tooltip title="Ingresar datos del profesor(a)" placement="top" style ={{fontSize: 20}}> 
                            <Button   onClick={() => this.showModal(rows2.index)} size="sm" variant="outline-primary">
                                <FaAddressCard  style={{ fontSize: '1.50em' }}/>
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