import {Text} from 'react-native'
import React from 'react';
import {displayTopicDialog} from '../actions/topicActions'
import {connect, bindActionCreators} from 'react-redux'

export const Topic = () => (
    <Text style={{color: '#fff'}} onPress={() => this.props.displayTopicDialog()}>
        News
    </Text>
)

function mapStateToProps(state) {
    return {
        topic: state.topic
    };
}
  
function matchDispatchToProps(dispatch){
    return bindActionCreators({displayTopicDialog}, dispatch);
}
  
export default connect(mapStateToProps, matchDispatchToProps)(Topic);
