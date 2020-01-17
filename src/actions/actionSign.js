import axios from 'axios';

export const AUTHENTICATED = 'authenticated_user';
export const UNAUTHENTICATED = 'unauthenticated_user';
export const AUTHENTICATION_ERROR = 'authentication_error';
export const LOGIN_PERMISSION = 'permision_user';



const URL = 'http://localhost:3000/verification/';

export function signInAction( mail , history) {
  return async (dispatch) => {
    const res = await axios.post(`${URL}`,mail);
    if(res.data.length > 0){

      dispatch({ type: AUTHENTICATED });
      localStorage.setItem('user', true);    
      localStorage.setItem('userId', res.data[0].id);
      localStorage.setItem('user_mail',res.data[0].user_mail);
      localStorage.setItem('user_rol',res.data[0].user_rol);
      localStorage.setItem('user_cargo',res.data[0].user_cargo);   
    } else {
      dispatch({
        type: AUTHENTICATION_ERROR,
        payload: 'El mail ingresado no se encuentra registrado'
      
      })
   }
  }
}