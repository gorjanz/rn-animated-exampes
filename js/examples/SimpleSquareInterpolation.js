/* @flow */
'use strict';

import React, { Component } from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  ScrollView,
  TouchableHighlight,
  Easing,
  Dimensions
} from 'react-native';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');

class SimpleSquareInterpolation extends Component {
  constructor(props, context) {
    super(props, context);


    this.animatedValue = new Animated.Value(-1);


    this._onScrollHandler = this._onScrollHandler.bind(this);
    this._animateForward = this._animateForward.bind(this);
    this._animateBack = this._animateBack.bind(this);
  }

  animatedValue: undefined

  _onScrollHandler() {

  }

  _animateForward() {
    //this.setState({ animatedValue: this.state.animatedValue.setValue(0) });

    this.animatedValue.setValue(-1);
    Animated.timing(
      this.animatedValue,
      {
        toValue: 0,
        duration: 500,
        easing: Easing.linear
      }
    ).start();
  }

  _animateBack() {
    this.animatedValue.setValue(0);

    /*
     Animated.timing(
     this.state.animatedValue,
     {
     toValue: 1,
     duration: 1500,
     easing: Easing.linear
     }
     ).start();
     */

    Animated.spring(
      this.animatedValue,
      {
        toValue: 1,
        velocity: 0.5,  // Velocity makes it move
        // tension: 100, // Slow
        // friction: 7,
      }
    ).start();
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Animated.Text
          style={[
            styles.text,
            {
              fontSize: this.animatedValue.interpolate({
                inputRange: [-1, 0, 1],
                outputRange: [40, 20, 40]}),
            }
          ]}
        >
          {'Example Text'}
        </Animated.Text>
        <Animated.View
          style={[
            styles.bigSquare,
            {
              height: this.animatedValue.interpolate({
                inputRange: [-1, 0, 1],
                outputRange: [50, SCREEN_HEIGHT / 2, 50]}),
            }
          ]}
        />

        <TouchableHighlight onPress={this._animateForward} underlayColor={'white'}>
          <Text>{' Touch to animate forward '}</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this._animateBack} underlayColor={'white'}>
          <Text>{' Touch to animate back '}</Text>
        </TouchableHighlight>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  text: {
    alignSelf: 'center',
    marginBottom: 100,
    padding: 20
  },
  bigSquare: {
    position: 'absolute',

    bottom: 0,
    left: 0,

    width: SCREEN_WIDTH,
    height: 50,

    backgroundColor: 'blue'
  },
  button: {
    marginTop: 50,
    backgroundColor: 'red'
  }
});

export default SimpleSquareInterpolation;
