const fs = require('fs')

const postsComparator = (a, b) => {
    if (a.timestamp > b.timestamp)
        return -1;
    if (a.timestamp < b.timestamp)
        return 1;
    return 0;
}

exports.mergePosts = (remoteCopy, localCopy, res) => {
    localCopy = localCopy.concat(remoteCopy).unique().sort(postsComparator)
    localCopy = localCopy.slice(0, 100)
    fs.writeFileSync(__dirname + '/data/posts.json', JSON.stringify(localCopy, null, 4))
    res.json(localCopy)
}
