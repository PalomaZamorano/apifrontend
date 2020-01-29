import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import { Image, ListGroup,Form} from 'react-bootstrap';
import { Table } from 'react-bootstrap';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';




class Perfil extends Component {
    _isMounted = false;
    constructor(props){
        super(props);
        this.state={
          ready:false,
          ready2:null,
          show:false,
          asign:'',
          id:0,
          obs: null,
          addobs:"",
          pend:false,
          pend1:null,
          photo:null,
          profesors:[],
          code: [],
          useStyles: makeStyles(theme => ({
            root: {
                paddingTop: theme.spacing(4),
                paddingBottom: theme.spacing(4),
                padding: 20,
                
            },
            paper: {
                padding: theme.spacing(4),
                display: 'flex',
                overflow: 'auto',
                flexDirection: 'column',
                elevation : 1,
            },
            card: {
                display: 'flex',
              },
              details: {
                display: 'flex',
                flexDirection: 'column',
                
              },
              content: {
                flex: '1 0 auto',
              },
              cover: {
              }
          }))
        }
    }       


componentDidMount() {
       // console.log(this.props.location.state.id)
        this._isMounted = true;
        axios.get('http://localhost:3000/profesors/' + this.props.location.state.id + '.json')
        .then(res => {
            const profesors = res.data; 
            const ready = true;  
            const obs =  profesors.prof_observaciones
            var pend = false
            if(profesors.if_pendiente === 1){
               pend = true
            }
            if (this._isMounted) {
                this.setState({ready,profesors, obs, pend });
                profesors.cursos.map((curso,index) =>
                this.nommbreAsign(curso.curso_cod)
              )
            }
            
      })
    } 
  
  componentWillUnmount() {
      this._isMounted = false;
  }   

  nommbreAsign(code){

    axios.get('http://localhost:3000/asigncode/' + code + '.json')
        .then(res => {
            const asign = res.data[0].asign_nombre; 
            this.state.code.push(asign)  
            this.setState(this.state.code);          
     })
        return this.state.asign   
  } 
   
  componentDidUpdate() {

    if (this.state.ready === false) {
       this.state.profesors.cursos.map((curso,index) =>
              this.nommbreAsign(curso.curso_cod)
            )     
    }
   
  }

  hideModal = () => {

    axios.get('http://localhost:3000/profesors/' + this.props.location.state.id + '.json')
        .then(res => {
            const profesors = res.data; 
            const obs =  profesors.prof_observaciones
            this.setState({obs });
            
      })

      this.setState({ show: false });
  };

  showModal = () => {
    this.setState({ show: true });
  };

  //Guarda la observación del profesor
  handleSubmit = event => {
    event.preventDefault();

    const prof = {
      prof_observaciones: this.state.addobs
    };

    if (window.confirm('¿Está seguro/a que desea editar las observaciones?')){ 
        axios.put('http://localhost:3000/profesors/' + this.props.location.state.id + '.json',  prof )
          .then(res => {
            window.alert("Se han editado las observaciones como: ' "  + this.state.addobs + " ' con éxito");
            this.setState({ show: false });
          })
      }
  }

  //Cambia el valor dela variable que guarda la observación
  handleChange = event => {  
     
    this.setState({ addobs: event.target.value });
  }

  setSwitch = event => {

    event.preventDefault();
    
    if(event.target.checked === true){

      if (window.confirm('¿Está seguro/a que desea marcar al docente con pendientes?')){
        const prof = {
          if_pendiente: event.target.checked
        };  
        axios.put('http://localhost:3000/profesors/' + this.props.location.state.id + '.json',  prof )
        .then(res => {
          //console.log(res)
          
        })

        this.setState({ pend: event.target.checked  });
      }
      

    }
    
    if(event.target.checked === false){

      if (window.confirm('¿Está seguro/a que desea desmarcar al docente con pendientes?')){
        const prof = {
          if_pendiente: event.target.checked
        };  
        axios.put('http://localhost:3000/profesors/' + this.props.location.state.id + '.json',  prof )
        .then(res => {
          //console.log(res)
          
        })
        this.setState({ pend: event.target.checked  });
      }

     }

    
    
  }

