export const nameDialogReducer = (state=false, action) => {
    switch(action.type) {
        case 'DISPLAY_NAME_DIALOG': {
            return true;
        }
        case 'HIDE_NAME_DIALOG': {
            return false;
        }
    }
    return state
}
