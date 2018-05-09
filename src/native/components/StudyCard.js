import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, } from 'native-base';
import { TouchableOpacity } from 'react-native';
import Colors from '../../../native-base-theme/variables/commonColor';

const cardStyle = (active) => {
    return {
        flex: 1, 
        height: 100, 
        backgroundColor: 'white', 
        marginHorizontal: 5, 
        borderTopWidth: 5, 
        borderTopColor: active ? Colors.brandPrimary : '#7F7F7F',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
    }
}

const cardHeader = (active) => {
    return {
        textAlign: 'center',
        color: active ? Colors.brandPrimary : '#7F7F7F',
        fontWeight: active ? '700' : '600',
        fontSize: 20
    }
}

const cardText = (active) => {
    return {
        textAlign: 'center',
        fontSize: active ? 16 : 12,
        color: '#8E8E93'
    }
}

const StudyCard = ({ active, title, text, move }) => (
    <TouchableOpacity style={cardStyle(active)} onPress={() => move()}>
        <Text style={cardHeader(active)}>{title}</Text>
        <Text style={cardText(active)}>{text}</Text>
    </TouchableOpacity>
);

StudyCard.propTypes = {
  size: PropTypes.number,
};

StudyCard.defaultProps = {
  size: 20,
};


export default StudyCard;
