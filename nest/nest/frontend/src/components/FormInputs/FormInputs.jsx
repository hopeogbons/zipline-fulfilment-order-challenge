import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl, Row } from 'react-bootstrap';

function FieldGroup({ label, ...props }) {
  return (
    <FormGroup>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
    </FormGroup>
  );
}

export class FormInputs extends Component {
  render() {
    var row = [];
    for (var i = 0; i < this.props.ncols.length; i++) {
      row.push(
        <div key={i} className={this.props.ncols[i]}>
          <FieldGroup {...this.props.properties[i]} />
        </div>,
      );
    }
    return <Row>{row}</Row>;
  }
}

export default FormInputs;
