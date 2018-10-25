import React, {Component} from 'react';
import {View, Linking} from 'react-native';
import KeepAwake from 'react-native-keep-awake';
import {Header, Icon} from 'react-native-elements'
import {Topic} from './components/Topic'
import {Posts} from './components/Posts'
import {PlusButton} from './components/PlusButton'
import {TopicDialog} from './components/TopicDialog'
import {NameDialog} from './components/NameDialog'
import {PostDialog} from './components/PostDialog'
import {displayNameDialog} from './actions/nameActions'
import {getPostsServer, getTopicServer} from './actions/serverActions'
import {Provider} from 'react-redux'
import store from './store'


const repoURL = 'https://github.com/bharadwajpro/codefundo'
let Props = {};
export default class App extends Component<Props> {
  componentDidMount() {
    store.dispatch(getPostsServer())
    store.dispatch(getTopicServer())
  }

  render() {
    return (
      <Provider store={store}>
        <View style={{flex: 1}}>
          <Header
            leftComponent={{ icon: 'info', color: '#fff', onPress: () => Linking.openURL(repoURL)}}
            centerComponent={<Topic/>}
            rightComponent={<Icon name='user' type='font-awesome' color='#fff' onPress={() => store.dispatch(displayNameDialog())}/>}
            outerContainerStyles={{height: 55}}
          />
          <Posts/>
          <TopicDialog/>
          <NameDialog/>
          <PostDialog/>
          <PlusButton/>
          <KeepAwake/>
        </View>
      </Provider>
    );
  }
}
