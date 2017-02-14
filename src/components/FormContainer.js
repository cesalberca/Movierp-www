import React from 'react';
import swal from 'sweetalert';

import { insert } from './../utils/apiHelper';
import FormItem from './FormItem';

class FormContainer extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      tableColumns: [],
      formItems: [],
      formItemsValues: {}
    };

    this.loadFormItems = this.loadFormItems.bind(this);
    this.insertNewEntry = this.insertNewEntry.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  componentDidMount() {
    this.loadFormItems();
  }

  loadFormItems() {
    fetch('http://localhost:8080/api/profile/' + this.props.targetTable, {
      method: 'GET'
    })
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      const tableColumns = json.alps.descriptors[0].descriptors;
      this.setState({tableColumns});
    })
    .catch((error) => {
    });
  }

  handleOnChange(e) {
    let changedValues = {};
    changedValues[e.target.name] = e.target.value;
    const updatedItems = Object.assign(this.state.formItemsValues, changedValues);
    this.setState({formItemsValues: updatedItems})
  }

  insertNewEntry() {
    insert(this.props.targetTable, this.state.formItemsValues)
    .then(() => {
      swal({title: 'Entrada creada', type: 'success'});
    })
    .catch(error => {
      swal({title: 'Error al crear entrada', type: 'error'});
    });
  }

  render() {
    const formItemsList = this.state.tableColumns.map((column, index) => {
      return(
        <FormItem label={column.name} onChangeEvent={this.handleOnChange} key={index} inputName={column.name} inputType="text"/>
      );
    });

    const { title, actionButtonText } = this.props;
    return (
      <div className="FormContainer">
        <h1 className="FormContainer__Title">{title}</h1>
        <form className="FormContainer__Form">
          {formItemsList}
          <div className="FormContainer__container__actionButton">
            <input onClick={this.insertNewEntry} className="FormContainer__actionButton btn btn--primary" type="button" value={actionButtonText}/>
          </div>
        </form>
      </div>
    );
  }
}

export default FormContainer;
