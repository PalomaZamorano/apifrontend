import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
//select
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import  {Button}  from 'react-bootstrap';




import Tooltip from '@material-ui/core/Tooltip';


class AsigCoordinador extends Component {

    constructor(props){
        super(props);
        this.state={
          ready:false,
          id:0,
          MenuProps : {
            PaperProps: {
              style: {
                maxHeight: 48 * 4.5 + 8,
                width: 250,
              },
            },
          },
          asignaturas:[],
          profesores:[],
          selectedProfesors:[],
          profs:[]
        }
    }       



componentDidMount() {

    axios.get(`http://localhost:3000/asignaturas.json`)
        .then(res => {
          const asignaturas = res.data;
          this.setState({asignaturas});
          
          axios.get(`http://localhost:3000/profesors.json`)
            .then(res => {
            const profesors = res.data;
            const ready = true
            profesors.map(profesor =>
                this.state.profesores.push(profesor.prof_nombre_corto)
            )
            
            this.setState({ready});
            //console.log(this.state.profesores)
        })
         
        })
       
} 

asign(nombres){

    console.log(this.state.id)
    const asign = {
      asign_coordinadores : nombres
      };
    
      console.log(asign)
      if (window.confirm('¿Está seguro/a que desea asignar?')){ 

          axios.put('http://localhost:3000/asignaturas/' + this.state.id + '.json',  asign )
            .then(res => {
              window.alert("Se ha asignado con éxito");
              this.setState({ show: false });
            })

        }
}

handleChange = event => {
  this.setState({id: event.target.value}); 
}

handleChangeSelect = event => {
    if(event.target.value.length>1){
      const profs = event.target.value[0] + " - " + event.target.value[1]
      this.setState({selectedProfesors: event.target.value,profs }); 
    }
    else{
      this.setState({ selectedProfesors: event.target.value, profs: event.target.value[0] });
    }  
}; 
   
  render() {
 

    if(this.state.ready === false){
    
        return(
          <div>
             <CircularProgress size={90} color="secondary" />
          </div>
  
        )
  
      }
      else{
        return (
          <div style = {{height:'100%'}} >
          <Grid container style = {{marginTop : 60}} >
            <Paper>
            <Typography variant="h6" component="h2">
              Asignar Coordinadores a una asignatura
            </Typography>  

            {/* Grida 1 */}  
            <Grid item  xs={12} md={12} >     
                <FormControl>
                    <InputLabel id="asign-native-simple">Asignatura</InputLabel>
                        <Select
                        native
                        value={this.state.id}
                        onChange={this.handleChange}
                        inputProps={{
                            name: 'Asignaturas',
                            id: 'asign-native-simple',
                        }}
                        >
                            {this.state.asignaturas.map((asignatura,index) => (
                            <option key={index} value={asignatura.id}>
                            {asignatura.asign_nombre} - {asignatura.asign_code}
                            </option>
                            ))}
                        </Select>
                    <FormHelperText>Seleccione la asignatura a la que desea asignar coordinador(es)</FormHelperText>
                </FormControl>
            </Grid>
            
            {/* Grida 2 */}
            <Grid item  xs={12} md={12} >    
              {this.state.profesores.length>0 ?                  
                    <FormControl>
                    <InputLabel id="profs-native-simple">Profesores</InputLabel>
                    <Select
                    labelId="demo-mutiple-checkbox-label"
                    id="demo-mutiple-checkbox"
                    multiple
                    value={this.state.selectedProfesors}
                    onChange={this.handleChangeSelect}
                    input={<Input />}
                    renderValue={selected => selected.join(', ')}
                    MenuProps={this.state.MenuProps}
                    >
                    {this.state.profesores.map((profesor,index) => (
                        <MenuItem key={index} value={profesor}>
                        <Checkbox checked={this.state.selectedProfesors.indexOf(profesor) > -1} />
                        <ListItemText primary={profesor} />
                        </MenuItem>
                    ))}
                    </Select>
                    <FormHelperText>Seleccione hasta dos coordinadores que desee asignar</FormHelperText>
                    </FormControl>:<div></div>}
                

            </Grid>
            <Button   onClick={() => this.asign(this.state.profs)} size="sm" variant="outline-primary">
                Asignar
              </Button>
            </Paper>             
          </Grid> 
              
          </div>
          )
        }
  }
}

export default AsigCoordinador;