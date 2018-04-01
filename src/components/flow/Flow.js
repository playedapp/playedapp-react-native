import React, { Component } from "react"
import { FlatList, View, StyleSheet, StatusBar } from "react-native"
import Item from "./Item"
import Colors from "../../constants/Colors"

class Flow extends Component {
  state = {
    items: [],
  }

  componentDidMount() {
    fetch("http://192.168.0.4:3000/api/flow")
      .then(res => res.json())
      .then(json => {
        this.setState({ items: json.items })
      })
  }

  render() {
    const { items } = this.state
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        {items.length > 0 && (
          <FlatList
            data={items}
            refreshing={false}
            onRefresh={() => {}}
            renderItem={({
              item: { key, games, players, images, location, likes },
            }) => (
              <Item
                id={key}
                games={games}
                players={players}
                images={images}
                location={location}
                likes={likes}
              />
            )}
          />
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.mainBackground,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
})

export default Flow
