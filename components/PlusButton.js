import React from 'react'
import {View, Text, TouchableOpacity} from 'react-native'
import {Icon} from 'react-native-elements'
import {showPostDialog} from '../actions/plusButtonActions'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'


export const PlusButton = (props) => (
    <TouchableOpacity 
        activeOpacity={0.6} 
        style={{position: 'absolute', width: 50, height: 50, bottom: 30, right: 30, flex: 1, justifyContent: 'center', alignItems: 'stretch'}}
        onPress={() => this.props.showPostDialog()}
        >
        <Icon
        reverse
        name='plus'
        type='font-awesome'
        color='#00f'
        ></Icon>
    </TouchableOpacity>
)
  
function matchDispatchToProps(dispatch){
    return bindActionCreators({showPostDialog}, dispatch);
}

export default connect(matchDispatchToProps)(PlusButton);
