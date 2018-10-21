const express = require('express')
const fs = require('fs')
const app = express()
const bodyParser = require('body-parser')
const mergePosts = require('./merge')
const port = 3000

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/posts', (req, res) => {
    res.json(JSON.parse(fs.readFileSync(__dirname + '/data/posts.json')))
})

app.post('/posts', (req, res) => {
    remoteCopy = JSON.parse(req.body)
    localCopy = JSON.parse(fs.readFileSync(__dirname + '/data/posts.json'))
    mergePosts(remoteCopy, localCopy, res)
})

app.listen(port, () => console.log(`App listening on port ${port}!`))
