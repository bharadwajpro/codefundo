export const topicDialogReducer = (state=false, action) => {
    switch(action.type) {
        case 'DISPLAY_TOPIC_DIALOG': {
            return true;
        }
    }
    return state
}
