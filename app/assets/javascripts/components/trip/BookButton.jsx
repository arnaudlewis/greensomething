import React from 'react'
import ReactDOM from 'react-dom'

import { Communication } from '../../modules/Communication'

function initialState() {
  return {
    booked: false
  }
}

export let BookButton = React.createClass({

  props: {
    tripId: React.PropTypes.string.isRequired,
    booked: React.PropTypes.bool
  },

  getInitialState: initialState,

  componentWillMount() {
    this.setState({booked: this.props.booked || false})
  }

  onSubmit(e) {
    e.preventDefault()
    Communication.bookTrip(this.props.tripId)
      .then()
    this.setState({booked: true})
  },

  render() {
    const component = this.state.booked
      ? <input class="disabled" readonly type="submit" onClick={this.onSubmit} value="Booked !" />
      : <div><input type="submit" onClick={this.onSubmit} value="Book" /><span class="error">{this.state.error}</span></div>
  }
})
