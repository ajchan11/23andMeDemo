import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, } from 'native-base';
import { TouchableOpacity, Image } from 'react-native';
import Colors from '../../../native-base-theme/variables/commonColor';

const cardStyle = (active) => {
    return {
        flex: 1, 
        height: active ? 140 : 100, 
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
        <View style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%'}}>
            {
                active 
                ?  <Image style={{
                    flex: 1,
                    resizeMode: 'cover',
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    justifyContent: 'center',
                    }}
                    source={require('../../images/background.png')}
                /> 
                : null
            }
            
        </View>
        <Text style={cardHeader(active)}>{title}</Text>
        <Text style={cardText(active)}>{text}</Text>
        {
            active
            ? <Image style={{position: 'absolute', right: 5, height: 20, resizeMode: 'contain'}} source={require('../../images/arrow.png')}/>
            : null
        }
        
    </TouchableOpacity>
);

StudyCard.propTypes = {
  size: PropTypes.number,
};

StudyCard.defaultProps = {
  size: 20,
};


export default StudyCard;
