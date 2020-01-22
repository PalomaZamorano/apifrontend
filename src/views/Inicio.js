import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Ranking from './RankingProfesors';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';



import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import ChartDimension from '../Graficos/ChartDemo'
import Typography from '@material-ui/core/Typography';

import Tooltip from '@material-ui/core/Tooltip';
import {FaQuestionCircle}  from "react-icons/fa";
import Button from '@material-ui/core/Button';

class Inicio extends Component{
    _isMounted = false;
    constructor(props){
        super(props);
        
        this.state={
          results: [],
          useStyles : makeStyles(theme => ({
            root: {
              paddingTop: theme.spacing(4),
              paddingBottom: theme.spacing(4),
              padding: 20
              
            },
            paper: {
              padding: theme.spacing(4),
              display: 'flex',
              overflow: 'auto',
              flexDirection: 'column',
              elevation : 1
              
            },
            fixsize: {
              height: '100vh'           
            }, 
            content: {
              flexGrow: 1,
              overflow: 'auto'
            }

          })),
            
        }
      }
      

    componentDidMount() {

        this._isMounted = true;
        axios.get(`http://localhost:3000/profesorsPromGeneral.json`)
        .then(res => {
          const results = res.data;
          if (this._isMounted) {
            this.setState({ results });
          }
        })
      }     
    
      componentWillUnmount() {
        this._isMounted = false;
      }  

    render() {
      const percentage = 100;
      if(this.state.results.length === 0){
    
        return(
          <div>
             <CircularProgress size={150} color="secondary" />
          </div>
  
        )
  
      }
      else{
      return (
        
        <div  style={{ marginTop:60 }}>
       
         
           
      <Grid container spacing={1}   className={this.state.useStyles.root} 
        justify='center' >
        

        <Grid item  xs={5} md={10} >
          <Paper className={this.state.useStyles.paper}>
          <Tooltip title="Los valores presentados corresponden a todos los profesores
          que componen el sistema" 
                placement="top" style ={{fontSize: 20}}> 
                    <Button  variant="outlined" size="small"  
                        style={{float: 'right', marginRight:20}} >
                        <FaQuestionCircle  style={{ fontSize: '1.50em' }}/>
                    </Button>
                </Tooltip> 
          <Typography variant="h6" component="h2">
              Promedios por dimensión.
          </Typography>
          <ChartDimension/>

          
  
        </Paper>
        </Grid>  
        <Grid item  xs={5} md={6} >
          <Paper className={this.state.useStyles.fixsize} >
          <Typography variant="h6" component="h2">
              Ranking promedios profesores.
          </Typography>
          <Ranking/>
          </Paper>
        </Grid>

        <Grid item  xs={3} md={2}  >
          <Paper className={this.state.useStyles.fixsize}>
          <Typography variant="h6" component="h2">
              Promedio General
          </Typography>
          <CircularProgressbar value={percentage} text={`${this.state.results[0].promGeneral}.0 `}
          styles={buildStyles({
            // Text size
            textSize: '13px'
            // Colors
          
          })}
          />
          </Paper>
        </Grid>

         

        
        <Grid item xs={3} md={2}>
          <Paper className={this.state.useStyles.paper} >
          <Typography variant="h6" component="h2">
             Total encuestas
          </Typography>
          
          <CircularProgressbar

           value={percentage}
           text={`${this.state.results[0].total_encuestas}`}
           
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
 

  



      </Grid>

      >
    </div>
      );
        }
        
    }
  }

export default Inicio;
