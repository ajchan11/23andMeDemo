import React from 'react';
import { Scene, Tabs, Stack } from 'react-native-router-flux';
import { Icon } from 'native-base';

import DefaultProps from '../constants/navigation';
import AppConfig from '../../constants/config';

import RecipesContainer from '../../containers/Recipes';
import RecipesComponent from '../components/Recipes';
import RecipeViewComponent from '../components/Recipe';

import SignUpContainer from '../../containers/SignUp';
import SignUpComponent from '../components/SignUp';

import LoginContainer from '../../containers/Login';
import LoginComponent from '../components/Login';

import ForgotPasswordContainer from '../../containers/ForgotPassword';
import ForgotPasswordComponent from '../components/ForgotPassword';

import LocaleContainer from '../../containers/Locale';
import LocaleComponent from '../components/Locale';

import UpdateProfileContainer from '../../containers/UpdateProfile';
import UpdateProfileComponent from '../components/UpdateProfile';

import MemberContainer from '../../containers/Member';
import ProfileComponent from '../components/Profile';

import AboutComponent from '../components/About';
import TabIcon from '../components/TabIcon'
import TabIcon2 from '../components/TabIcon2'

const test = (props) => {
  console.log
  return '#D60D67'
}

const Index = (
  <Stack>
    <Scene hideNavBar>
      <Tabs
        key="tabbar"
        lazy={true}
        swipeEnabled
        type="replace"
        activeBackgroundColor={'#D60D67'}
        // showLabel={true}
        {...DefaultProps.tabProps}
        
      >
       <Stack
          key="recipes"
          title="Studies"
          icon={TabIcon}
          {...DefaultProps.navbarProps}
        >
          <Scene key="recipes" component={RecipesContainer} Layout={RecipesComponent} />
        </Stack>
        <Stack
          key="home"
          title="Insights"
          icon={TabIcon2}
          {...DefaultProps.insightProps}
        >
          <Scene key="home" component={AboutComponent} />
        </Stack>

        <Stack
          key="notifications"
          title="Notifications"
          icon={() => <Icon name="contact" {...DefaultProps.icons} />}
          {...DefaultProps.navbarProps}
        >
          <Scene key="profileHome" component={MemberContainer} Layout={ProfileComponent} />
        </Stack>
        <Stack
          key="profile"
          title="Profile"
          icon={() => <Icon name="contact" {...DefaultProps.icons} />}
          {...DefaultProps.navbarProps}
        >
          <Scene key="profileHome" component={MemberContainer} Layout={ProfileComponent} />
          <Scene
            back
            key="signUp"
            title="SIGN UP"
            {...DefaultProps.navbarProps}
            component={SignUpContainer}
            Layout={SignUpComponent}
          />
          <Scene
            back
            key="login"
            title="LOGIN"
            {...DefaultProps.navbarProps}
            component={LoginContainer}
            Layout={LoginComponent}
          />
          <Scene
            back
            key="forgotPassword"
            title="FORGOT PASSWORD"
            {...DefaultProps.navbarProps}
            component={ForgotPasswordContainer}
            Layout={ForgotPasswordComponent}
          />
          <Scene
            back
            key="locale"
            title="CHANGE LANGUAGE"
            {...DefaultProps.navbarProps}
            component={LocaleContainer}
            Layout={LocaleComponent}
          />
          <Scene
            back
            key="updateProfile"
            title="UPDATE PROFILE"
            {...DefaultProps.navbarProps}
            component={UpdateProfileContainer}
            Layout={UpdateProfileComponent}
          />
        </Stack>
      </Tabs>
    </Scene>

    <Scene
      back
      clone
      key="recipe"
      title="RECIPE"
      {...DefaultProps.navbarProps}
      component={RecipesContainer}
      Layout={RecipeViewComponent}
    />
  </Stack>
);

export default Index;
