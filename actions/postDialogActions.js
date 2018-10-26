export const newPost = (name, post, posts) => {
    return {
        type: 'ADD_NEW_POST',
        name,
        post,
        posts
    }
}

export const hidePostDialog = () => {
    return {
        type: 'HIDE_POST_DIALOG'
    }
}
