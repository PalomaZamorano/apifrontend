import React from 'react';
import { Theme, createStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';


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
      
    },
    cover: {
      width: 700,
      minHeight: 100,
      height: '90vh'

    },
    controls: {
      display: 'flex',
      alignItems: 'center',
      paddingLeft: theme.spacing(10),
      paddingBottom: theme.spacing(10),
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
          <Typography variant="subtitle1" color="textSecondary">
            
          </Typography>
        </CardContent>
        
      </div>
      <CardMedia
        className={classes.cover}
        image="http://lanacion.cl/wp-content/uploads/2018/02/usach.jpg"
        title="Live from space album cover"
      />
    </Card>
    </Grid>
    </Grid>
    
  );
}