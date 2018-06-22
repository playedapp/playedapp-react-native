import React from "react"
import PropTypes from "prop-types"
import { Image, StyleSheet, TouchableOpacity } from "react-native"
import { Query } from "react-apollo"
import gql from "graphql-tag"
import { constrainImageSize } from "../../lib/utils"

const GET_GAME = gql`
  query GET_GAME($id: ID!) {
    game(id: $id) {
      cover {
        url
        width
        height
      }
    }
  }
`

const Cover = ({ id, maxSize = 85, onPress }) => {
  return (
    <Query query={GET_GAME} variables={{ id }}>
      {({ loading, error, data }) => {
        if (loading || error) return null

        const [width, height] = constrainImageSize(
          data.game.cover.width,
          data.game.cover.height,
          maxSize,
        )

        return (
          <TouchableOpacity
            key={data.game.id}
            style={styles.gameThumbnailButton}
            onPress={onPress}
          >
            <Image
              style={[styles.gameThumbnail, { width, height }]}
              source={{ uri: data.game.cover.url }}
            />
          </TouchableOpacity>
        )
      }}
    </Query>
  )
}

Cover.propTypes = {
  id: PropTypes.string.isRequired,
  maxSize: PropTypes.number,
  onPress: PropTypes.func,
}

export default Cover

const styles = StyleSheet.create({
  gameThumbnailButton: {
    borderRadius: 5,
    borderWidth: 3,
    borderColor: "#fff",
  },
  gameThumbnail: {},
})
