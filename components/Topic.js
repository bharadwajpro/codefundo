import {Text} from 'react-native'
import React from 'react';
import {displayTopicDialog} from '../actions/topicActions'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

export const Topic = (props) => (
    <Text style={{color: '#fff'}} onPress={() => props.displayTopicDialog()}>
        {props.topic}
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
