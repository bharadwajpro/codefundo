import {postTopicServer} from '../actions/serverActions'
import {postTopicPeer} from '../actions/peerActions'

export const topicReducer = (state='News', action) => {
    switch(action.type) {
        case 'EDIT_TOPIC': {
            if(action.topic == '') break;
            state = action.topic
            postTopicServer(state)
            postTopicPeer(state)
            break;
        }
        case 'TOPIC_FETCHED': {
            state = action.topic
            break;
        }
    }
    return state
}
