import React, { Component, Fragment } from "react"
import PropTypes from "prop-types"
import { Image, View, ActionSheetIOS } from "react-native"
import Spacing from "../../constants/Spacing"
import Colors from "../../constants/Colors"
import { CreateSessionContext } from "../../contexts/create-session-context"
import DividerHeading from "../../components/shared/DividerHeading"
import Expo from "expo"
import ButtonSquare from "../../components/shared/ButtonSquare"
import Box from "../../components/shared/Box"
import ButtonCircle from "../../components/shared/ButtonCircle"

const { ImagePicker, Permissions } = Expo

class PhotosSection extends Component {
  static propTypes = {
    photos: PropTypes.arrayOf(
      PropTypes.shape({
        uri: PropTypes.string.isRequired,
      }),
    ).isRequired,
    addPhoto: PropTypes.func.isRequired,
    removePhoto: PropTypes.func.isRequired,
  }

  state = {}

  handleAddClick = async () => {
    const { addPhoto } = this.props
    const options = ["Camera", "Library", "Cancel"]

    ActionSheetIOS.showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex: 2,
      },
      async index => {
        switch (options[index]) {
          case "Camera": {
            const { status } = await Permissions.askAsync(Permissions.CAMERA)
            if (status === "granted") {
              const {
                uri,
                width,
                height,
              } = await ImagePicker.launchCameraAsync()
              addPhoto({ uri, width, height })
            }
            break
          }
          case "Library": {
            const { status } = await Permissions.askAsync(
              Permissions.CAMERA_ROLL,
            )
            if (status === "granted") {
              const {
                cancelled,
                uri,
                width,
                height,
              } = await ImagePicker.launchImageLibraryAsync()
              if (cancelled) return
              addPhoto({ uri, width, height })
            }
            break
          }
        }
      },
    )
  }

  render() {
    const { photos, removePhoto } = this.props

    return (
      <Fragment>
        <DividerHeading>Photos</DividerHeading>
        <View
          style={{
            marginHorizontal: Spacing.s,
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {photos.map(photo => (
            <Box
              key={photo.uri}
              style={{
                width: 80,
                height: 80,
                alignItems: "center",
                justifyContent: "center",
                marginHorizontal: Spacing.s,
                marginVertical: Spacing.m,
              }}
            >
              <Image
                source={{ uri: photo.uri }}
                style={{ width: 72, height: 72, borderRadius: 8 }}
              />
              <ButtonCircle
                style={{ position: "absolute", top: 60 }}
                icon="x"
                color={Colors.danger}
                title="Remove"
                onPress={() => removePhoto(photo)}
              />
            </Box>
          ))}
          <ButtonSquare
            title="Add"
            icon="plus"
            onPress={this.handleAddClick}
            style={{
              marginHorizontal: Spacing.s,
              marginVertical: Spacing.m,
            }}
          />
        </View>
      </Fragment>
    )
  }
}

export default () => (
  <CreateSessionContext.Consumer>
    {({ photos, addPhoto, removePhoto }) => {
      return (
        <PhotosSection
          photos={photos}
          addPhoto={addPhoto}
          removePhoto={removePhoto}
        />
      )
    }}
  </CreateSessionContext.Consumer>
)
