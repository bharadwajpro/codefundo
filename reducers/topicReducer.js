import {postTopicServer} from '../actions/serverActions'

export const topicReducer = (state='News', action) => {
    switch(action.type) {
        case 'EDIT_TOPIC': {
            if(action.topic == '') break;
            state = action.topic
            postTopicServer(state)
            break;
        }
        case 'TOPIC_FETCHED': {
            state = action.topic
            break;
        }
    }
    return state
}
