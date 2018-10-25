export const nameReducer = (state='', action) => {
    switch(action.type) {
        case 'EDIT_NAME': {
            state = action.name
            break;
        }
    }
    return state
}
