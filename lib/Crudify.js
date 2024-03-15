'use strict'

const undici = require('undici')
const path = require('path')

class Crudify {
    constructor(hostname) {
        this.hostname = hostname
    }

    async get(route, options) {
        const url = new URL(route, this.hostname)
        undici.request(url, )
    }
}

module.exports = {
    Crudify
}