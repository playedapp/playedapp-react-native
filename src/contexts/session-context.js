import React from "react"

export const SessionContext = React.createContext({
  games: [],
  participants: [],
  comment: "",
})