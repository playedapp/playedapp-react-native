import React from "react"
import PropTypes from "prop-types"
import { TouchableOpacity, View } from "react-native"
import Colors from "../../constants/Colors"
import { Feather } from "@expo/vector-icons"
import { DefaultText } from "./TextStyles"
import Box from "./Box"

const ButtonSquare = ({ title, icon, color, ...props }) => {
  return (
    <TouchableOpacity {...props}>
      <Box
        style={{
          width: 80,
          height: 80,
          alignItems: "center",
        }}
      >
        <View
          style={{
            flexGrow: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Feather name={icon} size={32} color={color} />
        </View>
        <DefaultText
          style={{
            color: Colors.textMuted,
            fontSize: 11,
          }}
        >
          {title.toUpperCase()}
        </DefaultText>
      </Box>
    </TouchableOpacity>
  )
}

ButtonSquare.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  color: PropTypes.string,
}

ButtonSquare.defaultProps = {
  color: Colors.primary,
}

export default ButtonSquare
