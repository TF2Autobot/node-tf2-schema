const axios = require('axios').default;
const vdf = require('vdf');

const webAPI = require('./webapi.js');
const SKU = require('@tf2autobot/tf2-sku');

const language = 'English';

const munitionCrate = new Map();
munitionCrate
    .set(82, 5734)
    .set(83, 5735)
    .set(84, 5742)
    .set(85, 5752)
    .set(90, 5781)
    .set(91, 5802)
    .set(92, 5803)
    .set(103, 5859);

const pistolSkins = new Map();
pistolSkins
    .set(0, 15013)
    .set(18, 15018)
    .set(35, 15035)
    .set(41, 15041)
    .set(46, 15046)
    .set(56, 15056)
    .set(61, 15061)
    .set(63, 15060)
    .set(69, 15100)
    .set(70, 15101)
    .set(74, 15102)
    .set(78, 15126)
    .set(81, 15148);

const rocketLauncherSkins = new Map();
rocketLauncherSkins
    .set(1, 15014)
    .set(6, 15006)
    .set(28, 15028)
    .set(43, 15043)
    .set(52, 15052)
    .set(57, 15057)
    .set(60, 15081)
    .set(69, 15104)
    .set(70, 15105)
    .set(76, 15129)
    .set(79, 15130)
    .set(80, 15150);

const medicgunSkins = new Map();
medicgunSkins
    .set(2, 15010)
    .set(5, 15008)
    .set(25, 15025)
    .set(39, 15039)
    .set(50, 15050)
    .set(65, 15078)
    .set(72, 15097)
    .set(76, 15120)
    .set(78, 15121)
    .set(79, 15122)
    .set(81, 15145)
    .set(83, 15146);

const revolverSkins = new Map();
revolverSkins
    .set(3, 15011)
    .set(27, 15027)
    .set(42, 15042)
    .set(51, 15051)
    .set(63, 15064)
    .set(64, 15062)
    .set(65, 15063)
    .set(72, 15103)
    .set(76, 15127)
    .set(77, 15128)
    .set(81, 15149);

const stickybombSkins = new Map();
stickybombSkins
    .set(4, 15012)
    .set(8, 15009)
    .set(24, 15024)
    .set(38, 15038)
    .set(45, 15045)
    .set(48, 15048)
    .set(60, 15082)
    .set(62, 15083)
    .set(63, 15084)
    .set(68, 15113)
    .set(76, 15137)
    .set(78, 15138)
    .set(81, 15155);

const sniperRifleSkins = new Map();
sniperRifleSkins
    .set(7, 15007)
    .set(14, 15000)
    .set(19, 15019)
    .set(23, 15023)
    .set(33, 15033)
    .set(59, 15059)
    .set(62, 15070)
    .set(64, 15071)
    .set(65, 15072)
    .set(76, 15135)
    .set(66, 15111)
    .set(67, 15112)
    .set(78, 15136)
    .set(82, 15154);

const flameThrowerSkins = new Map();
flameThrowerSkins
    .set(9, 15005)
    .set(17, 15017)
    .set(30, 15030)
    .set(34, 15034)
    .set(49, 15049)
    .set(54, 15054)
    .set(60, 15066)
    .set(61, 15068)
    .set(62, 15067)
    .set(66, 15089)
    .set(67, 15090)
    .set(76, 15115)
    .set(80, 15141);

const minigunSkins = new Map();
minigunSkins
    .set(10, 15004)
    .set(20, 15020)
    .set(26, 15026)
    .set(31, 15031)
    .set(40, 15040)
    .set(55, 15055)
    .set(61, 15088)
    .set(62, 15087)
    .set(63, 15086)
    .set(70, 15098)
    .set(73, 15099)
    .set(76, 15123)
    .set(77, 15125)
    .set(78, 15124)
    .set(84, 15147);

const scattergunSkins = new Map();
scattergunSkins
    .set(11, 15002)
    .set(15, 15015)
    .set(21, 15021)
    .set(29, 15029)
    .set(36, 15036)
    .set(53, 15053)
    .set(61, 15069)
    .set(63, 15065)
    .set(69, 15106)
    .set(72, 15107)
    .set(74, 15108)
    .set(76, 15131)
    .set(83, 15157)
    .set(85, 15151);

const shotgunSkins = new Map();
shotgunSkins
    .set(12, 15003)
    .set(16, 15016)
    .set(44, 15044)
    .set(47, 15047)
    .set(60, 15085)
    .set(72, 15109)
    .set(76, 15132)
    .set(78, 15133)
    .set(86, 15152);

const smgSkins = new Map();
smgSkins
    .set(13, 15001)
    .set(22, 15022)
    .set(32, 15032)
    .set(37, 15037)
    .set(58, 15058)
    .set(65, 15076)
    .set(69, 15110)
    .set(79, 15134)
    .set(81, 15153);

const wrenchSkins = new Map();
wrenchSkins.set(60, 15074).set(61, 15073).set(64, 15075).set(75, 15114).set(77, 15140).set(78, 15139).set(82, 15156);

const grenadeLauncherSkins = new Map();
grenadeLauncherSkins
    .set(60, 15077)
    .set(63, 15079)
    .set(67, 15091)
    .set(68, 15092)
    .set(76, 15116)
    .set(77, 15117)
    .set(80, 15142)
    .set(84, 15158);

const knifeSkins = new Map();
knifeSkins
    .set(64, 15080)
    .set(69, 15094)
    .set(70, 15095)
    .set(71, 15096)
    .set(77, 15119)
    .set(78, 15118)
    .set(81, 15143)
    .set(82, 15144);

const exclusiveGenuine = new Map();
exclusiveGenuine
    .set(810, 831) // Genuine Red-Tape Recorder
    .set(811, 832) // Genuine Huo-Long Heater
    .set(812, 833) // Genuine Flying Guillotine
    .set(813, 834) // Genuine Neon Annihilator
    .set(814, 835) // Genuine Triad Trinket
    .set(815, 836) // Genuine Champ Stamp
    .set(816, 837) // Genuine Marxman
    .set(817, 838) // Genuine Human Cannonball
    .set(30720, 30740) // Genuine Arkham Cowl
    .set(30721, 30741) // Genuine Firefly
    .set(30724, 30739); // Genuine Fear Monger

const exclusiveGenuineReversed = new Map();
exclusiveGenuineReversed
    .set(831, 810) // Red-Tape Recorder
    .set(832, 811) // Huo-Long Heater
    .set(833, 812) // Flying Guillotine
    .set(834, 813) // Neon Annihilator
    .set(835, 814) // Triad Trinket
    .set(836, 815) // Champ Stamp
    .set(837, 816) // Marxman
    .set(838, 817) // Human Cannonball
    .set(30740, 30720) // Arkham Cowl
    .set(30741, 30721) // Firefly
    .set(30739, 30724); // Fear Monger

const retiredKeys = {
    5049: { defindex: 5049, name: 'Festive Winter Crate Key' },
    5067: { defindex: 5067, name: 'Refreshing Summer Cooler Key' },
    5072: { defindex: 5072, name: 'Naughty Winter Crate Key' },
    5073: { defindex: 5073, name: 'Nice Winter Crate Key' },
    5079: { defindex: 5079, name: 'Scorched Key' },
    5081: { defindex: 5081, name: 'Fall Key' },
    5628: { defindex: 5628, name: 'Eerie Key' },
    5631: { defindex: 5631, name: 'Naughty Winter Crate Key 2012' },
    5632: { defindex: 5632, name: 'Nice Winter Crate Key 2012' },
    5713: { defindex: 5713, name: 'Spooky Key' }, // Non-Craftable
    5716: { defindex: 5716, name: 'Naughty Winter Crate Key 2013' }, // Non-Craftable
    5717: { defindex: 5717, name: 'Nice Winter Crate Key 2013' }, // Non-Craftable
    5762: { defindex: 5762, name: 'Limited Late Summer Crate Key' }, // Non-Craftable
    5791: { defindex: 5791, name: 'Naughty Winter Crate Key 2014' },
    5792: { defindex: 5792, name: 'Nice Winter Crate Key 2014' }
};

