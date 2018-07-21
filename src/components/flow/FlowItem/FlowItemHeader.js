import React from "react"
import PropTypes from "prop-types"
import { followedParticipants } from "../../../lib/utils"
import { joinTexts } from "../utils"
import Spacing from "../../../constants/Spacing"
import text from "../../../styles/text"
import { View, StyleSheet, TouchableOpacity, Text } from "react-native"
import AvatarStack from "../AvatarStack"

const FlowItemHeader = ({ location, participants, onPress }) => {
  const followed = followedParticipants(participants).map(
    ({ person }) => person,
  )
  const personLinks = joinTexts(...followed.map(({ name }) => name))

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.header, { alignItems: "center" }]}>
        <AvatarStack people={followed} />
        <View
          style={{
            marginLeft: Spacing.m,
            flexDirection: "column",
            flexShrink: 1,
          }}
        >
          <Text style={text.default} numberOfLines={1}>
            {personLinks}
          </Text>
          {location && <Text style={text.muted}>{location.name}</Text>}
        </View>
      </View>
    </TouchableOpacity>
  )
}

FlowItemHeader.propTypes = {
  onPress: PropTypes.func.isRequired,
  location: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }),
  participants: PropTypes.arrayOf(
    PropTypes.shape({
      person: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }),
    }),
  ).isRequired,
}

export default FlowItemHeader

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    paddingHorizontal: Spacing.m,
    paddingVertical: Spacing.s,
  },
})
