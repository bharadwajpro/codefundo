export const editTopic = (topic) => {
    return {
        type: 'EDIT_TOPIC',
        topic
    }
}

export const hideTopicDialog = () => {
    return {
        type: 'HIDE_TOPIC_DIALOG'
    }
}
