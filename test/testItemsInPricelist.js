const SchemaManager = require('../index.js');
const SKU = require('@tf2autobot/tf2-sku');
const util = require('util');

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

process.env.DEBUG_SCHEMA = 'true';
const schemaManager = new SchemaManager({});

schemaManager.init(err => {
    if (err) {
        throw err;
    }

    fetch('https://pricedb.io/api/items')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(items => {
            let success = true;
            for (const item of items) {
                const generateSku = schemaManager.schema.getSkuFromName(item.name);
                console.log('Generated sku:', generateSku);

                if (generateSku === item.sku) continue;

                if (generateSku.includes('null')) {
                    if (item.name.includes('Strangifier #')) continue;

                    console.log('\x1b[31m%s\x1b[0m', 'Failed');
                    console.log('Generated with null for:', { generateSku, item });
                    success = false;
                    break;
                }

                if (generateSku !== item.sku) {
                    if (item.name.includes('Haunted Cremation') && item.sku.includes(';u3130')) continue;
                    if (item.name.startsWith('Strange') && item.sku.includes(';pk')) continue;
                    if (item.sku === '5865;6;uncraftable;c105') continue;

                    const itemObj = SKU.fromString(generateSku);
                    const itemObjPricedb = SKU.fromString(item.sku);
                    if (util.isDeepStrictEqual(itemObj, itemObjPricedb)) continue;
                    if (typeof itemObj.paintkit === 'number' && itemObjPricedb.defindex === 17402) continue;
                    if (typeof itemObj.crateseries === 'number' && itemObjPricedb.defindex === 5022) continue;
                    if (typeof itemObj.crateseries === 'number' && itemObj.defindex === itemObjPricedb.defindex)
                        continue;

                    console.log('\x1b[31m%s\x1b[0m', 'Failed');
                    console.log('Generated not matching item.sku', { generateSku, item });
                    success = false;
                    break;
                }
            }
            if (success) console.log('\x1b[32m%s\x1b[0m', 'Success');
        }).catch(err => {
            throw err;
        });
});
