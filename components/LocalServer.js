import React from 'react'
import {View, Platform} from 'react-native'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {editTopic} from '../actions/topicDialogActions'
import {receivedPostsClient} from '../actions/localServerActions'
var httpBridge = require('react-native-http-bridge')

class LocalServer extends React.Component {
    componentWillMount() {
        if(Platform.OS === 'android') {
            thisProps = this.props
            console.log("Local Server started")
            httpBridge.start(5661, "P2PSERVICE", (req) => {
                console.log("Ready for connections...")
                path = req.url.split('/')[1]
                if(req.type==='GET' && path==='topic') {
                    httpBridge.respond(200, "application/json", thisProps.topic)
                }
                else if(req.type==='GET' && path==='posts') {
                    httpBridge.respond(200, "application/json", JSON.stringify(thisProps.posts))
                }
                else if(req.type==='POST' && path==='topic') {
                    let newTopic = req.postData["topic"]
                    thisProps.editTopic(newTopic)
                    httpBridge.respond(200, "application/json", thisProps.topic)
                }
                else if(req.type==='POST' && path==='posts') {
                    let newPosts = req.postData["posts"]
                    thisProps.receivedPostsClient(newPosts)
                    httpBridge.respond(200, "application/json", JSON.stringify(thisProps.posts))
                }
            })
        }
    }

    componentWillUnmount() {
        if(Platform.OS === 'android') httpBridge.stop()
    }

    render() {
        return (
            <View></View>
        )
    }
}

function mapStateToProps(state) {
    return {
        topic: state.topic,
        posts: state.posts
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({editTopic, receivedPostsClient}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(LocalServer)
