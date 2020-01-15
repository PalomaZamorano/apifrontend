import React, { Component }  from 'react';
import axios from 'axios';
import MaterialTable,{MTableToolbar} from 'material-table'
import CircularProgress from '@material-ui/core/CircularProgress';
import {FaQuestionCircle}  from "react-icons/fa";
import Tooltip from '@material-ui/core/Tooltip'
import {Button } from 'react-bootstrap';




 


class Notify extends Component {

  state = {
    results: [],
    sums: [],
    rows2: []
  }
  
  componentDidMount() {

    axios.get(`http://localhost:3000/profsInfo.json`)
    .then(res => {
      const results = res.data;
      console.log(results)
       this.state.rows2.push(results.map((result,index) =>
            
            this.createData1(index,result.prof_nombre_corto,result.prof_e_mail,result.prof_proms_d1,
                result.prof_proms_d2,result.prof_proms_d2,result.prof_proms_d3,result.prof_proms_d4,result.prof_proms_results)
            )
         );
      this.setState({ results });
       
    })
  }   

  createData1(index,name,mail,d1,d2,d3,d4,prom) {

    return {index,name,mail,d1,d2,d3,d4,prom};
} 

  

render(){
  
  if(this.state.results.length === 0){  
    return(
      <div>
         <CircularProgress color="secondary" />
      </div>
    )

  }
  else{

        return (
        <MaterialTable 
          columns={[
            { title: 'Nombre', field: 'name' },
            { title: 'Mail', field: 'mail' },
            { title: 'D1', field: 'd1' },
            { title: 'D2', field: 'd2' },
            { title: 'D3', field: 'd3' },
            { title: 'D4', field: 'd4' },
            { title: 'Promedio', field: 'prom' }

          ]}
          data={this.state.rows2[0]}
          components={{
            Toolbar: props => (
              <div>
                <MTableToolbar {...props} />
                <div >
                <Tooltip title="D1:Planificación de actividades docentes  
                                D2:Ejecución de actividades docentes 
                                D3:Evaluación de aprendizajes 
                                D4:Relación con los estudiantes" 
                        placement="top" style ={{fontSize: 20}}> 
                            <Button  variant="outline-secondary" size="sm"  
                            style={{float: 'right', marginRight:20}} >
                                <FaQuestionCircle  style={{ fontSize: '1.50em' }}/>
                            </Button>
                        </Tooltip> 
                        <br/> 
                </div>
              </div>
            ),
          }}
          options={{
            sorting: true
          
          }}
          title="Detalle profesores con nota menor a 3.5"
          
        />
        
        );
 }

}

  

}

export default Notify;