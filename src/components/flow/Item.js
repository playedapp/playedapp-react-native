import React, { Component } from "react"
import { withNavigation } from "react-navigation"
import {
  Image,
  View,
  StyleSheet,
  Dimensions,
  Text,
  TouchableHighlight,
  Button,
} from "react-native"
import PropTypes from "prop-types"
import Avatar from "./Avatar"
import { SummarySentence } from "./SummarySentence"
import AvatarStack from "./AvatarStack"
import Colors from "../../constants/Colors"
import Whitespace from "../../constants/Whitespace"
import Layout from "../../constants/Layout"

const joinTexts = (...texts) => {
  if (texts.length === 1) return texts[0]

  return texts.slice(0, texts.length - 1).join(", ") + " & " + texts.slice(-1)
}

// Based on https://stackoverflow.com/a/13627586
const toOrdinal = number => {
  const j = number % 10
  const k = number % 100

  if (j == 1 && k != 11) return number + "st"
  if (j == 2 && k != 12) return number + "nd"
  if (j == 3 && k != 13) return number + "rd"
  return number + "th"
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
    likes: PropTypes.shape({
      count: PropTypes.number,
      hasLiked: PropTypes.bool,
    }),
  }

  static defaultProps = {
    likes: { count: 0, hasLiked: false },
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

  handleLikePress = () => {}

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
      <View style={[styles.header, { alignItems: "center" }]}>
        <AvatarStack players={this.followedPlayers} />
        <View style={{ marginLeft: Whitespace.m }}>
          <Text style={styles.text}>{playerLinks}</Text>
          {location && <Text style={styles.mutedText}>{location.name}</Text>}
        </View>
      </View>
    )
  }

  renderPlayerDetails() {
    const { games } = this.props
    const primaryGame = games[0]

    return this.followedPlayers
      .sort((a, b) => a.rank - b.rank)
      .map(({ key, name, rank, score, ratings, comment, avatar }) => (
        <View
          key={key}
          style={{ flexDirection: "row", marginBottom: Whitespace.m }}
        >
          <Avatar imageSource={avatar ? avatar.url : null} text={name[0]} />
          <View style={{ marginLeft: Whitespace.m }}>
            <Text>
              <Text>
                {rank === 1 && "👑"}
                {name}{" "}
              </Text>
              <Text style={styles.mutedText}>
                {toOrdinal(rank)} {score}p
              </Text>
            </Text>
            {ratings && (
              <Text>
                {ratings.map(({ game, currentRating /* previousRating */ }) => {
                  if (game === primaryGame.key) {
                    return currentRating
                  }
                })}
              </Text>
            )}
            {comment && (
              <Text style={{ marginTop: Whitespace.s }}>{comment}</Text>
            )}
          </View>
        </View>
      ))
  }

  render() {
    const { images, games, likes } = this.props

    return (
      <View style={{ width: Layout.window.width }}>
        {this.renderHeader()}
        {images.map(image => (
          <Image
            key={image.url}
            style={styles.image}
            source={{ uri: image.url }}
          />
        ))}
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            paddingHorizontal: Whitespace.m,
          }}
        >
          <View style={{ flexShrink: 1, marginVertical: Whitespace.m }}>
            <View style={{ marginBottom: Whitespace.m }}>
              <SummarySentence
                games={games}
                notFollowedPlayers={this.notFollowedPlayers}
                anonymousPlayers={this.anonymousPlayers}
                onGamePress={this.handleGamePress}
                onPlayerPress={this.handlePlayerPress}
              />
            </View>
            {this.renderPlayerDetails()}
          </View>
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
        </View>
        <View
          style={{
            flexDirection: "row",
            margin: Whitespace.m,
            borderTopWidth: StyleSheet.hairlineWidth,
            borderTopColor: Colors.textMuted,
          }}
        >
          <Button title={`❤️ ${likes.count}`} onPress={this.handleLikePress} />
          <Button title={`💬`} onPress={this.handleLikePress} />
        </View>
      </View>
    )
  }
}

export default withNavigation(Item)

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    padding: Whitespace.m,
  },
  image: {
    width: Dimensions.get("window").width,
    height: 300,
  },
  gameThumbnailButton: {
    marginTop: -Whitespace.l,
  },
  gameThumbnail: {
    width: 100,
    height: 100,
    borderRadius: 5,
    borderWidth: 3,
    borderColor: "#fff",
  },
  link: {
    color: Colors.primary,
    fontWeight: "bold",
  },
  text: {
    color: Colors.text,
  },
  mutedText: {
    color: Colors.textMuted,
  },
})
