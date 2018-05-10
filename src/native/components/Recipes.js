import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, TouchableOpacity, RefreshControl, Image, TouchableHighlight } from 'react-native';
import { Container, Content, Card, CardItem, Body, Text, Button, H3 } from 'native-base';
import { Actions } from 'react-native-router-flux';
import Loading from './Loading';
import Error from './Error';
import Header from './Header';
import Spacer from './Spacer';
import NotificationModal from './NotificationModal';
import SurveyModal from './SurveyModal';
import StudyCard from './StudyCard';


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
    }
    this.toggleModal = this.toggleModal.bind(this)
    this.toggleSurvey = this.toggleSurvey.bind(this)
    // setTimeout(this.toggleModal, 1000)
  }

  toggleModal = () => {
    this.setState({notificationVisible: !this.state.notificationVisible});
  }

  toggleSurvey = (title) => {
    this.setState({
      surveyVisible: !this.state.surveyVisible,
      activeSurvey: title,
    });
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
          <Text style={{ color: '#6A6A6A', margin: 20}}>My Studies</Text>
          {/* <TouchableHighlight
            onPress={this.toggleModal}>
            <Text>Show Modal</Text>
          </TouchableHighlight> */}

          <StudyCard
            title={'Caffeine'}
            text={'Joined April 5th, 2018'}
            active={true}
            move={() => this.toggleSurvey('Caffeine')}
          />
          <Text style={{color: '#6A6A6A', margin: 20}}>Join another Study</Text>
          <StudyCard
            title={'Lifestyle Observational'}
            text={'Learn about how your lifestyle impacts your health'}
            active={false}
            move={() => this.toggleSurvey('Lifestyle Observational')}
          />
          <StudyCard
            title={'Self-Guided Weight Loss Study'}
            text={'Find a weight loss program tailored to you'}
            active={false}
            move={() => this.toggleSurvey('Self-Guided Weight Loss Study')}
          />

          <Spacer size={20} />
        </Content>
      </Container>
    );

  }
  
}

export default RecipeListing;
