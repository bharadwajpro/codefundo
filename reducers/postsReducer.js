const _ = require('lodash')
const hash = require('object-hash')
import {postPostsServer} from '../actions/serverActions'
import {postPostsPeer} from '../actions/peerActions'
import {postPostsAp} from '../actions/peerHotspotActions'
let newPostLimit = 5 // every 30 min

const postsComparator = (a, b) => {
    if (a.timestamp > b.timestamp)
        return -1;
    if (a.timestamp < b.timestamp)
        return 1;
    return 0;
}

export const postsReducer = (state=[], action) => {
    switch(action.type) {
        case 'POSTS_FETCHED': {
            localCopy = state
            remoteCopy = action.posts
            console.log(remoteCopy)
            let postsArray = []
            for(let k in localCopy){
                postsArray.push(localCopy[k])
            }
            for(let k in remoteCopy){
                postsArray.push(remoteCopy[k])
            }
            localCopy = postsArray.sort(postsComparator)
            if(localCopy.length==0) return state
            let uniqueCopy = [localCopy[0]]
            for(let i=1; i<localCopy.length; i++) {
                if(!_.isEqual(localCopy[i], localCopy[i-1])) uniqueCopy.push(localCopy[i])
            }
            state = uniqueCopy.slice(0, 100)
            break;
        }
        case 'ADD_NEW_POST': {
            console.log(newPost)
            if(newPostLimit<=0) break;
            let newPost = {
                post: action.post,
                timestamp: Date.now(),
                name: action.name
            }
            newPost["id"] = hash(newPost)
            action.posts.unshift(newPost)
            state = [...action.posts]
            newPostLimit--
            postPostsServer(state)
            postPostsPeer(state)
            postPostsAp(state)
            break;
        }
    }
    return state
}
