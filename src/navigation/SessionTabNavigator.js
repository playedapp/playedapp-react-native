import { TabNavigator, TabBarTop } from "react-navigation"
import Colors from "../constants/Colors"
import SessionDetailsScreen from "../screens/SessionDetailsScreen"
import SessionScoreboardScreen from "../screens/SessionScoreboardScreen"
import SessionRatingsScreen from "../screens/SessionRatingsScreen"
import SessionCommentsScreen from "../screens/SessionCommentsScreen"
import Fonts from "../constants/Fonts"

const Tabs = TabNavigator(
  {
    Session: {
      screen: SessionDetailsScreen,
    },
    ScoreBoard: {
      screen: SessionScoreboardScreen,
    },
    Ratings: {
      screen: SessionRatingsScreen,
    },
    Comments: {
      screen: SessionCommentsScreen,
    },
  },
  {
    initialRouteName: "Session",
    // initialRouteParams: { id: this.props.navigation.state.params.id },
    tabBarComponent: TabBarTop,
    tabBarPosition: "top",
    tabBarOptions: {
      activeTintColor: Colors.primary,
      inactiveTintColor: Colors.text,
      scrollEnabled: true,
      upperCaseLabel: false,
      tabStyle: {},
      style: {
        backgroundColor: Colors.white,
      },
      labelStyle: {
        fontFamily: Fonts.families.nunito.bold,
        fontSize: Fonts.sizes.default,
        padding: 0,
        margin: 0,
      },
      indicatorStyle: {
        backgroundColor: "cyan",
      },
    },
  },
)

export default Tabs
