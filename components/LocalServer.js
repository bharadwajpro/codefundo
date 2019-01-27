import React from 'react'
import {View, Platform} from 'react-native'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {editTopic} from '../actions/topicDialogActions'
import {receivedPostsClient} from '../actions/localServerActions'
const httpBridge = require('react-native-http-bridge')

class LocalServer extends React.Component {
    componentWillMount() {
        thisProps = this.props
        httpBridge.start(5661, (req) => {
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

    componentWillUnmount() {
        httpBridge.stop()
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
