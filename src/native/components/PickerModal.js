import React from 'react';
import PropTypes from 'prop-types';
import { View, Modal, TouchableOpacity, StyleSheet, Switch, Image, Picker } from 'react-native';
import { Text, Button} from 'native-base';

const PickerModal = ({ visible, picked, choose, toggle, options, type }) => (
    <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
    >   
        <TouchableOpacity style={{height: 600}} onPress={toggle}/>
        <View style={{flex: 1, backgroundColor: 'white'}}>
            <Picker
                mode={'dropdown'}
                selectedValue={picked}
                onValueChange={(itemValue) => choose(itemValue, type)}>
                {
                    options.map((g, i) => <Picker.Item label={g} value={g} key={i} />)
                }
            </Picker>
        </View>
    </Modal>

)

export default PickerModal;
