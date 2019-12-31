import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import { Image, ListGroup,Form } from 'react-bootstrap';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';




import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';



class ProfesorList2 extends Component {

    constructor(props){
        super(props);
        this.state={
          show: false,
          ready:false,
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

        axios.get(`http://localhost:3000/profesors/1487.json`)
        .then(res => {
            const profesors = res.data; 
            const ready = true;  
            console.log(profesors)
            this.setState({ ready, profesors });
     })
    } 

    showModal = () => {
        this.setState({ show: true });
      };
    
      hideModal = () => {
        this.setState({ show: false });
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
     <div >

      <Card className={this.state.useStyles.card}> 
        <div className={this.state.useStyles.details} >   
         <Grid container style = {{width:700}}>
          <Grid item md={3} xs={3}>
            <Image  style={{marginTop:30, width:'80%'}}
                  src="https://www.informatica.usach.cl/multimedia/FotoAQS-100x100.jpg" fluid /> 

            <Button variant="outlined" size="small"  onClick={this.showModal} >
                Observaciones
            </Button>
           </Grid>
          
          <Grid item md={9} xs={3}  >
           <CardContent className={this.state.useStyles.content}>
  
             <ListGroup variant="flush">
                <ListGroup.Item style={{ fontSize: 15, textAlign:'left' }}> <b>Nombre:</b>    {this.state.profesors.prof_nombre_corto} </ListGroup.Item>
                <ListGroup.Item style={{ fontSize: 15, textAlign:'left' }}> <b>Jornada:</b>   {this.state.profesors.prof_jornada} </ListGroup.Item>
                <ListGroup.Item style={{ fontSize: 15, textAlign:'left' }}> <b>Email:</b>       {this.state.profesors.prof_e_mail}</ListGroup.Item>
                <ListGroup.Item style={{ fontSize: 15, textAlign:'left' }}> <b>Departamento:</b>       {this.state.profesors.depto}</ListGroup.Item>
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
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending anonymous location data to
            Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.hideModal} color="primary">
           Cerrar
          </Button>
        </DialogActions>
        </Dialog>
           
            
     </div>
    )
        }
  }
}

export default ProfesorList2;

