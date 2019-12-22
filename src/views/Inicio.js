import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Ranking from './RankingProfesors';

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import ChartDimension from '../Graficos/ChartDemo'
import Typography from '@material-ui/core/Typography';


class Inicio extends Component{
    constructor(props){
        super(props);
        
        this.state={
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
              height: 50            
            }, 
            content: {
              flexGrow: 1,
              overflow: 'auto'
            }

          })),
            
        }
      }
      
 

    render() {
      const percentage = 100;
      const totalEncuestas = 1000
      return (
        <div  style={{ marginTop:60 }}>
         
      <Grid container spacing={1} maxWidth="md" minWidth="xs"  className={this.state.useStyles.root} 
      justify='center'>

        <Grid item  xs={5} md={10} >
          <Paper className={this.state.useStyles.paper}>
          <Typography variant="h7" component="h2">
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
          <CircularProgressbar value={percentage} text={`${totalEncuestas} `}
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
           text={`${totalEncuestas}`}
           
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

export default Inicio;
