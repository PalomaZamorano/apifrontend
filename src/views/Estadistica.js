import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import { Image, ListGroup} from 'react-bootstrap';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import ChartDimension from '../Graficos/ChartDemo2'
import Estadistica2 from './Estadistica2'
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';


import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';




class ProfesorList2 extends Component {

    constructor(props){
        super(props);
        this.state={
          show: false,
          ready:false,
          id:0,
          obs: null,
          photo:null,
          proms:0,
          profesors:[],
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
              },
              modal: {
                position: 'absolute',
                width: 400,
                backgroundColor: theme.palette.background.paper,
                border: '2px solid #000',
                boxShadow: theme.shadows[5],
                padding: theme.spacing(2, 4, 3),
              },
          }))
        }
    }       


    componentDidMount() {
      // console.log(this.props.location.state.id)
      
        axios.get('http://localhost:3000/profesors/' + this.props.location.state.id + '.json')
        .then(res => {
            const profesors = res.data; 
            const ready = true;  
           // console.log(profesors)
            const proms = (profesors.prof_proms_results*1).toFixed(1)
            this.setState({ ready, profesors, proms });
     })
    } 

    showModal = () => {
        this.setState({ show: true });
      };
    
      hideModal = () => {
        this.setState({ show: false });
      };

   
  render() {

    const percentage = 100;
    
    

    if(this.state.ready === false){
    
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
                      <ListGroup.Item style={{ fontSize: 15, textAlign:'left' }}> <b>Departamento:</b> {this.state.profesors.depto}</ListGroup.Item>
                      <ListGroup.Item style={{ fontSize: 15, textAlign:'left' }}> <b>Pendiente:</b> {this.state.profesors.if_pendiente} </ListGroup.Item>
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
                <DialogContentText id="alert-dialog-description">
                  {this.state.obs}
                </DialogContentText>:
                <div>
                  <DialogContentText id="alert-dialog-description">
                  El profesor no posee observaciones actualmente
                  </DialogContentText>
                </div>
              }  
              </DialogContent>
              <DialogActions>
                <Button onClick={this.hideModal} color="primary">
                Cerrar
                </Button>
              </DialogActions>
              </Dialog>
                
              </Paper>

              </Grid>

              {/*Grida 4*/}    
              <Grid item xs={7} md={10}>
                  
              </Grid>   

              <Paper className={this.state.useStyles.paper}>
                <Typography variant="h6" component="h2">
                  Este profesor(a) no posee resultados ni cursos asignados
                </Typography>
              </Paper>    
              
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
                    <DialogContentText id="alert-dialog-description">
                      {this.state.obs}
                    </DialogContentText>:
                    <div>
                      <DialogContentText id="alert-dialog-description">
                      El profesor no posee observaciones actualmente
                      </DialogContentText>
                    </div>
                  }  
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={this.hideModal} color="primary">
                    Cerrar
                    </Button>
                  </DialogActions>
                  </Dialog>
                    
                  </Paper>

                  </Grid>


                {/*Grida 2*/}
                  <Grid item xs={2} md={3}>
                    <Paper  className={this.state.useStyles.paper}>
                    <Typography variant="h6" component="h2">
                      Promedio general del profesor
                    </Typography>
                    <CircularProgressbar
                      style = {{width:30, height:10}}
                      value={percentage}
                      text={`${this.state.proms}`}
                      styles={buildStyles({
                      // Text size
                      textSize: '16px',
                      // Colors
                      pathColor: '#F09A68',
                      textColor: '#F09A68',
                      trailColor: '#F09A68',
                      backgroundColor: '#F09A68',
                      })}
                    />
                    </Paper>

                  </Grid>

                  {/*Grida 3*/}    
                  <Grid item xs={7} md={7}>
                    <Paper style={{  height: "130%",width:"100%" }} >
                    <br/>
                    <Typography variant="h6" component="h2">
                      Promedio general del profesor por dimensión
                    </Typography>
                  
                      <ChartDimension
                      profesors =  {this.state.profesors}
                      />
                    </Paper>
                  </Grid>

                  {/*Grida 4*/}    
                  <Grid item xs={7} md={10}>
                      <Estadistica2 id =  {this.props.location.state.id}/>
                  </Grid>   

                  
                  </Grid>

                
                </div>



              )
          }    
        }
  }
}

export default ProfesorList2;

