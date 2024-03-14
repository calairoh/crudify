'use strict'

const split2 = require('split2')
const { SemaphoreStream } = require('./SemaphoreStream')

const registry = {
    run: () => { throw new Error('Not implemented') },
}

function checkRegistry() {
    if (registry.stream1) {
        registry.run()
    }
}



async function paginate(stream1, stream2) {
    const jsonStream1 = stream1.pipe(split2(JSON.parse))
    const jsonStream2 = stream2.pipe(split2(JSON.parse))

    jsonStream1.on('data', chunk => {
        registry.stream1 = { chunk }
        checkRegistry()
        jsonStream1.pause()   
    })

    jsonStream2.on('data', chunk => {
        registry.stream2 = { chunk }
        checkRegistry()
        jsonStream2.pause()   
    })
    
    let allChunkLoaded = new Promise(resolve => {
        registry.run = resolve
    })

    let finished = false
    while (!finished) {
        await allChunkLoaded

        const res = getValue(registry.stream1.chunk, registry.stream2.chunk)
        if (res === 1) {
            console.log(registry.stream1.chunk)
            jsonStream1.resume()
        } else {
            console.log(registry.stream2.chunk)
            jsonStream2.resume()
        }

        allChunkLoaded = new Promise(resolve => {
            registry.run = resolve
        })
    }
}

function getValue(value1, value2) {
    if (value1.id < value2.id) {
        return 1
    }
    return 2
}

module.exports = {
    paginate
}