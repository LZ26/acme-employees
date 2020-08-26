import React, { Component, useLayoutEffect } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

class Main extends Component {
  constructor() {
    super();
    this.state = {
      employees: []
    }

  }
  render() {
    return (
      <div id="container">

          <div id="employee">
          </div>
      </div>
    )
  }
}

ReactDOM.render(<Main />, document.getElementById('main'));
