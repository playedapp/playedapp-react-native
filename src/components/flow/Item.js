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
} from "react-native"
import PropTypes from "prop-types"
import { SummarySentence } from "./SummarySentence"
import AvatarStack from "./AvatarStack"
import Colors from "../../constants/Colors"
import Spacing from "../../constants/Spacing"
import Layout from "../../constants/Layout"
import { joinTexts } from "./utils"
import StarRating from "../shared/StarRating"
import LinkedAvatar from "./LinkedAvatar"
import { toOrdinal, constrainImageSize } from "../../lib/utils"
import Cover from "../shared/Cover"
import Slideshow from "../shared/Slideshow"
import { DefaultText, MutedText, BoldText } from "../shared/TextStyles"

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

  get followedParticipants() {
    return this.props.participants.filter(
      participant => participant.person && participant.person.isFollowedByMe,
    )
  }

  get notFollowedParticipants() {
    return this.props.participants.filter(
      participant => participant.person && !participant.person.isFollowedByMe,
    )
  }

  get anonymousParticipants() {
    return this.props.participants.filter(participant => !participant.person)
  }

  renderHeader() {
    const { location } = this.props
    const followed = this.followedParticipants.map(({ person }) => person)
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
            <DefaultText numberOfLines={1}>{personLinks}</DefaultText>
            {location && (
              <MutedText style={styles.mutedText}>{location.name}</MutedText>
            )}
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  renderParticipantDetails() {
    return this.followedParticipants
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
            <LinkedAvatar id={id} />
            <View style={{ marginLeft: Spacing.m, flexShrink: 1 }}>
              <View style={{ flexDirection: "row", alignItems: "baseline" }}>
                <BoldText>
                  {rank === 1 && "👑"}
                  {name}
                </BoldText>
                <MutedText style={{ marginLeft: Spacing.m }}>
                  {toOrdinal(rank)}, {score}p
                </MutedText>
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
                <DefaultText style={{ marginTop: Spacing.s }}>
                  {comment}
                </DefaultText>
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
        <MutedText>Avg. 3.8</MutedText>
        {expansions.length > 0 && (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-end",
              marginRight: 3,
            }}
          >
            <MutedText>+</MutedText>
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
    const { games, likes } = this.props

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
                notFollowedPlayers={this.notFollowedParticipants}
                anonymousPlayers={this.anonymousParticipants}
                onGamePress={this.handleGamePress}
                onPlayerPress={this.handlePersonPress}
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
