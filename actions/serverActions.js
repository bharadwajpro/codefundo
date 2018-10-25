const axios = require('axios')
const SERVER_URL = 'http://localhost:3000'

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
    axios.get(SERVER_URL + '/topic')
    .then(function (response) {
        return {
            type: 'TOPIC_FETCHED',
            topic: response.data
        }
    })
    .catch(function (error) {
        console.log(error);
    });
}

export const getPostsServer = () => {
    axios.get(SERVER_URL + '/posts')
    .then(function (response) {
        return {
            type: 'POSTS_FETCHED',
            posts: response.data
        }
    })
    .catch(function (error) {
        console.log(error);
    });
}
