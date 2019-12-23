import React, { Component }  from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import CircularProgress from '@material-ui/core/CircularProgress';



 


class Ranking extends Component {

  state = {
    profesors: [],
    sums: []
  }
  
  componentDidMount() {

    axios.get(`http://localhost:3000/profesorsRanking.json`)
    .then(res => {
      const profesors = res.data;
      this.setState({ profesors });
       
    })
  }   
  

render(){
  
  if(this.state.profesors.length === 0){
    
    return(
      <div>
         <CircularProgress color="secondary" />
      </div>

    )

  }
  else{

  return (

    <div> 
    { this.state.profesors.reverse().map((profesor,index) => 
    <Table striped hover size="sm"  style={{  height: "100% " ,width: "100% "}}>
      <thead>
      <tr>
      <th style={{ fontSize:13 }} >#</th>
      <th  style={{ fontSize:13 }} >   Nombre</th>
      <th style={{ fontSize:13 }} >Promedio dimensiones</th>
      </tr>
      </thead>
      <tbody>
      <tr>
      <td style={{ fontSize:13 }}>{index+1}</td>
      <td  style={{ fontSize:13 }} >{profesor.prof_nombre_corto}</td>
      <td style={{ fontSize:13 }} >{profesor.prof_proms_results}</td>
      </tr>
      </tbody>
    </Table>
   )}
  </div>
  );
    }

}

  

}

export default Ranking;