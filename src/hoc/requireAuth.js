import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export default function (ComposedComponent) {

  class Authentication extends Component {
      
    componentWillMount() {
      if (!this.props.authenticated) {
        this.props.history.push('/portada');
      }
    }
//si es que no se ha autenticado
    componentWillUpdate(nextProps) {
      if (!nextProps.authenticated) {
        this.props.history.push('/portada');
      }
    }

    PropTypes = {
      router: PropTypes.object,
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  function mapStateToProps(state) {
    return { authenticated: state.auth.authenticated };
  }

  return connect(mapStateToProps)(Authentication);
}