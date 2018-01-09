import React, { Component } from 'react';

export default class DatePicker extends Component {
  state = {
    suggestions: []
  };
  handleChange = ({ target }) => {
    const { value } = target;
    if (value.length === 1) {
      const parsedNum = Number.parseInt(value);
      // switch ()
    }
  };

  render() {
    const { suggestions } = this.state;
    return (
      <div>
        <input onChange={this.handleChange} />
        <ul>{suggestions.map(suggestion => <li>{suggestion}</li>)}</ul>
      </div>
    );
  }
}
