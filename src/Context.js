import React from 'react'

const Context = React.createContext({})
export default Context

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}

export function withContext(WrappedComponent) {
  const withContextComponent = ownProps => {
    return (
      <Context.Consumer>
        {value => <WrappedComponent app={value} {...ownProps} />}
      </Context.Consumer>
    )
  }
  withContextComponent.displayName = `withContext(${getDisplayName(
    WrappedComponent
  )})`
  return withContextComponent
}
