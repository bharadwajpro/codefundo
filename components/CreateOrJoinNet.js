import React from 'react';
import {View, NetInfo, Platform, ToastAndroid} from 'react-native'
import {connect} from 'react-redux'
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
    console.log("Entered function")
    let noExit = 5  
    while(noExit--) {
      console.log("Entered infinite check loop")
      if(Platform.OS === 'android') {
        Hotspot.disable(() => {
          ToastAndroid.show("Hotspot Disabled",ToastAndroid.SHORT);
        }, (err) => {
          ToastAndroid.show(err.toString(),ToastAndroid.SHORT);
        })
      }
      // console.log("Hotspot disabled")
      WifiManager.connectToProtectedSSID(appSsid, passwd, false)
      .then(() => {
        console.log("Connected to WiFi")
        noExit = 0
      }, () => {
        console.log("Failed to connect or no WiFi available. Trying to create network if platform allows it.")
        if(Platform.OS === 'android') {
          Hotspot.enable(() => {
            ToastAndroid.show("Hotspot Enabled",ToastAndroid.SHORT);
            const hotspot = {SSID: 'ASSEM', password: 'helloworld'}
            Hotspot.create(hotspot, () => {
              ToastAndroid.show("Hotspot established", ToastAndroid.SHORT);
              // Hotspot.peersList((data) => {
              //   const peers = JSON.parse(data)
              //   console.log(peers)
              //   // exchange data here
              // }, (err) => {
              //   ToastAndroid.show(err.toString(), ToastAndroid.SHORT);
              // })
            }, (err) => {
              // ToastAndroid.show(err.toString(), ToastAndroid.SHORT);
            })
          }, (err) => {
            ToastAndroid.show(err.toString(),ToastAndroid.SHORT);
          })
        }
        else console.log("Trying to find WiFi and connect...")
        noExit--
      })
      setTimeout(function(){console.log('Retrying for an existing network')}, Math.floor(Math.random()*10000+60000));      
    }
  }

  componentDidMount() {
    NetInfo.getConnectionInfo().then((connectionInfo) => {
      console.log("Checking for active connection presence")
      if(connectionInfo.type=='none') this.createOrJoinNet();
      // for testing only
      // this.createOrJoinNet();
    })
    NetInfo.addEventListener(
      'connectionChange',
      this.handleConnectivityChange
    );
  }

  componentWillUnmount() {
    NetInfo.removeEventListener('connectionChange', this.handleConnectivityChange);    
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

export default connect(mapStateToProps)(CreateOrJoinNet);
