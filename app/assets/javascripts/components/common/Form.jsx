import React from 'react'
import ReactDOM from 'react-dom'
import { Errors } from './Errors.jsx'

function initialState() {
  return {
    form: {},
    errors: []
  }
}

export let Form = React.createClass({

  propTypes: {
    mandatories: React.PropTypes.array,
    onSubmit: React.PropTypes.func.isRequired,
    label: React.PropTypes.string,
    submitValue: React.PropTypes.string,
    defaultValue: React.PropTypes.object,
    errors: React.PropTypes.array
  },

  getInitialState: initialState,

  componentWillMount() {
    let defaultValue = this.props.defaultValue || {}
    this.setState({form: defaultValue})
  },

  componentWillReceiveProps(nextProps) {
    if(nextProps.errors) this.setState({errors: nextProps.errors})
  },

  onChange(key, value) {
    this.state.form[key] = value
  },

  displayErrors(fieldName, message) {
    let errors = this.state.errors
    let msg = message || fieldName + " is required"
    errors.push(msg)
    this.setState({errors: errors})
  },

  resetErrors() {
    this.state.errors = []
    this.setState(this.state)
  },

  checkValidity(data) {
    this.resetErrors()

    return this.props.mandatories.reduce((acc, field) => {
      let fieldErrorLabel = field.label ? field.label : field.key
      if(!data[field.key]) {
        this.displayErrors(fieldErrorLabel)
        return acc && false
      }
      else return acc
    }, true)
  },

  onSubmit(event) {
    event.preventDefault()

    let data = this.state.form
    let cleanedData = Object.keys(data).reduce((acc, elemKey) => {
      return data[elemKey] ? Object.assign(acc, elemKey, data[elemKey]) : acc
    }, {})

    if(this.checkValidity(cleanedData)) this.props.onSubmit(this.state.form, event)
  },

  renderChildren() {
    let children = this.props.children.map((child, index) => {
      return React.cloneElement(
        child,
        {
          onChange: this.onChange.bind(null, child.ref),
          key: index,
          defaultValue: this.state.form[child.ref]
        }
      )
    })
    return children
  },

  render() {
    let label = this.props.label ? <label>{this.props.label}</label> : ''
    return (
      <form onSubmit={this.onSubmit}>
        {label}
        <Errors errors={this.state.errors} />
        {this.renderChildren()}
        <input type="submit" value={this.props.submitValue || 'validate'} />
      </form>
    )
  }
})
