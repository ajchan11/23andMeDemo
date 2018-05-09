import React from 'react';
import PropTypes from 'prop-types';
import { Image, StyleSheet, View } from 'react-native';
import { Container, Content, Card, CardItem, Body, H3, List, ListItem, Text, ToucableOpacity, Modal } from 'native-base';
import ErrorMessages from '../../constants/errors';
import Error from './Error';
import Spacer from './Spacer';


class RecipeView extends React.Component {
  static propTypes = {
    error: PropTypes.string,
    recipeId: PropTypes.string.isRequired,
    recipes: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  }
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    const {error, recipes, recipeId} = this.props
    if (error) return <Error content={error} />;

    // Get this Recipe from all recipes
    let recipe = null;
    if (recipeId && recipes) {
      recipe = recipes.find(item => parseInt(item.id, 10) === parseInt(recipeId, 10));
    }

    // Recipe not found
    // if (!recipe) return <Error content={ErrorMessages.recipe404} />;

    // Build Ingredients listing
    // const ingredients = recipe.ingredients.map(item => (
    //   <ListItem key={item} rightIcon={{ style: { opacity: 0 } }}>
    //     <Text>{item}</Text>
    //   </ListItem>
    // ));

    // Build Method listing
    // const method = recipe.method.map(item => (
    //   <ListItem key={item} rightIcon={{ style: { opacity: 0 } }}>
    //     <Text>{item}</Text>
    //   </ListItem>
    // ));

    return (
      <Container>
        <Content>
          
        </Content>
      </Container>
    );
  }
}



RecipeView.defaultProps = {
  error: null,
};

export default RecipeView;
