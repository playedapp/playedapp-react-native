import React from "react"
import { ScrollView, StyleSheet, Text } from "react-native"
import PropTypes from "prop-types"

export default class PlayerScreen extends React.Component {
  static propTypes = {
    navigation: PropTypes.shape({
      state: PropTypes.shape({ params: PropTypes.object }),
    }).isRequired,
  }

  static navigationOptions = ({ navigation }) => {
    return { title: navigation.state.params.name }
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text>Nothing to see here yet…</Text>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#fff",
  },
})
