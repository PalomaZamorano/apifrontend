import { UNAUTHENTICATED } from './actionSign';


export function signOutAction() {
  localStorage.removeItem('user_name');
  localStorage.removeItem('userId');
  localStorage.removeItem('user_rol');
  localStorage.removeItem('user_cargo');
  /*localStorage.clear();*/
  console.log(localStorage.getItem('user_name'));
  return {
    type: UNAUTHENTICATED
  };
}