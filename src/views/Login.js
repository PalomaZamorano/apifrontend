import React, { Component }  from 'react';
import Paper from '@material-ui/core/Paper';
import { Grid } from '@material-ui/core';
import GoogleLogin from 'react-google-login';
import Typography from '@material-ui/core/Typography';
//redux
import {reduxForm } from 'redux-form';
import { signInAction } from '../actions/actionSign';
import { connect } from 'react-redux';


class Login extends Component {

  state = {
      validated : false,
      veri:false,
      mail:'',
      emailValid:false,
      token : false
  }
  
 

responseGoogle = async(response) => {
    
       // console.log(response.profileObj)
        localStorage.setItem('google', response.profileObj.imageUrl);
        localStorage.setItem('nombre', response.profileObj.name); 
        const userObject ={
            user_mail:response.profileObj.email
        }
            window.alert('Verificando...')
        await this.props.signInAction( userObject, this.props.history);
            const token = localStorage.getItem('token');
           // console.log(token)
        
            if (token === "false") {

                window.alert('El mail no se encuentra registrado')
                const auth2 = window.gapi.auth2.getAuthInstance() 
                auth2.signOut().then(
                    auth2.disconnect().then(this.props.onLogoutSuccess)
                )
            }
            else{
                window.alert('Bienvenido(a): ' + response.profileObj.name)
                window.location.href = "/portada";
            }
          
    console.log(response)
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

 return (
     <div style={{ marginTop:60 }}> 
        <Grid container spacing={0}
                alignItems="center"
                justify="center"    >

            <Grid item md={12} xs ={12}   >   
                <Paper  style={{ height:100 }} > 
                <Typography variant="h6" component="h2">
                    Ingresar con correo institucional
                </Typography>
                        <Grid item md={12} xs ={6}   > 
                            <GoogleLogin
                                clientId="71019110674-e1sd6ad8opdi7qdnjpjss6gkt4f8ffjh.apps.googleusercontent.com" 
                                buttonText="Entrar"
                                onSuccess={this.responseGoogle}
                                onFailure={this.responseGoogle}
                                cookiePolicy={'single_host_origin'}
                            />
                        </Grid>    
                    {this.errorMessage()}    
                </Paper>
            </Grid>
        </Grid>
        </div>
    );
  }  
    
}

function mapStateToProps(state) {
    return { errorMessage: state.auth.error };
   }
   
const reduxFormSignin = reduxForm({
     form: 'Login'
})(Login);
   

export default connect(mapStateToProps, {signInAction})(reduxFormSignin);
