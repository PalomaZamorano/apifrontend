import React, { Component }  from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import Paper from '@material-ui/core/Paper';
import { Grid } from '@material-ui/core';
import GoogleLogin from 'react-google-login';
import { GoogleLogout } from 'react-google-login';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';



 


class Login extends Component {

  state = {
      validated : false,
      veri:false,
      mail:'',
      emailValid:false
  }
  
 

verify(email){
    const verify ={
        user_mail : email
    }
    axios.post('http://localhost:3000/verification/', verify)
    .then(res => {
          console.log(res.data)
          if(res.data.length > 0){  
            const veri = true
            window.alert('Redirigiendo...')
            this.setState({veri})

          } 
        
    })
    
}


handleSubmit = event => {    
    if (this.state.mail === "" ) {
        window.alert('Debe ingresar el mail institucional')
        event.preventDefault();
        event.stopPropagation();
    }
    else{
      this.setState({ validated: true });  
      this.verify(this.state.mail);
    }  
};

handleChange = event => {
    const mail = event.target.value
    this.setState({mail});
  };

responseGoogle = (response) => {
    window.alert('Bienvenido(a)')
    const test = true;
    this.props.onVarLogin(test);
    this.props.onUser(response.profileObj);
    console.log(response.profileObj);

 }

logout = (response) => {
    window.alert('Se ha cerrado la sesión con éxito')
    console.log(response);
}
render(){
    
 if(this.state.veri === true){
  return(
    <div style={{ marginTop:60 }}> 
        <Grid container spacing={0}
                alignItems="center"
                justify="center"    >

            <Grid item md={12} xs ={12}   >   
                <Paper style = {{height:190,width:300}}> 
                <Typography variant="h6" component="h2">
                    Ingresar con correo institucional
                </Typography>
                <br/>
                <Grid item md={12} xs ={6}   > 
                    <GoogleLogin
                        clientId="71019110674-e1sd6ad8opdi7qdnjpjss6gkt4f8ffjh.apps.googleusercontent.com" 
                        buttonText="Entrar"
                        onSuccess={this.responseGoogle}
                        onFailure={this.responseGoogle}
                        cookiePolicy={'single_host_origin'}
                    />
                </Grid>    
                <Grid item md={12} xs ={6}   >  
                 <GoogleLogout
                        clientId="71019110674-e1sd6ad8opdi7qdnjpjss6gkt4f8ffjh.apps.googleusercontent.com"
                        buttonText="Salir"
                        onLogoutSuccess={this.logout}
                    >
                    </GoogleLogout>
                </Grid>    
                
                </Paper>
            </Grid>
        </Grid>
        </div>
      )   

 }
 else{

    return (

        <div style={{ marginTop:60 }}> 
        <Grid container spacing={0}
                alignItems="center"
                justify="center"    >

            <Grid item md={12} xs ={12}   >   
                <Paper style = {{height:190,width:300}}> 
                <Typography variant="h6" component="h2">
                    Ingresar con correo institucional
                </Typography>
                    <br/>
                    <TextField
                        id="filled-multiline-flexible"
                        label="Mail"
                        value={this.state.mail}
                        onChange={this.handleChange}
                        variant="outlined"
                    />
                    <br/>
                    <br/>
                    <Button variant="outline-secondary" size="sm" onClick = {this.handleSubmit}>
                        Enviar    
                    </Button>
                </Paper>
            </Grid>
        </Grid>
        </div>
    );
  }  
    }
}

export default Login;