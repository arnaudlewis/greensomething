import React from 'react'
import ReactDOM from 'react-dom'

export let Errors = React.createClass({

  propTypes: {
    errors: React.PropTypes.array.isRequired
  },

  renderErrorList() {
    return this.props.errors.map((error, index) => {
      return <p key={index}>{error}</p>
    })
  },

  render() {
    let activeClass = this.props.errors && this.props.errors.length > 0 ? ' active' : ''
    return (
      <div className={"global-errors" + activeClass} >{this.renderErrorList()}</div>
    )
  }
})
