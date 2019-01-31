import React from 'react'
import {TouchableOpacity, Linking} from 'react-native'
import {Icon} from 'react-native-elements'

const repoURL = 'https://github.com/bharadwajpro/codefundo'

export const LinkButton = (props) => (
    <TouchableOpacity 
        activeOpacity={0.6} 
        onPress={() => Linking.openURL(repoURL)}
        >
        <Icon
        name='info'
        type='font-awesome'
        color='#fff'
        ></Icon>
    </TouchableOpacity>
)
