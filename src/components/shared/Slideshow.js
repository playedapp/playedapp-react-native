import React from "react"
import { View, Image, StyleSheet, Dimensions, Text } from "react-native"
import Swiper from "react-native-swiper"
import PropTypes from "prop-types"
import Spacing from "../../constants/Spacing"
import Shadows from "../../constants/Shadows"
import text from "../../styles/text"
import colors from "../../styles/colors"

const renderPagination = (index, total) => (
  <View style={styles.pagination}>
    <Text style={[text.small, colors.white, Shadows.textShadow]}>
      {index + 1}/{total}
    </Text>
  </View>
)

const Slideshow = ({ images, ...props }) => (
  <Swiper
    loop={false}
    bounces={true}
    style={{ height: 300 }}
    renderPagination={renderPagination}
    {...props}
  >
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
  pagination: {
    position: "absolute",
    bottom: Spacing.m,
    left: Spacing.m,
    opacity: 0.8,
  },
})
