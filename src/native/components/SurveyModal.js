import React from 'react';
import PropTypes from 'prop-types';
import { View, Modal, TouchableOpacity, StyleSheet, Dimensions, Image, Picker, PickerIOS, ScrollView, Animated, PanResponder, WebView } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Text } from 'native-base';
import Carousel from './Carousel'
import Colors from '../../../native-base-theme/variables/commonColor';
import SvgUri from 'react-native-svg-uri';
import { Video } from 'expo';
import PickerModal from './PickerModal';
import BigPickerModal from './BigPickerModal';

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
const inactiveRadio = require('../../images/oval.png')
const activeRadio = require('../../images/ovalFill.png')
const line = require('../../images/line.png')
const itemOptions = ['Select Drink', 'Coffee', 'Tea', 'Soda']
const quantities = ["0","1","2","3","4","5","6","7"]
const dates = ['yesterday', '2 days ago', '3 days ago']

class SurveyModal extends React.Component {
    static propTypes = {
        message: PropTypes.string,
        type: PropTypes.oneOf(['error', 'success', 'info']),
      }
      constructor(props) {
        super(props);
        this.inputRefs = {};
        this.state = {
            activePage: 4,
            visibleDate: false,
            visibleQ1: false,
            visibleQ2: false,
            visibleD1: false,
            visibleD2: false,
            selectedValue: '',
            drinks: [{}],
            sleep: null,
            productivity: null,
            caffeineTime: 40,
            activeDate: 'yesterday',
            activeQ1: "0",
            activeQ2: "0",
            activeD1: 'Select Drink',
            activeD2: 'Select Drink',
            pan: new Animated.ValueXY(),
            scale: new Animated.Value(1),
            sleepTime: "6:00pm",
            wakeTime: "6:00pm"
        }
        this.setIndex = this.setIndex.bind(this)
        this.togglePicker = this.togglePicker.bind(this)
        this.selectPicker = this.selectPicker.bind(this)
        this.addItem = this.addItem.bind(this)
        this.toggleRadio = this.toggleRadio.bind(this)
        this.changeTime = this.changeTime.bind(this)
        this.calculate = this.calculate.bind(this)
        this.calcTime = this.calcTime.bind(this)
      }

      componentDidUpdate() {
          if (this.state.activePage != 0 && !this.props.visible) {
              this.setIndex(0)
          }
          console.log('query', this.props.query)
      }

      componentWillMount() {
        this._panResponder = PanResponder.create({
            onMoveShouldSetResponderCapture: () => true,
            onMoveShouldSetPanResponderCapture: () => true,
            onStartShouldSetPanResponder: (e, gestureState) => true,
            onPanResponderEnd: (e, gestureState) => true,
        
            // Initially, set the value of x and y to 0 (the center of the screen)
            onPanResponderGrant: (e, gestureState) => {
                this.state.pan.setOffset({x: this.state.pan.x._value, y: 0});
                this.state.pan.setValue({x: 0, y: 0});
            },
        
            // When we drag/pan the object, set the delate to the states pan position
            onPanResponderMove: Animated.event([
                null, {dx: this.state.pan.x, dy: 0},
            ]),
        
            onPanResponderRelease: (e, {vx, vy}) => {
                this.state.pan.flattenOffset();
                this.calcTime(this.state.pan.x)
            }
        });
      }
      
      calcTime(x) {
            let v = +JSON.stringify(x)/280 *14
            let min = Math.floor((Math.abs(v) * 60) % 60);
            let sMin = min < 10 ? `0${min}` : `${min}`
            let sHour = v < 6 ? Math.floor(6+v) : Math.floor(v-6)
            sHour = sHour == 0 ? 12 : sHour
            let ampm =  v < 6 ? "pm" : "am"
            this.setState({sleepTime: `${sHour}:${sMin}${ampm}`})
      }

      toggleRadio(survey, index) {
          if (survey == 'sleep') {
            this.setState({sleep: index})
          }
          if (survey == 'productivity') {
            this.setState({productivity: index})
          }
      }

      setIndex(index) {
          if (index > 6) {
            this.props.toggleSurvey(7)
          } else {
            this.setState({activePage: index})
          }
          
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
          const {drinks, activeD1, activeD2, activeQ1, activeQ2} = this.state
          return drinks.map((g, i) => {
              return (
                  <View style={styles.row} key={i}>
                    <TouchableOpacity style={styles.box} onPress={() => this.togglePicker(`Q${i +1}`)}>
                        <Text style={styles.boxText}>{i == 0 ? activeQ1 : activeQ2}</Text>
                    </TouchableOpacity>
                    <Text style={styles.drinkText}>cup(s) of</Text>
                    <TouchableOpacity style={styles.optionBox} onPress={() => this.togglePicker(`D${i +1}`)}>
                        <Text style={styles.optionText}>{i == 0 ? activeD1 : activeD2}</Text>
                    </TouchableOpacity>
                  </View>
              )
          })
      }

