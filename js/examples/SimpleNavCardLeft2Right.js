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

class SimpleNavCardLeft2Right extends Component {
  constructor(props, context) {
    super(props, context);


    this.animatedValue = new Animated.Value(-1);


    this._onScrollHandler = this._onScrollHandler.bind(this);
    this._animate = this._animate.bind(this);
  }

  animatedValue: undefined

  _onScrollHandler() {

  }

  _animate(startValue, endValue) {
    this.animatedValue.setValue(startValue);

    Animated.spring(
      this.animatedValue,
      {
        toValue: endValue,
        velocity: 1
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
              left: this.animatedValue.interpolate({
                inputRange: [-1, 0, 1],
                outputRange: [0, SCREEN_WIDTH, 0]}),
            }
          ]}
        />

        <TouchableHighlight onPress={() => this._animate(-1, 0)} underlayColor={'white'}>
          <Text>{' Touch to animate forward '}</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => this._animate(0, 1)} underlayColor={'white'}>
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
    height: SCREEN_HEIGHT,

    backgroundColor: 'blue'
  },
  button: {
    marginTop: 50,
    backgroundColor: 'red'
  }
});

export default SimpleNavCardLeft2Right;
