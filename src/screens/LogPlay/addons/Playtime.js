import React from "react"
import { SessionContext } from "../../../contexts/session-context"
import AddOnButton from "./AddOnButton"
import AddOnRow from "./AddOnRow"
import { BoldText, MutedText } from "../../../components/shared/TextStyles"

export const Button = () => {
  return (
    <SessionContext.Consumer>
      {({ playtime, setPlaytime }) => (
        <AddOnButton
          title="Playtime"
          icon="clock"
          done={playtime !== undefined}
          onPress={() => setPlaytime(123)}
        />
      )}
    </SessionContext.Consumer>
  )
}

export const Row = () => {
  return (
    <SessionContext.Consumer>
      {({ playtime, setPlaytime }) =>
        playtime !== undefined && (
          <AddOnRow onRemove={() => setPlaytime(undefined)}>
            <BoldText>Playtime</BoldText>
            <MutedText>{playtime}</MutedText>
          </AddOnRow>
        )
      }
    </SessionContext.Consumer>
  )
}
