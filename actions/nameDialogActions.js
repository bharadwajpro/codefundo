export const editName = (name) => {
    return {
            type: 'EDIT_NAME',
            name
    }
}

export const hideNameDialog = () => {
    return {
        type: 'HIDE_NAME_DIALOG'
    }
}
