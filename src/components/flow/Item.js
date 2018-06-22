import React, { Component } from "react"
import { withNavigation, NavigationActions } from "react-navigation"
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableHighlight,
  Button,
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
import { toOrdinal } from "../../lib/utils"
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
      <TouchableHighlight onPress={this.handleDetailsPress}>
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
      </TouchableHighlight>
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
            <View style={{ marginLeft: Spacing.m }}>
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
            paddingHorizontal: Spacing.m,
          }}
        >
          <View
            style={{ flexShrink: 1, flexGrow: 1, marginVertical: Spacing.m }}
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
          <View style={slideshowActive && { transform: [{ translateY: 30 }] }}>
            {games.map(({ id }) => <Cover key={id} id={id} />)}
          </View>
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
