import React, { Component } from 'react';
import SideNav, { NavItem, NavIcon} from '@trendmicro/react-sidenav';
import { Navbar, Image,Nav,NavDropdown,Button} from 'react-bootstrap';
import {CSSTransition} from 'react-transition-group';
import { FaChalkboardTeacher}  from "react-icons/fa";
import { IoIosStats}  from "react-icons/io";
import { IoMdApps}  from "react-icons/io";
import {Redirect, BrowserRouter as Router, Route} from "react-router-dom";
import './Sidebar.css';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import Dashboard from './views/Dashboard';
import ProfesorsList from './views/ProfesorList2';
import Asignaturas from './views/Asignaturas';
import Estadistica from './views/Estadistica';
import Perfil from './views/Perfil';
import CursoDetalle from './views/CursoDetalle';
import Inicio from './views/Inicio';
import AsignCoord from './views/AsignCoordinador';
import AdministrarProfs from './views/AdminProfesores';
import AdministrarUsuarios from './views/AdminUsers';
import Login from './views/Login';
import Tooltip from '@material-ui/core/Tooltip';
//import Test from './views/Estadistica2';
import { FaRegUserCircle } from "react-icons/fa";
import { FaUserCog } from "react-icons/fa";
import { IoMdNotificationsOutline } from "react-icons/io";
import Notify from './views/Notify.js';
import Badge from '@material-ui/core/Badge';
import axios from 'axios';
//Redux
import {Provider} from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import reduxThunk from 'redux-thunk';
import requireAuth from './hoc/requireAuth';
import { AUTHENTICATED } from './actions/actionSign';
import { GoogleLogout } from 'react-google-login';
import { signOutAction } from './actions/signOutLogin';





const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store1 = createStoreWithMiddleware(reducers);
const user = localStorage.getItem('token');
//console.log(user)
if(user ) {
  store1.dispatch({ type: AUTHENTICATED });
}

class SideBar extends Component{
    _isMounted = false;
    constructor(props){
        super(props);
        
        this.state={
         select: false,  
         style : {
                position: 'absolute',
                cantidad:0,
                top: 0,
                left: 54,
                right: 0,
                alignItems: 'center',
                backgroundColor: "#2859DE",
                borderBottomColor: '#eee',
                borderColor: 'transparent',
                borderWidth: 1,
                justifyContent: 'center',
                height: 44,
                flexDirection: 'row'
            }
            
        }
      }
      

         
    componentDidMount() {
        this._isMounted = true;

        axios.get(`http://localhost:3000/profsInfo.json`)
        .then(res => {
          const results = res.data;
          const cantidad = results.length
          if (this._isMounted) {
            this.setState({ cantidad });
          }  
           
        })
    }  

    componentWillUnmount() {
      this._isMounted = false;
    }  

    logout = (response) => {
      window.alert('Se ha cerrado la sesión con éxito')
      signOutAction() 
      window.location.href = "/login";
    }


    Change() {
      if (this.state.select === false){  
        this.setState({
          select : true,    
          style: {
            position: 'fixed',
            backgroundColor: "#2859DE",
            top: 0,
            left: 240,
            right: 0,
            alignItems: 'center',
            borderWidth: 1,
            justifyContent: 'center',
            height: 44,
            flexDirection: 'row'
          }
        });
        
        }
      else{

        this.setState({
            select : false,    
            style: {
              position: 'fixed',
              backgroundColor: "#2859DE",
              top: 0,
              left: 54,
              right: 0,
              alignItems: 'center',
              borderWidth: 1,
              justifyContent: 'center',
              height: 44,
              flexDirection: 'row'
            }
          });              
      }  
    }

    rol(cargo){

      if(cargo === '0'){
        cargo = "Subdirector(a)"
      }
      if(cargo === '1'){
          cargo = "Jefe(a) de carrera: civil"
      }
      if(cargo === '3'){
        cargo = "Jefe(a) de carrera: ejecución"
      }
      if(cargo === '2'){
          cargo = "Coordinador(a) docente"
      } 
      return cargo
    }

