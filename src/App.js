import React, { Component }  from 'react';
import './App.css';
import Sidebar from './Sidebar';



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

handleUser = (userlog) => {
  const user = userlog
  this.setState({user});
}

render(){ 

    return (
      <div className="App">
        <header className="App-header">
          <Sidebar/>
        </header>
        
      </div>
    );
    } 

}  

export default App;
