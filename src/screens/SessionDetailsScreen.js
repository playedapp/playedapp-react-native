import React, { Component } from "react"
import { View, Text, ScrollView } from "react-native"
import PropTypes from "prop-types"
import gql from "graphql-tag"
import { Query } from "react-apollo"
import Box from "../components/shared/Box"
import Cover from "../components/shared/Cover"

const GET_SESSION = gql`
  query GET_SESSION($id: ID!) {
    session(id: $id) {
      games {
        id
        title
        averageRating
        cover {
          url
        }
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
      state: PropTypes.shape({
        params: PropTypes.object,
      }),
    }).isRequired,
  }

  render() {
    return (
      <ScrollView>
        <Text>Details</Text>
        <Text>Details</Text>
        <Text>Details</Text>
        <Text>Details</Text>
        <Text>Details</Text>
        <Text>Details</Text>
        <Text>Details</Text>
        <Text>Details</Text>
        <Text>Details</Text>
        <Text>Details</Text>
        <Text>Details</Text>
        <Text>Details</Text>
        <Text>Details</Text>
        <Text>Details</Text>
        <Text>Details</Text>
        <Text>Details</Text>
        <Text>Details</Text>
        <Text>Details</Text>
        <Text>Details</Text>
        <Text>Details</Text>
        <Text>Details</Text>
        <Text>Details</Text>
        <Text>Details</Text>
        <Text>Details</Text>
        <Text>Details</Text>
        <Text>Details</Text>
        <Text>Details</Text>
        <Cover id="1" />
      </ScrollView>
    )
    // const { id } = this.props.navigation.state.params

    // return (
    //   <Query query={GET_SESSION} variables={{ id }}>
    //     {({ loading, error, data }) => {
    //       if (loading) return <Text>Loading…</Text>
    //       if (error) return <Text>Error!</Text>

    //       return (
    //         <View>
    //           {data.session.games.map(({ title, averageRating, cover, id }) => (
    //             // <TouchableOpacity
    //             //   key={id}
    //             //   onPress={() => this.handleGamePress({ id })}
    //             // >
    //             <Box key={id}>
    //               <Cover id={id} key={id} />
    //             </Box>
    //             // <Text>{title}</Text>
    //             // <Text>{averageRating}</Text>
    //             //{" "}
    //             // {/* <Image
    //             //     source={{ uri: cover.url }}
    //             //     style={{ width: 100, height: 100 }}
    //             //   /> */}
    //             //{" "}
    //             // </TouchableOpacity>
    //           ))}
    //         </View>
    //       )
    //     }}
    //   </Query>
    // )
  }
}

export default SessionDetailsScreen
