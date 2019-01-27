const axios = require('axios')

export const receivedPostsClient = (newPosts) => {
    return {
        type: 'POSTS_FETCHED',
        posts: newPosts
    }
}
