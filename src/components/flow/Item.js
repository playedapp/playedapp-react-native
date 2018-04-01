import React, { Component } from "react"
import { withNavigation } from "react-navigation"
import {
  Image,
  View,
  StyleSheet,
  Dimensions,
  Text,
  TouchableHighlight,
} from "react-native"
import PropTypes from "prop-types"
import Avatar from "./Avatar"
import LinkedAvatar from "./LinkedAvatar"
import { SummarySentence } from "./SummarySentence"
import AvatarStack from "./AvatarStack"
import Colors from "../../constants/Colors"

const joinTexts = (...texts) => {
  if (texts.length === 1) return texts[0]

  return texts.slice(0, texts.length - 1).join(", ") + " & " + texts.slice(-1)
}

class Item extends Component {
  static propTypes = {
    navigation: PropTypes.shape({ navigate: PropTypes.func }),
    images: PropTypes.arrayOf(
      PropTypes.shape({ url: PropTypes.string.isRequired }),
    ),
    games: PropTypes.array,
    players: PropTypes.array,
    location: PropTypes.shape({ name: PropTypes.string }),
  }

  state = {}

  handlePlayerPress = ({ name }) => {
    const { navigate } = this.props.navigation
    navigate("Profile", { name })
  }

  handleGamePress = ({ title }) => {
    const { navigate } = this.props.navigation
    navigate("Game", { title })
  }

  get followedPlayers() {
    return this.props.players.filter(player => player.isFollowing)
  }

  get notFollowedPlayers() {
    return this.props.players.filter(
      player => player.accountId && !player.isFollowing,
    )
  }

  get anonymousPlayers() {
    return this.props.players.filter(player => !player.accountId)
  }

  renderHeader() {
    const { location } = this.props

    const playerLinks = joinTexts(
      ...this.followedPlayers.map(({ name }) => name),
    )

    return (
      <View style={styles.header}>
        <AvatarStack players={this.followedPlayers} />
        <Text>{playerLinks}</Text>
        {location && <Text>{location.name}</Text>}
      </View>
    )
  }

  renderPlayerDetails() {
    const { games } = this.props
    const primaryGame = games[0]

    return this.followedPlayers
      .sort((a, b) => a.rank - b.rank)
      .map(({ key, name, rank, score, ratings, comment, avatar }) => (
        <View key={key}>
          <Avatar imageSource={avatar ? avatar.url : null} text={name[0]} />
          <Text>
            <Text>
              {rank === 1 && "👑"}
              {name}{" "}
            </Text>
            <Text>
              {rank} {score}p
            </Text>
          </Text>
          {comment && <Text>{comment}</Text>}
          {ratings && (
            <Text>
              {ratings.map(({ game, currentRating /* previousRating */ }) => {
                if (game === primaryGame.key) {
                  return currentRating
                }
              })}
            </Text>
          )}
        </View>
      ))
  }

  render() {
    const { images, games } = this.props

    return (
      <View>
        {this.renderHeader()}
        {images.map(image => (
          <Image
            key={image.url}
            style={styles.image}
            source={{ uri: image.url }}
          />
        ))}
        {games.map(game => (
          <TouchableHighlight
            key={game}
            style={styles.gameThumbnailButton}
            onPress={() => this.handleGamePress(game)}
          >
            <Image
              style={styles.gameThumbnail}
              source={{ uri: game.thumbnail.url }}
            />
          </TouchableHighlight>
        ))}
        <SummarySentence
          games={games}
          notFollowedPlayers={this.notFollowedPlayers}
          anonymousPlayers={this.anonymousPlayers}
          onGamePress={this.handleGamePress}
          onPlayerPress={this.handlePlayerPress}
        />
        {this.renderPlayerDetails()}
      </View>
    )
  }
}

export default withNavigation(Item)

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    padding: 10,
  },
  image: {
    width: Dimensions.get("window").width,
    height: 300,
  },
  gameThumbnailButton: {
    position: "absolute",
    top: 280,
    right: 20,
  },
  gameThumbnail: {
    width: 100,
    height: 100,
    borderWidth: 3,
    borderColor: "#fff",
  },
  link: {
    color: Colors.primary,
    fontWeight: "bold",
  },
})
