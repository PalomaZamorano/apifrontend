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
         
      <Grid container spacing={2} maxWidth="md" minWidth="xs"  className={this.state.useStyles.root} 
      justify="center" alignContent='space-between'  >
        <Grid item  xs={5} md={5} >
          <Paper className={this.state.useStyles.fixsize} >
          <Typography variant="h5" component="h3">
              This is a sheet of paper.
          </Typography>
          <Ranking/>
          </Paper>
        </Grid>

        <Grid item  xs={3} md={3}  >
          <Paper className={this.state.useStyles.fixsize}>
          <Typography variant="h5" component="h3">
              This is a sheet of paper.
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


        <Grid item  xs={5} md={5} >
          <Paper className={this.state.useStyles.paper}>
          <Typography variant="h5" component="h3">
              This is a sheet of paper.
          </Typography>
          <ChartDimension/>
  
          </Paper>
        </Grid>   

        
        <Grid item xs={3} md={3}>
          <Paper className={this.state.useStyles.paper} >
          <Typography variant="h5" component="h3">
              This is a sheet of paper.
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
