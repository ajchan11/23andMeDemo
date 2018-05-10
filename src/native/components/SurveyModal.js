import React from 'react';
import PropTypes from 'prop-types';
import { View, Modal, TouchableOpacity, StyleSheet, Dimensions, Image, Picker, PickerIOS, ScrollView } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Text } from 'native-base';
import Carousel from './Carousel'
import Colors from '../../../native-base-theme/variables/commonColor';
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
const PickerItemIOS = PickerIOS.Item;
const inactiveRadio = require('../../images/oval.png')
const activeRadio = require('../../images/ovalFill.png')
const line = require('../../images/line.png')

class SurveyModal extends React.Component {
    static propTypes = {
        message: PropTypes.string,
        type: PropTypes.oneOf(['error', 'success', 'info']),
        activeDate: PropTypes.string,
      }
      constructor(props) {
        super(props);
        this.inputRefs = {};
        this.state = {
            activePage: 0,
            pickerVisible: false,
            selectedValue: '',
            drinks: [{}],
            sleep: null,
            productivity: null,
            caffeineTime: 40,
        }
        this.setIndex = this.setIndex.bind(this)
        this.togglePicker = this.togglePicker.bind(this)
        this.renderPicker = this.renderPicker.bind(this)
        this.selectPicker = this.selectPicker.bind(this)
        this.addItem = this.addItem.bind(this)
        this.toggleRadio = this.toggleRadio.bind(this)
        this.changeTime = this.changeTime.bind(this)
      }

      componentDidUpdate() {
          if (this.state.activePage != 0 && !this.props.visible) {
              this.setIndex(0)
          }
      }

      toggleRadio(survey, index) {
          if (survey == 'sleep') {
            this.setState({sleep: index})
            console.log("New", this.state.sleep)
          }
          if (survey == 'productivity') {
            this.setState({productivity: index})
          }
      }

      setIndex(index) {
          this.setState({activePage: index})
      }

      addItem() {
          let {drinks} = this.state
          drinks.push({})
          this.setState({drinks})
      }

