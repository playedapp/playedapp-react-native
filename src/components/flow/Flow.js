import React, { Component } from "react";
import { FlatList, View, StyleSheet, StatusBar } from "react-native";
import { background } from "../../style/colors";
import Item from "./Item";

class Flow extends Component {
  state = {
    items: []
  };

  componentDidMount() {
    fetch("http://192.168.0.4:3000/api/flow")
      .then(res => res.json())
      .then(json => {
        this.setState({ items: json.items });
      });
  }

  render() {
    const { items } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        {items.length > 0 && (
          <FlatList
            data={items}
            renderItem={({ item }) => (
              <Item
                games={item.games}
                players={item.players}
                images={item.images}
                location={item.location}
              />
            )}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: background,
    alignItems: "flex-start",
    justifyContent: "flex-start"
  }
});

export default Flow;
