// eslint-disable-next-line @typescript-eslint/no-var-requires
require("ts-node").register({ files: true, transpileOnly: true })

module.exports = require("./src/gatsby-config.ts")
