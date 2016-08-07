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

class SimpleTranslate extends Component {
  constructor(props, context) {
    super(props, context);

    this.animatedValue = new Animated.Value(-1);

    this._animate = this._animate.bind(this);
  }

  animatedValue: undefined

  _animate(startValue, endValue) {
    this.animatedValue.setValue(startValue);

    Animated.spring(
      this.animatedValue,
      {
        toValue: endValue,
        velocity: 1,
        friction: 9
      }
    ).start();
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Animated.View
          style={[
            styles.bigSquare,
            {
              transform: [
                {
                  translateX: this.animatedValue.interpolate({
                    inputRange: [-1, 0, 1],
                    outputRange: [0, SCREEN_WIDTH, 0]})
                }
              ]
            }
          ]}
        />

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

        <TouchableHighlight style={styles.button} onPress={() => this._animate(-1, 0)} underlayColor={'blue'}>
          <Text>{' Touch to animate forward '}</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.button} onPress={() => this._animate(0, 1)} underlayColor={'blue'}>
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

    top: 0,
    left: 0,

    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,

    backgroundColor: 'blue'
  },
  button: {
    margin: 10,
    backgroundColor: 'red'
  }
});

export default SimpleTranslate;

