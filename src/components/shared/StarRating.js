/* global require */
import React from "react"
import PropTypes from "prop-types"
import { Image, View } from "react-native"

const YellowLeft = require("../../../assets/images/rating/YellowLeft.png")
const YellowRight = require("../../../assets/images/rating/YellowRight.png")
const GreenLeft = require("../../../assets/images/rating/GreenLeft.png")
const GreenRight = require("../../../assets/images/rating/GreenRight.png")
const RedLeft = require("../../../assets/images/rating/RedLeft.png")
const RedRight = require("../../../assets/images/rating/RedRight.png")
const GreyLeft = require("../../../assets/images/rating/GreyLeft.png")
const GreyRight = require("../../../assets/images/rating/GreyRight.png")

const StarRating = ({ rating, compareTo }) => {
  const newHalfStars = new Array(rating / 0.5).fill(true)
  const compareHalfStars = new Array(compareTo / 0.5).fill(true)

  return (
    <View style={{ flexDirection: "row" }}>
      {new Array(10).fill("").map((val, index) => {
        const left = index % 2 === 0
        let image
        if (newHalfStars[index] === true) {
          if (compareHalfStars[index] === true) {
            image = left ? YellowLeft : YellowRight
          } else {
            image = left ? GreenLeft : GreenRight
          }
        } else {
          if (compareHalfStars[index] === true) {
            image = left ? RedLeft : RedRight
          } else {
            image = left ? GreyLeft : GreyRight
          }
        }
        return <Image key={index} source={image} />
      })}
    </View>
  )
}

StarRating.propTypes = {
  rating: PropTypes.number.isRequired,
  compareTo: PropTypes.number,
}

StarRating.defaultProps = {
  compareTo: 0,
}

export default StarRating
