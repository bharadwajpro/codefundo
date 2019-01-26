import React from 'react';
import {View} from 'react-native'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {getTopicPeer, getPostsPeer} from '../actions/peerActions'
let BluetoothCP = require("react-native-bluetooth-cross-platform")

class WiFiP2P extends React.Component {
  state = {
    intervalId: null
  }

  componentDidMount() {
    thisProps = this.props
    BluetoothCP.advertise();

    this.listener1 = BluetoothCP.addPeerDetectedListener(function(user) {
      console.log(user)
      if (typeof user !== 'undefined' && user !== null) {
        BluetoothCP.inviteUser(user.id);
        console.log("New user found. Sent Invite to ", user)
      }
    });

    this.listener2 = BluetoothCP.addInviteListener(function(user) {
      console.log(user)
      if (typeof user !== 'undefined' && user !== null) {
        BluetoothCP.acceptInvitation(user.id);
        console.log("Accepted Invite from ", user)
      }
    });

    this.listener3 = BluetoothCP.addReceivedMessageListener(function(user) {
      console.log(user)
      if (typeof user !== 'undefined' && user !== null) {
        let data = {}
        try {
          data = JSON.parse(user["message"])
        }
        catch(e) {
          console.log(e)
        }
        let type = data["type"]
        let message = data["topic"]
        if(!message) message = data["posts"]
        console.log(type, message)
        console.log(thisProps)
        if(type=='TOPIC') thisProps.getTopicPeer(message)
        if(type=='POSTS') thisProps.getPostsPeer(message)
      }
    })

    this.listener4 = BluetoothCP.addConnectedListener(function(user) {
      console.log(user)
      if (typeof user !== 'undefined' && user !== null) {
        BluetoothCP.sendMessage("Hello bro!", user.id)
        console.log("Connected to ", user, " and sent a message")
      }
    })

    this.listener5 = BluetoothCP.addPeerLostListener(function(user) {
      console.log(user)
      if (typeof user !== 'undefined' && user !== null) {
        console.log("Lost peer ", user)
      }
    })

    this.intervalId = setInterval(() => {
      posts = this.props.posts
      let message = {
        type: "POSTS",
        posts
      }
      BluetoothCP.getConnectedPeers(function(users) {
          console.log("Hi")
          console.log(users)
          if (typeof users !== 'undefined' && users !== null) {
              for(var i=0; i<users.length; i++) {
                  console.log(users[i])
                  BluetoothCP.sendMessage(JSON.stringify(message), users[i]["id"])
              }
          }
      })
    }, 10000)


  }

  componentWillUnmount() {
    this.listener1.remove()
    this.listener2.remove()
    this.listener3.remove()
    this.listener4.remove()
    this.listener5.remove()
    // clearInterval(this.intervalId)
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

export default connect(mapStateToProps, matchDispatchToProps)(WiFiP2P);
