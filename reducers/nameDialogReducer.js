export const nameDialogReducer = (state=false, action) => {
    switch(action.type) {
        case 'DISPLAY_NAME_DIALOG': {
            state = true
            break;
        }
    }
    return state
}
