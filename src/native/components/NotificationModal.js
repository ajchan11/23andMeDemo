import React from 'react';
import PropTypes from 'prop-types';
import { View, Modal, TouchableOpacity, StyleSheet, Switch, Image } from 'react-native';
import { Text, Button} from 'native-base';

const NotificationModal = ({ visible, toggleModal }) => (
    <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={() => {
            alert('Modal has been closed.');
        }}>
        <View style={{marginTop: 22, flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor:'rgba(0,0,0,0.2)',
        alignItems: 'center'}}>
            <View style={{width: 290, height: 450,  backgroundColor: 'white'}}>
                <View style={{marginTop: 20, marginBottom: 30}}>
                    <Text style={{color: '#6A6A6A', textAlign: 'center'}}>PERMISSIONS</Text>
                    <TouchableOpacity
                        style={{position: 'absolute', right: 10}}
                        onPress={toggleModal}>
                        <Image
                            style={styles.closeButton}
                            source={require('../../images/close.png')}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.container}>
                    <View style={styles.row}>
                        <Text style={styles.noticeText}>APPLE HEALTH</Text>
                        <View style={styles.switchBox}>
                            <Switch
                                style={styles.switch}
                                // onValueChange = {switchHealth}
                                value = {true}/>
                        </View>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.noticeText}>NOTIFICATIONS</Text>
                        <View style={styles.switchBox}>
                            <Switch
                                // onValueChange = {switchHealth}
                                value = {true}/>
                        </View>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.noticeText}>MOTION</Text>
                        <View style={styles.switchBox}>
                        <Switch
                            // onValueChange = {switchHealth}
                            value = {true}/>
                        </View>
                    </View>
                    <View>
                        <Button style={styles.success} block light onPress={() =>this.setIndex(3)}>
                            <Text style={styles.successText}>Save</Text>
                        </Button>
                    </View>
                </View>
                <View style={styles.bottomBox}>
                    <Image
                        style={styles.notificationImage}
                        source={require('../../images/notificationBottom.png')}
                    />
                </View>
            </View>
        </View>
    </Modal>
);

NotificationModal.propTypes = {
  message: PropTypes.string,
  type: PropTypes.oneOf(['error', 'success', 'info']),
};

NotificationModal.defaultProps = {
  message: 'An unexpected error came up',
  type: 'error',
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 40,
        height: 300,
    },
    row: {
        height: 30,
        flex: 1,
        flexDirection: 'row',
    },
    switchBox: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingRight: 20,
    },
    success: {
        marginHorizontal: 20,
        borderRadius: 2,
        backgroundColor: '#88C437',
    },
    successText: {
        color: 'white'
    },
    noticeText: {
        paddingTop: 5,
        paddingLeft: 24,
        color: '#8e8e93', 
        textAlign: 'left'
    },
    bottomBox: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
    },
    notificationImage: {
        height: 50,
        position: 'absolute',
        bottom: 0,
        resizeMode: 'cover',
        width: 290,
    },
    closeButton: {
        height: 20,
        width: 20,
        resizeMode: 'contain',
    }
})

export default NotificationModal;
