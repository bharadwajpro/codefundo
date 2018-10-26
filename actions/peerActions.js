let BluetoothCP = require('react-native-bluetooth-cross-platform')

export const postTopicPeer = (topic) => {
    let message = {
        type: "TOPIC",
        topic
    }
    BluetoothCP.getConnectedPeers(function(users) {
        if (typeof users !== 'undefined' && users !== null) {
            for(var i=0; i<users.length; i++) {
                BluetoothCP.sendMessage(JSON.stringify(message), users[i]["id"])
            }
        }
    })
}

export const postPostsPeer = (posts) => {
    let message = {
        type: "POSTS",
        posts
    }
    BluetoothCP.getConnectedPeers(function(users) {
        console.log("Hi")
        if (typeof users !== 'undefined' && users !== null) {
            for(var i=0; i<users.length; i++) {
                BluetoothCP.sendMessage(JSON.stringify(message), users[i]["id"])
            }
        }
    })
}

export const getTopicPeer = (topic) => {
    return {
        type: 'TOPIC_FETCHED',
        topic
    }
}

export const getPostsPeer = (posts) => {
    return {
        type: 'POSTS_FETCHED',
        posts
    }
}
