const axios = require('axios')
const PEER_AP_URL = 'http://192.168.43.1:5661'


export const postTopicAp = (topic) => {
    axios.post(PEER_AP_URL + '/topic', {topic})
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    });
}

export const postPostsAp = (posts) => {
    axios.post(PEER_AP_URL + '/posts', posts)
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    });
}

export const getTopicAp = () => {
    return function(dispatch) {
        axios.get(PEER_AP_URL + '/topic')
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

export const getPostsAp = () => {
    return function(dispatch) {
        axios.get(PEER_AP_URL + '/posts')
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
