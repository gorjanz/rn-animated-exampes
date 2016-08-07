/* @flow */
'use strict';

import React, {Component} from 'react';
import {
  Animated,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions
} from 'react-native';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');

export default class OverlappingCards extends Component {

  constructor(props) {
    super(props);

    this.state = {
      scrollY: new Animated.Value(0),
    };
  }

  _renderScrollViewContent() {
    const data = Array.from({length: 7});
    return data.map((_, i) =>
          <Animated.View key={i}
                style={[
                  styles.square,
                    {
                      backgroundColor: `rgb(${(i*55%255)}, ${(i*10%255)}, ${(i*25%255)})`
                    },
                    {
                      position: 'absolute',
                      top: i * (SCREEN_HEIGHT / 4),
                      left: 0
                    },
                    {
                      top: this.state.scrollY.interpolate({
                        inputRange: [0, SCREEN_HEIGHT / 4],
                        outputRange: [i * (SCREEN_HEIGHT / 4), ((i * (SCREEN_HEIGHT / 8)) - (i * 50))]
                    })
                  }]}>
            <Text>{i}</Text>
          </Animated.View>);
  }

  render() {

    const onScrollLogger = (event) => console.log(event.nativeEvent.contentOffset.y);

    return (
      <ScrollView
        contentContainerStyle={styles.container}
        scrollEventThrottle={16}
        onScroll={Animated.event([{nativeEvent: {contentOffset: {y : this.state.scrollY}}}])}
      >
        {this._renderScrollViewContent()}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
  },
  square: {
    height: SCREEN_HEIGHT / 3,
    width: SCREEN_WIDTH - 10,
    margin: 5,
    backgroundColor: 'gray',
    borderWidth: 3,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default OverlappingCards;