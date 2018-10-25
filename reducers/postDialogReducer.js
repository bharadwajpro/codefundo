export const postDialogReducer = (state=false, action) => {
    switch(action.type) {
        case 'DISPLAY_POST_DIALOG': {
            state = true
            break;
        }
    }
    return state
}
