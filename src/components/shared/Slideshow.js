import React from "react"
import { Image, StyleSheet, Dimensions } from "react-native"
import Swiper from "react-native-swiper"
import PropTypes from "prop-types"

const Slideshow = ({ images, ...props }) => (
  <Swiper loop={false} bounces={true} style={{ height: 300 }} {...props}>
    {images.map(image => (
      <Image key={image.url} style={styles.image} source={{ uri: image.url }} />
    ))}
  </Swiper>
)

Slideshow.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string.isRequired,
    }),
  ).isRequired,
}

export default Slideshow

const styles = StyleSheet.create({
  image: {
    width: Dimensions.get("window").width,
    height: 300,
  },
})
