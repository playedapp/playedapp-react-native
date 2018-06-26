import React from "react"
import PropTypes from "prop-types"
import { TouchableOpacity, View, Text } from "react-native"
import Colors from "../../constants/Colors"
import { Feather } from "@expo/vector-icons"
import Box from "./Box"
import text from "../../styles/text"

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
        <Text style={text.muted}>{title.toUpperCase()}</Text>
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
