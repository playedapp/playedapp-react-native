import React from "react"
import { ScrollView, StyleSheet, Text, Image } from "react-native"
import PropTypes from "prop-types"
import gql from "graphql-tag"
import { Query } from "react-apollo"
import Spacing from "../constants/Spacing"
import Colors from "../constants/Colors"
import text from "../styles/text"
import fontSizes from "../styles/font-sizes"

const GET_PERSON = gql`
  query GET_PERSON($id: ID!) {
    person(id: $id) {
      name
      avatar {
        url
      }
    }
  }
`

export default class PersonScreen extends React.Component {
  static propTypes = {
    navigation: PropTypes.shape({
      state: PropTypes.shape({ params: PropTypes.object }),
    }).isRequired,
  }

  static navigationOptions = ({ navigation }) => {
    return { title: navigation.state.params.name }
  }

  render() {
    const { id } = this.props.navigation.state.params

    return (
      <Query query={GET_PERSON} variables={{ id }}>
        {({ loading, error, data }) => {
          if (loading) return <Text>Loading…</Text>
          if (error) return <Text>Error!</Text>

          const { person } = data

          return (
            <ScrollView
              style={{
                padding: Spacing.m,
                backgroundColor: Colors.white,
                flexDirection: "row",
              }}
            >
              <Image
                style={{ width: 100, height: 100, borderRadius: 50 }}
                source={{ uri: person.avatar.url }}
              />
              <Text style={[text.extraBold, fontSizes.l]}>{person.name}</Text>
            </ScrollView>
          )
        }}
      </Query>
    )
  }
}
