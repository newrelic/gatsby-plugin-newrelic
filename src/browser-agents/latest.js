/* eslint-disable no-useless-escape */
export const liteAgent = await fetch('https://js-agent.newrelic.com/nr-loader-rum-current.min.js').then(response => response.text())

export const proAgent = await fetch('https://js-agent.newrelic.com/nr-loader-full-current.min.js').then(response => response.text())

export const proAndSpaAgent = await fetch('https://js-agent.newrelic.com/nr-loader-spa-current.min.js').then(response => response.text())
