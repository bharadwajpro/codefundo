import React from 'react'
import {Text, ScrollView} from 'react-native'
import {Post} from './Post'
import {getPostsServer, postPostsServer, getTopicServer} from '../actions/serverActions'
import {getPostsAp, postPostsAp, getTopicAp} from '../actions/peerHotspotActions'
import {postPostsPeer} from '../actions/peerActions'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'


// implemented without image with header
class Posts extends React.Component {
    state = {
        intervalId: null
    }

    allActions() {
        postPostsServer(this.props.posts)
        this.props.getPostsServer()
        this.props.getTopicServer()
        postPostsAp(this.props.posts)
        this.props.getPostsAp()
        this.props.getTopicAp()
        // postPostsPeer(this.props.posts)
    }

    componentDidMount() {
        this.allActions()
        let intervalId = setInterval(() => {this.allActions()}, 10000)
        this.setState({intervalId})
    }

    componentWillUnmount() {
        clearInterval(this.state.intervalId)
    }

    render() {
        return (
            <ScrollView>
                {
                    this.props.posts.map((p, i) => {
                        return (
                            <Post key={p.id} post={p}/>
                        );
                    })
                }
                <Text></Text>
            </ScrollView>
        )
    }
}


function mapStateToProps(state) {
    return {
        posts: state.posts
    }
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({getPostsServer, getTopicServer, getPostsAp, getTopicAp}, dispatch);
  }
  
export default connect(mapStateToProps, matchDispatchToProps)(Posts);
