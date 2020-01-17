
export const AUTHENTICATED = 'authenticated_user';
export const UNAUTHENTICATED = 'unauthenticated_user';
export const AUTHENTICATION_ERROR = 'authentication_error';
export const LOGIN_PERMISSION = 'permision_user';



const URL = 'http://localhost:3000/verification/';

export function signInGoogle( mail , history) {
  return async (dispatch) => {
    const res = await axios.post(`${URL}`,mail);
    if(res.data.length > 0){

      dispatch({ type: AUTHENTICATED });
      localStorage.setItem('userGoogle', true);    
      
    } else {
      dispatch({
        type: AUTHENTICATION_ERROR,
        payload: 'El mail ingresado no se encuentra registrado'
      
      })
   }
  }
}