import React from "react"
import ButtonSquare from "../../../components/shared/ButtonSquare"
import Colors from "../../../constants/Colors"
import PropTypes from "prop-types"

const AddOnButton = ({ title, icon, done = false, onPress }) => (
  <ButtonSquare
    title={title}
    icon={done ? "check" : icon}
    color={done ? Colors.success : Colors.primary}
    onPress={onPress}
  />
)

AddOnButton.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  done: PropTypes.bool.isRequired,
  onPress: PropTypes.func.isRequired,
}

export default AddOnButton
