export const nameReducer = (state='New User', action) => {
    switch(action.type) {
        case 'EDIT_NAME': {
            console.log(action)
            state = action.name
            break;
        }
    }
    return state
}
