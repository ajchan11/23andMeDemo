import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, TouchableOpacity, RefreshControl, Image, TouchableHighlight, StyleSheet, Dimensions } from 'react-native';
import { Container, Content, Card, CardItem, Body, Text, Button, H3, View } from 'native-base';
import { Actions } from 'react-native-router-flux';
import Loading from './Loading';
import Error from './Error';
import Header from './Header';
import Spacer from './Spacer';
import NotificationModal from './NotificationModal';
import SurveyModal from './SurveyModal';
import StudyCard from './StudyCard';
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

class RecipeListing extends React.Component {
  static propTypes = {
    error: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    recipes: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    reFetch: PropTypes.func,
  }

  static defaultProps = {
    error: null,
    reFetch: null,
  }

  constructor(props) {
    super(props);
    this.state = {
      notificationVisible: false,
      surveyVisible: false,
      activeSurvey: '',
      surveyComplete: false
    }
    this.toggleModal = this.toggleModal.bind(this)
    this.toggleSurvey = this.toggleSurvey.bind(this)
    setTimeout(this.toggleModal, 1000)
  }

  toggleModal = () => {
    this.setState({notificationVisible: !this.state.notificationVisible});
  }

  toggleSurvey = (index) => {
    if (index > 5) {
      this.setState({
        surveyComplete: true,
        surveyVisible: !this.state.surveyVisible,
      });
    } else {
      this.setState({
        surveyVisible: !this.state.surveyVisible,
      });
    }
  }

  complete() {
    this.setState({surveyComplete: false})
    Actions.home()
  }

  render() {
    // Loading
    const { loading, error, recipes, reFetch } = this.props;
    if (loading) return <Loading />;
    // Error
    if (error) return <Error content={error} />;

    const keyExtractor = item => item.id;

    const onPress = item => Actions.recipe({ match: { params: { id: String(item) } } });

    return (
      <Container>
        <NotificationModal 
          visible={this.state.notificationVisible}
          toggleModal={this.toggleModal}
        />
        <SurveyModal 
          visible={this.state.surveyVisible}
          toggleSurvey={this.toggleSurvey}
        />
        <Content>
          {
            this.state.surveyComplete ? 
            <View>
              <Text style={styles.thank}>Thanks for completing today's survey!</Text>
              <Image style={styles.insights} source={require('../../images/insights.png')}/>
              <Text style={styles.hop}>Hop on over to Insights to see what it all means.</Text>
              <View style={styles.buttonBox}>
                  <Button style={styles.success} block light disabled={false} onPress={() =>this.complete()}>
                      <Text style={styles.successText}>Get Insights</Text>
                  </Button>
              </View>
            </View>
            :  <View>
                <Text style={{ color: '#6A6A6A', margin: 20}}>My Studies</Text>
                <StudyCard
                  title={'Caffeine'}
                  text={'Joined April 5th, 2018'}
                  active={true}
                  move={this.toggleSurvey}
                />
                <Text style={{color: '#6A6A6A', margin: 20}}>Join another Study</Text>
                <StudyCard
                  title={'Lifestyle Observational'}
                  text={'Learn about how your lifestyle impacts your health'}
                  active={false}
                  move={() => this.toggleSurvey()}
                />
                <StudyCard
                  title={'Self-Guided Weight Loss Study'}
                  text={'Find a weight loss program tailored to you'}
                  active={false}
                  move={() => this.toggleSurvey()}
                />
              </View>
          }
          
          <Spacer size={20} />
        </Content>
      </Container>
    );

  }
  
}

const styles = StyleSheet.create({
  thank: {
    marginTop: 40,
    fontSize: 24,
    fontWeight: '500',
    color: '#7f7f7f',
    textAlign: 'center',
  },
  insights: {
    marginVertical: 40,
    alignSelf: 'center',
    width: 145,
    height: 145
  },
  hop: {
    fontSize: 18,
    paddingHorizontal : 24,
    color: '#262626',
    marginBottom: 40,
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
})

export default RecipeListing;
