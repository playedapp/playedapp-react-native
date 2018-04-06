import React from "react"
import { Text, FlatList, View, StyleSheet, StatusBar } from "react-native"
import Item from "./Item"
import Colors from "../../constants/Colors"
import { Query } from "react-apollo"
import gql from "graphql-tag"

const GET_SESSIONS = gql`
  {
    sessions {
      id
      games {
        title
        thumbnail {
          url
        }
      }
      players {
        score
        rank
        comment
        user {
          id
          name
          isFollowing
        }
      }
      images {
        url
      }
    }
  }
`

const Flow = () => (
  <Query query={GET_SESSIONS}>
    {({ loading, error, data }) => {
      if (loading) return <Text>Loading…</Text>
      if (error) return <Text>Error!</Text>

      return (
        <View style={styles.container}>
          <StatusBar barStyle="light-content" />
          <FlatList
            data={data.sessions}
            keyExtractor={item => item.id}
            refreshing={false}
            onRefresh={() => {}}
            renderItem={
              ({ item: { id, games, players, images, location } }) => (
                <Item
                  id={id}
                  games={games}
                  players={players}
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