      changeTime(dir) {
          let {caffeineTime} = this.state
          if (dir == 'up') {
            caffeineTime += 5
            this.setState({caffeineTime})
          } else {
              if (caffeineTime > 0) {
                caffeineTime -= 5
                this.setState({caffeineTime})
              }
            
          }
      }

      togglePicker(type) {
            let hi = {}
            hi[`visible${type}`] = !this.state[`visible${type}`]
            this.setState(hi)
      }

      selectPicker(itemValue, type) {
            let hi = {}
            hi[`active${type}`] = itemValue
            this.setState(hi)
            setTimeout(() => {
                this.togglePicker(type)
            }, 700)
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

      calculate() {
          const {activeD1, activeD2, activeQ1, activeQ2} = this.state
          const hi = {
              'Select Drink': 0,
              'Coffee': 95,
              'Tea': 27,
              'Soda': 39
          }
          return (+activeQ1 * hi[activeD1]) + (+activeQ2 * hi[activeD2]) 
      }

      render() {
        let {activeDate, activeQ1, activeQ2, activeD1, activeD2, caffeineTime, pickerDate, pickerQuantity, pickerDrink, visibleDate, visibleD1, visibleD2, visibleQ1, visibleQ2, sleepTime, wakeTime} = this.state
        let {visible, toggleSurvey, query} = this.props
        let site = query ? `custom/query=${query}` : 'default'
        let { pan, scale } = this.state;

        // Calculate the x and y transform from the pan value
        let [translateX, translateY] = [pan.x, pan.y];

        // Calculate the transform property and set it as a value for our style which we add below to the Animated.View component
        let rotate = '0deg';

        // Calculate the transform property and set it as a value for our style which we add below to the Animated.View component
        let imageStyle = { transform: [{translateX}, {translateY}, {rotate}, {scale}]};
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
                        {
                            this.state.activePage != 5 ?
                                <Button onPress={() => toggleSurvey(this.state.activePage)} transparent >
                                <Image
                                    style={styles.closeButton}
                                    source={require('../../images/close.png')}
                                />
                            </Button>
                            : null
                        }
                    </Right>
                </Header>
                <Carousel
                    width={deviceWidth}
                    animate={false}
                    hideIndicators={true}
                    loop={false}
                    initialPage={this.state.activePage}
                    activePage={this.state.activePage}
                >
                    <View style={styles.container}>
                        <WebView
                            source={{uri: `http://178.128.178.134:3000/view/${site}`}}
                        />
                        <View style={styles.buttonBox}>
                            <Button style={styles.success} block light disabled={false} onPress={() =>this.setIndex(1)}>
                                <Text style={styles.successText}>Proceed to Survey</Text>
                            </Button>
                        </View>
                    </View>
                    <View style={styles.container}>
                        <View style={styles.question}>
                            <Text style={styles.questionText}>How much caffeine did you drink</Text>
                            <TouchableOpacity style={styles.dropdown} onPress={() => this.togglePicker('Date')}>
                                <Text style={styles.dropdownText}>{activeDate}</Text>
                                <Image style={{position: 'absolute', right: 5, width: 10, resizeMode: 'contain', marginTop: 15}} source={require("../../images/caffeineTri.png")} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.body}>
                            {this.renderDrinkOptions()}
                            <TouchableOpacity style={styles.rowEnd} onPress={this.addItem}>
                                <Text style={styles.addItem}>Add Item</Text>
                                <Image style={styles.closeButton} source={require('../../images/iconMore.png')}/>
                            </TouchableOpacity>
                            <View style={styles.row}>
                                <Text style={styles.totalText}>Total Caffeine:</Text>
                                <Text style={styles.caffeineText}>~{this.calculate()}mg</Text>
                            </View>
                        </View>
                        <View style={styles.buttonBox}>
                            <Button style={styles.success} block light disabled={false} onPress={() =>this.setIndex(2)}>
                                <Text style={styles.successText}>Continue</Text>
                            </Button>
                        </View>
                    </View>
                    <View style={styles.container}>
                        <View style={styles.question}>
                            <Text style={styles.questionText}>How would you rank your quality of sleep?</Text>
                        </View>
                        <View style={styles.body}>
                            {this.renderRadio('sleep')}
                        </View>
                        <View style={styles.buttonBox}>
                            <Button style={styles.success} block light onPress={() =>this.setIndex(3)}>
                                <Text style={styles.successText}>Continue</Text>
                            </Button>
                        </View>
                    </View>
                    <View style={styles.container}>
                        <View style={styles.question}>
                            <Text style={styles.questionText}>How would you rank your productivity {activeDate}?</Text>
                        </View>
                        <View style={styles.body}>
                            {this.renderRadio('productivity')}
                        </View>
                        <View style={styles.buttonBox}>
                            <Button style={styles.success} block light onPress={() =>this.setIndex(4)}>
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
                            <Button style={styles.success} block light onPress={() =>this.setIndex(5)}>
                                <Text style={styles.successText}>Continue</Text>
                            </Button>
                        </View>
                    </View>
                    <View style={styles.container}>
                        <View style={styles.question}>
                            <Text style={styles.questionText}>When did you go to sleep last night?</Text>
                        </View>
                        <View style={styles.body}>
                            <Text style={{height: 100, textAlign: 'center', color: '#d21068', fontSize: 34, fontWeight: '300'}}>{sleepTime}</Text>
                            <View style={{height: 200, width: 400}}>
                                {
                                    this.state.activePage == 4 ? 
                                    <Image style={{width:325, resizeMode: 'contain', height:200, marginBottom: 50, marginLeft: 25, position: 'absolute'}} source={require('../../images/movement.gif')}/> 
                                    : null
                                }
                                <Animated.View style={imageStyle} {...this._panResponder.panHandlers}>
                                    <Image style={{height: 230, resizeMode: 'contain'}}source={require('../../images/bar.png')} />
                                </Animated.View>
                            </View>
                        </View>
                        <View style={styles.buttonBox}>
                            <Button style={styles.success} block light onPress={() =>this.setIndex(6)}>
                                <Text style={styles.successText}>Continue</Text>
                            </Button>
                        </View>
                        
                    </View>
                    <View style={styles.container}>
                        <View style={styles.question}>
                            <Text style={styles.questionText}>When did you wake up this morning?</Text>
                        </View>
                        <View style={styles.body}>
                            <Text style={{height: 100, textAlign: 'center', color: '#d21068', fontSize: 34, fontWeight: '300'}}>{sleepTime}</Text>
                            <View style={{height: 200, width: 400}}>
                                {
                                    this.state.activePage == 5 ? 
                                    <Image style={{width:325, resizeMode: 'contain', height:200, marginBottom: 50, marginLeft: 25, position: 'absolute'}} source={require('../../images/movement.gif')}/> 
                                    : null
                                }
                                <Animated.View style={imageStyle} {...this._panResponder.panHandlers}>
                                    <Image style={{height: 230, resizeMode: 'contain'}}source={require('../../images/bar.png')} />
                                </Animated.View>
                            </View>
                        </View>
                        <View style={styles.buttonBox}>
                            <Button style={styles.success} block light onPress={() =>this.setIndex(7)}>
                                <Text style={styles.successText}>Continue</Text>
                            </Button>
                        </View>
                    </View>
                </Carousel>
                <PickerModal  options={dates} visible={visibleDate} toggle={() => this.togglePicker('Date')} choose={this.selectPicker} type={'Date'} picked={activeDate}/>
                <PickerModal  options={quantities} visible={visibleQ1} toggle={() => this.togglePicker('Q1')} choose={this.selectPicker} type={'Q1'} picked={activeQ1}/>
                <PickerModal  options={quantities} visible={visibleQ2} toggle={() => this.togglePicker('Q2')} choose={this.selectPicker} type={'Q2'} picked={activeQ2}/>
                <PickerModal  options={itemOptions} visible={visibleD1} toggle={() => this.togglePicker('D1')} choose={this.selectPicker} type={'D1'} picked={activeD1}/>
                <PickerModal  options={itemOptions} visible={visibleD2} toggle={() => this.togglePicker('D2')} choose={this.selectPicker} type={'D2'} picked={activeD2}/>
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
        position: 'absolute',
        bottom: 90,
        // flex: 1,
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
        borderBottomWidth: 1,
        borderBottomColor: '#d60d67',
        width: 250,
    },
    dropdownText: {
        color: "#d60d67",
        fontSize: 36,
        letterSpacing: 0.2,
        fontWeight: '300',
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
