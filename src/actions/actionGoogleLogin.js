
export const AUTHENTICATED = 'authenticated_user';
export const UNAUTHENTICATED = 'unauthenticated_user';
export const AUTHENTICATION_ERROR = 'authentication_error';
export const LOGIN_PERMISSION = 'permision_user';



const URL = 'http://localhost:3000/verification/';

export function signInGoogle( mail , history) {
  return async (dispatch) => {
    const res = await axios.post(`${URL}`,mail);
    if(res.data.length > 0){
  //    console.log(res.data.profileObj)
      dispatch({ type: AUTHENTICATED });
      localStorage.setItem('userGoogle', true);
      localStorage.setItem('userPerfil', res.data.profileObj); 
         
      
    } else {
      dispatch({
        type: AUTHENTICATION_ERROR,
        payload: 'El mail ingresado no se encuentra registrado'
      
      })
   }
  }
}