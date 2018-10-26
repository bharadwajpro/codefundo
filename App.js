import React, {Component} from 'react';
import {View, Linking} from 'react-native';
import KeepAwake from 'react-native-keep-awake';
import {Header, Icon} from 'react-native-elements'
import {
  initialize,
  isSuccessfulInitialize,
  startDiscoveringPeers,
  subscribeOnPeersUpdates,
  unsubscribeFromPeersUpdates,
  connect,
  getAvailablePeers
} from 'react-native-wifi-p2p'
import Topic from './components/Topic'
import Posts from './components/Posts'
import PlusButton from './components/PlusButton'
import TopicDialog from './components/TopicDialog'
import NameDialog from './components/NameDialog'
import PostDialog from './components/PostDialog'
import WiFiP2P from './components/WiFiP2P'
import {displayNameDialog} from './actions/nameActions'
import {Provider} from 'react-redux'
import configureStore from './store'


const repoURL = 'https://github.com/bharadwajpro/codefundo'
let Props = {};
export default class App extends Component<Props> {
  state = {
    store: configureStore(),
    devices: []
  }

  componentDidMount() {
    initialize();
    isSuccessfulInitialize()
        .then(status => console.log(status));
    startDiscoveringPeers()
        .then(() => console.log('Sucessfull'))
        .catch(err => console.log(err));
    setInterval(() => {
      getAvailablePeers()
      .then(peers => {
          console.log(peers)
          for(var i=0; i<peers.devices.length; i++) {
            connect(peers.devices[i].deviceAddress)
            .then(() => console.log('Successfully connected'))
            .catch(err => console.log('Something gone wrong. Details: ', err));
          }
      });
    }, 10000)
  }

  componentWillUnmount() {
    unsubscribeFromPeersUpdates((event) => console.log('unsubscribeFromPeersUpdates', event));
  }

  render() {
    return (
      <Provider store={this.state.store}>
        <View style={{flex: 1}}>
          <Header
            leftComponent={{ icon: 'info', color: '#fff', onPress: () => Linking.openURL(repoURL)}}
            centerComponent={<Topic/>}
            rightComponent={<Icon name='user' type='font-awesome' color='#fff' onPress={() => this.state.store.dispatch(displayNameDialog())}/>}
            outerContainerStyles={{height: 55}}
          />
          <Posts/>
          <WiFiP2P/>
          <TopicDialog/>
          <NameDialog/>
          <PostDialog/>
          <PlusButton/>
          {/* <KeepAwake/> */}
        </View>
      </Provider>
    );
  }
}
