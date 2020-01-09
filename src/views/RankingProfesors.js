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
    <Table striped hover bordered size="sm"  style={{  height: "100% " ,width: "100% "}}>
      <thead> 
      <tr>
      <th style={{ fontSize:18 }} >#</th>
      <th  style={{ fontSize:18 }} >   Nombre</th>
      <th style={{ fontSize:18 }} >Promedio dimensiones</th>
      </tr>
      </thead>

      { this.state.profesors.map((profesor,index) =>   
      <tbody  key={profesor.id}>
      <tr>
      <td style={{ fontSize:15 }}>{index+1}</td>
      <td  style={{ fontSize:15 }} >{profesor.prof_nombre_corto}</td>
      <td style={{ fontSize:15 }} >{(profesor.prof_proms_results*1).toFixed(2)}</td>
      </tr>
      </tbody>)}

    </Table>
   
  </div>
  );
    }

}

  

}

export default Ranking;