const retiredKeysNames = Object.values(retiredKeys).map(retiredKey => retiredKey.name.toLowerCase());

class Schema {
    /**
     * Initializes the Schema class
     * @param {Object} data
     * @param {Object} [data.raw] Raw schema
     * @param {Number} [data.time] Time when the schema was made
     */
    constructor(data) {
        this.version = data.version || null;
        this.raw = data.raw || null;
        this.time = data.time || new Date().getTime();

        this.crateSeriesList = this.getCrateSeriesList();
    }

    getItemByItemNameWithThe(name) {
        const items = this.raw.schema.items;
        const itemsCount = items.length;

        name = name.toLowerCase();

        if (name.includes('the ')) {
            const splits = name.split('the ');
            splits.forEach(slipt => {
                name = name.replace('the ', '').trim();
            });
        }

        for (let i = 0; i < itemsCount; i++) {
            const item = items[i];
            let itemName = item.item_name.toLowerCase();

            if (itemName.includes('the ', '')) {
                const splits = itemName.split('the ');
                splits.forEach(slipt => {
                    itemName = itemName.replace('the ', '').trim();
                });
            }

            if (name === itemName) {
                if (item.item_name === 'Name Tag' && item.defindex === 2093) {
                    // skip and let it find Name Tag with defindex 5020
                    continue;
                }

                if (item.item_quality === 0) {
                    // skip if Stock Quality
                    continue;
                }

                return item;
            }
        }

        return null;
    }

