import React from "react"
import { SessionContext } from "../../../contexts/session-context"
import AddOnButton from "./AddOnButton"
import AddOnRow from "./AddOnRow"
import { BoldText, MutedText } from "../../../components/shared/TextStyles"

export const Button = () => {
  return (
    <SessionContext.Consumer>
      {({ variants, setVariants }) => (
        <AddOnButton
          title="Variants"
          icon="corner-left-down"
          done={variants !== undefined}
          onPress={() => setVariants("variant")}
        />
      )}
    </SessionContext.Consumer>
  )
}

export const Row = () => {
  return (
    <SessionContext.Consumer>
      {({ variants, setVariants }) =>
        variants !== undefined && (
          <AddOnRow onRemove={() => setVariants(undefined)}>
            <BoldText>Variants</BoldText>
            <MutedText>{variants}</MutedText>
          </AddOnRow>
        )
      }
    </SessionContext.Consumer>
  )
}
