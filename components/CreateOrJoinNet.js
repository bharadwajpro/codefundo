import React from 'react';
import {View, NetInfo, Platform, ToastAndroid} from 'react-native'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {getTopicPeer, getPostsPeer} from '../actions/peerActions'
import WifiManager from 'react-native-wifi';
import Hotspot from 'react-native-wifi-hotspot'

const appSsid = 'PaperRocket'
const passwd = 'PaperRocketApp'

class CreateOrJoinNet extends React.Component {
  state = {
    
  }

  handleConnectivityChange = (connectionInfo) => {
    if(connectionInfo.type=='none') this.createOrJoinNet()
  }

  createOrJoinNet = () => {
    while(true) {
      if(Platform.OS === 'android') {
        Hotspot.disable(() => {
          ToastAndroid.show("Hotspot Disabled",ToastAndroid.SHORT);
        }, (err) => {
          ToastAndroid.show(err.toString(),ToastAndroid.SHORT);
        })
      }
      WifiManager.connectToProtectedSSID(appSsid, passwd, false)
      .then(() => {
        console.log("Connected to WiFi")
        break
      }, () => {
        console.log("Failed to connect or no WiFi available. Trying to create network if platform allows it.")
        if(Platform.OS === 'android') {
          Hotspot.enable(() => {
            ToastAndroid.show("Hotspot Enabled",ToastAndroid.SHORT);
            const hotspot = {SSID: appSsid, password: passwd, securityType: Hotspot.security.WPA2_PSK}
            Hotspot.create(hotspot, () => {
              ToastAndroid.show("Hotspot established", ToastAndroid.SHORT);
              Hotspot.peersList((data) => {
                const peers = JSON.parse(data)
                console.log(peers)
                // exchange data here
              }, (err) => {
                ToastAndroid.show(err.toString(), ToastAndroid.SHORT);
              })
            }, (err) => {
              ToastAndroid.show(err.toString(), ToastAndroid.SHORT);
            })
          }, (err) => {
            ToastAndroid.show(err.toString(),ToastAndroid.SHORT);
          })
        }
        else console.log("Trying to find WiFi and connect...")
      })
      setTimeout(function(){console.log('Retrying for an existing network')}, Math.floor(Math.random()*10000+60000));      
    }
  }

  componentDidMount() {
    NetInfo.getConnectionInfo().then((connectionInfo) => {
      if(connectionInfo.type=='none') this.createOrJoinNet();
    })
    NetInfo.addEventListener(
      'connectionChange',
      handleConnectivityChange
    );
  }

  componentWillUnmount() {
    NetInfo.removeEventListener('connectionChange', handleConnectivityChange);    
  }

  render() {
    return(
      <View></View>
    )
  }
}

function mapStateToProps(state) {
  return {
      posts: state.posts
  };
}

function matchDispatchToProps(dispatch){
  return bindActionCreators({getTopicPeer, getPostsPeer}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(CreateOrJoinNet);
