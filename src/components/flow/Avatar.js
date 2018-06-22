import React, { Component } from "react"
import { Image, StyleSheet, View, Text } from "react-native"
import PropTypes from "prop-types"
import Colors from "../../constants/Colors"
import gql from "graphql-tag"
import { Query } from "react-apollo"

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

class Avatar extends Component {
  static propTypes = {
    id: PropTypes.string,
  }

  render() {
    const { id } = this.props

    return (
      <Query query={GET_PERSON} variables={{ id }}>
        {({ loading, error, data: { person } }) => {
          if (loading || error) return <Image style={styles.imageAvatar} />

          return person.avatar ? (
            <Image style={styles.circle} source={{ uri: person.avatar.url }} />
          ) : (
            <View style={[styles.circle, styles.textAvatar]}>
              <Text style={styles.text}>{person.name[0].toUppercase()}</Text>
            </View>
          )
        }}
      </Query>
    )
  }
}

const styles = StyleSheet.create({
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: Colors.mainBackground,
  },
  textAvatar: {
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "aqua",
  },
})

export default Avatar
