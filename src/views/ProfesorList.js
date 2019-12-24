import React, {Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

import axios from 'axios';


class Profesors extends Component {
    
    constructor(props){

        
        

        super(props);
        this.state={
          ready:false,
          profesors:[],
          rowsPerPage: 15,  
          page:  0,
          useStyles : makeStyles({
            root: {
              width: '100%',
            },
            container: {
              maxHeight: 400,
            },
          }),

        
        rows2:[] ,

        columns2: [
            
                { id: 'name', label: 'Name', minWidth: 300, align: 'left' },
                { id: 'Perfil', label: 'Perfil', minWidth: 50 , align: 'right'},
                {
                  id: 'Resultados por curso',
                  label: 'Resultados por curso',
                  minWidth: 170,
                  align: 'right',
                }
             ] 
            
        }
      }


componentDidMount() {

        axios.get(`http://localhost:3000/profesors.json`)
        .then(res => {
          const profesors = res.data;
        
          if(profesors.length !== 0){
            this.state.rows2.push(profesors.map((profesor,index) =>  
            this.createData2(profesor.prof_nombre_corto)
            )
            );
          }
            const ready = true;  
            this.setState({ ready });
         
        })
} 


createData2(name) {
    return { name};
  } 

  
handleChangePage = (event, page) => {
    this.setState({ page });
      };
    
handleChangeRowsPerPage = event => {

    this.setState({ rowsPerPage: event.target.value });
      };      

render(){

    const { rowsPerPage, page } = this.state;
    if(this.state.ready === false){
        
        return(
          <div>
             <CircularProgress size={150} color="secondary" />
          </div>
    
        )
    
    }
    else{
       
        return (
            <div   style = {{height:620}} >
            <Paper className={this.state.useStyles.root}>
            <Grid container style = {{marginTop : 60}} >
            <Grid item  xs={12} md={12} >
                <Table stickyHeader aria-label="sticky table" size="small" style = {{width :640}}>
                <TableHead>
                    <TableRow>
                    {this.state.columns2.map(column => (
                        <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                        >
                        {column.label}
                        </TableCell>
                    ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {this.state.rows2[0].slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                    return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={row.id} >
                        {this.state.columns2.map(column => {
                            const value = row[column.id];
                            return (
                            <TableCell key={column.id} align={column.align}  style={{ fontSize:13 }}>
                                {column.format && typeof value === 'number' ? column.format(value) : value}
                            </TableCell>
                            );
                        })}
                        </TableRow>
                    );
                    })}
                </TableBody>
                </Table>
             <TablePagination
                rowsPerPageOptions={[]}
                component="div"
                count={this.state.rows2[0].length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={this.handleChangePage}
                onChangeRowsPerPage={this.handleChangeRowsPerPage}
             />

            </Grid>
            </Grid> 
            </Paper>
            </div>
  );

        } 
    }
}


export default Profesors;

