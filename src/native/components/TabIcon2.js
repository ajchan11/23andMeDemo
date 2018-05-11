
import React from 'react';
import PropTypes from 'prop-types';
import DefaultProps from '../constants/navigation';
import { Icon } from 'native-base';
import {
Image,
  Text,
} from 'react-native';

const propTypes = {
  selected: PropTypes.bool,
  title: PropTypes.string,
};

const TabIcon2 = (props) => {
    return <Image style={{resizeMode: 'contain', width: 50, height: 50, marginBottom: 100 }}source={require('../../images/tab2.png')}/>
    // return <Icon name="contact" {...DefaultProps.icons} />
};

TabIcon2.propTypes = propTypes;

export default TabIcon2;