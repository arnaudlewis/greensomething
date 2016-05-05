import React from 'react'
import ReactDOM from 'react-dom'

// import { Communication } from '../../modules/Communication'
// import { Locator } from '../../modules/Locator'
// import { Api } from '../../modules/Api'

import { Text } from '../common/Text.jsx'
import { Form } from '../common/Form.jsx'

function initialState () {
  return {
    errors: []
  }
}

export let TripForm = React.createClass({

  propTypes: {
    trip: React.PropTypes.object
  },

  getInitialState: initialState,

  componentWillMount() {
    // Communication.appLanguages().done((data) => {
    //   this.setState({languages: data})
    // })
  },

  onSubmit(_form, event) {
    // let route = this.props.spot ? Router.controllers.admin.AdminPortal.doEditSpot() : Router.controllers.admin.AdminPortal.doCreateSpot()
    // Api.call(route, _form)
    //   .done(() => Locator.spots())
    //   .fail( (xhr) => this.setState({errors: [xhr.responseText]}) )
  },

  mandatoriesData() {
    return ([
      {key: 'name'},
      {key: 'description'},
      {key: 'impacts', label: 'impacts'},
      {key: 'categories'},
      {key: 'illustrations'}
    ])
  },

  render() {
    return (
      <Form
        label="Main informations"
        defaultValue={this.props.trip}
        mandatories={this.mandatoriesData()}
        onSubmit={this.onSubmit}
        errors={this.state.errors}>

        <Text ref="name" placeholder="name" maxLength="50"/>
      </Form>
    )
  }
})
