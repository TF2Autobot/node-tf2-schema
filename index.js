const async = require('async');
const semver = require('semver');

const inherits = require('util').inherits;
const EventEmitter = require('events').EventEmitter;

const version = require('./package.json').version;

const Schema = require('./lib/schema.js');

class TF2 {
    /**
     * @param {Object} options
     * @param {String} options.apiKey Steam API key
     * @param {Number} options.updateTime
     */
    constructor(options) {
        EventEmitter.call(this);

        this.apiKey = options.apiKey;
        this.updateTime = options.updateTime || 24 * 60 * 60 * 1000;
        this.lite = options.lite || false;

        this.ready = false;
        this.schema = null;
    }

    /**
     * @param {String} apiKey Steam API key
     */
    setAPIKey(apiKey) {
        this.apiKey = apiKey;
    }

    /**
     * Initializes the class
     * @param {Function} callback
     */
    init(callback) {
        if (this.ready) {
            callback(null);
            return;
        }

        if (this.schema !== null && this._updateWait() !== 0) {
            this._startUpdater();

            this.ready = true;
            this.emit('ready');
            callback(null);
            return;
        }

        this.getSchema(err => {
            if (err) {
                return callback(err);
            }

            this._startUpdater();

            this.ready = true;
            this.emit('ready');
            return callback(null);
        });
    }

    /**
     * Sets the schema using known data. If the schema data does not contain a version, or the version does not satify our version, then the schema will be ignored
     * @param {Object} data Schema data
     * @param {Boolean} fromUpdate If the schema is new or not
     */
    setSchema(data, fromUpdate) {
        // Ignore the schema if it does not contain a version, or if the schema has a higher version (major)
        if ((!data.version && !fromUpdate) || semver.major(data.version) > semver.major(version)) {
            return;
        }

        if (this.lite) {
            // delete unnecessary things
            // data.raw.schema
            // data.raw.schema.qualities;    // used
            // data.raw.schema.qualityNames; // used
            delete data.raw.schema.originNames;
            // data.raw.schema.attributes;   // used
            delete data.raw.schema.item_sets;
            // data.raw.schema.attribute_controlled_attached_particles; // used
            delete data.raw.schema.item_levels;
            // data.raw.schema.kill_eater_score_types;   // used
            delete data.raw.schema.string_lookups;       // Might needed for Spells
            // data.raw.schema.items     - strictly necessary
            // data.raw.schema.paintkits - strictly necessary

            // items_game
            delete data.raw.items_game.game_info;
            delete data.raw.items_game.qualities; // duplicate of raw.schema.qualities
            delete data.raw.items_game.colors;
            delete data.raw.items_game.rarities;
            delete data.raw.items_game.equip_regions_list;
            delete data.raw.items_game.equip_conflicts;
            delete data.raw.items_game.quest_objective_conditions;
            delete data.raw.items_game.item_series_types;
            delete data.raw.items_game.item_collections;
            delete data.raw.items_game.operations;
            // data.raw.items_game.items;    // used
            delete data.raw.items_game.prefabs;
            delete data.raw.items_game.attributes;   // duplicate of raw.schema.attributes
            delete data.raw.items_game.item_criteria_templates;
            delete data.raw.items_game.random_attribute_templates;
            delete data.raw.items_game.lootlist_job_template_definitions;
            delete data.raw.items_game.item_sets;
            delete data.raw.items_game.client_loot_lists;
            delete data.raw.items_game.revolving_loot_lists;
            delete data.raw.items_game.recipes;
            delete data.raw.items_game.achievement_rewards;
            delete data.raw.items_game.attribute_controlled_attached_particles; // duplicate and not used
            delete data.raw.items_game.armory_data;
            delete data.raw.items_game.item_levels;
            delete data.raw.items_game.kill_eater_score_types;   // duplicate of raw.schema.kill_eater_score_types
            delete data.raw.items_game.mvm_maps;
            delete data.raw.items_game.mvm_tours;
            delete data.raw.items_game.matchmaking_categories;
            delete data.raw.items_game.maps;
            delete data.raw.items_game.master_maps_list;
            delete data.raw.items_game.steam_packages;
            // data.raw.items_game.string_lookups    // might use later for spells
            delete data.raw.items_game.community_market_item_remaps;
            delete data.raw.items_game.war_definitions;
        }

        if (this.schema !== null) {
            this.schema.lite = this.lite;
            this.schema.raw = data.raw;
            this.schema.time = data.time || new Date().getTime();
            this.schema.setPropertiesData();
        } else {
            this.schema = new Schema(Object.assign({}, data, { lite: this.lite }));
        }

        if (fromUpdate) {
            this.emit('schema', this.schema);
        }
    }

    /**
     * Gets the schema from the TF2 API
     * @param {Function} callback
     */
    getSchema(callback) {
        if (this.apiKey === undefined) {
            throw new Error('Missing API key');
        }

        async.parallel(
            {
                overview: callback => {
                    Schema.getOverview(this.apiKey, callback);
                },
                items: callback => {
                    Schema.getItems(this.apiKey, callback);
                },
                paintkits: function (callback) {
                    Schema.getPaintKits(callback);
                },
                items_game: function (callback) {
                    Schema.getItemsGame(callback);
                }
            },
            (err, result) => {
                if (err) {
                    return callback(err);
                }

                const raw = {
                    schema: Object.assign(result.overview, { items: result.items, paintkits: result.paintkits }),
                    items_game: result.items_game
                };

                this.setSchema({ version: version, raw: raw }, true);
                callback(null, this.schema);
            }
        );
    }

    /**
     * Starts schema updater
     */
    _startUpdater() {
        if (this.updateTime === -1) {
            return;
        }

        clearTimeout(this._updateTimeout);
        clearInterval(this._updateInterval);

        this._updateTimeout = setTimeout(() => {
            // Update the schema
            this.getSchema(err => {
                this.emit('failed', err);
            });

            // Set update interval
            this._updateInterval = setInterval(
                TF2.prototype.getSchema.bind(this, function () {}),
                this.updateTime
            );
        }, this._updateWait());
    }

    _updateWait() {
        if (this.updateTime === -1) {
            return -1;
        }

        let wait = this.schema.time - new Date().getTime() + this.updateTime;
        if (wait < 0) {
            wait = 0;
        }

        return wait;
    }
}

inherits(TF2, EventEmitter);

module.exports = TF2;

module.exports.Schema = Schema;
