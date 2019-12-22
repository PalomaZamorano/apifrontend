import React from 'react';
import { Theme, createStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme:Theme) =>
  createStyles({
    card: {
      display: 'flex',
      justifyContent:'center', 
      alignItems:'center', 
      height: '80vh',
      width: '136vh'
      
    
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
    },
    content: {
      flex: '1 0 auto',
      width: 300,
      minHeight: 100,
      
    },
    cover: {
      width: 700,
      minHeight: 50,
      minWidth: 50,
      height: '90vh'

    },
    button: {
      justifyContent: "flex-end",

    }
  }),
);

export default function Dashboard() {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Grid container spacing={3}>
    <Grid item xs={12}>
    <Card className={classes.card}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            Bienvenido/a
          </Typography>
          <br/>
          <Typography variant="subtitle1" color="textSecondary">
            A continuación podrás conocer todas las estádisticas relacionadas a los resultados
            de la encuesta docente por profesor, coordinacion y curso. Cantidad de encuestas, últimas notas por dimensión del profesor durante el semestre, entre otros.
          </Typography>
          <br/> 
          <Button className={classes.button} variant="contained" color="primary" href="/inicio">Comenzar</Button>
        </CardContent>
        
      </div>
      <CardMedia
        className={classes.cover}
        image="http://lanacion.cl/wp-content/uploads/2018/02/usach.jpg"
      />
    </Card>
    </Grid>
    </Grid>
    
  );
}