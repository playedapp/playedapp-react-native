import Colors from "./Colors"

const nunito = {
  regular: "nunito-regular",
  semibold: "nunito-semibold",
  bold: "nunito-bold",
}

const fredokaOne = {
  regular: "fredokaone-regular",
}

export default {
  nunito,
  fredokaOne,
  default: {
    fontFamily: nunito.regular,
    fontSize: 15,
    color: Colors.text,
  },
}
