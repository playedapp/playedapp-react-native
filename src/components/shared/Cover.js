import React, { Component } from "react"
import PropTypes from "prop-types"
import { Image, StyleSheet, TouchableOpacity } from "react-native"
import { Query } from "react-apollo"
import gql from "graphql-tag"
import Whitespace from "../../constants/Spacing"
import { withNavigation, NavigationActions } from "react-navigation"

const GET_GAME = gql`
  query GET_GAME($id: ID!) {
    game(id: $id) {
      cover {
        url
      }
    }
  }
`

class Cover extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
      dispatch: PropTypes.func,
    }),
    id: PropTypes.string.isRequired,
  }

  handleGamePress = () => {
    // const { navigate } = this.props.navigation
    // navigate("Game", { title })
    const action = NavigationActions.navigate({
      routeName: "Game",
      params: { id: this.props.id },
    })
    this.props.navigation.dispatch(action)
  }

  render() {
    return (
      <Query query={GET_GAME} variables={{ id: this.props.id }}>
        {({ loading, error, data }) => {
          if (loading || error) return null

          return (
            <TouchableOpacity
              key={data.game.id}
              style={styles.gameThumbnailButton}
              onPress={this.handleGamePress}
            >
              <Image
                style={styles.gameThumbnail}
                source={{ uri: data.game.cover.url }}
              />
            </TouchableOpacity>
          )
        }}
      </Query>
    )
  }
}

export default withNavigation(Cover)

const styles = StyleSheet.create({
  gameThumbnailButton: {},
  gameThumbnail: {
    width: 100,
    height: 100,
    borderRadius: 5,
    borderWidth: 3,
    borderColor: "#fff",
  },
})
