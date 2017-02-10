import React from 'react';
import { Icon } from 'react-fa';

import ModalForm from './ModalForm';

import './FormActions.css';

class FormActions extends React.Component {
  render() {
    return(
      <div className="FormActions">
        <button onClick={this.props.handleOpenModal} className="btn btn--dark">Crear</button>
        <button className="btn btn--dark">Actualizar</button>
        <button className="btn btn--dark">Buscar</button>
        <button className="btn btn--dark">Borrar</button>
        <button className="btn btn--dark"><Icon name="refresh"/></button>
        <ModalForm />
      </div>
    );
  }
}

export default FormActions;
