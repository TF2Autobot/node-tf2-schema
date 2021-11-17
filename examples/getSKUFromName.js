const Schema = require('../index');

const schemaManager = new Schema({ apiKey: 'your steam api key' });

schemaManager.init(function (err) {
    if (err) {
        throw err;
    }
});

schemaManager.on('ready', function () {
    //console.log(JSON.stringify(schemaManager.schema.getPaints()));
    const name = schemaManager.schema.getSkuFromName('Professional Killstreak Third Degree Kit Fabricator');

    console.log(name);
});
