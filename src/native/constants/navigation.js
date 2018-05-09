import Colors from '../../../native-base-theme/variables/commonColor';

export default {
  navbarProps: {
    navigationBarStyle: { backgroundColor: Colors.brandPrimary },
    titleStyle: {
      color: 'white',
      alignSelf: 'center',
      letterSpacing: 2,
      fontSize: Colors.fontSizeBase,
    },
    backButtonTintColor: Colors.textColor,
  },

  tabProps: {
    swipeEnabled: false,
    inactiveTintColor: '#8E8E93',
    activeTintColor: 'white',
    activeBackgroundColor: Colors.brandPrimary,
    inactiveBackgroundColor: "white",
    tabBarStyle: { paddingBottom: 0 },
    tabStyle: { paddingBottom: 0, height: 90 },
    labelStyle: { top: 0, position: 'absolute'}
  },

  icons: {
    style: { color: 'white', height: 50, width: 50 },
  },
};
