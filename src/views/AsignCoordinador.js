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
          profs:[],
          index: 0,
          nombre:""
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

    const id = this.state.asignaturas[this.state.index].id;
    const nombre = this.state.asignaturas[this.state.index].asign_nombre;

    //console.log(this.state.id)
    const asign = {
      asign_coordinadores : nombres
      };

    if( this.state.selectedProfesors.length === 0){
      window.alert("Seleccione profesor(es) a asignar")
    }
    else{

        if (window.confirm('¿Está seguro/a que desea asignar a ' + this.state.profs + ' a la asignatura ' + nombre + '?')){ 
              axios.put('http://localhost:3000/asignaturas/' + id + '.json',  asign )
                .then(res => {
                  window.alert("Se ha asignado con éxito");
                  
                  this.setState({ show: false, selectedProfesors: [] });
                })

            }
    }    
}

handleChange = event => {
  this.setState({index:event.target.value});
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
          <Grid container style = {{marginTop : 60}}  
            direction="column"
            alignItems="center"
            justify="center"
          >
          <Grid item  xs={8} md={12}  >
            <Paper >
            <Typography variant="h6" component="h2">
              Asignar Coordinador(es) a una asignatura
            </Typography> 
            <br/>
            {/* Grida 1 */}  
            <Grid item  xs={12} md={12}  >     
                <FormControl>
                    <InputLabel id="asign-native-simple">Asignatura</InputLabel>
                        <Select
                        native
                        value={this.state.index}
                        onChange={this.handleChange}
                        inputProps={{
                            name: 'Asignaturas',
                            id: 'asign-native-simple',
                        }}
                        >    
                            {this.state.asignaturas.map((asignatura,index) => (
                              <option key={asignatura.id} value={index}>
                                {asignatura.asign_nombre} - {asignatura.asign_code}
                              </option>
                              
                            ))}
                        </Select>
                    <FormHelperText>Seleccione la asignatura a la que desea asignar coordinador(es)</FormHelperText>
                </FormControl>
            </Grid>
            <br/>
            {/* Grida 2 */}
            <Grid item  xs={12} md={12} style={{width:300}}>    
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
            <br/>
            <Grid item  xs={8} md={10}> 
            <Button   onClick={() => this.asign(this.state.profs)} size="sm" variant="outline-primary" style={{float:''}}>
                Asignar
              </Button>
              </Grid>
            <br/>
            </Paper> 
            </Grid>            
          </Grid> 
              
          </div>
          )
        }
  }
}

export default AsigCoordinador;