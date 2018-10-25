import {combineReducers} from 'redux'
import {nameReducer} from './nameReducer'
import {postsReducer} from './postsReducer'
import {topicReducer} from './topicReducer'
import {nameDialogReducer} from './nameDialogReducer'
import {postDialogReducer} from './postDialogReducer'
import {topicDialogReducer} from './topicDialogReducer'

export const reducer = combineReducers({
    name: nameReducer,
    posts: postsReducer,
    topic: topicReducer,
    nameDialogShow: nameDialogReducer,
    postDialogShow: postDialogReducer,
    topicDialogShow: topicDialogReducer
})
