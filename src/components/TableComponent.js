import React from 'react';
import {Table, Column, Cell} from 'fixed-data-table';
import Dimensions from 'react-dimensions';

import { getSelfId } from './../utils/apiHelper';

import CellComponent from './CellComponent';

import './../stylesheets/fixed-data-table.css';

class TableComponent extends React.Component {
  constructor(props) {
    super(props);

    this.parseFields = this.parseFields.bind(this);
  }

  parseFields() {
    let parsedFields = [];
    this.props.data.forEach((field) => {
      let parsedField = Object.assign({}, field);
      parsedField['id'] = getSelfId(field);
      parsedFields.push(parsedField);
    });

    return parsedFields;
  }

  render() {
    const { columns, data, containerWidth, containerHeight } = this.props;
    const columnsList = columns.map((column, index) => {
      return (
        <Column
          key={index}
          header={<Cell>{column.name}</Cell>}
          cell={<CellComponent data={this.parseFields()} field={column.field}/>}
          width={150}/>
      );
    });

    return(
      <Table
        rowsCount={data.length}
        rowHeight={50}
        headerHeight={50}
        width={containerWidth}
        height={containerHeight}
        onRowClick={this.props.handleRowClick}>
          {columnsList}
      </Table>
    );
  }
}

export default Dimensions()(TableComponent);
