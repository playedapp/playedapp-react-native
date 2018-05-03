import React, { Component } from "react"
import PropTypes from "prop-types"
import {
  ScrollView,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native"
import { SessionContext } from "../../contexts/session-context"
import Colors from "../../constants/Colors"
import Spacing from "../../constants/Spacing"
import Box from "../../components/shared/Box"
import Avatar from "../../components/flow/Avatar"
import gql from "graphql-tag"
import { Query } from "react-apollo"
import { debounce } from "lodash-es"
import { DefaultText } from "../../components/shared/TextStyles"
import { Feather } from "@expo/vector-icons"
import Expo from "expo"

const { Haptic } = Expo

const GET_FRIENDS = gql`
  query GET_FRIENDS {
    friends {
      id
      name
      avatar {
        url
      }
    }
  }
`
const SEARCH_PEOPLE = gql`
  query SEARCH_PEOPLE($search: String) {
    people(search: $search) {
      id
      name
      avatar {
        url
      }
    }
  }
`

class AddParticipantsScreen extends Component {
  state = {
    searchText: "",
  }

  static propTypes = {
    addParticipant: PropTypes.func.isRequired,
    removeParticipant: PropTypes.func.isRequired,
    participants: PropTypes.array.isRequired,
  }

  renderList(people) {
    const { participants, addParticipant, removeParticipant } = this.props

    return (
      <Box>
        {people.map(person => {
          const { id, name } = person
          const isParticipating =
            participants.findIndex(({ person: p }) => p.id === id) > -1

          return (
            <TouchableOpacity
              key={id}
              onPress={() => {
                Haptic.selection()
                this.setState({ searchText: "" })
                isParticipating
                  ? removeParticipant(
                      participants.find(({ person: p }) => p.id === id),
                    )
                  : addParticipant(person)
              }}
            >
              <View
                style={{
                  padding: Spacing.m,
                  flexDirection: "row",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <Avatar id={id} />
                <DefaultText style={{ flexGrow: 1 }}>{name}</DefaultText>
                {isParticipating && <Feather name="check" size={32} />}
              </View>
            </TouchableOpacity>
          )
        })}
      </Box>
    )
  }

  render() {
    const { searchText } = this.state

    return (
      <ScrollView style={styles.container} keyboardShouldPersistTaps="always">
        <View style={{ padding: Spacing.m }}>
          <TextInput
            style={styles.textInput}
            placeholder="Search or invite people"
            value={searchText}
            returnKeyType="done"
            onChangeText={debounce(
              text =>
                this.setState({
                  searchText: text,
                }),
              300,
            )}
          />
          {searchText && (
            <Query query={SEARCH_PEOPLE} variables={{ search: searchText }}>
              {({ loading, error, data }) => {
                if (loading) return <DefaultText>Loading…</DefaultText>
                if (error) return <DefaultText>Error!</DefaultText>

                return this.renderList(data.people)
              }}
            </Query>
          )}
          {!searchText && (
            <Query query={GET_FRIENDS}>
              {({ loading, error, data }) => {
                if (loading) return <DefaultText>Loading…</DefaultText>
                if (error) return <DefaultText>Error!</DefaultText>

                return this.renderList(data.friends)
              }}
            </Query>
          )}
        </View>
      </ScrollView>
    )
  }
}

export default class X extends Component {
  static navigationOptions = { title: "Add players" }

  render() {
    return (
      <SessionContext.Consumer>
        {({ participants, addParticipant, removeParticipant }) => {
          return (
            <AddParticipantsScreen
              participants={participants}
              addParticipant={addParticipant}
              removeParticipant={removeParticipant}
            />
          )
        }}
      </SessionContext.Consumer>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.mainBackground,
  },
  textInput: {
    padding: Spacing.m,
    borderRadius: 12,
    backgroundColor: Colors.white,
    borderWidth: 1,
    width: 100,
  },
})
