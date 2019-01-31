const axios = require('axios')
const SERVER_URL = 'http://104.211.243.198'
// const SERVER_URL = 'http://192.168.0.100:3000'

export const postTopicServer = (topic) => {
    axios.post(SERVER_URL + '/topic', {topic})
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    });
}

export const postPostsServer = (posts) => {
    axios.post(SERVER_URL + '/posts', posts)
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    });
}

export const getTopicServer = () => {
    return function(dispatch) {
        axios.get(SERVER_URL + '/topic')
        .then(function (response) {
            dispatch({
                type: 'TOPIC_FETCHED',
                topic: response.data
            })
        })
        .catch(function (error) {
            console.log(error);
        });
    }
}

export const getPostsServer = () => {
    return function(dispatch) {
        axios.get(SERVER_URL + '/posts')
        .then(function (response) {
            dispatch({
                type: 'POSTS_FETCHED',
                posts: response.data
            })
        })
        .catch(function (error) {
            console.log(error);
        });
    }
}
