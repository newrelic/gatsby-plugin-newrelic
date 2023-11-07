const https = require('node:https');
const fs = require('fs');
const path = require('node:path');

const cache = path.join(__dirname, '../src/browser-agents')
if (!fs.existsSync(cache)) fs.mkdirSync(cache)

const writeStream = fs.createWriteStream(path.join(cache, 'latest.js'))

writeOutput(`/* eslint-disable no-useless-escape */\n`)
    .then(() => writeOutput('export const liteAgent=`\n'))
    .then(() => writeLoader('rum'))
    .then(() => writeOutput('\n`;\n'))
    .then(() => writeOutput('export const proAgent=`\n'))
    .then(() => writeLoader('full'))
    .then(() => writeOutput('\n`;\n'))
    .then(() => writeOutput('export const proAndSpaAgent=`\n'))
    .then(() => writeLoader('spa'))
    .then(() => writeOutput('\n`;\n'))
    .then(() => new Promise((resolve) => {
        writeStream.close(resolve)
    }))

function writeOutput (contents) {
    return new Promise((res, rej) => {
        writeStream.write(contents, err => {
            if (err) rej(err)
            res()
        })
    })
}

function writeLoader(loaderType){
    return new Promise((resolve, rej) => {
        https.get(`https://js-agent.newrelic.com/nr-loader-${loaderType}-current.min.js`, (res) => {
        const chunks = []
        res.on('data', data => {
            chunks.push(Buffer.from(data))
        })
        res.on('end', (err) => {
            writeOutput(Buffer.concat(chunks).toString('utf-8').replace(/\\/g, '\\\\')).then(resolve)
        })

        // res.pipe(writeStream, {end: false})

        }).on('error', (e) => {
            rej(e)
        }); 
    })
}