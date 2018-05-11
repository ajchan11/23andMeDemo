import Colors from '../../../native-base-theme/variables/commonColor';

export default {
  navbarProps: {
    navigationBarStyle: { backgroundColor: Colors.brandPrimary },
    titleStyle: {
      color: 'white',
      alignSelf: 'center',
      letterSpacing: 0.6,
      fontWeight: '500',
      fontSize: Colors.fontSizeBase,
    },
    backButtonTintColor: Colors.textColor,
  },

  insightProps: {
    navigationBarStyle: { backgroundColor: '#FB7D3C' },
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
    // activeBackgroundColor: Colors.brandPrimary,
    inactiveBackgroundColor: "#f9f9f9",
    tabBarStyle: { paddingBottom: 0 },
    tabStyle: { paddingBottom: 0, height: 85 },
    labelStyle: { top: 0, position: 'absolute'}
  },

  icons: {
    style: { color: 'white', height: 50, width: 50 },
  },
};
