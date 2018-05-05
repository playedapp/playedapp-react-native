import React from "react"
import { Platform, StatusBar, StyleSheet, View } from "react-native"
import { AppLoading, Asset, Font } from "expo"
import { Ionicons } from "@expo/vector-icons"
import RootNavigation from "./src/navigation/RootNavigation"
import client from "./src/lib/apollo-client"
import { ApolloProvider } from "react-apollo"

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  }

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      )
    } else {
      return (
        <View style={styles.container}>
          {Platform.OS === "ios" && <StatusBar barStyle="default" />}
          <ApolloProvider client={client}>
            <RootNavigation />
          </ApolloProvider>
        </View>
      )
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require("./assets/images/robot-dev.png"),
        require("./assets/images/robot-prod.png"),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Ionicons.font,
        "fredokaone-regular": require("./assets/fonts/FredokaOne/FredokaOne-Regular.ttf"),
        "nunito-regular": require("./assets/fonts/Nunito/Nunito-Regular.ttf"),
        "nunito-bold": require("./assets/fonts/Nunito/Nunito-Bold.ttf"),
        "nunito-semibold": require("./assets/fonts/Nunito/Nunito-SemiBold.ttf"),
        "nunito-extrabold": require("./assets/fonts/Nunito/Nunito-ExtraBold.ttf"),
      }),
    ])
  }

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error)
  }

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
})
