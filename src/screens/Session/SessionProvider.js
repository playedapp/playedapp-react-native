import { SessionContext } from "./session-context"
import React, { Component } from "react"
import PropTypes from "prop-types"

class SessionProvider extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  }

  state = {
    id: null,
  }

  render() {
    return (
      <SessionContext.Provider value={this.state}>
        {this.props.children}
      </SessionContext.Provider>
    )
  }
}

export default SessionProvider
