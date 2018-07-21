import React from "react"
import { FlatList, View, StyleSheet, StatusBar, Text } from "react-native"
import Item from "./FlowItem/FlowItem"
import Colors from "../../constants/Colors"
import { Query } from "react-apollo"
import gql from "graphql-tag"

const GET_FLOW = gql`
  {
    flow {
      id
      games {
        id
        title
        cover {
          url
          width
          height
        }
      }
      participants {
        id
        score
        rank
        ratings {
          value
          comment {
            content
          }
          previous {
            value
          }
        }
        person {
          id
          name
          isFollowedByMe
        }
      }
      images {
        url
      }
      location {
        name
      }
    }
  }
`

const Flow = () => (
  <Query query={GET_FLOW}>
    {({ loading, error, data }) => {
      if (loading) return <Text>Loading…</Text>
      if (error) return <Text>Error!</Text>

      return (
        <View style={styles.container}>
          <StatusBar barStyle="light-content" />
          <FlatList
            data={data.flow}
            keyExtractor={item => item.id}
            refreshing={false}
            onRefresh={() => {}}
            renderItem={
              ({ item: { id, games, participants, images, location } }) => (
                <Item
                  id={id}
                  games={games}
                  participants={participants}
                  images={images}
                  location={location}
                />
              )
              // likes={likes}
            }
          />
        </View>
      )
    }}
  </Query>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.mainBackground,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
})

export default Flow
