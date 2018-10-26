export const topicDialogReducer = (state=false, action) => {
    switch(action.type) {
        case 'DISPLAY_TOPIC_DIALOG': {
            return true;
        }
        case 'HIDE_TOPIC_DIALOG': {
            return false;
        }
    }
    return state
}
