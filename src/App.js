import React, { Component }  from 'react';
import './App.css';
import Sidebar from './Sidebar';
import Login from './views/Login';



class App extends Component{
  constructor(props) {
    super(props);
    this.state={
      isloggin: false,
      user:[]
    }  

}

handleLog = (loggin) => {
  this.setState({isloggin: loggin});
}

handleUser = (loggin) => {
  this.setState({isloggin: loggin});
}

render(){ 

  if(this.state.isloggin===false){

    return (
      <div className="App">
        <header className="App-header">
          <Login onVarLogin={this.handleLog}/>
        </header>
        
      </div>
    );


  }
  else{
    return (
      <div className="App">
        <header className="App-header">
          <Sidebar/>
        </header>
        
      </div>
    );
    } 
  }
  
}  

export default App;