  render() {
    
    if(this.state.ready === false ){
    
        return(
          <div>
             <CircularProgress size={90} color="secondary" />
          </div>
  
        )
  
      }
      else{
         if(this.state.profesors.cursos.length === 0){
           return(
             <div>    
            
              
            <Grid container spacing={1}
            alignItems="center"
            justify="center"
                        style={{ marginTop:60 }}
                        >

                <Grid item xs={5} md={10} >
                <Paper className={this.state.useStyles.paper}>
                  <Card className={this.state.useStyles.card}> 
                        <div className={this.state.useStyles.details} >   
                    <Grid container>

                    <Grid item md={4} xs={3}  >

                    <Grid item md={12} xs={11} >
                    { this.state.profesors.prof_photo ?    
                    <Image  style={{marginTop:30, width:'53%'}}
                          src= {this.state.profesors.prof_photo} fluid /> 

                    :  
                    <div> 
                    <Image  style={{marginTop:30, width:'53%'}}
                      src= "https://cdn.pixabay.com/photo/2012/04/26/19/43/profile-42914_960_720.png" fluid /> </div>  }      
                    </Grid>      
                    
                    <Grid item md={12} xs={1} > 
                    <Tooltip title="Observaciones del profesor" placement="top" style ={{fontSize: 20}}> 
                    <Button variant="outlined" size="small"  onClick={this.showModal} style={{ marginTop:10 }} >
                        Obs
                    </Button>
                    </Tooltip>
                    </Grid>
                  </Grid>
                  
                  <Grid item md={8} xs={2}  >
                  <CardContent className={this.state.useStyles.content}>
          
                    <ListGroup variant="flush">
                        <ListGroup.Item style={{ fontSize: 15, textAlign:'left' }}> <b>Nombre:</b>    {this.state.profesors.prof_nombre_corto} </ListGroup.Item>
                        <ListGroup.Item style={{ fontSize: 15, textAlign:'left' }}> <b>Jornada:</b>   {this.state.profesors.prof_jornada} </ListGroup.Item>
                        <ListGroup.Item style={{ fontSize: 15, textAlign:'left' }}> <b>Email:</b>       {this.state.profesors.prof_e_mail}</ListGroup.Item>
                        <ListGroup.Item style={{ fontSize: 15, textAlign:'left' }}> <b>Departamento:</b> {this.state.profesors.prof_depto}</ListGroup.Item>
                        <ListGroup.Item style={{ fontSize: 15, textAlign:'left' }}> <b>Área:</b> {this.state.profesors.prof_area}</ListGroup.Item>
                        <ListGroup.Item style={{ fontSize: 15, textAlign:'left' }}> <b>Pendiente:</b> {this.state.profesors.if_pendiente} </ListGroup.Item>
                    </ListGroup>
                    

                  </CardContent>     
                  </Grid> 
                  
                </Grid>        
                </div>           
                </Card>
                  
                </Paper>

                </Grid>


                {/*Grida 2*/}    
                <Grid item xs={7} md={10}>
                  <Paper style={{  height: "130%",width:"100%" }} >
                  <br/>
                  <Typography variant="h6" component="h2">
                  Cursos del profesor
                  </Typography>
                  <br/><br/>
                  Este profesor(a) no tiene cursos asignados      
                  </Paper>
                </Grid>

                </Grid>

              
              </div>
           )
           }  
         else{

              return (
                
              <div>    
            
              
              <Grid container spacing={1}
              alignItems="center"
              justify="center"
                          style={{ marginTop:60 }}
                          >

                  <Grid item xs={5} md={10} >
                  <Paper className={this.state.useStyles.paper}>
                    <Card className={this.state.useStyles.card}> 
                          <div className={this.state.useStyles.details} >   
                      <Grid container>

                      <Grid item md={4} xs={3}  >

                      <Grid item md={12} xs={11} >
                      { this.state.profesors.prof_photo ?    
                      <Image  style={{marginTop:30, width:'53%'}}
                            src={this.state.profesors.prof_photo} fluid /> 

                      :  
                      <div> 
                      <Image  style={{marginTop:30, width:'53%'}}
                        src="https://cdn.pixabay.com/photo/2012/04/26/19/43/profile-42914_960_720.png" fluid /> </div>  }      
                      </Grid>      
                      
                      <Grid item md={12} xs={1} > 
                      <Tooltip title="Observaciones del profesor" placement="top" style ={{fontSize: 20}}> 
                      <Button variant="outlined" size="small"  onClick={this.showModal} style={{ marginTop:10 }} >
                          Obs
                      </Button>
                      </Tooltip>
                      </Grid>
                    </Grid>
                    
                    <Grid item md={8} xs={2}  >
                    <CardContent className={this.state.useStyles.content}>
            
                      <ListGroup variant="flush">
                          <ListGroup.Item style={{ fontSize: 15, textAlign:'left' }}> <b>Nombre:</b>    {this.state.profesors.prof_nombre_corto} </ListGroup.Item>
                          <ListGroup.Item style={{ fontSize: 15, textAlign:'left' }}> <b>Jornada:</b>   {this.state.profesors.prof_jornada} </ListGroup.Item>
                          <ListGroup.Item style={{ fontSize: 15, textAlign:'left' }}> <b>Email:</b>       {this.state.profesors.prof_e_mail}</ListGroup.Item>
                          <ListGroup.Item style={{ fontSize: 15, textAlign:'left' }}> <b>Departamento:</b> {this.state.profesors.prof_depto}</ListGroup.Item>
                          <ListGroup.Item style={{ fontSize: 15, textAlign:'left' }}> <b>Área:</b> {this.state.profesors.prof_area}</ListGroup.Item>
                          <ListGroup.Item style={{ fontSize: 15, textAlign:'left' }}> 
              
                            <FormControlLabel
                                control={
                                  <Switch
                                    checked={this.state.pend}
                                    onChange={this.setSwitch}
                                    value="pend"
                                    color="primary"
                                  />
                                }
                                label="Marcar si posee o no pendientes"
                            />
                          </ListGroup.Item>
                      </ListGroup>
                      

                    </CardContent>     
                    </Grid> 
                    
                  </Grid>        
                  </div>           
                  </Card>

                  <Dialog
                  open={this.state.show}
                  onClose={this.hideModal}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                  >
                      <DialogTitle id="alert-dialog-title">{"Observaciones del profesor"}</DialogTitle>
                      <DialogContent>
                      { this.state.obs ?
                      <div>
                        <Form>
                            <Form.Group controlId="exampleForm.ControlTextarea1">
                              <Form.Control as="textarea" value={this.state.addobs} onChange={this.handleChange}  placeholder={`${this.state.obs}`} rows="3" />
                            </Form.Group>
                          </Form>

                      </div>
                        :<div>
                           
                          <Form>
                          <Form.Group controlId="exampleForm.ControlTextarea1">
                              <Form.Control as="textarea" value={this.state.addobs} onChange={this.handleChange}  placeholder= "El docente no posee observaciones actualmente" rows="3" />
                            </Form.Group>
                          </Form>

                        </div>
                      }  
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={this.handleSubmit} color="primary">
                          Editar Observación
                        </Button>
                        <Button onClick={this.hideModal} color="primary">
                          Cerrar
                        </Button>
                      </DialogActions>
                      </Dialog>            
                  </Paper>

                  </Grid>

                  


                  {/*Grida 2*/}    
                  <Grid item xs={7} md={10}>
                    <Paper style={{  height: "130%",width:"100%" }} >
                    <br/>
                    <Typography variant="h6" component="h2">
                    Cursos del profesor
                    </Typography>
                    {this.state.code.length === this.state.profesors.cursos.length ?
                    
                    <Table striped hover bordered size="sm"  style={{  height: "100% " ,width: "100% "}}>
                                          <thead> 
                                          <tr>
                                          <th style={{ fontSize:18 }} >#</th>
                                          <th  style={{ fontSize:18 }} >Asignatura</th>
                                          <th  style={{ fontSize:18 }} >Código</th>
                                          <th style={{ fontSize:18 }} >Coordinación</th>
                                          <th style={{ fontSize:18 }} >Sección</th>
                                          <th style={{ fontSize:18 }} >Electivo</th>
                                          <th style={{ fontSize:18 }} >Semestre</th>
                                          <th style={{ fontSize:18 }} >Año</th>
                                          
                                          </tr>
                                          </thead>

                                          {this.state.profesors.cursos.map((curso,index) =>   
                                          <tbody  key={index}>
                                          <tr>
                                          <td style={{ fontSize:15 }}>{index+1}</td>
                                          <td  style={{ fontSize:15 }} >{this.state.code[index]}</td>
                                          <td  style={{ fontSize:15 }} >{curso.curso_cod}</td>
                                          <td style={{ fontSize:15 }} >{curso.curso_coord}</td>
                                          <td style={{ fontSize:15 }} >{curso.curso_secc}</td>
                                          <td style={{ fontSize:15 }} >{curso.curso_elect}</td>
                                          <td style={{ fontSize:15 }} >{curso.curso_sem}</td>
                                          <td style={{ fontSize:15 }} >{curso.curso_agno}</td>
                                          
                                          </tr>
                                          </tbody>)}

                                      </Table>
                : <div> <CircularProgress size={50} color="secondary" /></div>}       
                    </Paper>
                  </Grid>

                  </Grid>

                
                </div>



              )
        }
        }
  }
}

export default Perfil;