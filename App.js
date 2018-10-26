import React, {Component} from 'react';
import {View, Linking} from 'react-native';
import KeepAwake from 'react-native-keep-awake';
import {Header, Icon} from 'react-native-elements'
import Topic from './components/Topic'
import Posts from './components/Posts'
import PlusButton from './components/PlusButton'
import TopicDialog from './components/TopicDialog'
import NameDialog from './components/NameDialog'
import PostDialog from './components/PostDialog'
// import WiFiP2P from './components/WiFiP2P'
import {displayNameDialog} from './actions/nameActions'
import {getPostsServer, getTopicServer} from './actions/serverActions'
import {Provider} from 'react-redux'
import configureStore from './store'


const repoURL = 'https://github.com/bharadwajpro/codefundo'
let Props = {};
export default class App extends Component<Props> {
  state = {
    store: configureStore(),
    postsIntervalId: null,
    topicIntervalId: null
  }

  componentDidMount() {
    this.state.store.dispatch(getPostsServer())
    let postsIntervalId = setInterval(() => {
      this.state.store.dispatch(getPostsServer())
    }, 10000)
    this.state.store.dispatch(getTopicServer())
    let topicIntervalId = setInterval(() => {
      this.state.store.dispatch(getTopicServer())
    }, 10000)
    this.setState({postsIntervalId, topicIntervalId})
    // console.log(postsIntervalId, topicIntervalId)
  }

  componentWillUnmount() {
    clearInterval(this.state.postsIntervalId)
    clearInterval(this.state.topicIntervalId)
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
          {/* <WiFiP2P/> */}
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
