import { UNAUTHENTICATED } from './actionSign';


export function signOutAction() {
  localStorage.removeItem('token');
  localStorage.removeItem('user_name');
  localStorage.removeItem('userId');
  localStorage.removeItem('user_rol');
  localStorage.removeItem('user_cargo');
  localStorage.removeItem('google');
  localStorage.removeItem('userPerfil');
  localStorage.removeItem('userGoogle');
  console.log('adios...');
  /*localStorage.clear();*/
  
  return {
    type: UNAUTHENTICATED
  };
}