      renderBackButton(toggleSurvey) {
        if (this.state.activePage != 0 && this.state.activePage > 0) {
            let backPage = this.state.activePage - 1
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

      renderDrinkOptions() {
          const {drinks} = this.state
          return drinks.map((g, i) => {
              return (
                  <View style={styles.row} key={i}>
                    <TouchableOpacity style={styles.box}>
                        <Text style={styles.boxText}>1</Text>
                    </TouchableOpacity>
                    <Text style={styles.drinkText}>cup(s) of</Text>
                    <TouchableOpacity style={styles.optionBox}>
                        <Text style={styles.optionText}>Select Item</Text>
                    </TouchableOpacity>
                  </View>
              )
          })
      }

      changeTime(dir) {
          let {caffeineTime} = this.state
          if (dir == 'up') {
            caffeineTime++
            this.setState({caffeineTime})
          } else {
              if (caffeineTime > 0) {
                caffeineTime--
                this.setState({caffeineTime})
              }
            
          }
      }

      togglePicker() {
          this.setState({pickerVisible: !this.state.pickerVisible})
      }

      selectPicker(itemValue, itemIndex) {
        this.setState({activeDate: itemValue})
        setTimeout(this.togglePicker, 1000)
      }

      checkActive(surveyType) {
        if (surveyType == 'sleep') {
            return this.state.sleep
        }
        if (surveyType == 'productivity') {
            return this.state.productivity
        }
      }

      checkActiveRadio(i, active) {
          return i == active ? activeRadio : inactiveRadio 
      }

      renderRadio(surveyType) {
          const active = this.checkActive(surveyType)
          return (
            <View>
                <View style={styles.rowCenter}>
                    <TouchableOpacity onPress={() => this.toggleRadio(surveyType, 0)}>
                        <Image style={styles.radioOption} source={this.checkActiveRadio(0, active)}/>
                    </TouchableOpacity>
                    <Image style={styles.break} source={line}/>
                    <TouchableOpacity onPress={() => this.toggleRadio(surveyType, 1)}>
                        <Image style={styles.radioOption} source={this.checkActiveRadio(1, active)}/>
                    </TouchableOpacity>
                    <Image style={styles.break} source={line}/>
                    <TouchableOpacity onPress={() => this.toggleRadio(surveyType, 2)}>
                        <Image style={styles.radioOption} source={this.checkActiveRadio(2, active)}/>
                    </TouchableOpacity>
                    <Image style={styles.break} source={line}/>
                    <TouchableOpacity onPress={() => this.toggleRadio(surveyType, 3)}>
                        <Image style={styles.radioOption} source={this.checkActiveRadio(3, active)}/>
                    </TouchableOpacity>
                    <Image style={styles.break} source={line}/>
                    <TouchableOpacity onPress={() => this.toggleRadio(surveyType, 4)}>
                        <Image style={styles.radioOption} source={this.checkActiveRadio(4, active)}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.rowText}>
                    <Text style={styles.radioStart}>Poor</Text>
                    <Text style={styles.radioCenter}>Fair</Text>
                    <Text style={styles.radioEnd}>Excellent</Text>
                </View>
            </View>
          )
      }

      renderPicker() {
          const {pickerVisible, activeDate} = this.state
          if (pickerVisible) {
            return (
                <Picker
                    mode={'dropdown'}
                    selectedValue={activeDate}
                    onValueChange={(itemValue, itemIndex) => this.selectPicker(itemValue, itemIndex)}>
                    <Picker.Item label="yesterday" value="yesterday" />
                    <Picker.Item label="2 days ago" value="2 days ago" />
                    <Picker.Item label = "3 days ago" value = "3 days ago" />
                </Picker>
              )
          }
      }

      render() {
        let {caffeineTime} = this.state
        let {visible, toggleSurvey, activeDate} = this.props
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
                        <ScrollView style={styles.contentContainer}>
                            <View style={styles.question}>
                                <Text style={styles.questionText}>How much caffeine did you drink
                                    <TouchableOpacity style={styles.dropdown} onPress={() => this.togglePicker()}>
                                        <Text style={styles.dropdownText}>{activeDate}</Text>
                                    </TouchableOpacity>
                                </Text>
                            </View>
                            <View style={styles.body}>
                                {this.renderDrinkOptions()}
                                <TouchableOpacity style={styles.rowEnd} onPress={this.addItem}>
                                    <Text style={styles.addItem}>Add Item</Text>
                                    <Image style={styles.closeButton} source={require('../../images/iconMore.png')}/>
                                </TouchableOpacity>
                                <View style={styles.row}>
                                    <Text style={styles.totalText}>Total Caffeine:</Text>
                                    <Text style={styles.caffeineText}>~325mg</Text>
                                </View>
                                <View style={styles.buttonBox}>
                                    <Button style={styles.success} block light onPress={() =>this.setIndex(1)}>
                                        <Text style={styles.successText}>Continue</Text>
                                    </Button>
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                    <View style={styles.container}>
                        <View style={styles.question}>
                            <Text style={styles.questionText}>How would you rank your quality of sleep?</Text>
                        </View>
                        <View style={styles.body}>
                            {this.renderRadio('sleep')}
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
                            {this.renderRadio('productivity')}
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
                            <View style={styles.rowCenter}>
                                <TouchableOpacity onPress={() => this.changeTime('down')}>
                                    <Image style={styles.timeButton} source={require('../../images/iconLess.png')}/>
                                </TouchableOpacity>
                                <Text style={styles.timeText}>{caffeineTime} min</Text>
                                <TouchableOpacity onPress={() => this.changeTime('up')}>
                                    <Image style={styles.timeButton} source={require('../../images/iconMore.png')}/>
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.radioCenter}>before bed</Text>
                        </View>
                        <View style={styles.buttonBox}>
                            <Button style={styles.success} block light onPress={() =>this.setIndex(4)}>
                                <Text style={styles.successText}>Continue</Text>
                            </Button>
                        </View>
                    </View>
                </Carousel>
                {this.renderPicker()}
            </Modal>
        )
    }
}

