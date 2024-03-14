'use strict'

const { Writable } = require('stream')

class SemaphoreStream extends Writable {
    constructor(options) {
        super(options);
    }

    _write(chunk, encoding, callback) {
        console.log('Chunk ricevuto:', chunk.toString());
        callback();
    }
}

module.exports = {
    SemaphoreStream
}