/* @flow */
'use strict';

import React, { Component } from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Easing,
  Dimensions,
  PanResponder
} from 'react-native';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');

class BasicPanResponder extends Component {
  constructor(props, context) {
    super(props, context);

    this.animatedValue = new Animated.Value(-1);

    this._animate = this._animate.bind(this);
  }

  _panResponder: undefined
  animatedValue: undefined

  _animate(startValue, endValue) {
    this.animatedValue.setValue(startValue);

    Animated.spring(
      this.animatedValue,
      {
        toValue: endValue,
        velocity: 1,
        friction: 10
      }
    ).start();
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: (evt, {dx, dy, moveX, moveY, x0, y0}) => {
        return true;
      },

      onPanResponderMove: (evt, {dx, dy, moveX, moveY, x0, y0}) => {
        this.animatedValue.setValue(dx);

      }
    });
  }

  render() {
    return (
      <View style={styles.container} {...this._panResponder.panHandlers}>
        <Animated.View
          style={[
            styles.bigSquare,
            {
              transform: [{
                translateX: this.animatedValue.interpolate({
                inputRange: [0, SCREEN_WIDTH, 2 * SCREEN_WIDTH],
                outputRange: [0, SCREEN_WIDTH - 50, 0]})
              }]
            }
          ]}
        />

        <TouchableHighlight onPress={() => this._animate(0, SCREEN_WIDTH)} underlayColor={'white'}>
          <Text>{' Touch to animate forward '}</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => this._animate(SCREEN_WIDTH -50, 0)} underlayColor={'white'}>
          <Text>{' Touch to animate back '}</Text>
        </TouchableHighlight>

        <Animated.Text
          style={[
            styles.text,
            {
              fontSize: this.animatedValue.interpolate({
                inputRange: [0, SCREEN_WIDTH, 2 * SCREEN_WIDTH],
                outputRange: [15, 20, 15]}),
            }
          ]}
        >
          {'AAAAAA'}
        </Animated.Text>
      </View>
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

    top: 0,
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

export default BasicPanResponder;
