import React from 'react'

const Context = React.createContext({})
export default Context

export function withContext(WrappedComponent) {
  return ownProps => {
    return (
      <Context.Consumer>{value => <WrappedComponent app={value} {...ownProps} />}</Context.Consumer>
    )
  }
}
