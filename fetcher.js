const request = require('request');
const fs = require('fs');

const makeRequest = (url, callback, ...args) => {
  request(url, (error, response, body) => {
  const data = body;
  if (callback !== undefined) {
    return callback(data, ...args);
  }
  return data;
});}

const writeHTMLDocument = (sourceCode, fileName, ...args) => {
  const pathWithName = fileName;
  fs.writeFile(pathWithName, sourceCode, err => {
    if (err) {
      console.error(err);
    }
    const fileStats = fs.statSync(fileName);
    const fileSize = fileStats.size;
    const messageOut = `Downloaded and saved ${fileSize} bytes to ${pathWithName}`;
    console.log(messageOut);
  });
}

const createLocalCopyOfWebpage = (url, outputHTMLFileName) => {
  if (typeof url !== 'string') return;
  if (typeof outputHTMLFileName !== 'string') return;
  makeRequest(url, writeHTMLDocument, outputHTMLFileName);
}

/**
 * Function that returns command line arguments in Node
 * @param {boolean} argumentsOnly Set to `true` to only return the
 * arguments that were provided in the command line
 * @returns {Array} The arguments
 */
const argV = (argumentsOnly) => argumentsOnly ? process.argv.slice(2) : process.argv;

const argVArguments = argV(true);
const testURL = argVArguments[0];
const testLocalFileName = argVArguments[1];
// const testURL = 'http://www.example.edu/';
// const testLocalFileName = './index.html';
createLocalCopyOfWebpage(testURL, testLocalFileName);

// Download the resourceCode at the URL to the local path on your machine

//You need to make an http request and wait for the response.
// After the http request is complete, you need to take the data you receive and write it to a file in your local filesystem.

// On completion, it should print out a message like,
//  `Downloaded and saved 1235 bytes to ./index.html.`