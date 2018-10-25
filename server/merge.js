const fs = require('fs')
const _ = require('lodash')
const STORE_FILE = __dirname + '/data/store.json'
const LOCK_FILE = __dirname + '/data/store.json.lock'
const lockfile = require('lockfile')

const postsComparator = (a, b) => {
    if (a.timestamp > b.timestamp)
        return -1;
    if (a.timestamp < b.timestamp)
        return 1;
    return 0;
}

module.exports.mergePosts = (remoteCopy, localCopy, res) => {
    let postsArray = []
    for(let k in localCopy){
        postsArray.push(localCopy[k])
    }
    for(let k in remoteCopy){
        postsArray.push(remoteCopy[k])
    }
    localCopy = postsArray.sort(postsComparator)
    let uniqueCopy = [localCopy[0]]
    for(let i=1; i<localCopy.length; i++) {
        if(!_.isEqual(localCopy[i], localCopy[i-1])) uniqueCopy.push(localCopy[i])
    }
    localCopy = uniqueCopy.slice(0, 100)
    store = JSON.parse(fs.readFileSync(STORE_FILE))
    store["posts"] = localCopy
    fs.writeFileSync(STORE_FILE, JSON.stringify(store, null, 4))
    lockfile.unlockSync(LOCK_FILE)
    res.json(localCopy)
}
