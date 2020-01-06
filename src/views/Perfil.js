import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import { Image, ListGroup} from 'react-bootstrap';
import { Table } from 'react-bootstrap';

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




class Perfil extends Component {

    constructor(props){
        super(props);
        this.state={
          ready:false,
          id:0,
          obs: null,
          photo:null,
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
              }
          }))
        }
    }       


    componentDidMount() {
        console.log(this.props.location.state.id)
      
        axios.get('http://localhost:3000/profesors/' + this.props.location.state.id + '.json')
        .then(res => {
            const profesors = res.data; 
            const ready = true;  
            console.log(profesors)
            this.setState({ ready, profesors });
     })
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
            { this.state.photo ?    
            <Image  style={{marginTop:30, width:'53%'}}
                  src="https://www.informatica.usach.cl/multimedia/FotoAQS-100x100.jpg" fluid /> 

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
           
        </Paper>

        </Grid>


        {/*Grida 2*/}    
        <Grid item xs={7} md={10}>
          <Paper style={{  height: "130%",width:"100%" }} >
          <br/>
          <Typography variant="h6" component="h2">
           Cursos del profesor
          </Typography>

          <Table striped hover bordered size="sm"  style={{  height: "100% " ,width: "100% "}}>
                                <thead> 
                                <tr>
                                <th style={{ fontSize:18 }} >#</th>
                                <th  style={{ fontSize:18 }} >Asignatura</th>
                                <th  style={{ fontSize:18 }} >Código</th>
                                <th style={{ fontSize:18 }} >Coordinación</th>
                                <th style={{ fontSize:18 }} >Sección</th>
                                <th style={{ fontSize:18 }} >Semestre</th>
                                <th style={{ fontSize:18 }} >Año</th>
                                
                                </tr>
                                </thead>

                                {this.state.profesors.cursos.map((curso,index) =>   
                                <tbody  key={index}>
                                <tr>
                                <td style={{ fontSize:15 }}>{index+1}</td>
                                <td  style={{ fontSize:15 }} >{}</td>
                                <td  style={{ fontSize:15 }} >{curso.curso_cod}</td>
                                <td style={{ fontSize:15 }} >{curso.curso_coord}</td>
                                <td style={{ fontSize:15 }} >{curso.curso_secc}</td>
                                <td style={{ fontSize:15 }} >{curso.curso_sem}</td>
                                <td style={{ fontSize:15 }} >{curso.curso_agno}</td>
                                
                                </tr>
                                </tbody>)}

                            </Table>
          </Paper>
        </Grid>

        </Grid>

      
      </div>



    )
        }
  }
}

export default Perfil;