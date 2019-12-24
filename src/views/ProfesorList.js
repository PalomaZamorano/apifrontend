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
import axios from 'axios';


class Profesors extends Component {
    
    constructor(props){

        
        

        super(props);
        this.state={
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

        rows : [
            this.createData('India', 'IN', 1324171354, 3287263),
            this.createData('China', 'CN', 1403500365, 9596961),
            this.createData('Italy', 'IT', 60483973, 301340),
            this.createData('United States', 'US', 327167434, 9833520),
            this. createData('Canada', 'CA', 37602103, 9984670),
            this.createData('Australia', 'AU', 25475400, 7692024),
            this.createData('Germany', 'DE', 83019200, 357578),
            this.createData('Ireland', 'IE', 4857000, 70273),
            this.createData('Mexico', 'MX', 126577691, 1972550),
            this.createData('Japan', 'JP', 126317000, 377973),
            this.createData('France', 'FR', 67022000, 640679),
            this.createData('United Kingdom', 'GB', 67545757, 242495),
            this.createData('Russia', 'RU', 146793744, 17098246),
            this.createData('Nigeria', 'NG', 200962417, 923768),
            this.createData('Brazil', 'BR', 210147125, 8515767),
          ],

        columns : [
            { id: 'name', label: 'Name', minWidth: 170 },
            { id: 'code', label: 'ISO\u00a0Code', minWidth:50 },
            {
              id: 'population',
              label: 'Population',
              minWidth: 170,
              align: 'right',
              format: value => value.toLocaleString(),
            },
            {
              id: 'size',
              label: 'Size\u00a0(km\u00b2)',
              minWidth: 170,
              align: 'right',
              format: value => value.toLocaleString(),
            },
            {
              id: 'density',
              label: 'Density',
              minWidth: 170,
              align: 'right',
              format: value => value.toFixed(2),
            },
          ]
            
          

            
        }
      }



createData(name, code, population, size) {
        const density = population / size;
        return { name, code, population, size, density };
      }  
 
handleChangePage = (event, page) => {
    this.setState({ page });
      };
    
handleChangeRowsPerPage = event => {

    this.setState({ rowsPerPage: event.target.value });
      };      

render(){

    const { rowsPerPage, page } = this.state;
    

  return (
    <div   style = {{height:620}} >
    <Paper className={this.state.useStyles.root}>
     <Grid container style = {{marginTop : 60}} >
     <Grid item  xs={12} md={12} >
        <Table stickyHeader aria-label="sticky table" size="small">
          <TableHead>
            <TableRow>
              {this.state.columns.map(column => (
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
            {this.state.rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {this.state.columns.map(column => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
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
        count={this.state.rows.length}
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


export default Profesors;

