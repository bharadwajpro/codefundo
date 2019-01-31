import React, {Component, Fragment} from 'react';
import {View, SafeAreaView, TouchableOpacity, StatusBar, Fra} from 'react-native';
import KeepAwake from 'react-native-keep-awake';
import {Header, Icon, Text, Avatar} from 'react-native-elements'
import Topic from './components/Topic'
import Posts from './components/Posts'
import PlusButton from './components/PlusButton'
import TopicDialog from './components/TopicDialog'
import NameDialog from './components/NameDialog'
import PostDialog from './components/PostDialog'
import WiFiP2P from './components/WiFiP2P'
import CreateOrJoinNet from './components/CreateOrJoinNet'
import LocalServer from './components/LocalServer' 
import {LinkButton} from './components/LinkButton'
import {displayNameDialog} from './actions/nameActions'
import {Provider} from 'react-redux'
import configureStore from './store'


let Props = {};
export default class App extends Component<Props> {
  state = {
    store: configureStore(),
    devices: []
  }

  componentDidMount() {
    
  }

  componentWillUnmount() {

  }

  render() {
    return (
      <Provider store={this.state.store}>
        <Fragment>
          <SafeAreaView style={{ flex:0, backgroundColor: '#f40057' }} />
          <SafeAreaView style={{flex: 1}}>
            <StatusBar backgroundColor="#f40057" barStyle="light-content" />
            <View style={{flex: 1}}>
              <Header
                innerContainerStyles={{flexDirection: 'row'}}
                backgroundColor='#f40057'
                outerContainerStyles={{ zIndex: 1, height: 55}}
                leftComponent={<LinkButton/>}
                centerComponent={<Topic/>}
                rightComponent={
                  <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => this.state.store.dispatch(displayNameDialog())}
                  >
                    <Icon name='user' type='font-awesome' color='#fff'/>
                  </TouchableOpacity>
                }
              />
              <Posts/>
              <CreateOrJoinNet/>
              <WiFiP2P/>
              <LocalServer/>
              <TopicDialog/>
              <NameDialog/>
              <PostDialog/>
              <PlusButton/>
              <KeepAwake/>
            </View>
          </SafeAreaView>
        </Fragment>
      </Provider>
    );
  }
}
