import React, { Component } from "react"
import { withNavigation, NavigationActions } from "react-navigation"
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Button,
  Image,
  Animated,
  Easing,
  Text,
} from "react-native"
import PropTypes from "prop-types"
import { SummarySentence } from "./SummarySentence"
import AvatarStack from "./AvatarStack"
import Colors from "../../constants/Colors"
import Spacing from "../../constants/Spacing"
import Layout from "../../constants/Layout"
import { joinTexts } from "./utils"
import StarRating from "../shared/StarRating"
import {
  toOrdinal,
  constrainImageSize,
  followedParticipants,
  notFollowedParticipants,
  anonymousParticipants,
} from "../../lib/utils"
import Cover from "../shared/Cover"
import Slideshow from "../shared/Slideshow"
import Avatar from "./Avatar"
import text from "../../styles/text"

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
    games: PropTypes.arrayOf(
      PropTypes.shape({
        cover: PropTypes.shape({
          url: PropTypes.string.isRequired,
          width: PropTypes.number.isRequired,
          height: PropTypes.number.isRequired,
        }),
      }),
    ),
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
    slideshowTouched: false,
    coverPosition: new Animated.Value(-15),
  }

  handleGamePress = ({ id }) => {
    const { navigate } = this.props.navigation
    navigate("Game", { id })
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

  handleSlideshowTouchStart = () => {
    Animated.timing(this.state.coverPosition, {
      toValue: 15,
      duration: 400,
      easing: Easing.out(Easing.circle),
    }).start()
    this.setState({ slideshowTouched: true })
  }

  renderHeader() {
    const { location, participants } = this.props
    const followed = followedParticipants(participants).map(
      ({ person }) => person,
    )
    const personLinks = joinTexts(...followed.map(({ name }) => name))

    return (
      <TouchableOpacity onPress={this.handleDetailsPress}>
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

  renderParticipantDetails() {
    return followedParticipants(this.props.participants)
      .sort((a, b) => a.rank - b.rank)
      .map(participant => {
        const { id, rank, score, person, ratings } = participant
        const { name } = person
        const comment = ratings.length ? ratings[0].comment.content : null

        return (
          <View
            key={id}
            style={{ flexDirection: "row", marginBottom: Spacing.m }}
          >
            <Avatar
              id={id}
              winner={rank === 1}
              large={true}
              onPress={() => this.handlePersonPress(person)}
            />
            <View style={{ marginLeft: Spacing.m, flexShrink: 1 }}>
              <View style={{ flexDirection: "row", alignItems: "baseline" }}>
                <Text style={text.bold}>{name}</Text>
                <Text style={[text.muted, { marginLeft: Spacing.m }]}>
                  {toOrdinal(rank)}, {score}p
                </Text>
              </View>
              {ratings &&
                ratings
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
              {comment && (
                <Text style={[text.default, { marginTop: Spacing.s }]}>
                  {comment}
                </Text>
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
        onTouchStart={this.handleSlideshowTouchStart}
      />
    )
  }

  renderCovers() {
    const { games } = this.props
    const { coverPosition } = this.state
    const mainGame = games[0]
    const expansions = games.slice(1)

    return (
      <Animated.View style={{ transform: [{ translateY: coverPosition }] }}>
        {
          <Cover
            id={mainGame.id}
            onPress={() => this.handleGamePress({ id: mainGame.id })}
          />
        }
        <Text style={text.muted}>Avg. 3.8</Text>
        {expansions.length > 0 && (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-end",
              marginRight: 3,
            }}
          >
            <Text style={text.muted}>+</Text>
            {expansions.map(({ id, cover }) => {
              const { url, width: w, height: h } = cover
              const [width, height] = constrainImageSize(w, h, 35)
              return (
                <Image
                  key={id}
                  source={{ uri: url }}
                  style={{ width, height, marginLeft: Spacing.s }}
                />
              )
            })}
          </View>
        )}
      </Animated.View>
    )
  }

  render() {
    const { games, likes, participants } = this.props

    return (
      <View style={{ width: Layout.window.width }}>
        {this.renderHeader()}
        {this.renderImages()}
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            paddingHorizontal: Spacing.m,
          }}
        >
          <View
            style={{
              flexShrink: 1,
              flexGrow: 1,
              marginVertical: Spacing.m,
              marginRight: Spacing.m,
            }}
          >
            <View style={{ marginBottom: Spacing.m }}>
              <SummarySentence
                games={games}
                notFollowedPlayers={notFollowedParticipants(participants)}
                anonymousPlayers={anonymousParticipants(participants)}
                onGamePress={this.handleGamePress}
                onPlayerPress={({ person }) => this.handlePersonPress(person)}
              />
            </View>
            {this.renderParticipantDetails()}
          </View>
          {this.renderCovers()}
        </View>
        <View
          style={{
            flexDirection: "row",
            margin: Spacing.m,
            borderTopWidth: StyleSheet.hairlineWidth,
            borderTopColor: Colors.brownGrey,
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
    paddingHorizontal: Spacing.m,
    paddingVertical: Spacing.s,
  },
  image: {
    width: Dimensions.get("window").width,
    height: 300,
  },
  link: {
    color: Colors.primary,
    fontWeight: "bold",
  },
})
