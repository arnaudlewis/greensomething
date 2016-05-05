export let CustomDate = {

  now () {
    return new Date()
  },

  increment(date, inc, type) {
    let newDate = date
    switch(type) {
      case DateTypes.DAY:
        newDate.setDate(date.getDate() + inc)
        return newDate

      default:
        return newDate
    }
  }
}

export let DateTypes = {
  DAY: 'day'
}
