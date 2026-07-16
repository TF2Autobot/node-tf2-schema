'use strict';

/**
 * Sends a request to the Steam API
 * @param {string} httpMethod Request method
 * @param {string} method API method
 * @param {string} version Version of API method
 * @param {Object} input Query string or body to send in the request
 * @param {function} callback Function to call when done
 */
async function WebRequest(httpMethod, method, version, params, data, callback) {
    const baseUrl = 'https://api.steampowered.com';
    const face = 'IEconItems_440';

    const url = new URL(`${baseUrl}/${face}/${method}/${version}`);

    if (params) {
        for (const key in params) {
            url.searchParams.append(key, params[key]);
        }
    }

    const config = {
        method: httpMethod,
        headers: {}
    };

    if (data) {
        if (typeof data === 'object') {
            config.body = JSON.stringify(data);
            config.headers['Content-Type'] = 'application/json';
        } else {
            config.body = data;
        }
    }

    try {
        const response = await fetch(url.toString(), config);
        if (!response.ok) {
            throw new Error(`Request failed with status code ${response.status}`);
        }

        const responseData = await response.json();
        const result = responseData.result;

        if (Object.keys(responseData).length === 0 || result === undefined) {
            return callback(new Error(`Empty response from ${url.toString()}`));
        }

        if (result.status != 1) {
            return callback(new Error(result.note));
        }

        delete result.status;

        callback(null, result);
    } catch (err) {
        return callback(err);
    }
}

module.exports = WebRequest;
