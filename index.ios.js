/* @flow */
'use strict';

import React from 'react';
import {AppRegistry,} from 'react-native';

import SimpleSquareInterpolation from './js/examples/SimpleSquareInterpolation';
import SimpleNavCardLeft2Right from './js/examples/SimpleNavCardLeft2Right';
import SimpleTranslate from './js/examples/SimpleTranslate';
import BasicPanResponder from './js/examples/BasicPanResponder';

AppRegistry.registerComponent('AnimatedPlayground', () => BasicPanResponder);