    /**
     * Gets sku
     * @param {string} name
     * @returns {string|null} SKU
     */
    getSkuFromName(name) {
        return SKU.fromObject(this.getItemObjectFromName(name));
    }
    /**
     * Gets sku item object
     * @param {string} name
     * @returns {object} SKU
     */
    getItemObjectFromName(name) {
        name = name.toLowerCase();
        const item = {
            defindex: null,
            quality: null,
            craftable: true
        };

        if (
            name.includes('strange part:') ||
            name.includes('strange cosmetic part:') ||
            name.includes('strange filter:') ||
            name.includes('strange count transfer tool') ||
            name.includes('strange bacon grease')
        ) {
            const schemaItem = this.getItemByItemName(name);
            if (!schemaItem) {
                console.log('returned L352', {
                    name: name,
                    item: item
                });
                return item;
            }
            item.defindex = schemaItem.defindex;
            item.quality = item.quality || schemaItem.item_quality; //default quality
            console.log('returned L360', {
                name: name,
                item: item
            });
            return item;
        }

        const wears = {
            '(factory new)': 1,
            '(minimal wear)': 2,
            '(field-tested)': 3,
            '(well-worn)': 4,
            '(battle scarred)': 5
        };

        for (const wear in wears) {
            if (name.includes(wear)) {
                console.log('Wear - before', {
                    name: name,
                    item: item
                });
                name = name.replace(wear, '').trim();
                item.wear = wears[wear];
                console.log('Wear - after', {
                    name: name,
                    item: item
                });
                break;
            }
        }

        if (name.includes('strange')) {
            console.log('"Strange" - before', {
                name: name,
                item: item
            });
            if (item.wear) {
                item.quality2 = 11;
            } else {
                item.quality = 11;
            }
            name = name.replace('strange', '').trim();
            console.log('"Strange" - after', {
                name: name,
                item: item
            });
        }

        name = name.replace('uncraftable', 'non-craftable');
        if (name.includes('non-craftable')) {
            console.log('"Non-Craftable" - before', {
                name: name,
                item: item
            });
            name = name.replace('non-craftable', '').trim();
            item.craftable = false;
            console.log('"Non-Craftable" - after', {
                name: name,
                item: item
            });
        }

        name = name
            .replace('untradeable', 'non-tradable')
            .replace('untradable', 'non-tradable')
            .replace('non-tradeable', 'non-tradable');
        if (name.includes('non-tradable')) {
            console.log('"Non-Tradable" - before', {
                name: name,
                item: item
            });
            name = name.replace('non-tradable', '').trim();
            item.tradable = false;
            console.log('"Non-Tradable" - after', {
                name: name,
                item: item
            });
        }

        if (name.includes('unusualifier')) {
            // example: Non-Craftable Unusual Taunt: The Trackman's Touchdown Unusualifier
            name = name.replace('unusual ', '').replace(' unusualifier', '').trim();
            item.defindex = 9258;
            item.quality = 5;

            const schemaItem = this.getItemByItemName(name); // Taunt Name
            if (schemaItem) {
                item.target = schemaItem.defindex;
            } else {
                item.target = null;
            }

            console.log('returned L452', {
                name: name,
                item: item
            });
            return item;
        }

        const killstreaks = {
            'professional killstreak': 3,
            'specialized killstreak': 2,
            killstreak: 1
        };

        for (const killstreak in killstreaks) {
            if (name.includes(killstreak)) {
                console.log('"Killstreak" - before', {
                    name: name,
                    item: item
                });
                name = name.replace(killstreak + ' ', '').trim();
                item.killstreak = killstreaks[killstreak];
                console.log('"Killstreak" - after', {
                    name: name,
                    item: item
                });
                break;
            }
        }

        if (name.includes('australium') && !name.includes('australium gold')) {
            console.log('"Australium" - before', {
                name: name,
                item: item
            });
            name = name.replace('australium', '').trim();
            item.australium = true;
            console.log('"Australium" - after', {
                name: name,
                item: item
            });
        }

        if (name.includes('festivized')) {
            console.log('"Festivized" - before', {
                name: name,
                item: item
            });
            name = name.replace('festivized', '').trim();
            item.festive = true;
            console.log('"Festivized" - after', {
                name: name,
                item: item
            });
        }

        //Try to find quality name in name
        const exception = [
            'haunted ghosts',
            'haunted phantasm jr',
            'haunted phantasm',
            'haunted metal scrap',
            'haunted hat',
            'unusual cap',
            'vintage tyrolean',
            'vintage merryweather'
        ];

        let qualitySearch = name;
        for (const ex of exception) {
            if (name.includes(ex)) {
                qualitySearch = name.replace(ex, '').trim();
                break;
            }
        }

        // Get all qualities
        const schema = this.raw.schema;
        const qualities = Object.keys(schema.qualities).reduce((obj, q) => {
            obj[schema.qualityNames[q].toLowerCase()] = schema.qualities[q];
            return obj;
        }, {});

        if (exception.includes(qualitySearch) === false) {
            // Make sure qualitySearch does not includes in the exception list.
            // example: "Haunted Ghosts Vintage Tyrolean" - will skip this.

            for (const quality in qualities) {
                if (
                    quality === "collector's" &&
                    qualitySearch.includes("collector's") &&
                    qualitySearch.includes('chemistry set')
                ) {
                    // Skip setting quality if item is Collector's Chemistry Set
                    continue;
                }

                if (quality === 'community' && qualitySearch.startsWith('community sparkle')) {
                    // Skip if starts with Community Sparkle, should resolve at L610
                    continue;
                }

                if (qualitySearch.startsWith(quality)) {
                    console.log('"Quality" - before', {
                        name: name,
                        item: item
                    });
                    name = name.replace(quality, '').trim();
                    item.quality2 = item.quality;
                    item.quality = qualities[quality];
                    console.log('"Quality" - after', {
                        name: name,
                        item: item
                    });
                    break;
                }
            }
        }

        //Check for effects
        let previous = '';
        const effects = schema.attribute_controlled_attached_particles.reduce((obj, particle) => {
            const particleName = particle.name.toLowerCase();
            if (particleName !== previous) {
                obj[particleName] = particle.id;
                if (particleName === 'eerie orbiting fire') {
                    delete obj['orbiting fire'];
                    obj['orbiting fire'] = 33;
                }

                if (particleName === 'nether trail') {
                    delete obj['ether trail'];
                    obj['ether trail'] = 103;
                }

                if (particleName === 'refragmenting reality') {
                    delete obj['fragmenting reality'];
                    obj['fragmenting reality'] = 141;
                }
            }
            previous = particleName;
            return obj;
        }, {});

        const excludeAtomic = ['bonk! atomic punch', 'atomic accolade'].some(ex => name.includes(ex));

        for (const effect in effects) {
            if (effect === 'showstopper' && !name.includes('taunt: ')) {
                // if the effect is Showstopper and name does not include "Taunt: " or "Shred Alert", skip it.
                if (name.includes('shred alert')) {
                    // Do nothing
                } else {
                    continue;
                }
            }

            if (
                effect === 'smoking' &&
                (name === 'smoking jacket' || name.includes('smoking skid lid') || name === 'the smoking skid lid')
            ) {
                // if name only Smoking Jacket or Smoking Skid Lid without effect Smoking, then continue.
                if (name.startsWith('smoking smoking')) {
                    // Do nothing
                } else {
                    continue;
                }
            }

            if (effect === 'haunted ghosts' && name.includes('haunted ghosts') && item.wear) {
                // if item name includes Haunted Ghosts and wear is defined, skip cosmetic effect and find warpaint for weapon
                continue;
            }

            if (effect === 'atomic' && (name.includes('subatomic') || excludeAtomic)) {
                continue;
            }

            if (effect === 'spellbound' && (name.includes('taunt:') || name.includes('shred alert'))) {
                // skip "Spellbound" for cosmetic if item is a Taunt (to get the correct "Spellbound Aspect")
                continue;
            }

            if (effect === 'accursed' && name.includes('accursed apparition')) {
                // Accursed Apparition never be an unusual
                continue;
            }

            if (effect === 'hot') {
                // shotgun   ___     /  shot to hell
                // plaid potshotter  /  shot in the dark

                if (!item.wear) {
                    continue;
                } else if (
                    !name.includes('hot ') &&
                    (name.includes('shotgun') || name.includes('shot ') || name.includes('plaid potshotter'))
                ) {
                    // Shotgun
                    // Strange Shotgun
                    // Plaid Potshotter Mk.II Shotgun (Factory New)
                    // Shot to Hell Sniper Rifle (Factory New)
                    // Shot in the Dark Sniper Rifle (Factory New)
                    // Strange Plaid Potshotter Mk.II Shotgun (Factory New)
                    // Strange Shot to Hell Sniper Rifle (Factory New)
                    // Strange Shot in the Dark Sniper Rifle (Factory New)
                    // Strange Cool Shot to Hell Sniper Rifle (Factory New)
                    // Strange Shot in the Dark Sniper Rifle (Factory New)
                    continue;
                } else if (name.startsWith('hot ')) {
                    // do nothing
                } else {
                    continue;
                }
            }

            if (effect === 'cool' && !item.wear) {
                continue;
            }

            if (name.includes(effect)) {
                console.log('"Effect" - before', {
                    name: name,
                    item: item
                });
                name = name.replace(effect, '').trim();
                item.effect = effects[effect];

                if (item.effect === 4) {
                    if (item.quality === null) {
                        item.quality = 5;
                    }
                } else if (item.quality !== 5) {
                    // will set quality to unusual if undefined, or make it primary, it other quality exists
                    item.quality2 = item.quality2 || item.quality;
                    item.quality = 5;
                }
                console.log('"Effect" - after', {
                    name: name,
                    item: item
                });

                break;
            }
        }

        if (item.wear) {
            const paintkits = Object.keys(schema.paintkits).reduce((obj, id) => {
                obj[schema.paintkits[id].toLowerCase()] = +id;
                return obj;
            }, {});

            for (const paintkit in paintkits) {
                if (name.includes('mk.ii') && !paintkit.includes('mk.ii')) {
                    continue;
                }

                if (name.includes(paintkit)) {
                    console.log('"Paintkit" - before', {
                        name: name,
                        item: item
                    });
                    name = name.replace(paintkit, '').replace(' | ', '').trim();
                    item.paintkit = paintkits[paintkit];

                    // Standardize https://github.com/TF2Autobot/tf2autobot/pull/394
                    if (!item.effect) {
                        if (item.quality2 === 11) {
                            item.quality = 11;
                            item.quality2 = null;
                        } else {
                            item.quality = 15;
                        }
                    } else {
                        if (item.quality2 === 11) {
                            item.quality = 11;
                            item.quality2 = null;
                        }
                    }

                    console.log('"Paintkit" - after', {
                        name: name,
                        item: item
                    });

                    break;
                }
            }

            if (!name.includes('War Paint')) {
                const oldDefindex = item.defindex;

                if (
                    (item.paintkit >= 0 && item.paintkit <= 66) ||
                    (item.paintkit >= 68 && item.paintkit <= 75) ||
                    (item.paintkit >= 77 && item.paintkit <= 84) ||
                    [86, 91, 92, 93].includes(item.paintkit)
                ) {
                    // Special Skins, but still need to filter because not everything is special
                    // TODO: Investigate whether this also the reason we have two Strange variants for skins?

                    item.defindex = name.includes('pistol')
                        ? pistolSkins.has(item.paintkit)
                            ? pistolSkins.get(item.paintkit)
                            : item.defindex
                        : name.includes('rocket launcher')
                        ? rocketLauncherSkins.has(item.paintkit)
                            ? rocketLauncherSkins.get(item.paintkit)
                            : item.defindex
                        : name.includes('medi gun')
                        ? medicgunSkins.get(item.paintkit)
                            ? medicgunSkins.get(item.paintkit)
                            : item.defindex
                        : name.includes('revolver')
                        ? revolverSkins.has(item.paintkit)
                            ? revolverSkins.get(item.paintkit)
                            : item.defindex
                        : name.includes('stickybomb launcher')
                        ? stickybombSkins.has(item.paintkit)
                            ? stickybombSkins.get(item.paintkit)
                            : item.defindex
                        : name.includes('sniper rifle')
                        ? sniperRifleSkins.has(item.paintkit)
                            ? sniperRifleSkins.get(item.paintkit)
                            : item.defindex
                        : name.includes('flame thrower')
                        ? flameThrowerSkins.has(item.paintkit)
                            ? flameThrowerSkins.get(item.paintkit)
                            : item.defindex
                        : name.includes('minigun')
                        ? minigunSkins.has(item.paintkit)
                            ? minigunSkins.get(item.paintkit)
                            : item.defindex
                        : name.includes('scattergun')
                        ? scattergunSkins.has(item.paintkit)
                            ? scattergunSkins.get(item.paintkit)
                            : item.defindex
                        : name.includes('shotgun')
                        ? shotgunSkins.has(item.paintkit)
                            ? shotgunSkins.get(item.paintkit)
                            : item.defindex
                        : name.includes('smg')
                        ? smgSkins.has(item.paintkit)
                            ? smgSkins.get(item.paintkit)
                            : item.defindex
                        : name.includes('grenade launcher')
                        ? grenadeLauncherSkins.has(item.paintkit)
                            ? grenadeLauncherSkins.get(item.paintkit)
                            : item.defindex
                        : name.includes('wrench')
                        ? wrenchSkins.has(item.paintkit)
                            ? wrenchSkins.get(item.paintkit)
                            : item.defindex
                        : name.includes('knife')
                        ? knifeSkins.has(item.paintkit)
                            ? knifeSkins.get(item.paintkit)
                            : item.defindex
                        : item.defindex;
                }

                if (oldDefindex !== item.defindex) {
                    console.log('returned L811', {
                        name: name,
                        item: item
                    });
                    return item;
                }
            }
        }

        if (name.includes('(paint: ')) {
            console.log('"Painted" - before loop', {
                name: name,
                item: item
            });

            name = name.replace('(paint: ', '').replace(')', '').trim();

            const paints = {
                'indubitably green': 7511618,
                "zepheniah's greed": 4345659,
                "noble hatter's violet": 5322826,
                'color no. 216-190-216': 14204632,
                'a deep commitment to purple': 8208497,
                'mann co. orange': 13595446,
                muskelmannbraun: 10843461,
                'peculiarly drab tincture': 12955537,
                'radigan conagher brown': 6901050,
                'ye olde rustic colour': 8154199,
                'australium gold': 15185211,
                'aged moustache grey': 8289918,
                'an extraordinary abundance of tinge': 15132390,
                'a distinctive lack of hue': 1315860,
                'team spirit': 12073019,
                'pink as hell': 16738740,
                'a color similar to slate': 3100495,
                'drably olive': 8421376,
                'the bitter taste of defeat and lime': 3329330,
                "the color of a gentlemann's business pants": 15787660,
                'dark salmon injustice': 15308410,
                "operator's overalls": 4732984,
                'waterlogged lab coat': 11049612,
                'balaclavas are forever': 3874595,
                'an air of debonair': 6637376,
                'the value of teamwork': 8400928,
                'cream spirit': 12807213,
                "a mann's mint": 12377523,
                'after eight': 2960676,
                'legacy paint': 5801378
            };

            for (const paint in paints) {
                if (name.includes(paint)) {
                    console.log('"Painted" - in loop, before', {
                        name: name,
                        item: item
                    });
                    name = name.replace(paint, '').trim();
                    item.paint = paints[paint];
                    console.log('"Painted" - after', {
                        name: name,
                        item: item
                    });
                    break;
                }
            }
        }

        if (name.includes('kit fabricator') && item.killstreak > 1) {
            console.log('"Kit Fabricator" - before', {
                name: name,
                item: item
            });
            name = name.replace('kit fabricator', '').trim();
            item.defindex = item.killstreak > 2 ? 20003 : 20002;

            if (name !== '') {
                // Generic Fabricator Kit
                const schemaItem = this.getItemByItemName(name);
                if (!schemaItem) {
                    console.log('returned L890', {
                        name: name,
                        item: item
                    });
                    return item;
                }

                item.target = schemaItem.defindex;
                item.quality = item.quality ?? schemaItem.item_quality; //default quality
            }

            if (!item.quality) {
                item.quality = 6;
            }

            item.output = item.killstreak > 2 ? 6526 : 6523;
            item.outputQuality = 6;

            console.log('"Kit Fabricator" - after', {
                name: name,
                item: item
            });
        }

        if (
            (!name.includes('strangifier chemistry set') || name.includes("collector's")) &&
            name.includes('chemistry set')
        ) {
            console.log('"Collector\'s Chemistry Set" - before', {
                name: name,
                item: item
            });

            name = name.replace("collector's ", '').replace('chemistry set', '').trim();

            if (name.includes('festive') && !name.includes('a rather festive tree')) {
                item.defindex = 20007;
            } else {
                item.defindex = 20006;
            }

            const schemaItem = this.getItemByItemName(name);
            if (!schemaItem) {
                console.log('returned L933', {
                    name: name,
                    item: item
                });
                return item;
            }

            item.output = schemaItem.defindex;
            item.outputQuality = 14;
            item.quality = item.quality ?? schemaItem.item_quality; //default quality

            console.log('"Collector\'s Chemistry Set" - after', {
                name: name,
                item: item
            });
        }

        if (name.includes('strangifier chemistry set')) {
            console.log('"Strangifier Chemistry Set" - before', {
                name: name,
                item: item
            });

            name = name.replace('strangifier chemistry set', '').trim();

            // Reference: https://wiki.teamfortress.com/wiki/Chemistry_Set
            /*
            const isSeries1 = [
                // pretty much rare I guess...
                // defindex: 20000
                'bonk boy',
                'fancy dress uniform',
                'all-father',
                'sight for sore eyes',
                'bird-man of aberdeen',
                'toss-proof towel',
                'teddy roosebelt‎',
                'archimedes',
                "villain's veil",
                'camera beard',
                'summer shades',
                'robro 3000'
            ].includes(name);

            // https://marketplace.tf/items/tf2/20001;6;td-541;od-6522;oq-6
            // idk much about this, and rare
            const isSpecial = ["merc's pride scarf"].includes(name);

            const isSeries2 = [
                // defindex: 20005
                // a lot still available, but mostly on inactive accounts
                'boston boom-bringer',
                "lord cockswain's novelty mutton chops and pipe",
                "stockbroker's scarf",
                'dark age defender',
                'sandvich safe',
                'foppish physician',
                'outback intellectual',
                'blood banker',
                'professor speks'
            ].includes(name);

            const isSeries3 = [
                // Everything here is Non-Craftable and Non-Tradable (And should already expired on Tuesday, April 22, 2014 (13:00:00) GMT.)
                // https://steamcommunity.com/id/pyro_mania/inventory/
                // https://backpack.tf/profiles/76561198044513819
                // https://backpack.tf/profiles/76561198040492703
                // and more with Backpack.tf Premium Search
                'ticket boy',
                "killer's kit",
                'ground control',
                'cute suit',
                'sole mate',
                'bushi-dou',
                'dark falkirk helm',
                'juggernaut jacket',
                'sangu sleeves',
                'sole saviors',
                'stylish degroot',
                'toss-proof towel',
                'bullet buzz',
                'combat slacks',
                "eliminator's safeguard",
                'gone commando',
                'heavy lifter',
                'leftover trap',
                'rat stompers',
                'sammy cap',
                'trash man',
                'war goggles',
                'warmth preserver',
                'antarctic researcher',
                'ein',
                'scotch saver',
                "trencher's topper",
                "trencher's tunic",
                "colonel's coat",
                'dough puncher',
                'fashionable megalomaniac',
                'gaiter guards',
                'heat of winter',
                "heer's helmet",
                'mustachioed mann',
                'smock surgeon',
                'teutonic toque',
                "archer's groundings",
                'deep cover operator',
                "huntsman's essentials",
                'toowoomba tunic',
                "backstabber's boomslang",
                'napoleon complex',
                'law'
            ].includes(name);

            if (isSeries1) {
                item.defindex = 20000;
            } else if (isSpecial) {
                item.defindex = 20001;
            } else if (isSeries2) {
                item.defindex = 20005;
            } else if (isSeries3) {
                item.defindex = 20009;
            } else {
                // "Rebuild Strange Weapon Recipe" ?
                item.defindex = 20008;
            }
            */

            const schemaItem = this.getItemByItemName(name);
            if (!schemaItem) {
                console.log('returned L1063', {
                    name: name,
                    item: item
                });
                return item;
            }

            // Standardize defindex for Strangifier Chemistry Set
            item.defindex = 20000;
            item.target = schemaItem.defindex;
            item.quality = 6;
            item.output = 6522;
            item.outputQuality = 6;

            console.log('"Strangifier Chemistry Set" - after', {
                name: name,
                item: item
            });
        }

        if (name.includes('strangifier')) {
            console.log('"Strangifier" - before', {
                name: name,
                item: item
            });
            name = name.replace('strangifier', '').trim();

            /*
            const items = this.raw.schema.items;
            const itemsCount = items.length;

            for (let i = 0; i < itemsCount; i++) {
                const it = items[i];
                if (it.name.toLowerCase().startsWith(name) && it.name.endsWith(' Strangifier')) {
                    item.defindex = it.defindex;
                    break;
                }
            }
            */

            // Standardize to use only 6522
            item.defindex = 6522;
            const schemaItem = this.getItemByItemName(name);
            if (!schemaItem) {
                console.log('returned L1107', {
                    name: name,
                    item: item
                });
                return item;
            }

            item.target = schemaItem.defindex;
            item.quality = item.quality ?? schemaItem.item_quality; //default quality
            console.log('"Strangifier" - after', {
                name: name,
                item: item
            });
        }

        if (name.includes('kit') && item.killstreak) {
            console.log('"Kit" - before', {
                name: name,
                item: item
            });

            name = name.replace('kit', '').trim();

            if (item.killstreak == 1) {
                /*
                const items = this.raw.schema.items;
                const itemsCount = items.length;

                for (let i = 0; i < itemsCount; i++) {
                    const it = items[i];
                    if (it.name.toLowerCase().startsWith(name) && it.name.endsWith(' Killstreakifier Basic')) {
                        item.defindex = it.defindex;
                        break;
                    }
                } */
                item.defindex = 6527; // most new items only use this defindex, thus we ignore specific defindex ks1.
            } else if (item.killstreak == 2) {
                item.defindex = 6523;
            } else if (item.killstreak == 3) {
                item.defindex = 6526;
            }

            // If Generic Kit, ignore this
            if (name !== '') {
                const schemaItem = this.getItemByItemName(name);
                if (!schemaItem) {
                    console.log('returned L1153', {
                        name: name,
                        item: item
                    });
                    return item;
                }

                item.target = schemaItem.defindex;
            }

            if (!item.quality) {
                item.quality = 6;
            }

            console.log('"Kit" - after', {
                name: name,
                item: item
            });
        }

        if (item.defindex) {
            console.log('returned L1174', {
                name: name,
                item: item
            });
            return item;
        }

        if (typeof item.paintkit === 'number' && name.includes('war paint')) {
            console.log('"War Paint" - before', {
                name: name,
                item: item
            });

            name = `Paintkit ${item.paintkit}`;
            if (!item.quality) {
                item.quality = 15;
            }

            const items = schema.items;
            const itemsCount = items.length;

            for (let i = 0; i < itemsCount; i++) {
                const it = items[i];
                if (it.name == name) {
                    item.defindex = it.defindex;
                    break;
                }
            }

            console.log('"War Paint" - after', {
                name: name,
                item: item
            });
        } else {
            name = name.replace(' series ', ' ').replace(' series#', ' #');

            if (name.includes('salvaged mann co. supply crate #')) {
                console.log('"Salvaged Mann Co. Supply Crate"', {
                    name: name,
                    item: item
                });
                item.crateseries = +name.substring(32);
                item.defindex = 5068;
                item.quality = 6;
                console.log('returned L1218', {
                    name: name,
                    item: item
                });
                return item;
            } else if (name.includes('mann co. supply crate #')) {
                console.log('"Mann Co. Supply Crate"', {
                    name: name,
                    item: item
                });
                const crateseries = +name.substring(23);

                if ([1, 3, 7, 12, 13, 18, 19, 23, 26, 31, 34, 39, 43, 47, 54, 57, 75].includes(crateseries)) {
                    item.defindex = 5022;
                } else if ([2, 4, 8, 11, 14, 17, 20, 24, 27, 32, 37, 42, 44, 49, 56, 71, 76].includes(crateseries)) {
                    item.defindex = 5041;
                } else if ([5, 9, 10, 15, 16, 21, 25, 28, 29, 33, 38, 41, 45, 55, 59, 77].includes(crateseries)) {
                    item.defindex = 5045;
                }

                item.crateseries = crateseries;
                item.quality = 6;
                console.log('returned L1240', {
                    name: name,
                    item: item
                });
                return item;
            } else if (name.includes('mann co. supply munition #')) {
                console.log('"Mann Co. Supply Munition"', {
                    name: name,
                    item: item
                });
                const crateseries = +name.substring(26);
                item.defindex = munitionCrate.get(crateseries);
                item.crateseries = crateseries;
                item.quality = 6;
                console.log('returned L1250', {
                    name: name,
                    item: item
                });
                return item;
            }

            let number = null;

            if (name.includes('#')) {
                console.log('with # - before', {
                    name: name,
                    item: item
                });
                const withoutNumber = name.replace(/#\d+/, '');
                number = name.substring(withoutNumber.length + 1).trim();
                name = name.replace(/#\d+/, '').trim();
                console.log('with # - after', {
                    name: name,
                    item: item
                });
            }

            if (retiredKeysNames.includes(name)) {
                Object.values(retiredKeys).forEach(retiredKey => {
                    if (retiredKey.name?.toLowerCase() === name) {
                        item.defindex = retiredKey.defindex;
                        item.quality = item.quality ?? 6;

                        console.log('returned L1284', {
                            name: name,
                            item: item
                        });

                        return item;
                    }
                });
            }

            const schemaItem = this.getItemByItemNameWithThe(name);
            if (!schemaItem) {
                console.log('returned L1295', {
                    name: name,
                    item: item
                });
                return item;
            }

            item.defindex = schemaItem.defindex;
            item.quality = item.quality ?? schemaItem.item_quality; //default quality

            // Fix defindex for Exclusive Genuine items
            if (item.quality === 1) {
                item.defindex = exclusiveGenuine.has(item.defindex)
                    ? exclusiveGenuine.get(item.defindex)
                    : item.defindex;
            }

            if (schemaItem.item_class === 'supply_crate') {
                console.log('with "supply_crate" - before', {
                    name: name,
                    item: item
                });

                item.crateseries = this.crateSeriesList[item.defindex];

                console.log('with "supply_crate" - after', {
                    name: name,
                    item: item
                });
            } else if (schemaItem.item_class !== 'supply_crate' && number !== null) {
                console.log('not "supply_crate" and number !== null - before', {
                    name: name,
                    item: item
                });
                item.craftnumber = number;
                console.log('not "supply_crate" and number !== null - after', {
                    name: name,
                    item: item
                });
            }
        }

        console.log('returned L1337', {
            name: name,
            item: item
        });
        return item;
    }

    /**
     * Gets schema item by defindex
     * @param {Number} defindex
     * @return {Object}
     */
    getItemByDefindex(defindex) {
        const items = this.raw.schema.items;
        const itemsCount = items.length;

        let start = 0;
        let end = itemsCount - 1;
        let iterLim = Math.ceil(Math.log2(itemsCount)) + 2;
        while (start <= end) {
            if (iterLim <= 0) {
                break; // use fallback search
            }
            iterLim--;
            const mid = Math.floor((start + end) / 2);
            if (items[mid].defindex < defindex) {
                start = mid + 1;
            } else if (items[mid].defindex > defindex) {
                end = mid - 1;
            } else {
                return items[mid];
            }
        }
        for (let i = 0; i < itemsCount; i++) {
            const item = items[i];
            if (item.defindex === defindex) {
                return item;
            }
        }

        return null;
    }

    /**
     * Gets schema item by item name
     * @param {String} name
     * @return {Object}
     */
    getItemByItemName(name) {
        const items = this.raw.schema.items;
        const itemsCount = items.length;

        for (let i = 0; i < itemsCount; i++) {
            const item = items[i];
            if (name.toLowerCase() === item.item_name.toLowerCase()) {
                if (item.item_name === 'Name Tag' && item.defindex === 2093) {
                    // skip and let it find Name Tag with defindex 5020
                    continue;
                }

                if (item.item_quality === 0) {
                    // skip if Stock Quality
                    continue;
                }

                return item;
            }
        }

        return null;
    }

    /**
     * Gets schema item by sku
     * @param {String} sku
     * @return {Object}
     */
    getItemBySKU(sku) {
        return this.getItemByDefindex(SKU.fromString(sku).defindex);
    }

    /**
     * Gets schema attribute by defindex
     * @param {Number} defindex
     * @return {Object}
     */
    getAttributeByDefindex(defindex) {
        const attributes = this.raw.schema.attributes;
        const attributesCount = attributes.length;

        let start = 0;
        let end = attributesCount - 1;
        let iterLim = Math.ceil(Math.log2(attributesCount)) + 2;

        while (start <= end) {
            if (iterLim <= 0) {
                break; // use fallback search
            }
            iterLim--;
            const mid = Math.floor((start + end) / 2);
            if (attributes[mid].defindex < defindex) {
                start = mid + 1;
            } else if (attributes[mid].defindex > defindex) {
                end = mid - 1;
            } else {
                return attributes[mid];
            }
        }

        for (let i = 0; i < attributesCount; i++) {
            const attribute = attributes[i];
            if (attribute.defindex === defindex) {
                return attribute;
            }
        }

        return null;
    }

    /**
     * Gets quality name by id
     * @param {Number} id
     * @return {String}
     */
    getQualityById(id) {
        const qualities = this.raw.schema.qualities;

        for (const type in qualities) {
            if (!Object.prototype.hasOwnProperty.call(qualities, type)) {
                continue;
            }

            if (qualities[type] === id) {
                return this.raw.schema.qualityNames[type];
            }
        }

        return null;
    }

    /**
     * Gets quality id by name
     * @param {String} name
     * @return {Number}
     */
    getQualityIdByName(name) {
        const qualityNames = this.raw.schema.qualityNames;

        for (const type in qualityNames) {
            if (!Object.prototype.hasOwnProperty.call(qualityNames, type)) {
                continue;
            }

            if (name.toLowerCase() === qualityNames[type].toLowerCase()) {
                return this.raw.schema.qualities[type];
            }
        }

        return null;
    }

    /**
     * Gets effect name by id
     * @param {Number} id
     * @return {String}
     */
    getEffectById(id) {
        const particles = this.raw.schema.attribute_controlled_attached_particles;
        const particlesCount = particles.length;

        let start = 0;
        let end = particlesCount - 1;
        let iterLim = Math.ceil(Math.log2(particlesCount)) + 2;
        while (start <= end) {
            if (iterLim <= 0) {
                break; // use fallback search
            }
            iterLim--;
            const mid = Math.floor((start + end) / 2);
            if (particles[mid].id < id) {
                start = mid + 1;
            } else if (particles[mid].id > id) {
                end = mid - 1;
            } else {
                return particles[mid].name;
            }
        }

        for (let i = 0; i < particlesCount; i++) {
            const effect = particles[i];

            if (effect.id === id) {
                return effect.name;
            }
        }

        return null;
    }

    /**
     * Gets effect id by name
     * @param {String} name
     * @return {Number}
     */
    getEffectIdByName(name) {
        const particles = this.raw.schema.attribute_controlled_attached_particles;
        const particlesCount = particles.length;

        for (let i = 0; i < particlesCount; i++) {
            const effect = particles[i];

            if (name.toLowerCase() === effect.name.toLowerCase()) {
                return effect.id;
            }
        }

        return null;
    }

    /**
     * Gets skin name by id
     * @param {Number} id
     * @return {String}
     */
    getSkinById(id) {
        const paintkits = this.raw.schema.paintkits;

        if (!Object.prototype.hasOwnProperty.call(paintkits, id)) {
            return null;
        }

        return paintkits[id];
    }

    /**
     * Gets skin id by name
     * @param {String} name
     * @return {Number}
     */
    getSkinIdByName(name) {
        const paintkits = this.raw.schema.paintkits;

        for (const id in paintkits) {
            if (!Object.prototype.hasOwnProperty.call(paintkits, id)) {
                continue;
            }

            if (name.toLowerCase() === paintkits[id].toLowerCase()) {
                return parseInt(id);
            }
        }

        return null;
    }

    /**
     * Gets the name and the id of unusual effects
     * @return {Array} of objects containing name and the id properties
     */
    getUnusualEffects() {
        return this.raw.schema.attribute_controlled_attached_particles.map(v => {
            return { name: v.name, id: v.id };
        });
    }

    /**
     * Gets paint name by Decimal numeral system
     * @param {Number} decimal
     * @return {String} paint name
     */
    getPaintNameByDecimal(decimal) {
        if (decimal === 5801378) {
            return 'Legacy Paint';
        }

        const paintCans = this.raw.schema.items.filter(
            item => item.name.includes('Paint Can') && item.name !== 'Paint Can'
        );

        const paintCansCount = paintCans.length;

        for (let i = 0; i < paintCansCount; i++) {
            const paint = paintCans[i];
            if (paint.attributes === undefined) {
                continue;
            }

            if (paint.attributes.some(att => att.value === decimal)) {
                return paint.item_name;
            }
        }

        return null;
    }

    /**
     * Gets paint Decimal numeral system by name
     * @param {String} name
     * @return {Number} decimal
     */
    getPaintDecimalByName(name) {
        if (name === 'Legacy Paint') {
            return 5801378;
        }

        const paintCans = this.raw.schema.items.filter(
            item => item.name.includes('Paint Can') && item.name !== 'Paint Can'
        );

        const paintCansCount = paintCans.length;

        for (let i = 0; i < paintCansCount; i++) {
            const paint = paintCans[i];
            if (paint.attributes === undefined) {
                continue;
            }

            if (name.toLowerCase() === paint.item_name.toLowerCase()) {
                return paint.attributes[0].value;
            }
        }

        return null;
    }

    /**
     * Gets the name and partial sku for painted items
     * @return {Object} { [name]: "p#" }
     */
    getPaints() {
        const paintCans = this.raw.schema.items.filter(
            item => item.name.includes('Paint Can') && item.name !== 'Paint Can'
        );

        const toObject = {};
        const paintCansCount = paintCans.length;

        for (let i = 0; i < paintCansCount; i++) {
            if (paintCans[i].attributes === undefined) {
                continue;
            }

            toObject[paintCans[i].item_name] = `p${paintCans[i].attributes[0].value}`;
        }

        toObject['Legacy Paint'] = 'p5801378';

        return toObject;
    }

    /**
     * Gets an array of paintable items' defindex
     * @return {Array} - paintable items defindex (Numbers)
     */
    getPaintableItemDefindexes() {
        return this.raw.schema.items
            .filter(item => {
                if (item.capabilities) {
                    if (item.capabilities.paintable === true) {
                        return item;
                    }
                }
            })
            .map(item => item.defindex);
    }

    /**
     * Gets the name and partial sku for strange parts items
     * @return {Object} { [name]: sp# }
     */
    getStrangeParts() {
        const partsToExclude = [
            'Ubers',
            'Kill Assists',
            'Sentry Kills',
            'Sodden Victims',
            'Spies Shocked',
            'Heads Taken',
            'Humiliations',
            'Gifts Given',
            'Deaths Feigned',
            'Buildings Sapped',
            'Tickle Fights Won',
            'Opponents Flattened',
            'Food Items Eaten',
            'Banners Deployed',
            'Seconds Cloaked',
            'Health Dispensed to Teammates',
            'Teammates Teleported',
            'KillEaterEvent_UniquePlayerKills',
            'Points Scored',
            'Double Donks',
            'Teammates Whipped',
            'Wrangled Sentry Kills',
            'Carnival Kills',
            'Carnival Underworld Kills',
            'Carnival Games Won',
            'Contracts Completed',
            'Contract Points',
            'Contract Bonus Points',
            'Times Performed',
            'Kills and Assists during Invasion Event',
            'Kills and Assists on 2Fort Invasion',
            'Kills and Assists on Probed',
            'Kills and Assists on Byre',
            'Kills and Assists on Watergate',
            'Souls Collected',
            'Merasmissions Completed',
            'Halloween Transmutes Performed',
            'Power Up Canteens Used',
            'Contract Points Earned',
            'Contract Points Contributed To Friends'
        ];

        const toObject = {};

        // Filter out built-in parts and also filter repeated "Kills"
        const parts = this.raw.schema.kill_eater_score_types.filter(
            part => !partsToExclude.includes(part.type_name) && ![0, 97].includes(part.type)
        );

        const partsCount = parts.length;

        for (let i = 0; i < partsCount; i++) {
            toObject[parts[i].type_name] = `sp${parts[i].type}`;
        }

        return toObject;
    }

    /**
     * Get an array of item objects for craftable weapons
     * @return {Array} Array\<SchemaItem\> for craftable weapons
     */
    getCraftableWeaponsSchema() {
        const weaponsToExclude = [
            // Exclude these weapons
            266, // Horseless Headless Horsemann's Headtaker
            452, // Three-Rune Blade
            466, // Maul
            474, // Conscientious Objector
            572, // Unarmed Combat
            574, // Wanga Prick
            587, // Apoco-Fists
            638, // Sharp Dresser
            735, // Sapper
            736, // Sapper
            737, // Construction PDA
            851, // AWPer Hand
            880, // Freedom Staff
            933, // Ap-Sap
            939, // Bat Outta Hell
            947, // Quäckenbirdt
            1013, // Ham Shank
            1152, // Grappling Hook
            30474 // Nostromo Napalmer
        ];

        return this.raw.schema.items.filter(
            item =>
                !weaponsToExclude.includes(item.defindex) && item.item_quality === 6 && item.craft_class === 'weapon'
        );
    }

    /**
     * Get an array of SKU for craftable weapons by class used for crafting
     * @param {String} charClass Valid input: "Scout", "Soldier", "Pyro", "Demoman", "Heavy", "Engineer", "Medic", "Sniper", "Spy"
     * @return {Array} Array\<string\> (sku) for craftable weapons by class
     */
    getWeaponsForCraftingByClass(charClass) {
        if (
            !['Scout', 'Soldier', 'Pyro', 'Demoman', 'Heavy', 'Engineer', 'Medic', 'Sniper', 'Spy'].includes(charClass)
        ) {
            throw new Error(
                `Entered class "${charClass}" is not a valid character class.` +
                    `\nValid character classes (case sensitive): "Scout", "Soldier", "Pyro", "Demoman", "Heavy", "Engineer", "Medic", "Sniper", "Spy".`
            );
        }

        return this.getCraftableWeaponsSchema()
            .filter(item => item.used_by_classes.includes(charClass))
            .map(item => `${item.defindex};6`);
    }

    /**
     * Get an array of SKU for Craftable weapons used for trading
     * @return {Array} Array\<string\> (sku) for Craftable weapons, including weapons from Jungle Inferno update
     */
    getCraftableWeaponsForTrading() {
        return this.getCraftableWeaponsSchema()
            .map(item => `${item.defindex};6`)
            .concat([1178, 1179, 1180, 1181, 1190].map(def => `${def};6`));
    }

    /**
     * Get an array of SKU for Non-Craftable weapons used for trading
     * @return {Array} Array\<string\> (sku) for Non-Craftable weapons,
     * excluding Non-Craftable Sharpened Volcano Fragment and Non-Craftable Sun-on-a-Stick
     */
    getUncraftableWeaponsForTrading() {
        return this.getCraftableWeaponsSchema()
            .filter(item => ![348, 349].includes(item.defindex))
            .map(item => `${item.defindex};6;uncraftable`);
    }

    getCrateSeriesList() {
        let items = this.raw.schema.items;
        const itemsCount = items.length;

        const crateseries = {};
        Loop1: for (let i = 0; i < itemsCount; i++) {
            if (items[i].attributes) {
                const attributes = items[i].attributes;
                const attrCount = attributes.length;
                Loop2: for (let j = 0; j < attrCount; j++) {
                    if (attributes[j].name === 'set supply crate series') {
                        crateseries[items[i].defindex] = attributes[j].value;
                        break Loop2;
                    }
                }
            }
            continue Loop1;
        }

        items = this.raw.items_game.items;
        const defindexes = Object.keys(items);
        const count = defindexes.length;

        for (let i = 0; i < count; i++) {
            const seriesAttribute = items[defindexes[i]]?.static_attrs?.['set supply crate series'];
            if (seriesAttribute) {
                crateseries[defindexes[i]] = Number(seriesAttribute?.value || seriesAttribute);
            }
        }

        items = undefined;
        return crateseries;
    }

    updateCrateSeriesList() {
        this.crateSeriesList = this.getCrateSeriesList();
    }

    checkExistence(item) {
        const schemaItem = this.getItemByDefindex(item.defindex);
        if (schemaItem === null) {
            return false;
        }

        // Items with default quality

        if ([0, 3, 5, 11].includes(schemaItem.item_quality)) {
            // default Normal (Stock items), Vintage (1156), Unusual (266, 267), and Strange (655) items
            if (item.quality !== schemaItem.item_quality) {
                return false;
            }
        }

        // Exclusive Genuine items

        if (
            (item.quality !== 1 && exclusiveGenuineReversed.has(item.defindex)) ||
            (item.quality === 1 && exclusiveGenuine.has(item.defindex))
        ) {
            // if quality not 1 AND item.defindex is the one that should be Genuine only, OR
            // if quality is 1 AND item.defindex is the one that can be any quality, return null.
            return false;
        }

        // Retired keys

        if (retiredKeys[String(item.defindex)] !== undefined) {
            if ([5713, 5716, 5717, 5762].includes(item.defindex)) {
                if (item.craftable === true) {
                    return false;
                }
            } else if (![5791, 5792].includes(item.defindex)) {
                if (item.craftable === false) {
                    return false;
                }
            }
        }

        // Crates/Cases

        function haveOtherAttributeForCrateOrCase() {
            return (
                item.quality !== 6 ||
                item.killstreak !== 0 ||
                item.australium !== false ||
                item.effect !== null ||
                item.festive !== false ||
                item.paintkit !== null ||
                item.wear !== null ||
                item.quality2 !== null ||
                item.craftnumber !== null ||
                item.target !== null ||
                item.output !== null ||
                item.outputQuality !== null ||
                item.paint !== null
            );
        }

        if (schemaItem.item_class === 'supply_crate' && item.crateseries === null) {
            if (![5739, 5760, 5737, 5738].includes(item.defindex)) {
                // If not seriesless, return false
                // Mann Co. Director's Cut Reel, Mann Co. Audition Reel, and Mann Co. Stockpile Crate,
                return false;
            }

            // Unlocked Creepy 5763, 5764, 5765, 5766, 5767, 5768, 5769, 5770, 5771
            // Unlocked Crates 5850, 5851, 5852, 5853, 5854, 5855, 5856, 5857, 5858, 5860

            if (haveOtherAttributeForCrateOrCase()) {
                return false;
            }
        }

        if (item.crateseries) {
            // Run a check if the input item is actually exist or not for crates/cases
            if (haveOtherAttributeForCrateOrCase()) {
                return false;
            }

            if (schemaItem.item_class !== 'supply_crate') {
                // Not a crate or case
                return false;
            } else if (
                ![
                    1, 3, 7, 12, 13, 18, 19, 23, 26, 31, 34, 39, 43, 47, 54, 57, 75, 2, 4, 8, 11, 14, 17, 20, 24, 27,
                    32, 37, 42, 44, 49, 56, 71, 76, 5, 9, 10, 15, 16, 21, 25, 28, 29, 33, 38, 41, 45, 55, 59, 77, 30,
                    40, 50, 82, 83, 84, 85, 90, 91, 92, 103
                ].includes(item.crateseries)
            ) {
                // if item.crateseries not included in the single defindex multiple series crate:

                if (!Object.values(this.crateSeriesList).includes(item.crateseries)) {
                    // if item.crateseries is not included in the crateSeriesList, does not exist.
                    return false;
                }

                // Check for specific crates/cases
                if (item.crateseries !== this.crateSeriesList[item.defindex]) {
                    return false;
                }
            } else if (
                !(
                    ([1, 3, 7, 12, 13, 18, 19, 23, 26, 31, 34, 39, 43, 47, 54, 57, 75].includes(item.crateseries) &&
                        item.defindex === 5022) ||
                    ([2, 4, 8, 11, 14, 17, 20, 24, 27, 32, 37, 42, 44, 49, 56, 71, 76].includes(item.crateseries) &&
                        item.defindex === 5041) ||
                    ([5, 9, 10, 15, 16, 21, 25, 28, 29, 33, 38, 41, 45, 55, 59, 77].includes(item.crateseries) &&
                        item.defindex === 5045) ||
                    ([30, 40, 50].includes(item.crateseries) && item.defindex === 5068) ||
                    (munitionCrate.has(item.crateseries) && item.defindex === munitionCrate.get(item.crateseries))
                )
            ) {
                // if single defindex multiple series crate don't match, does not exist.
                return false;
            }
        }

        return true;
    }

    /**
     * Gets the name of an item with specific attributes
     * @param {Object} item
     * @param {Number} item.defindex
     * @param {Number} item.quality
     * @param {Boolean} [item.craftable]
     * @param {Boolean} [item.tradable]
     * @param {Number} [item.killstreak]
     * @param {Boolean} [item.australium]
     * @param {Number} [item.effect]
     * @param {Boolean} [item.festive]
     * @param {Boolean} [item.paintkit]
     * @param {Boolean} [item.wear]
     * @param {Boolean} [item.quality2]
     * @param {Number} [item.craftnumber]
     * @param {Number} [item.crateseries]
     * @param {Number} [item.target]
     * @param {Number} [item.output]
     * @param {Number} [item.outputQuality]
     * @param {Number} [item.paint]
     * @param {Boolean} [proper = true] Use proper name when true (adds "The" if proper_name in schema is true)
     * @return {String}
     */
    getName(item, proper = true, usePipeForSkin) {
        const schemaItem = this.getItemByDefindex(item.defindex);
        if (schemaItem === null) {
            return null;
        }

        let name = '';

        if (item.tradable === false) {
            name = 'Non-Tradable ';
        }

        if (item.craftable === false) {
            name += 'Non-Craftable ';
        }

        if (item.quality2) {
            // Elevated quality
            name += this.getQualityById(item.quality2) + ' ';
        }

        if (
            (item.quality === 6 && item.quality2) ||
            (item.quality !== 6 && item.quality !== 15 && item.quality !== 5) ||
            (item.quality === 5 && !item.effect) ||
            schemaItem.item_quality == 5
        ) {
            // If the quality is Unique (and is Elevated quality), or not Unique, Decorated, or Unusual, or if the quality is Unusual but it does not have an effect, or if the item can only be unusual, then add the quality
            name += this.getQualityById(item.quality) + ' ';
        }

        if (item.effect) {
            name += this.getEffectById(item.effect) + ' ';
        }

        if (item.festive === true) {
            name += 'Festivized ';
        }

        if (item.killstreak && item.killstreak > 0) {
            name += ['Killstreak', 'Specialized Killstreak', 'Professional Killstreak'][item.killstreak - 1] + ' ';
        }

        if (item.target) {
            name += this.getItemByDefindex(item.target).item_name + ' ';
        }

        if (item.outputQuality && item.outputQuality !== 6) {
            name = this.getQualityById(item.outputQuality) + ' ' + name;
        }

        if (item.output) {
            name += this.getItemByDefindex(item.output).item_name + ' ';
        }

        if (item.australium === true) {
            name += 'Australium ';
        }

        if (typeof item.paintkit === 'number') {
            name += this.getSkinById(item.paintkit) + (usePipeForSkin ? ' | ' : ' ');
        }

        if (proper === true && name === '' && schemaItem.proper_name == true) {
            name = 'The ';
        }

        if (retiredKeys[String(item.defindex)] !== undefined) {
            name += retiredKeys[String(item.defindex)].name;
        } else {
            name += schemaItem.item_name;
        }

        if (item.wear) {
            name +=
                ' (' +
                ['Factory New', 'Minimal Wear', 'Field-Tested', 'Well-Worn', 'Battle Scarred'][item.wear - 1] +
                ')';
        }

        if (item.crateseries) {
            name += ' #' + item.crateseries;
        } else if (item.craftnumber) {
            name += ' #' + item.craftnumber;
        }

        if (item.paint) {
            name += ` (Paint: ${this.getPaintNameByDecimal(item.paint)})`;
        }

        return name;
    }

    /**
     * Gets schema overview
     * @param {String} apiKey
     * @param {Function} callback
     */
    static getOverview(apiKey, callback) {
        webAPI(
            'GET',
            'GetSchemaOverview',
            'v0001',
            {
                key: apiKey,
                language: language
            },
            undefined,
            function (err, result) {
                if (err) {
                    return callback(err);
                }

                return callback(null, result);
            }
        );
    }

    /**
     * Gets schema items
     * @param {String} apiKey
     * @param {Function} callback
     */
    static getItems(apiKey, callback) {
        getAllSchemaItems(apiKey, callback);
    }

    /**
     * Gets skins / paintkits from TF2 protodefs
     * @param {Function} callback
     */
    static getPaintKits(callback) {
        axios
            .get(
                'https://raw.githubusercontent.com/SteamDatabase/GameTracking-TF2/master/tf/resource/tf_proto_obj_defs_english.txt'
            )
            .then(response => {
                const body = response.data;
                const parsed = vdf.parse(body);

                const protodefs = parsed['lang'].Tokens;

                const paintkits = [];

                for (const protodef in protodefs) {
                    if (!Object.prototype.hasOwnProperty.call(protodefs, protodef)) {
                        continue;
                    }

                    const parts = protodef.slice(0, protodef.indexOf(' ')).split('_');
                    if (parts.length !== 3) {
                        continue;
                    }

                    const type = parts[0];
                    if (type !== '9') {
                        continue;
                    }

                    const def = parts[1];
                    const name = protodefs[protodef];

                    if (name.startsWith(def + ':')) {
                        continue;
                    }

                    paintkits.push({
                        id: def,
                        name: name
                    });
                }

                paintkits.sort(function (a, b) {
                    return a.id - b.id;
                });

                const paintkitObj = {};
                const paintkitsCount = paintkits.length;

                for (let i = 0; i < paintkitsCount; i++) {
                    const paintkit = paintkits[i];
                    const paintKitName = paintkit.name;
                    if (!Object.values(paintkitObj).includes(paintKitName)) {
                        paintkitObj[paintkit.id] = paintKitName;
                    }
                }

                return callback(null, paintkitObj);
            })
            .catch(err => {
                return callback(err);
            });
    }

    static getItemsGame(callback) {
        axios
            .get(
                'https://raw.githubusercontent.com/SteamDatabase/GameTracking-TF2/master/tf/scripts/items/items_game.txt'
            )
            .then(response => {
                return callback(null, vdf.parse(response.data).items_game);
            })
            .catch(err => {
                return callback(err);
            });
    }

    /**
     * Creates data object used for initializing class
     * @return {Object}
     */
    toJSON() {
        return {
            version: this.version,
            time: this.time,
            raw: this.raw
        };
    }
}

/**
 * Recursive function that requests all schema items
 * @param {String} apiKey
 * @param {Number} next
 * @param {Array} items
 * @param {Function} callback
 */
function getAllSchemaItems(apiKey, next, items, callback) {
    if (callback === undefined) {
        callback = next;
        next = 0;
    }

    const params = {
        language: language,
        key: apiKey,
        start: next
    };

    webAPI('GET', 'GetSchemaItems', 'v0001', params, undefined, function (err, result) {
        if (err) {
            return callback(err);
        }

        items = (items || []).concat(result.items);

        if (result.next !== undefined) {
            getAllSchemaItems(apiKey, result.next, items, callback);
        } else {
            callback(null, items);
        }
    });
}

module.exports = Schema;