SurveyModal.defaultProps = {
  message: 'An unexpected error came up',
  type: 'error',
  activeDate: 'yesterday'
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: deviceWidth,
    },
    contentContainer: {
        flex: 1,
        paddingBottom: 100,
    },
    closeButton: {
        flexDirection: 'column',
        justifyContent: 'center',
        height: 20,
        width: 20,
        resizeMode: 'contain',
    },
    timeButton: {
        marginTop: 10,
        height: 20,
        width: 20,
        resizeMode: 'contain',
    },
    radioOption: {
        height: 30,
        width: 30,
        resizeMode: 'contain'
    },
    radioStart: {
        flex: 1,
        marginLeft: 15,
        color: '#7f7f7f',
        letterSpacing: 0.4,
        fontSize: 12,
        fontWeight: '500',
        textAlign: 'left',
    },
    radioEnd: {
        flex: 1,
        color: '#7f7f7f',
        letterSpacing: 0.4,
        fontSize: 12,
        fontWeight: '500',
        textAlign: 'right',
    },
    radioCenter: {
        flex: 1,
        paddingRight: 8,
        color: '#7f7f7f',
        letterSpacing: 0.4,
        fontSize: 12,
        fontWeight: '500',
        textAlign: 'center',
    },
    question: {
        width: 350,
        paddingTop: 40,
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    questionText: {
        lineHeight: 50,
        color: "#262626",
        fontSize: 36,
        letterSpacing: 0.2,
        fontWeight: '300',
    },
    mainContainer: {
      width: 400,
      height: 400,
      justifyContent: 'center',
      backgroundColor: '#23292F'
    },
    body: {
        paddingTop: 20,
        height: 300,
    },
    addItem: {
        paddingTop: 2,
        paddingRight: 10,
        color: '#7f7f7f',
        fontWeight: '500',
        fontSize: 12, 
        letterSpacing: 0.4,
    },
    break: {
        flexDirection: 'column',
        justifyContent: 'center',
        resizeMode: 'contain',
        marginHorizontal: 4,
        height: 30,
        width: 27,
    },
    totalText: {
        paddingTop: 5,
        color: '#262626',
        textAlign: 'left',
        fontWeight: '500',
        fontSize: 14,
        flex: 1,
    },
    caffeineText: {
        color: '#d21068',
        fontWeight: '300',
        fontSize: 20,
        textAlign: 'right',
        flex: 1,
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
    row: {
        paddingHorizontal: 20,
        flexDirection: 'row',
        height: 60,
    },
    rowCenter: {
        marginTop: 30,
        paddingHorizontal: 20,
        flexDirection: 'row',
        height: 50,
        alignSelf: 'center',
    },
    rowText: {
        paddingHorizontal: 30,
        flexDirection: 'row',
        height: 60,
        alignSelf: 'center',
    },
    rowEnd: {
        paddingHorizontal: 20,
        flexDirection: 'row',
        height: 60,
        alignSelf: 'flex-end'
    },
    box: {
        width: 48,
        height: 48,
        borderWidth: 1,
        borderColor: '#eeeff0',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    optionBox: {
        borderWidth: 1,
        width: 180,
        height: 48,
        borderColor: '#eeeff0',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    optionText: {
        paddingLeft: 10,
    },
    boxText: {
        textAlign: 'center'
    },
    drinkText: {
        paddingTop: 15,
        paddingHorizontal: 20,
        color: '#262626',
        fontWeight: '300',
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
        fontWeight: '300',
        textDecorationLine: 'underline',
        textDecorationColor: '#d60d67',
    },
    timeText: {
        color: "#d60d67",
        fontSize: 36,
        letterSpacing: 0.2,
        fontWeight: '300',
        paddingHorizontal: 30,
    }
  });

export default SurveyModal;
