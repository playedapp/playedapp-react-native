import React from "react"
import PropTypes from "prop-types"
import { TouchableOpacity } from "react-native"
import Colors from "../../constants/Colors"
import { Feather } from "@expo/vector-icons"
import Shadows from "../../constants/Shadows"

const ButtonCircle = ({ title, icon, color, style = {}, ...props }) => {
  return (
    <TouchableOpacity
      {...props}
      accessibilityLabel={title}
      style={[
        {
          width: 32,
          height: 32,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: Colors.white,
          borderRadius: 16,
          ...Shadows.box,
        },
        style,
      ]}
    >
      <Feather name={icon} size={32} color={color} />
    </TouchableOpacity>
  )
}

ButtonCircle.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  color: PropTypes.string,
}

ButtonCircle.defaultProps = {
  color: Colors.primary,
}

export default ButtonCircle
