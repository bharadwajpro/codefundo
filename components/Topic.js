import {Text, TouchableOpacity} from 'react-native'
import React from 'react';
import {displayTopicDialog} from '../actions/topicActions'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

export const Topic = (props) => (
    <TouchableOpacity activeOpacity={0.6} onPress={() => props.displayTopicDialog()}>
        <Text style={{color: '#fff'}}>
            {props.topic}
        </Text>
    </TouchableOpacity>
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
