import React, { Component } from "react"
import { withNavigation, NavigationActions } from "react-navigation"
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  TouchableHighlight,
  Button,
} from "react-native"
import PropTypes from "prop-types"
import { SummarySentence } from "./SummarySentence"
import AvatarStack from "./AvatarStack"
import Colors from "../../constants/Colors"
import Whitespace from "../../constants/Spacing"
import Layout from "../../constants/Layout"
import { joinTexts } from "./utils"
import StarRating from "../shared/StarRating"
import LinkedAvatar from "./LinkedAvatar"
import { toOrdinal } from "../../lib/utils"
import Cover from "../shared/Cover"
import Slideshow from "../shared/Slideshow"

class Item extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
      dispatch: PropTypes.func,
    }),
    id: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(
      PropTypes.shape({ url: PropTypes.string.isRequired }),
    ),
    games: PropTypes.array,
    participants: PropTypes.array,
    location: PropTypes.shape({ name: PropTypes.string }),
    likes: PropTypes.shape({
      count: PropTypes.number,
      hasLiked: PropTypes.bool,
    }),
  }

  static defaultProps = {
    likes: { count: 0, hasLiked: false },
  }

  state = {
    slideshowActive: false,
  }

  handlePersonPress = ({ name }) => {
    const { navigate } = this.props.navigation
    navigate("Person", { name })
  }

  handleDetailsPress = () => {
    const { navigate } = this.props.navigation
    navigate("Session", { id: this.props.id })
  }

  handleLikePress = () => {}

  handleCommentsPress = () => {
    const { dispatch } = this.props.navigation
    const action = NavigationActions.navigate({
      routeName: "Session",
      params: { id: this.props.id },
      action: NavigationActions.navigate({ routeName: "Comments" }),
    })
    dispatch(action)
  }

  get followedParticipants() {
    return this.props.participants.filter(
      participant => participant.person && participant.person.isFollowingMe,
    )
  }

  get notFollowedParticipants() {
    return this.props.participants.filter(
      participant => participant.person && !participant.person.isFollowingMe,
    )
  }

  get anonymousParticipants() {
    return this.props.participants.filter(participant => !participant.user)
  }

  renderHeader() {
    const { location } = this.props
    const followed = this.followedParticipants.map(({ person }) => person)
    const personLinks = joinTexts(...followed.map(({ name }) => name))

    return (
      <TouchableHighlight onPress={this.handleDetailsPress}>
        <View style={[styles.header, { alignItems: "center" }]}>
          <AvatarStack people={followed} />
          <View style={{ marginLeft: Whitespace.m }}>
            <Text style={styles.text}>{personLinks}</Text>
            {location && <Text style={styles.mutedText}>{location.name}</Text>}
          </View>
        </View>
      </TouchableHighlight>
    )
  }

  renderParticipantDetails() {
    const { games } = this.props
    const primaryGame = games[0]

    return this.followedParticipants
      .sort((a, b) => a.rank - b.rank)
      .map(participant => {
        const { id, rank, score, person, ratings } = participant
        const { name } = person
        const comment = ratings.length ? ratings[0].comment.content : null

        return (
          <View
            key={id}
            style={{ flexDirection: "row", marginBottom: Whitespace.m }}
          >
            <LinkedAvatar id={id} />
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
                  {ratings
                    .slice(0, 1)
                    .map(({ value, previous: { value: prevValue } }, index) => {
                      return (
                        <StarRating
                          key={index}
                          rating={value}
                          compareTo={prevValue}
                        />
                      )
                    })}
                </Text>
              )}
              {comment && (
                <Text style={{ marginTop: Whitespace.s }}>{comment}</Text>
              )}
            </View>
          </View>
        )
      })
  }

  renderImages() {
    const { images } = this.props

    return (
      <Slideshow
        images={images}
        onTouchStart={() => this.setState({ slideshowActive: true })}
      />
    )
  }

  render() {
    const { games, likes } = this.props
    const { slideshowActive } = this.state

    return (
      <View style={{ width: Layout.window.width }}>
        {this.renderHeader()}
        {this.renderImages()}
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            paddingHorizontal: Whitespace.m,
          }}
        >
          <View
            style={{ flexShrink: 1, flexGrow: 1, marginVertical: Whitespace.m }}
          >
            <View style={{ marginBottom: Whitespace.m }}>
              <SummarySentence
                games={games}
                notFollowedPlayers={this.notFollowedPlayers}
                anonymousPlayers={this.anonymousPlayers}
                onGamePress={this.handleGamePress}
                onPlayerPress={this.handlePersonPress}
              />
            </View>
            {this.renderParticipantDetails()}
          </View>
          <View style={slideshowActive && { transform: [{ translateY: 30 }] }}>
            {games.map(({ id }) => <Cover key={id} id={id} />)}
          </View>
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
          <Button title={`💬`} onPress={this.handleCommentsPress} />
          <Button title="Details" onPress={this.handleDetailsPress} />
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
