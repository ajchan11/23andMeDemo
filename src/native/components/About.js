import React from 'react';
import { StyleSheet, Image, TouchableOpacity, Picker } from 'react-native';
import { Container, Content, Text, H1, H2, H3, Button, View} from 'native-base';
import { Video } from 'expo';
import Spacer from './Spacer';
import PickerModal from './PickerModal';
const options =['Sleep', 'Productivity', 'Steps', 'Exercise', 'Social Activity']
const sleepGif = require('../../images/sleep.gif')
const productivityGif = require('../../images/productivity.gif')

class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activePicker: false,
      picked: 'Productivity'
    }

    this.toggle = this.toggle.bind(this)
    this.choose = this.choose.bind(this)
  }
s
  toggle() {
    this.setState({activePicker: !this.state.activePicker})
  }

  choose(val) {
    this.setState({picked: val})
    setTimeout(this.toggle, 700)
  }

  renderPickerModal() {
    const {activePicker, picked} = this.state
    if (activePicker) {
      return (
        <Picker
            mode={'dropdown'}
            selectedValue={picked}
            onValueChange={(itemValue) => this.setState({picked: itemValue})}>
            <Picker.Item label={"Productivity"} value={"Productivity"} />
            <Picker.Item label={"Sleep"} value={"Sleep"} />
        </Picker>
        )
    }
  }

  render() {
    const {activePicker, picked} = this.state
    return (
      <Container style={{backgroundColor: 'white'}}>
        <Content padder>
          <View style={styles.row}>
            <TouchableOpacity style={{flex: 1, justifyContent: 'center'}}>
              <Image style={styles.drop1} source={require('../../images/caffeineDrop.png')}/>
            </TouchableOpacity>
            <TouchableOpacity style={{flex: 1, justifyContent: 'center'}}>
              <Image style={styles.drop2} source={require('../../images/weekDrop.png')}/>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity style={styles.sleepBox} onPress={this.toggle}>
              <Text style={styles.sleep}>{picked}</Text>
              <Image style={styles.tri1} source={require('../../images/sleepTri.png')}/>
            </TouchableOpacity>
            <Text style={styles.vs}>vs.</Text>
            <View style={styles.caffeineBox}>
              <Text style={styles.caffeine}>Caffeine</Text>
              <Image style={styles.tri2} source={require('../../images/caffeineTri.png')}/>
            </View>
          </View>
          {
            this.state.picked == 'Sleep' ? 
            <Image style={styles.graph} source={sleepGif}/>
            :
            <Image style={styles.graph} source={productivityGif}/>
          }
          
          {/* <Image style={styles.graph} source={{uri: 'https://media.giphy.com/media/8rFwad9NFfO10HqFjZ/giphy.gif'}}/> */}
          <Spacer size={30} />
        </Content>
        <PickerModal visible={activePicker} options={options} toggle={this.toggle} choose={this.choose} picked={picked}/>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  tri1: {
    marginTop: 5,
    width: 10, 
    position: 'absolute',
    right: 0,
    resizeMode: 'contain',
  },  
  tri2: {
    marginTop: 5,
    position: 'absolute',
    right: 0,
    width: 10, 
    resizeMode: 'contain',
  },
  drop1: {
    width: 150,
    resizeMode: 'contain',
  },
  drop2: {
    marginLeft: 60,
    width: 90,
    resizeMode: 'contain',
  },
  sleep: {
    color: '#5bc5e2',
    fontSize: 24,
    fontWeight: '300',
  },
  sleepBox: {
    flex: 1,
    marginRight: 10,
    flexDirection: 'row',
    borderBottomWidth: 1,
    paddingRight: 10,
    borderBottomColor: '#5bc5e2'
  },
  caffeine: {
    color: '#d21068',
    fontSize: 24,
    fontWeight: '300',
  },
  vs: {
    paddingTop: 4,
    paddingRight: 20,
    color: '#262626',
  },  
  caffeineBox: {
    flex: 1,
    flexDirection: 'row',
    paddingRight: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#d21068'
  },
  graph: {
    alignSelf: 'center',
    width: 350,
    height: 400,
    resizeMode: 'contain',
  }
})

export default About;
