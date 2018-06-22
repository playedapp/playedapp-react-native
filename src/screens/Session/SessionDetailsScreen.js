import React, { Component } from "react"
import { View, Text, Image } from "react-native"
import gql from "graphql-tag"
import { Query } from "react-apollo"
import Box from "../../components/shared/Box"
import {
  MutedText,
  DefaultText,
  BoldText,
} from "../../components/shared/TextStyles"
import Spacing from "../../constants/Spacing"
import { formatDuration, constrainImageSize } from "../../lib/utils"
import { SessionContext } from "./session-context"
import AverageRating from "../../components/shared/AverageRating"
import PropTypes from "prop-types"
import { withNavigation } from "react-navigation"

const GET_SESSION = gql`
  query GET_SESSION($id: ID!) {
    session(id: $id) {
      games {
        id
        title
        averageRating
        cover {
          url
          width
          height
        }
      }
      participants {
        id
      }
      playtime
      variants
      location {
        id
        name
        address
      }
    }
  }
`

class SessionDetailsScreen extends Component {
  static navigationOptions = {
    title: "Session",
  }

  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
      dispatch: PropTypes.func,
    }),
  }

  handleGamePress = ({ id }) => {
    const { navigate } = this.props.navigation
    navigate("Game", { id })
  }

  render() {
    return (
      <SessionContext.Consumer>
        {({ id }) => (
          <Query query={GET_SESSION} variables={{ id }}>
            {({ loading, error, data }) => {
              if (loading) return <Text>Loading…</Text>
              if (error) return <Text>Error!</Text>

              const {
                games,
                location,
                playtime,
                variants,
                participants,
              } = data.session

              const mainGame = games[0]
              const expansions = games.slice(1)

              const renderCover = (url, originalWidth, originalHeight, max) => {
                const [width, height] = constrainImageSize(
                  originalWidth,
                  originalHeight,
                  max,
                )
                return <Image source={{ uri: url }} style={{ width, height }} />
              }

              return (
                <View style={{ padding: Spacing.m }}>
                  <Box
                    onPress={() =>
                      this.handleGamePress({
                        id: mainGame.id,
                      })
                    }
                  >
                    <View style={{ alignItems: "center", padding: Spacing.m }}>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "flex-end",
                          marginBottom: Spacing.m,
                        }}
                      >
                        <View
                          style={{
                            alignItems: "flex-end",
                            marginRight: Spacing.m,
                          }}
                        >
                          <MutedText>2-4</MutedText>
                          <MutedText>90 min</MutedText>
                          <MutedText>13+</MutedText>
                        </View>
                        <View style={{ marginTop: -Spacing.l }}>
                          {renderCover(
                            mainGame.cover.url,
                            mainGame.cover.width,
                            mainGame.cover.height,
                            85,
                          )}
                        </View>
                        <View style={{ marginLeft: -Spacing.xs }}>
                          <AverageRating
                            rating={mainGame.averageRating}
                            size="large"
                          />
                        </View>
                      </View>
                      <BoldText>{mainGame.title}</BoldText>
                    </View>
                  </Box>
                  {expansions.length &&
                    expansions.map(({ title, averageRating, id, cover }) => (
                      <Box
                        key={id}
                        onPress={() => this.handleGamePress({ id })}
                      >
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            padding: Spacing.m,
                          }}
                        >
                          <View
                            style={{
                              zIndex: 1,
                              alignSelf: "flex-end",
                            }}
                          >
                            <AverageRating rating={averageRating} />
                          </View>
                          <View style={{ marginLeft: -Spacing.xs }}>
                            {renderCover(
                              cover.url,
                              cover.width,
                              cover.height,
                              45,
                            )}
                          </View>
                          <View style={{ marginLeft: Spacing.m }}>
                            <BoldText>{title}</BoldText>
                          </View>
                        </View>
                      </Box>
                    ))}
                  <Box>
                    {playtime && (
                      <View style={{ padding: Spacing.m }}>
                        <MutedText>PLAYTIME</MutedText>
                        <DefaultText>
                          Total {formatDuration(playtime)}
                        </DefaultText>
                        <DefaultText>
                          Per player{" "}
                          {formatDuration(playtime / participants.length)}
                        </DefaultText>
                      </View>
                    )}
                    {variants && (
                      <View style={{ padding: Spacing.m }}>
                        <MutedText>VARIANTS</MutedText>
                        <DefaultText>{variants}</DefaultText>
                      </View>
                    )}
                    {location && (
                      <View style={{ padding: Spacing.m }}>
                        <MutedText>LOCATION</MutedText>
                        <DefaultText>
                          {location.name} {location.address}
                        </DefaultText>
                      </View>
                    )}
                  </Box>
                </View>
              )
            }}
          </Query>
        )}
      </SessionContext.Consumer>
    )
  }
}

export default withNavigation(SessionDetailsScreen)
