import React, { Component }  from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import Paper from '@material-ui/core/Paper';
import { Grid } from '@material-ui/core';
import GoogleLogin from 'react-google-login';
import { GoogleLogout } from 'react-google-login';
//import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
//redux
import { Field, reduxForm } from 'redux-form';
import { signInAction } from '../actions/actionSign';
import { connect } from 'react-redux';




 


class Login extends Component {

  state = {
      validated : false,
      veri:false,
      mail:'',
      emailValid:false
  }
  
 

handleSubmit = (values) => {    
    console.log(values)
    if (!values.user_mail ) {
        window.alert('Debe ingresar el mail institucional')
    }
   else{
     this.props.signInAction(values, this.props.history);
     const veri = true
     window.alert('Redirigiendo...')
     this.setState({veri})
     
    }  
};

handleChange = event => {
    const mail = event.target.value
    console.log(mail)
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

errorMessage() {
    if (this.props.errorMessage) {
      return (
        <div className="info-red">
          {this.props.errorMessage}
        </div>
      );
    }
  }


render(){

 const { handleSubmit } = this.props;  
    
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
                <Paper > 
                <Typography variant="h6" component="h2">
                    Ingresar con correo institucional
                </Typography>
                    <br/>
                    <Field name="user_mail"
                           component="input"
                            type="text"
                            placeholder="Ingrese mail" 
                    />
                    <br/>
                    <br/>
                    <Button variant="outline-secondary" size="sm" onClick = {handleSubmit(this.handleSubmit)}>
                        Enviar    
                    </Button>
                    {this.errorMessage()}    
                </Paper>
            </Grid>
        </Grid>
        </div>
    );
  }  
    }
}

function mapStateToProps(state) {
    return { errorMessage: state.auth.error };
   }
   
const reduxFormSignin = reduxForm({
     form: 'Login'
})(Login);
   

export default connect(mapStateToProps, {signInAction})(reduxFormSignin);
