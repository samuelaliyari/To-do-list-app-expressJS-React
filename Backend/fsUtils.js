const fs = require("fs")

const readJson = (path) => {
    return new Promise((resolve, reject) => {
        fs.readFile(path, (err, data) => {
            if (err) reject(err)
            else resolve(JSON.parse(data.toString()))
        });
    });
}

const writeJson = ((path, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(path, JSON.stringify(data), (err) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
})


module.exports = { readJson, writeJson }