import React from "react"
import { View, Image, StyleSheet, Dimensions } from "react-native"
import Swiper from "react-native-swiper"
import PropTypes from "prop-types"
import Spacing from "../../constants/Spacing"
import { SmallText } from "./TextStyles"
import Colors from "../../constants/Colors"
import Shadows from "../../constants/Shadows"

const renderPagination = (index, total) => (
  <View style={styles.pagination}>
    <SmallText style={{ color: Colors.white, ...Shadows.textShadow }}>
      {index + 1}/{total}
    </SmallText>
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
