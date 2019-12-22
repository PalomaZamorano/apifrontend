import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Table } from 'react-bootstrap';

const useStyles = makeStyles(theme => ({
  root: {
    
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

export default function AlignItemsList() {
  const classes = useStyles();

  return (
    <Table striped bordered hover size="sm" className = {classes.root} style={{  height: "100% " ,width:"100%" }}>
  <thead>
    <tr>
      <th>#</th>
      <th>Nombre</th>
      <th>Promedio dimensiones</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>Mark</td>
      <td>@mdo</td>
    </tr>
    <tr>
      <td>2</td>
      <td>Jacob</td>
      <td>@fat</td>
    </tr>
    <tr>
      <td>3</td>
      <td>Jacob</td>
      <td>@fat</td>
    </tr>
    <tr>
      <td>4</td>
      <td>Jacob</td>
      <td>@fat</td>
    </tr>
    <tr>
      <td>5</td>
      <td>Jacob</td>
      <td>@fat</td>
    </tr>
    
  </tbody>
</Table>
  );
}