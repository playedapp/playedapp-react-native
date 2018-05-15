import React from "react"
import { SessionContext } from "../../../contexts/session-context"
import AddOnButton from "./AddOnButton"
import AddOnRow from "./AddOnRow"
import { BoldText, MutedText } from "../../../components/shared/TextStyles"

export const Button = () => {
  return (
    <SessionContext.Consumer>
      {({ rounds, setRounds }) => (
        <AddOnButton
          title="Rounds"
          icon="repeat"
          done={rounds !== undefined}
          onPress={() => setRounds(2)}
        />
      )}
    </SessionContext.Consumer>
  )
}

export const Row = () => {
  return (
    <SessionContext.Consumer>
      {({ rounds, setRounds }) =>
        rounds !== undefined && (
          <AddOnRow onRemove={() => setRounds(undefined)}>
            <BoldText>Rounds</BoldText>
            <MutedText>{rounds}</MutedText>
          </AddOnRow>
        )
      }
    </SessionContext.Consumer>
  )
}