    render() {
       const viewHeigth = window.outerHeight;
       const image = localStorage.getItem('google');
       const rol = this.rol(localStorage.getItem('user_cargo'));
       const rol2 = localStorage.getItem('user_rol');
       const name =  localStorage.getItem('nombre');
      return (
        <div className="shopping-list">

        <div className = "nav" >

        <CSSTransition
            in={this.state.select}
            timeout={15}
            classNames="display"
            
        >   
        
        <Navbar  variant="dark" collapseOnSelect  style={this.state.style} >
      <Navbar.Brand  href="/portada" >Departamento de Ingeniería Informática - {rol}</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
          
            {user && rol2 === '0' ?

            
            <Tooltip title="Administrar" placement="left" style ={{fontSize: 20}}> 
            <Nav.Item className="ml-auto">
                  <NavDropdown             
                    title={<FaUserCog style ={{color: '#FFFFFF'}} />} 
                    id="nav-dropdown">
                    <NavDropdown.Item  href="/adminusers" style ={{fontSize: 15}}>Usuarios</NavDropdown.Item>
                    <NavDropdown.Item href="/admprofs" style ={{fontSize: 15}} > Profesores </NavDropdown.Item>
                    <NavDropdown.Item href="/asigncoord" style ={{fontSize: 15}} > Asignar Coordinación </NavDropdown.Item>
                  </NavDropdown>
            </Nav.Item>
            </Tooltip>
            : <div></div>}

            {user  && rol2 === '0'?
            <Nav.Item>
              <Tooltip title={`Hay ${this.state.cantidad} profesores(as) con nota inferior a 3.5`} placement="top" style ={{fontSize: 20}}> 
                <Nav.Link  href="/detalleNotify" style={{ color: '#FFFFFF' }} >
                  <Badge badgeContent={this.state.cantidad} color="secondary">
                    <IoMdNotificationsOutline  />
                  </Badge>
                </Nav.Link>
              </Tooltip>
            </Nav.Item>  : <div></div>}

            {user  && rol2 === '1'?
            <Nav.Item className="ml-auto">
              <Tooltip title={`Hay ${this.state.cantidad} profesores(as) con nota inferior a 3.5`} placement="top" style ={{fontSize: 20}}> 
                <Nav.Link  href="/detalleNotify" style={{ color: '#FFFFFF' }} >
                  <Badge badgeContent={this.state.cantidad} color="secondary">
                    <IoMdNotificationsOutline  />
                  </Badge>
                </Nav.Link>
              </Tooltip>
            </Nav.Item>  : <div></div>}

          {image ? 
            <Nav.Item>
              <Tooltip title={`Cerrar sesión - ${name}`} placement="top" style ={{fontSize: 20}}>   
                <Nav.Link >
                <GoogleLogout
                        clientId="71019110674-e1sd6ad8opdi7qdnjpjss6gkt4f8ffjh.apps.googleusercontent.com"
                        render={renderProps => (
                          <Button onClick={renderProps.onClick} disabled={renderProps.disabled} variant="linkt"
                            style={{backgroundColor: "#2859DE", color: "#2859DE"}}>
                            <Image src={image} roundedCircle   style ={{width:40,height:30}}/>
                          </Button>
                        )}
                        buttonText="Salir"
                        onLogoutSuccess={this.logout}
                 >
                </GoogleLogout>
                </Nav.Link>
              </Tooltip>
            </Nav.Item>
            :
            <Nav.Item  className="ml-auto">
            <Tooltip title="Iniciar Sesión" placement="top" style ={{fontSize: 20}}> 
              <Nav.Link  href="/login" style={{ color: '#FFFFFF' }} >
                  <FaRegUserCircle  />
              </Nav.Link>
            </Tooltip>
          </Nav.Item>}

           


            </Navbar.Collapse>
        </Navbar>
        
        </CSSTransition>

        </div> 

       
        <div >
        <Provider store = {store1}>    
          <Router>
            <Route render={({ location, history }) => (
             <React.Fragment>
             <SideNav id="side-nav"
                    style={{backgroundColor: "#2859DE", height:viewHeigth}}
                    onSelect={(selected) => {
                        const to = '/' + selected;
                        if (location.pathname !== to) {
                        history.push(to);
                        }
                    }}
             >
               


              {!user ? 
                
                <SideNav.Nav >
                  <Image src={require('./Icono.png')} rounded   style ={{width:45,height:40, marginTop:5}}/>
                  </SideNav.Nav>
              
                 :
                
                <SideNav.Nav >
                <Image src={require('./Icono.png')} rounded   style ={{width:45,height:40, marginTop:5}}/>
                <NavItem eventKey="inicio"> 
                <Tooltip title="Generales" placement="right-start" style ={{fontSize: 20}}> 
                    <NavItem>     
                        <NavIcon>
                        <IoIosStats style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                    </NavItem >
                 </Tooltip> 
                 </NavItem > 


                 <NavItem eventKey="profesores"> 
                <Tooltip title="Profesores" placement="right-start" style ={{fontSize: 20}}>     
                    <NavItem>
                        <NavIcon>
                        <FaChalkboardTeacher style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                    </NavItem>
                </Tooltip> 
                 </NavItem >


                 <NavItem eventKey="asignaturas"> 
                <Tooltip title="Asignaturas" placement="right-start" style ={{fontSize: 20}}>     
                    <NavItem>
                        <NavIcon>
                        <IoMdApps style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                    </NavItem>
                </Tooltip> 
                 </NavItem >
                 </SideNav.Nav> 
                 }

                
             </SideNav>
             
            <main>
            
             <Route path="/inicio" component={requireAuth(props => <Inicio/>)} />
             <Route path="/profesores" component={requireAuth(props => <ProfesorsList/>)} />
             <Route path="/portada" component={requireAuth(props => <Dashboard/>)} />
             <Route path="/estadistica" component={requireAuth(props => <Estadistica location={props.location}/>)} />
             <Route path="/perfil" component={requireAuth(props => <Perfil location={props.location}/>)} />
             <Route path="/asignaturas" component={requireAuth(props => <Asignaturas/>)} />
             <Route path="/admprofs" component={requireAuth(AdministrarProfs)} />
             <Route path="/cursosDetalle" component={requireAuth(props => <CursoDetalle location={props.location}/>)} />
             <Route path="/adminusers" component={requireAuth(AdministrarUsuarios)} />
             <Route path="/asigncoord" component={requireAuth(AsignCoord)}/>
             <Route path="/detalleNotify" component={requireAuth(Notify)} />
             <Route path="/login" component={props => <Login/>} />
             <Route exact path="/">
                 <Redirect to="/portada" /> 
             </Route>
            
             
                
            </main>
        </React.Fragment>
         )}
         />


       
        </Router>
        </Provider>
        </div>              


        </div>
      );
    }
  }

export default SideBar;
