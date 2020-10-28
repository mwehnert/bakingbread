// ./gatsby-node.js
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { createPages, onCreateNode } = require("./src/gatsby-node.ts")

/** @type { import("gatsby").GatsbyNode } */
const config = {}
exports.config = config

config.createPages = createPages
config.onCreateNode = onCreateNode

module.exports = config
