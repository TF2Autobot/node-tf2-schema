'use strict';

const axios = require('axios').default;

/**
 * Sends a request to the Steam API
 * @param {string} httpMethod Request method
 * @param {string} method API method
 * @param {string} version Version of API method
 * @param {Object} input Query string or body to send in the request
 * @param {function} callback Function to call when done
 */
function WebRequest(httpMethod, method, version, input, callback) {
    const url = 'https://api.steampowered.com';
    const face = 'IEconItems_440';

    const options = {
        url: `${url}/${face}/${method}/${version}`,
        method: httpMethod
    };

    options[httpMethod === 'GET' ? 'params' : 'data'] = input;

    axios(options)
        .then(response => {
            const result = response.data.result;

            if (Object.keys(response.data).length === 0 || result === undefined) {
                err = new Error('Empty response');
                return callback(err);
            }

            if (result.status != 1) {
                return callback(new Error(result.note));
            }

            delete result.status;

            callback(null, result);
        })
        .catch(err => {
            return callback(err);
        });
}

module.exports = WebRequest;
