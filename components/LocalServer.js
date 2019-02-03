import React from 'react'
import {View, Platform} from 'react-native'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {editTopic} from '../actions/topicDialogActions'
import {receivedPostsClient} from '../actions/localServerActions'
var httpBridge = require('react-native-http-bridge')

class LocalServer extends React.Component {
    componentDidMount() {
        if(Platform.OS === 'android') {
            thisProps = this.props
            console.log("Local Server started")
            httpBridge.start(5661, "P2PSERVICE", (req) => {
                path = req.url.split('/')[1]
                if(req.type==='GET' && path==='topic') {
                    console.log(thisProps.topic)
                    httpBridge.respond(200, "application/json", {"topic": thisProps.topic})
                }
                else if(req.type==='GET' && path==='posts') {
                    console.log(thisProps.posts)
                    httpBridge.respond(200, "application/json", thisProps.posts)
                }
                else if(req.type==='POST' && path==='topic') {
                    console.log(req)
                    console.log(thisProps.topic)
                    let newTopic = req.postData
                    thisProps.editTopic(newTopic)
                    httpBridge.respond(200, "application/json", {"topic": thisProps.topic})
                }
                else if(req.type==='POST' && path==='posts') {
                    console.log(req)
                    let newPosts = JSON.parse(req.postData)
                    thisProps.receivedPostsClient(newPosts)
                    httpBridge.respond(200, "application/json", thisProps.posts)
                }
                else {
                    httpBridge.respond(200, "application/json", {"Error":"404 Not found"})
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
