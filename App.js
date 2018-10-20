/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {View} from 'react-native';
import KeepAwake from 'react-native-keep-awake';
import {Header, Icon} from 'react-native-elements'
import {Topic} from './components/Topic'
import {Posts} from './components/Posts'


let Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <View style={{flex: 1}}>
        <Header
          leftComponent={{ icon: 'menu', color: '#fff' }}
          centerComponent={<Topic/>}
          rightComponent={<Icon name='user' type='font-awesome' color='#fff'/>}
          outerContainerStyles={{height: 55}}
        />
        <Posts/>
        <KeepAwake/>
      </View>
    );
  }
}
