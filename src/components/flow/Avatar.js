/* global require */
import React, { Component } from "react"
import { Image, StyleSheet, View, Text, TouchableOpacity } from "react-native"
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
    id: PropTypes.string.isRequired,
    winner: PropTypes.bool,
    large: PropTypes.bool,
    onPress: PropTypes.func,
  }

  static defaultProps = {
    winner: false,
    large: false,
  }

  render() {
    const { id, winner, large, onPress } = this.props

    const avatar = (
      <Query query={GET_PERSON} variables={{ id }}>
        {({ loading, error, data: { person } }) => {
          if (loading || error) return <Image style={styles.imageAvatar} />

          return (
            <View style={{ alignItems: "center" }}>
              {winner && (
                <Image
                  source={require("../../../assets/images/winner-crown.png")}
                  style={{
                    width: 20,
                    height: 13,
                    position: "absolute",
                    top: -13,
                  }}
                />
              )}
              <View style={[styles.circle, large && styles.circleLarge]}>
                {person.avatar ? (
                  <Image
                    style={[
                      styles.circleInner,
                      large && styles.circleInnerLarge,
                    ]}
                    source={{ uri: person.avatar.url }}
                  />
                ) : (
                  <View
                    style={[
                      styles.circleInner,
                      large && styles.circleInnerLarge,
                      styles.textAvatar,
                    ]}
                  >
                    <Text style={styles.text}>
                      {person.name[0].toUppercase()}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          )
        }}
      </Query>
    )

    return onPress ? (
      <TouchableOpacity onPress={onPress}>{avatar}</TouchableOpacity>
    ) : (
      avatar
    )
  }
}

const styles = StyleSheet.create({
  circle: {
    width: 39,
    height: 39,
    borderRadius: 19.5,
    borderWidth: 2,
    borderColor: Colors.mainBackground,
  },
  circleLarge: {
    width: 49,
    height: 49,
    borderRadius: 24.5,
  },
  circleInner: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
  },
  circleInnerLarge: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
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
