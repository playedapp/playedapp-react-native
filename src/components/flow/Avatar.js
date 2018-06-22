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

          return (
            <View style={styles.circle}>
              {person.avatar ? (
                <Image
                  style={styles.circleInner}
                  source={{ uri: person.avatar.url }}
                />
              ) : (
                <View style={[styles.circleInner, styles.textAvatar]}>
                  <Text style={styles.text}>
                    {person.name[0].toUppercase()}
                  </Text>
                </View>
              )}
            </View>
          )
        }}
      </Query>
    )
  }
}

const styles = StyleSheet.create({
  circle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: Colors.mainBackground,
  },
  circleInner: {
    width: 40,
    height: 40,
    borderRadius: 20,
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
