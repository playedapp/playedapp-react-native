import Colors from "../constants/Colors"
import { StyleSheet } from "react-native"

export default StyleSheet.create({
  box: {
    shadowColor: Colors.shadow,
    shadowOpacity: 0.7,
    shadowRadius: 0,
    shadowOffset: {
      height: 3,
    },
  },
  inputInset: {
    shadowColor: Colors.insetShadow,
    shadowRadius: 5,
    shadowOffset: {
      height: 2,
    },
    borderWidth: 20,
  },
  textShadow: {
    textShadowColor: "#00000099",
    textShadowRadius: 1,
    textShadowOffset: {
      height: 1,
    },
  },
})
