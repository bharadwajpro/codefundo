import React from 'react'
import {Text, ScrollView} from 'react-native'
import {Post} from './Post'
const posts = require('../data/posts.json')


// implemented without image with header
export const Posts = () => (
    // <FlatList
    //     data={posts}
    //     renderItem={
    //         ({post}) => {
    //             console.log(post)
    //             return (
    //                 <Post key={post} post={post}/>
    //             )
    //         }
    //     }
    // />
    <ScrollView>
        {
            posts.map((p, i) => {
                return (
                    <Post key={p.id} post={p}/>
                );
            })
        }
        <Text></Text>
    </ScrollView>
)
