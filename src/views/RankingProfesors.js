import React, { Component }  from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import CircularProgress from '@material-ui/core/CircularProgress';



 


class Ranking extends Component {

  _isMounted = false;
  state = {
    profesors: [],
    sums: []
  }
  
  componentDidMount() {
    this._isMounted = true;

    const rol = localStorage.getItem('user_cargo');
    if(rol === '1'){

      axios.get(`http://localhost:3000/profesorsRankingCivil.json`)
      .then(res => {
        const profesors = res.data;
        if (this._isMounted) {
          this.setState({ profesors });
        }
        
      })

    }
    if(rol === '3'){

      axios.get(`http://localhost:3000/profesorsRankingEjecu.json`)
      .then(res => {
        const profesors = res.data;
        if (this._isMounted) {
          this.setState({ profesors });
        }
        
      })



    }
    else{
        axios.get(`http://localhost:3000/profesorsRanking.json`)
        .then(res => {
          const profesors = res.data;
          if (this._isMounted) {
            this.setState({ profesors });
          }
          
        })
    }
  }   

  componentWillUnmount() {
    this._isMounted = false;
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