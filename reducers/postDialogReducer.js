export const postDialogReducer = (state=false, action) => {
    switch(action.type) {
        case 'DISPLAY_POST_DIALOG': {
            state = true
            break;
        }
        case 'HIDE_POST_DIALOG': {
            state = false
            break;
        }
    }
    return state
}
