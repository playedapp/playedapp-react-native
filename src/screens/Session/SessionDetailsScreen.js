import React, { Component } from "react"
import { View, Text, Image } from "react-native"
import gql from "graphql-tag"
import { Query } from "react-apollo"
import Box from "../../components/shared/Box"
import Spacing from "../../constants/Spacing"
import { formatDuration, constrainImageSize } from "../../lib/utils"
import { SessionContext } from "./session-context"
import AverageRating from "../../components/shared/AverageRating"
import PropTypes from "prop-types"
import { withNavigation } from "react-navigation"
import text from "../../styles/text"

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
                          <Text style={text.muted}>2-4</Text>
                          <Text style={text.muted}>90 min</Text>
                          <Text style={text.muted}>13+</Text>
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
                      <Text style={text.bold}>{mainGame.title}</Text>
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
                            <Text style={text.bold}>{title}</Text>
                          </View>
                        </View>
                      </Box>
                    ))}
                  <Box>
                    {playtime && (
                      <View style={{ padding: Spacing.m }}>
                        <Text style={text.muted}>PLAYTIME</Text>
                        <Text style={text.default}>
                          Total {formatDuration(playtime)}
                        </Text>
                        <Text style={text.default}>
                          Per player{" "}
                          {formatDuration(playtime / participants.length)}
                        </Text>
                      </View>
                    )}
                    {variants && (
                      <View style={{ padding: Spacing.m }}>
                        <Text style={text.muted}>VARIANTS</Text>
                        <Text style={text.default}>{variants}</Text>
                      </View>
                    )}
                    {location && (
                      <View style={{ padding: Spacing.m }}>
                        <Text style={text.muted}>LOCATION</Text>
                        <Text style={text.default}>
                          {location.name} {location.address}
                        </Text>
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
