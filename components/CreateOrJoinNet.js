import React from 'react';
import {View, NetInfo, Platform, ToastAndroid, NativeModules} from 'react-native'
import {connect} from 'react-redux'
// import WifiManager from 'react-native-wifi';

const appSsid = 'PaperRocket'
const passwd = 'PaperRocketApp'
const WifiHotspot = NativeModules.WifiHotspot

class CreateOrJoinNet extends React.Component {
  state = {
    
  }

  handleConnectivityChange = (connectionInfo) => {
    if(connectionInfo.type=='none') this.createOrJoinNet()
  }

  createOrJoinNet = () => {
    // WifiManager.connectToProtectedSSID(appSsid, passwd, false)
    // .then(() => {
    //   console.log("Connected to WiFi")
    // }, () => {
    //   console.log("Failed to connect or no WiFi available. Trying to create network if platform allows it.")
    //   if(Platform.OS === 'android') {
    //     WifiHotspot.create(appSsid, passwd, (msg) => {
    //       console.log(msg)
    //     })
    //   }
    // })
    if(Platform.OS === 'android') {
      WifiHotspot.create(appSsid, passwd, (success) => {
        console.log(success)
      })
    }
  }

  componentDidMount() {
    NetInfo.getConnectionInfo().then((connectionInfo) => {
      console.log("Checking for active connection presence")
      if(connectionInfo.type=='none') this.createOrJoinNet();
      // for testing only
      // this.createOrJoinNet();
    })
    // NetInfo.addEventListener(
    //   'connectionChange',
    //   this.handleConnectivityChange
    // );
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
