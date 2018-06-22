import React from "react"
import { FlatList, View, StyleSheet, StatusBar } from "react-native"
import Item from "./Item"
import Colors from "../../constants/Colors"
import { Query } from "react-apollo"
import gql from "graphql-tag"
import { DefaultText } from "../shared/TextStyles"

const GET_FLOW = gql`
  {
    flow {
      id
      games {
        id
        title
        cover {
          url
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
      if (loading) return <DefaultText>Loading…</DefaultText>
      if (error) return <DefaultText>Error!</DefaultText>

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
