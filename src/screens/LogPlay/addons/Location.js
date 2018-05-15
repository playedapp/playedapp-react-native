import React from "react"
import { SessionContext } from "../../../contexts/session-context"
import AddOnButton from "./AddOnButton"
import AddOnRow from "./AddOnRow"
import { BoldText, MutedText } from "../../../components/shared/TextStyles"

export const Button = () => (
  <SessionContext.Consumer>
    {({ location, setLocation }) => (
      <AddOnButton
        title="Location"
        icon="map-pin"
        done={location !== undefined}
        onPress={() => setLocation("location")}
      />
    )}
  </SessionContext.Consumer>
)

export const Row = () => (
  <SessionContext.Consumer>
    {({ location, setLocation }) =>
      location !== undefined && (
        <AddOnRow onRemove={() => setLocation(undefined)}>
          <BoldText>Location</BoldText>
          <MutedText>{location}</MutedText>
        </AddOnRow>
      )
    }
  </SessionContext.Consumer>
)
