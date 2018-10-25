import React from 'react'
import {Text, ScrollView} from 'react-native'
import {Post} from './Post'
import {connect} from 'react-redux'


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
            this.props.posts.map((p, i) => {
                return (
                    <Post key={p.id} post={p}/>
                );
            })
        }
        <Text></Text>
    </ScrollView>
)

function mapStateToProps(state) {
    return {
        posts: state.posts
    };
}

export default connect(mapStateToProps)(Posts);
