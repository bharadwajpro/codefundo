const _ = require('lodash')
const sha1 = require('sha1')
import {postPostsServer} from '../actions/serverActions'

const postsComparator = (a, b) => {
    if (a.timestamp > b.timestamp)
        return -1;
    if (a.timestamp < b.timestamp)
        return 1;
    return 0;
}

export const postsReducer = (state=[], action) => {
    switch(action.type) {
        case 'POSTS_FECTHED': {
            localCopy = state
            remoteCopy = action.posts
            let postsArray = []
            for(let k in localCopy){
                postsArray.push(localCopy[k])
            }
            for(let k in remoteCopy){
                postsArray.push(remoteCopy[k])
            }
            localCopy = postsArray.sort(postsComparator)
            let uniqueCopy = [localCopy[0]]
            for(let i=1; i<localCopy.length; i++) {
                if(!_.isEqual(localCopy[i], localCopy[i-1])) uniqueCopy.push(localCopy[i])
            }
            state = uniqueCopy.slice(0, 100)
            break;
        }
        case 'ADD_NEW_POST': {
            let newPost = {
                name: action.name,
                post: action.post,
                timestamp: Date.now()
            }
            newPost["id"] = sha1(newPost)
            posts = action.posts.unshift(newPost)
            state = posts
            postPostsServer(state)
            break;
        }
    }
    return state
}
