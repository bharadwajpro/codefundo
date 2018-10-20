import React from 'react'
import {Text, View} from 'react-native'
import {Card, Avatar} from 'react-native-elements'


const getAvatar = (name) => (
    name.replace(/[^a-zA-Z]/g, '')
)

export const Post = (props) => (
    <Card>
        <View style={{flexDirection:'row'}}>
            <Avatar
                small
                rounded
                source={{uri: `https://robohash.org/${getAvatar(props.post.name)}.jpg`}}
                activeOpacity={0.7}
                containerStyle={{marginRight: 10}}
            />
            <View style={{flex: 1, flexDirection: 'column'}}>
                <View style={{flex:1, flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={{fontWeight: 'bold'}}>{props.post.name}</Text>
                    <Text style={{fontStyle: 'italic'}}>{new Date(props.post.timestamp).toDateString()}</Text>
                </View>
                <Text>{props.post.post}</Text>
            </View>
        </View>
    </Card>
)
