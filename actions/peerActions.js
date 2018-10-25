export const postTopicPeer = (topic) => {
    
}

export const postPostsPeer = (posts) => {
    
}

export const getTopicPeer = () => {
    return {
        type: 'TOPIC_FETCHED',
        topic: ''
    }
}

export const getPostsPeer = () => {
    return {
        type: 'POSTS_FETCHED',
        posts: []
    }
}
