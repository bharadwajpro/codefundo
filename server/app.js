const express = require('express')
const fs = require('fs')
const app = express()
const bodyParser = require('body-parser')
const merge = require('./merge')
const port = 3000
const STORE_FILE = __dirname + '/data/store.json'
const LOCK_FILE = __dirname + '/data/store.json.lock'
const lockfile = require('lockfile')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/posts', (req, res) => {
    res.json(JSON.parse(fs.readFileSync(STORE_FILE))["posts"])
})

app.post('/posts', (req, res) => {
    remoteCopy = req.body
    if(!remoteCopy) res.sendStatus(500)
    lockfile.lockSync(LOCK_FILE)
    localCopy = JSON.parse(fs.readFileSync(STORE_FILE))["posts"]
    merge.mergePosts(remoteCopy, localCopy, res)
})

app.get('/topic', (req, res) => {
    res.send(JSON.parse(fs.readFileSync(STORE_FILE))["topic"])
})

app.post('/topic', (req, res) => {
    newTopic = req.body["topic"]
    if(!newTopic) res.sendStatus(500)
    lockfile.lockSync(LOCK_FILE)
    newStore = JSON.parse(fs.readFileSync(STORE_FILE))
    newStore["topic"] = newTopic
    fs.writeFileSync(STORE_FILE, JSON.stringify(newStore, null, 4))
    lockfile.unlockSync(LOCK_FILE)
    res.send(newTopic)
})

app.listen(port, () => console.log(`App listening on port ${port}!`))
