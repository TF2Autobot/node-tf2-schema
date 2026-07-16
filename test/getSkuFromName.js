const SchemaManager = require('../index.js');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

SchemaManager.prototype.getSchema = function (callback) {
    fetch('https://schema.autobot.tf/schema')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(body => {
            this.setSchema(body, true);
            callback(null, this.schema);
        })
        .catch(err => {
            callback(err);
        });
};

// process.env.DEBUG_SCHEMA = 'true';
const schemaManager = new SchemaManager({});

let freq = 1;
schemaManager.init(err => {
    if (err) {
        throw err;
    }

    function ask() {
        rl.question(`(${freq}) Input item name: `, name => {
            console.log('Result: \x1b[32m%s\x1b[0m', schemaManager.schema.getSkuFromName(name));
            freq++;
            ask();
        });
    }

    console.log('\x1b[33m%s\x1b[0m', '*Convert item name to sku*');
    ask();
});
