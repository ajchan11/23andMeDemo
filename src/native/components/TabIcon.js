
import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'native-base';
import {
Image,
  Text,
} from 'react-native';

const propTypes = {
  selected: PropTypes.bool,
  title: PropTypes.string,
};

const TabIcon = (props) => {
    return <Image style={{resizeMode: 'contain', width: 50, height: 50, marginBottom: 100 }}source={require('../../images/tab1.png')}/>
};

TabIcon.propTypes = propTypes;

export default TabIcon;