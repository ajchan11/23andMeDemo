import React from 'react';
import PropTypes from 'prop-types';
import { View, Modal, TouchableOpacity, Picker, StyleSheet, Dimensions, Image } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Text } from 'native-base';
import Carousel from './Carousel'
import Colors from '../../../native-base-theme/variables/commonColor';
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

class SurveyModal extends React.Component {
    static propTypes = {
        message: PropTypes.string,
        type: PropTypes.oneOf(['error', 'success', 'info']),
      }
      constructor(props) {
        super(props);
        this.state = {
            activePage: 0,
            user: "maria"
        }
        this.setIndex = this.setIndex.bind(this)
      }

      componentDidUpdate() {
          if (this.state.activePage != 0 && !this.props.visible) {
              this.setIndex(0)
          }
      }

      setIndex(index) {
          console.log("INDEX", index)
          this.setState({activePage: index})
      }

      renderBackButton(toggleSurvey) {
        if (this.state.activePage != 0 && this.state.activePage > 0) {
            let backPage = this.state.activePage - 1
            console.log('back', backPage)
            return (
                <Button transparent onPress={() => this.setIndex(backPage)}>
                    <Image
                        style={styles.closeButton}
                        source={require('../../images/back.png')}
                    />
                </Button>
            )
        } 
      }
    
      render() {
        const {visible, toggleSurvey} = this.props
        return (
            <Modal
                animationType="slide"
                transparent={false}
                visible={visible}
            >
                <Header style={{borderBottomWidth: 0, backgroundColor: 'white'}}>
                    <Left>{this.renderBackButton()}</Left>
                    {/* <Body>
                        <Title style={{color: '#262626', alignSelf: 'center',letterSpacing: 2,fontSize: Colors.fontSizeBase}}>Caffeine Survey</Title>
                    </Body> */}
                    <Right>
                        <Button onPress={toggleSurvey} transparent >
                            <Image
                                style={styles.closeButton}
                                source={require('../../images/close.png')}
                            />
                        </Button>
                    </Right>
                </Header>
                <Carousel
                    width={deviceWidth}
                    animate={false}
                    hideIndicators={true}
                    loop={false}
                    activePage={this.state.activePage}
                >
                    <View style={styles.container}>
                        <View style={styles.question}>
                            <Text style={styles.questionText}>How much caffeine did you drink
                                <TouchableOpacity style={styles.dropdown}>
                                    <Text style={styles.dropdownText}>yesterday</Text>
                                </TouchableOpacity>
                            </Text>
                        </View>
                        <View style={styles.body}>

                        </View>
                        <View style={styles.buttonBox}>
                            <Button style={styles.success} block light onPress={() =>this.setIndex(1)}>
                                <Text style={styles.successText}>Continue</Text>
                            </Button>
                        </View>
                    </View>
                    <View style={styles.container}>
                        <View style={styles.question}>
                            <Text style={styles.questionText}>How would you rank your quality of sleep?</Text>
                        </View>
                        <View style={styles.body}>

                        </View>
                        <View style={styles.buttonBox}>
                            <Button style={styles.success} block light onPress={() =>this.setIndex(2)}>
                                <Text style={styles.successText}>Continue</Text>
                            </Button>
                        </View>
                    </View>
                    <View style={styles.container}>
                        <View style={styles.question}>
                            <Text style={styles.questionText}>How would you rank your productivity yesterday?</Text>
                        </View>
                        <View style={styles.body}>

                        </View>
                        <View style={styles.buttonBox}>
                            <Button style={styles.success} block light onPress={() =>this.setIndex(3)}>
                                <Text style={styles.successText}>Continue</Text>
                            </Button>
                        </View>
                    </View>
                    <View style={styles.container}>
                        <View style={styles.question}>
                            <Text style={styles.questionText}>What time was your last caffeinated beverage?</Text>
                        </View>
                        <View style={styles.body}>

                        </View>
                        <View style={styles.buttonBox}>
                            <Button style={styles.success} block light onPress={() =>this.setIndex(4)}>
                                <Text style={styles.successText}>Continue</Text>
                            </Button>
                        </View>
                    </View>
                </Carousel>
                <Picker selectedValue = {this.state.user}>
                    <Picker.Item label = "Steve" value = "steve" />
                    <Picker.Item label = "Ellen" value = "ellen" />
                    <Picker.Item label = "Maria" value = "maria" />
                </Picker>
            </Modal>
        )
    }
}

SurveyModal.defaultProps = {
  message: 'An unexpected error came up',
  type: 'error',
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: deviceWidth,
    },
    closeButton: {
        height: 20,
        width: 20,
        resizeMode: 'contain',
    },
    question: {
        width: 306,
        paddingTop: 40,
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    questionText: {
        lineHeight: 50,
        color: "#7f7f7f",
        fontSize: 36,
        letterSpacing: 0.2,
        fontWeight: '700',
    },
    mainContainer: {
      width: 400,
      height: 400,
      justifyContent: 'center',
      backgroundColor: '#23292F'
    },
    body: {
        height: 400
    },
    buttonBox: {
        flex: 1,
        flexDirection: 'row',
        alignSelf: 'center',
    },
    success: {
        width: deviceWidth - 40,
        borderRadius: 2,
        backgroundColor: '#88C437',
    },
    successText: {
        color: 'white'
    },
    dropdown: {
        paddingLeft: 10,
    },
    dropdownText: {
        color: "#d60d67",
        fontSize: 36,
        letterSpacing: 0.2,
        fontWeight: '700',
        textDecorationLine: 'underline',
        // textDecorationStyle: 'solid',
        textDecorationColor: '#d60d67',
    }
  });

export default SurveyModal;
