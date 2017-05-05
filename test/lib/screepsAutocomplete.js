global.ConstructionSite = function() {};

ConstructionSite.prototype = {
    id: "",
    my: true,
    owner: {
        username: ""
    },
    progress: 0,
    progressTotal: 0,
    structureType: "",
    remove: function() {}
};

global.Creep = function() {};

Creep.prototype = {
    body: [],
    carry: {},
    carryCapacity: 0,
    fatigue: 0,
    hits: 0,
    hitsMax: 0,
    id: "",
    memory: {},
    my: true,
    name: "",
    saying: "",
    owner: {
        username: ""
    },
    spawning: false,
    ticksToLive: 0,
    attack: function(target) {},
    attackController: function(target) {},
    build: function(target) {},
    cancelOrder: function(methodName) {},
    claimController: function(target) {},
    dismantle: function(target) {},
    drop: function(resourceType, amount) {},
    getActiveBodyparts: function(type) {},
    harvest: function(target) {},
    heal: function(target) {},
    move: function(direction) {},
    moveByPath: function(path) {},
    moveTo: function(x, y, opts) {},
    notifyWhenAttacked: function(enabled) {},
    pickup: function(target) {},
    rangedAttack: function(target) {},
    rangedHeal: function(target) {},
    rangedMassAttack: function() {},
    repair: function(target) {},
    reserveController: function(target) {},
    say: function(message, public) {},
    suicide: function() {},
    transfer: function(target, resourceType, amount) {},
    upgradeController: function(target) {},
    withdraw: function(target, resourceType, amount) {}
};

global.Flag = function() {};

Flag.prototype = {
    color: "",
    memory: {},
    name: "",
    secondaryColor: "",
    remove: function() {},
    setColor: function(color, secondaryColor) {},
    setPosition: function(x, y) {}
};

global.Game = {
    constructionSites: {},
    cpu: {
        limit: 0,
        tickLimit: 0,
        bucket: 0,
        getUsed: function() {}
    },
    creeps: {},
    flags: {},
    gcl: {
        level: 0,
        progress: 0,
        progressTotal: 0
    },
    map: {
        describeExits: function(roomName) {},
        findExit: function(fromRoom, toRoom, opts) {},
        findRoute: function(fromRoom, toRoom, opts) {},
        getRoomLinearDistance: function(roomName1, roomName2, continuous) {},
        getTerrainAt: function(x, y, roomName) {},
        isRoomAvailable: function(roomName) {}
    },
    market: {
        credits: 0,
        incomingTransactions: [],
        outgoingTransactions: [],
        orders: [],
        calcTransactionCost: function(amount, roomName1, roomName2) {},
        cancelOrder: function(orderId) {},
        changeOrderPrice: function(orderId, newPrice) {},
        createOrder: function(type, resourceType, price, totalAmount, roomName) {},
        deal: function(orderId, amount, yourRoomName) {},
        extendOrder: function(orderId, addAmount) {},
        getAllOrders: function(filter) {},
        getOrderById: function(id) {}
    },
    resources: {},
    rooms: {},
    spawns: {},
    structures: {},
    time: 0,
    getObjectById: function(id) {},
    notify: function(message, groupInterval) {}
};

global.MOVE = "move";

global.WORK = "work";

global.CARRY = "carry";

global.ATTACK = "attack";

global.RANGED_ATTACK = "ranged_attack";

global.TOUGH = "tough";

global.HEAL = "heal";

global.CLAIM = "claim";

global.TOP = 1;

global.TOP_RIGHT = 2;

global.RIGHT = 3;

global.BOTTOM_RIGHT = 4;

global.BOTTOM = 5;

global.BOTTOM_LEFT = 6;

global.LEFT = 7;

global.TOP_LEFT = 8;

global.OK = 0;

global.ERR_NOT_OWNER = -1;

global.ERR_NO_PATH = -2;

global.ERR_NAME_EXISTS = -3;

global.ERR_BUSY = -4;

global.ERR_NOT_FOUND = -5;

global.ERR_NOT_ENOUGH_ENERGY = -6;

global.ERR_NOT_ENOUGH_RESOURCES = -6;

global.ERR_NOT_ENOUGH_EXTENSIONS = -6;

global.ERR_INVALID_TARGET = -7;

global.ERR_FULL = -8;

global.ERR_NOT_IN_RANGE = -9;

global.ERR_INVALID_ARGS = -10;

global.ERR_TIRED = -11;

global.ERR_NO_BODYPART = -12;

global.ERR_RCL_NOT_ENOUGH = -14;

global.ERR_GCL_NOT_ENOUGH = -15;

global.COLOR_RED = 1;

global.COLOR_PURPLE = 2;

global.COLOR_BLUE = 3;

global.COLOR_CYAN = 4;

global.COLOR_GREEN = 5;

global.COLOR_YELLOW = 6;

global.COLOR_ORANGE = 7;

global.COLOR_BROWN = 8;

global.COLOR_GREY = 9;

global.COLOR_WHITE = 10;

global.FIND_EXIT_TOP = 1;

global.FIND_EXIT_RIGHT = 3;

global.FIND_EXIT_BOTTOM = 5;

global.FIND_EXIT_LEFT = 7;

global.FIND_EXIT = 10;

global.FIND_CREEPS = 101;

global.FIND_MY_CREEPS = 102;

global.FIND_HOSTILE_CREEPS = 103;

global.FIND_SOURCES_ACTIVE = 104;

global.FIND_SOURCES = 105;

global.FIND_DROPPED_ENERGY = 106;

global.FIND_DROPPED_RESOURCES = 106;

global.FIND_STRUCTURES = 107;

global.FIND_MY_STRUCTURES = 108;

global.FIND_HOSTILE_STRUCTURES = 109;

global.FIND_FLAGS = 110;

global.FIND_CONSTRUCTION_SITES = 111;

global.FIND_MY_SPAWNS = 112;

global.FIND_HOSTILE_SPAWNS = 113;

global.FIND_MY_CONSTRUCTION_SITES = 114;

global.FIND_HOSTILE_CONSTRUCTION_SITES = 115;

global.FIND_MINERALS = 116;

global.FIND_NUKES = 117;

global.MODE_SIMULATION = "simulation";

global.MODE_SURVIVAL = "survival";

global.MODE_WORLD = "world";

global.MODE_ARENA = "arena";

global.STRUCTURE_EXTENSION = "extension";

global.STRUCTURE_RAMPART = "rampart";

global.STRUCTURE_ROAD = "road";

global.STRUCTURE_SPAWN = "spawn";

global.STRUCTURE_WALL = "constructedWall";

global.STRUCTURE_LINK = "link";

global.STRUCTURE_KEEPER_LAIR = "keeperLair";

global.STRUCTURE_CONTROLLER = "controller";

global.STRUCTURE_STORAGE = "storage";

global.STRUCTURE_TOWER = "tower";

global.STRUCTURE_OBSERVER = "observer";

global.STRUCTURE_POWER_BANK = "powerBank";

global.STRUCTURE_POWER_SPAWN = "powerSpawn";

global.STRUCTURE_PORTAL = "portal";

global.STRUCTURE_EXTRACTOR = "extractor";

global.STRUCTURE_LAB = "lab";

global.STRUCTURE_TERMINAL = "terminal";

global.STRUCTURE_CONTAINER = "container";

global.STRUCTURE_NUKER = "nuker";

global.SUBSCRIPTION_TOKEN = "token";

global.RESOURCE_ENERGY = "energy";

global.RESOURCE_POWER = "power";

global.RESOURCE_HYDROGEN = "H";

global.RESOURCE_OXYGEN = "O";

global.RESOURCE_UTRIUM = "U";

global.RESOURCE_KEANIUM = "K";

global.RESOURCE_LEMERGIUM = "L";

global.RESOURCE_ZYNTHIUM = "Z";

global.RESOURCE_CATALYST = "X";

global.RESOURCE_HYDROXIDE = "OH";

global.RESOURCE_ZYNTHIUM_KEANITE = "ZK";

global.RESOURCE_UTRIUM_LEMERGITE = "UL";

global.RESOURCE_GHODIUM = "G";

global.RESOURCE_UTRIUM_HYDRIDE = "UH";

global.RESOURCE_UTRIUM_OXIDE = "UO";

global.RESOURCE_KEANIUM_HYDRIDE = "KH";

global.RESOURCE_KEANIUM_OXIDE = "KO";

global.RESOURCE_LEMERGIUM_HYDRIDE = "LH";

global.RESOURCE_LEMERGIUM_OXIDE = "LO";

global.RESOURCE_ZYNTHIUM_HYDRIDE = "ZH";

global.RESOURCE_ZYNTHIUM_OXIDE = "ZO";

global.RESOURCE_GHODIUM_HYDRIDE = "GH";

global.RESOURCE_GHODIUM_OXIDE = "GO";

global.RESOURCE_UTRIUM_ACID = "UH2O";

global.RESOURCE_UTRIUM_ALKALIDE = "UHO2";

global.RESOURCE_KEANIUM_ACID = "KH2O";

global.RESOURCE_KEANIUM_ALKALIDE = "KHO2";

global.RESOURCE_LEMERGIUM_ACID = "LH2O";

global.RESOURCE_LEMERGIUM_ALKALIDE = "LHO2";

global.RESOURCE_ZYNTHIUM_ACID = "ZH2O";

global.RESOURCE_ZYNTHIUM_ALKALIDE = "ZHO2";

global.RESOURCE_GHODIUM_ACID = "GH2O";

global.RESOURCE_GHODIUM_ALKALIDE = "GHO2";

global.RESOURCE_CATALYZED_UTRIUM_ACID = "XUH2O";

global.RESOURCE_CATALYZED_UTRIUM_ALKALIDE = "XUHO2";

global.RESOURCE_CATALYZED_KEANIUM_ACID = "XKH2O";

global.RESOURCE_CATALYZED_KEANIUM_ALKALIDE = "XKHO2";

global.RESOURCE_CATALYZED_LEMERGIUM_ACID = "XLH2O";

global.RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE = "XLHO2";

global.RESOURCE_CATALYZED_ZYNTHIUM_ACID = "XZH2O";

global.RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE = "XZHO2";

global.RESOURCE_CATALYZED_GHODIUM_ACID = "XGH2O";

global.RESOURCE_CATALYZED_GHODIUM_ALKALIDE = "XGHO2";

global.REACTIONS = {
    H: {
        O: "OH",
        L: "LH",
        K: "KH",
        U: "UH",
        Z: "ZH",
        G: "GH"
    },
    O: {
        H: "OH",
        L: "LO",
        K: "KO",
        U: "UO",
        Z: "ZO",
        G: "GO"
    },
    Z: {
        K: "ZK",
        H: "ZH",
        O: "ZO"
    },
    L: {
        U: "UL",
        H: "LH",
        O: "LO"
    },
    K: {
        Z: "ZK",
        H: "KH",
        O: "KO"
    },
    G: {
        H: "GH",
        O: "GO"
    },
    U: {
        L: "UL",
        H: "UH",
        O: "UO"
    },
    OH: {
        UH: "UH2O",
        UO: "UHO2",
        ZH: "ZH2O",
        ZO: "ZHO2",
        KH: "KH2O",
        KO: "KHO2",
        LH: "LH2O",
        LO: "LHO2",
        GH: "GH2O",
        GO: "GHO2"
    },
    X: {
        UH2O: "XUH2O",
        UHO2: "XUHO2",
        LH2O: "XLH2O",
        LHO2: "XLHO2",
        KH2O: "XKH2O",
        KHO2: "XKHO2",
        ZH2O: "XZH2O",
        ZHO2: "XZHO2",
        GH2O: "XGH2O",
        GHO2: "XGHO2"
    },
    ZK: {
        UL: "G"
    },
    UL: {
        ZK: "G"
    },
    LH: {
        OH: "LH2O"
    },
    ZH: {
        OH: "ZH2O"
    },
    GH: {
        OH: "GH2O"
    },
    KH: {
        OH: "KH2O"
    },
    UH: {
        OH: "UH2O"
    },
    LO: {
        OH: "LHO2"
    },
    ZO: {
        OH: "ZHO2"
    },
    KO: {
        OH: "KHO2"
    },
    UO: {
        OH: "UHO2"
    },
    GO: {
        OH: "GHO2"
    },
    LH2O: {
        X: "XLH2O"
    },
    KH2O: {
        X: "XKH2O"
    },
    ZH2O: {
        X: "XZH2O"
    },
    UH2O: {
        X: "XUH2O"
    },
    GH2O: {
        X: "XGH2O"
    },
    LHO2: {
        X: "XLHO2"
    },
    UHO2: {
        X: "XUHO2"
    },
    KHO2: {
        X: "XKHO2"
    },
    ZHO2: {
        X: "XZHO2"
    },
    GHO2: {
        X: "XGHO2"
    }
};

global.BOOSTS = {
    work: {
        UO: {
            harvest: 2
        },
        UHO2: {
            harvest: 3
        },
        XUHO2: {
            harvest: 4
        },
        LH: {
            build: 1.3,
            repair: 1.3
        },
        LH2O: {
            build: 1.65,
            repair: 1.65
        },
        XLH2O: {
            build: 2,
            repair: 2
        },
        ZH: {
            dismantle: 2
        },
        ZH2O: {
            dismantle: 3
        },
        XZH2O: {
            dismantle: 4
        },
        GH: {
            upgradeController: 1.3
        },
        GH2O: {
            upgradeController: 1.65
        },
        XGH2O: {
            upgradeController: 2
        }
    },
    attack: {
        UH: {
            attack: 2
        },
        UH2O: {
            attack: 3
        },
        XUH2O: {
            attack: 4
        }
    },
    ranged_attack: {
        KO: {
            rangedAttack: 2,
            rangedMassAttack: 2
        },
        KHO2: {
            rangedAttack: 3,
            rangedMassAttack: 3
        },
        XKHO2: {
            rangedAttack: 4,
            rangedMassAttack: 4
        }
    },
    heal: {
        LO: {
            heal: 2,
            rangedHeal: 2
        },
        LHO2: {
            heal: 3,
            rangedHeal: 3
        },
        XLHO2: {
            heal: 4,
            rangedHeal: 4
        }
    },
    carry: {
        KH: {
            capacity: 2
        },
        KH2O: {
            capacity: 3
        },
        XKH2O: {
            capacity: 4
        }
    },
    move: {
        ZO: {
            fatigue: 2
        },
        ZHO2: {
            fatigue: 3
        },
        XZHO2: {
            fatigue: 4
        }
    },
    tough: {
        GO: {
            damage: .7
        },
        GHO2: {
            damage: .5
        },
        XGHO2: {
            damage: .3
        }
    }
};

global.RESOURCES_ALL = [ RESOURCE_ENERGY, RESOURCE_POWER, RESOURCE_HYDROGEN, RESOURCE_OXYGEN, RESOURCE_UTRIUM, RESOURCE_KEANIUM, RESOURCE_LEMERGIUM, RESOURCE_ZYNTHIUM, RESOURCE_CATALYST, RESOURCE_GHODIUM, RESOURCE_HYDROXIDE, RESOURCE_ZYNTHIUM_KEANITE, RESOURCE_UTRIUM_LEMERGITE, RESOURCE_UTRIUM_HYDRIDE, RESOURCE_UTRIUM_OXIDE, RESOURCE_KEANIUM_HYDRIDE, RESOURCE_KEANIUM_OXIDE, RESOURCE_LEMERGIUM_HYDRIDE, RESOURCE_LEMERGIUM_OXIDE, RESOURCE_ZYNTHIUM_HYDRIDE, RESOURCE_ZYNTHIUM_OXIDE, RESOURCE_GHODIUM_HYDRIDE, RESOURCE_GHODIUM_OXIDE, RESOURCE_UTRIUM_ACID, RESOURCE_UTRIUM_ALKALIDE, RESOURCE_KEANIUM_ACID, RESOURCE_KEANIUM_ALKALIDE, RESOURCE_LEMERGIUM_ACID, RESOURCE_LEMERGIUM_ALKALIDE, RESOURCE_ZYNTHIUM_ACID, RESOURCE_ZYNTHIUM_ALKALIDE, RESOURCE_GHODIUM_ACID, RESOURCE_GHODIUM_ALKALIDE, RESOURCE_CATALYZED_UTRIUM_ACID, RESOURCE_CATALYZED_UTRIUM_ALKALIDE, RESOURCE_CATALYZED_KEANIUM_ACID, RESOURCE_CATALYZED_KEANIUM_ALKALIDE, RESOURCE_CATALYZED_LEMERGIUM_ACID, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE, RESOURCE_CATALYZED_ZYNTHIUM_ACID, RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_GHODIUM_ACID, RESOURCE_CATALYZED_GHODIUM_ALKALIDE ];

global.BODYPARTS_ALL = [ MOVE, WORK, CARRY, ATTACK, RANGED_ATTACK, TOUGH, HEAL, CLAIM ];

global.COLORS_ALL = [ COLOR_RED, COLOR_PURPLE, COLOR_BLUE, COLOR_CYAN, COLOR_GREEN, COLOR_YELLOW, COLOR_ORANGE, COLOR_BROWN, COLOR_GREY, COLOR_WHITE ];

global.BODYPART_COST = {
    move: 50,
    work: 100,
    attack: 80,
    carry: 50,
    heal: 250,
    ranged_attack: 150,
    tough: 10,
    claim: 600
};

global.CREEP_SPAWN_TIME = 3;

global.CREEP_RENEW_RATIO = 1.2;

global.CREEP_LIFE_TIME = 1500;

global.CREEP_CLAIM_LIFE_TIME = 500;

global.CREEP_CORPSE_RATE = .2;

global.OBSTACLE_OBJECT_TYPES = [ "spawn", "creep", "wall", "source", "constructedWall", "extension", "link", "storage", "tower", "observer", "powerSpawn", "powerBank", "lab", "terminal", "nuker" ];

global.ENERGY_REGEN_TIME = 300;

global.ENERGY_DECAY = 1e3;

global.MINERAL_REGEN_TIME = 5e4;

global.MINERAL_MIN_AMOUNT = {
    H: 14e4,
    O: 14e4,
    L: 7e4,
    K: 7e4,
    Z: 7e4,
    U: 7e4,
    X: 7e4
};

global.MINERAL_RANDOM_FACTOR = 2;

global.REPAIR_COST = .01;

global.DISMANTLE_COST = .005;

global.RAMPART_DECAY_AMOUNT = 300;

global.RAMPART_DECAY_TIME = 100;

global.RAMPART_HITS = 1;

global.RAMPART_HITS_MAX = {
    2: 3e5,
    3: 1e6,
    4: 3e6,
    5: 1e7,
    6: 3e7,
    7: 1e8,
    8: 3e8
};

global.SPAWN_HITS = 5e3;

global.SPAWN_ENERGY_START = 300;

global.SPAWN_ENERGY_CAPACITY = 300;

global.SOURCE_ENERGY_CAPACITY = 3e3;

global.SOURCE_ENERGY_NEUTRAL_CAPACITY = 1500;

global.SOURCE_ENERGY_KEEPER_CAPACITY = 4500;

global.ROAD_HITS = 5e3;

global.WALL_HITS = 1;

global.WALL_HITS_MAX = 3e8;

global.EXTENSION_HITS = 1e3;

global.EXTENSION_ENERGY_CAPACITY = {
    0: 50,
    1: 50,
    2: 50,
    3: 50,
    4: 50,
    5: 50,
    6: 50,
    7: 100,
    8: 200
};

global.ROAD_WEAROUT = 1;

global.ROAD_DECAY_AMOUNT = 100;

global.ROAD_DECAY_TIME = 1e3;

global.LINK_HITS = 1e3;

global.LINK_HITS_MAX = 1e3;

global.LINK_CAPACITY = 800;

global.LINK_COOLDOWN = 1;

global.LINK_LOSS_RATIO = .03;

global.CONTAINER_HITS = 25e4;

global.CONTAINER_CAPACITY = 2e3;

global.CONTAINER_DECAY = 5e3;

global.CONTAINER_DECAY_TIME = 100;

global.CONTAINER_DECAY_TIME_OWNED = 500;

global.NUKER_HITS = 1e3;

global.NUKER_COOLDOWN = 1e5;

global.NUKER_ENERGY_CAPACITY = 3e5;

global.NUKER_GHODIUM_CAPACITY = 5e3;

global.NUKE_LAND_TIME = 5e4;

global.NUKE_RANGE = 10;

global.NUKE_DAMAGE = {
    0: 1e7,
    2: 5e6
};

global.PORTAL_DECAY = 3e4;

global.ORDER_SELL = "sell";

global.ORDER_BUY = "buy";

global.STORAGE_CAPACITY = 1e6;

global.STORAGE_HITS = 1e4;

global.CARRY_CAPACITY = 50;

global.HARVEST_POWER = 2;

global.HARVEST_MINERAL_POWER = 1;

global.REPAIR_POWER = 100;

global.DISMANTLE_POWER = 100;

global.BUILD_POWER = 5;

global.ATTACK_POWER = 30;

global.UPGRADE_CONTROLLER_POWER = 1;

global.RANGED_ATTACK_POWER = 10;

global.HEAL_POWER = 12;

global.RANGED_HEAL_POWER = 4;

global.CONSTRUCTION_COST = {
    spawn: 15e3,
    extension: 3e3,
    road: 300,
    constructedWall: 1,
    rampart: 1,
    link: 5e3,
    storage: 3e4,
    tower: 5e3,
    observer: 8e3,
    powerSpawn: 1e5,
    extractor: 5e3,
    lab: 5e4,
    terminal: 1e5,
    container: 5e3,
    nuker: 1e5
};

global.CONSTRUCTION_COST_ROAD_SWAMP_RATIO = 5;

global.CONTROLLER_LEVELS = {
    1: 200,
    2: 45e3,
    3: 135e3,
    4: 405e3,
    5: 1215e3,
    6: 3645e3,
    7: 10935e3
};

global.CONTROLLER_STRUCTURES = {
    spawn: {
        0: 0,
        1: 1,
        2: 1,
        3: 1,
        4: 1,
        5: 1,
        6: 1,
        7: 2,
        8: 3
    },
    extension: {
        0: 0,
        1: 0,
        2: 5,
        3: 10,
        4: 20,
        5: 30,
        6: 40,
        7: 50,
        8: 60
    },
    link: {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 2,
        6: 3,
        7: 4,
        8: 6
    },
    road: {
        0: 2500,
        1: 2500,
        2: 2500,
        3: 2500,
        4: 2500,
        5: 2500,
        6: 2500,
        7: 2500,
        8: 2500
    },
    constructedWall: {
        1: 0,
        2: 2500,
        3: 2500,
        4: 2500,
        5: 2500,
        6: 2500,
        7: 2500,
        8: 2500
    },
    rampart: {
        1: 0,
        2: 2500,
        3: 2500,
        4: 2500,
        5: 2500,
        6: 2500,
        7: 2500,
        8: 2500
    },
    storage: {
        1: 0,
        2: 0,
        3: 0,
        4: 1,
        5: 1,
        6: 1,
        7: 1,
        8: 1
    },
    tower: {
        1: 0,
        2: 0,
        3: 1,
        4: 1,
        5: 1,
        6: 2,
        7: 2,
        8: 4
    },
    observer: {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
        7: 0,
        8: 1
    },
    powerSpawn: {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
        7: 0,
        8: 1
    }
};

global.CONTROLLER_DOWNGRADE = {
    1: 2e4,
    2: 5e4,
    3: 5e4,
    4: 5e4,
    5: 5e4,
    6: 5e4,
    7: 5e4,
    8: 5e4
};

global.CONTROLLER_CLAIM_DOWNGRADE = .2;

global.CONTROLLER_RESERVE = 1;

global.CONTROLLER_RESERVE_MAX = 5e3;

global.CONTROLLER_MAX_UPGRADE_PER_TICK = 15;

global.CONTROLLER_ATTACK_BLOCKED_UPGRADE = 1e3;

global.CONTROLLER_NUKE_BLOCKED_UPGRADE = 200;

global.TERMINAL_CAPACITY = 3e5;

global.TERMINAL_HITS = 3e3;

global.TERMINAL_SEND_COST = .1;

global.TERMINAL_MIN_SEND = 100;

global.TOWER_HITS = 3e3;

global.TOWER_CAPACITY = 1e3;

global.TOWER_ENERGY_COST = 10;

global.TOWER_POWER_ATTACK = 600;

global.TOWER_POWER_HEAL = 400;

global.TOWER_POWER_REPAIR = 800;

global.TOWER_OPTIMAL_RANGE = 5;

global.TOWER_FALLOFF_RANGE = 20;

global.TOWER_FALLOFF = .75;

global.OBSERVER_HITS = 500;

global.OBSERVER_RANGE = 10;

global.POWER_BANK_HITS = 2e6;

global.POWER_BANK_CAPACITY_MAX = 5e3;

global.POWER_BANK_CAPACITY_MIN = 500;

global.POWER_BANK_CAPACITY_CRIT = .3;

global.POWER_BANK_DECAY = 5e3;

global.POWER_BANK_HIT_BACK = .5;

global.POWER_SPAWN_HITS = 5e3;

global.POWER_SPAWN_ENERGY_CAPACITY = 5e3;

global.POWER_SPAWN_POWER_CAPACITY = 100;

global.POWER_SPAWN_ENERGY_RATIO = 50;

global.LAB_HITS = 500;

global.LAB_MINERAL_CAPACITY = 3e3;

global.LAB_ENERGY_CAPACITY = 2e3;

global.LAB_BOOST_ENERGY = 20;

global.LAB_BOOST_MINERAL = 30;

global.LAB_COOLDOWN = 10;

global.GCL_POW = 2.4;

global.GCL_MULTIPLY = 1e6;

global.GCL_NOVICE = 3;

global.TERRAIN_MASK_WALL = 1;

global.TERRAIN_MASK_SWAMP = 2;

global.TERRAIN_MASK_LAVA = 4;

global.MAX_CONSTRUCTION_SITES = 100;

global.MAX_CREEP_SIZE = 50;

global.LOOK_CREEPS = "creep";

global.LOOK_ENERGY = "energy";

global.LOOK_RESOURCES = "resource";

global.LOOK_SOURCES = "source";

global.LOOK_MINERALS = "mineral";

global.LOOK_STRUCTURES = "structure";

global.LOOK_FLAGS = "flag";

global.LOOK_CONSTRUCTION_SITES = "constructionSite";

global.LOOK_NUKES = "nuke";

global.LOOK_TERRAIN = "terrain";

global.SYSTEM_USERNAME = "Screeps";

global.SIGN_NOVICE_AREA = "A new Novice Area is being planned somewhere in this sector. Please make sure all important rooms are reserved.";

global.SIGN_RESPAWN_AREA = "A new Respawn Area is being planned somewhere in this sector. Please make sure all important rooms are reserved.";

global.Memory = {};

global.Mineral = function() {};

Mineral.prototype = {
    mineralAmount: 0,
    mineralType: 0,
    id: "",
    ticksToRegeneration: 0
};

global.Nuke = function() {};

Nuke.prototype = {
    id: "",
    launchRoomName: "",
    timeToLand: 0
};

global.Order = {
    id: "",
    created: 0,
    active: true,
    type: "sell",
    resourceType: "",
    roomName: "",
    amount: 0,
    remainingAmount: 0,
    totalAmount: 0,
    price: 0
};

global.OwnedStructure = function() {};

OwnedStructure.prototype = {
    my: true,
    owner: {
        username: ""
    }
};

global.PathFinder = {
    search: function(origin, goal, opts) {},
    use: function(isEnabled) {}
};

global.PathFinder.CostMatrix = function() {};

global.PathFinder.CostMatrix.deserialize = function(val) {};

PathFinder.CostMatrix.prototype = {
    set: function(x, y, cost) {},
    get: function(x, y) {},
    clone: function() {},
    serialize: function() {}
};

global.RawMemory = function() {};

RawMemory.prototype = {
    get: function() {},
    set: function(value) {}
};

global.Resource = function() {};

Resource.prototype = {
    amount: 0,
    id: "",
    resourceType: ""
};

global.Room = {
    serializePath: function(path) {},
    deserializePath: function(path) {}
};

Room.prototype = {
    controller: null,
    energyAvailable: 0,
    energyCapacityAvailable: 0,
    memory: {},
    mode: "",
    name: "",
    storage: null,
    terminal: null,
    createConstructionSite: function(x, y, structureType) {},
    createFlag: function(x, y, name, color, secondaryColor) {},
    find: function(type, opts) {},
    findExitTo: function(room) {},
    findPath: function(fromPos, toPos, opts) {},
    getPositionAt: function(x, y) {},
    lookAt: function(x, y) {},
    lookAtArea: function(top, left, bottom, right, asArray) {},
    lookForAt: function(type, x, y) {},
    lookForAtArea: function(type, top, left, bottom, right, asArray) {}
};

global.RoomObject = function() {};

RoomObject.prototype = {
    pos: null,
    room: null
};

global.RoomPosition = function(x, y, roomName) {};

RoomPosition.prototype = {
    roomName: "",
    x: 0,
    y: 0,
    createConstructionSite: function(structureType) {},
    createFlag: function(name, color, secondaryColor) {},
    findClosestByPath: function(type, opts) {},
    findClosestByRange: function(type, opts) {},
    findInRange: function(type, range, opts) {},
    findPathTo: function(x, y, opts) {},
    getDirectionTo: function(x, y) {},
    getRangeTo: function(x, y) {},
    inRangeTo: function(x, y, range) {},
    isEqualTo: function(x, y) {},
    isNearTo: function(x, y) {},
    look: function() {},
    lookFor: function(type) {}
};

global.Source = function() {};

Source.prototype = {
    energy: 0,
    energyCapacity: 0,
    id: "",
    ticksToRegeneration: 0
};

global.Structure = function() {};

Structure.prototype = {
    hits: 0,
    hitsMax: 0,
    id: "",
    structureType: "",
    destroy: function() {},
    isActive: function() {},
    notifyWhenAttacked: function(enabled) {}
};

global.StructureContainer = function() {};

StructureContainer.prototype = {
    store: {},
    storeCapacity: 0,
    transfer: function(target, resourceType, amount) {}
};

global.StructureController = function() {};

StructureController.prototype = {
    safeModeCooldown: 0,
    safeModeAvailable: 0,
    safeMode: undefined,
    activateSafeMode: function() {},
    level: 0,
    progress: 0,
    progressTotal: 0,
    reservation: {},
    ticksToDowngrade: 0,
    upgradeBlocked: 0,
    unclaim: function() {}
};

global.StructureExtension = function() {};

StructureExtension.prototype = {
    energy: 0,
    energyCapacity: 0,
    transferEnergy: function(target, amount) {}
};

global.StructureExtractor = function() {};

global.StructureExtractor.prototype = {};

global.StructureKeeperLair = function() {};

StructureKeeperLair.prototype = {
    ticksToSpawn: 0
};

global.StructureLab = function() {};

StructureLab.prototype = {
    cooldown: 0,
    energy: 0,
    energyCapacity: 0,
    mineralAmount: 0,
    mineralType: "",
    mineralCapacity: 0,
    boostCreep: function(creep, bodyPartsCount) {},
    runReaction: function(lab1, lab2) {},
    transfer: function(target, resourceType, amount) {}
};

global.StructureLink = function() {};

StructureLink.prototype = {
    cooldown: 0,
    energy: 0,
    energyCapacity: 0,
    transferEnergy: function(target, amount) {}
};

global.StructureNuker = function() {};

StructureNuker.prototype = {
    energy: 0,
    energyCapacity: 0,
    ghodium: 0,
    ghodiumCapacity: 0,
    cooldown: 0,
    launchNuke: function(pos) {}
};

global.StructureObserver = function() {};

StructureObserver.prototype = {
    observeRoom: function(roomName) {}
};

global.StructurePortal = function() {};

StructurePortal.prototype = {
    destination: null,
    ticksToDecay: 0
};

global.StructurePowerBank = function() {};

StructurePowerBank.prototype = {
    power: 0,
    ticksToDecay: 0
};

global.StructurePowerSpawn = function() {};

StructurePowerSpawn.prototype = {
    energy: 0,
    energyCapacity: 0,
    power: 0,
    powerCapacity: 0,
    createPowerCreep: function(roomName) {},
    processPower: function() {},
    transferEnergy: function(target, amount) {}
};

global.StructureRampart = function() {};

StructureRampart.prototype = {
    ticksToDecay: 0
};

global.StructureRoad = function() {};

StructureRoad.prototype = {
    ticksToDecay: 0
};

global.StructureSpawn = function() {};

global.Spawn = StructureSpawn;

Spawn.prototype = StructureSpawn.prototype;

StructureSpawn.prototype = {
    energy: 0,
    energyCapacity: 0,
    memory: {},
    name: "",
    spawning: null,
    canCreateCreep: function(body, name) {},
    createCreep: function(body, name, memory) {},
    recycleCreep: function(target) {},
    renewCreep: function(target) {},
    transferEnergy: function(target, amount) {}
};

global.StructureStorage = function() {};

StructureStorage.prototype = {
    store: {},
    storeCapacity: 0,
    transfer: function(target, resourceType, amount) {}
};

global.StructureTerminal = function() {};

StructureTerminal.prototype = {
    store: {},
    storeCapacity: 0,
    send: function(resourceType, amount, destination, description) {},
    transfer: function(target, resourceType, amount) {}
};

global.StructureTower = function() {};

StructureTower.prototype = {
    energy: 0,
    energyCapacity: 0,
    attack: function(target) {},
    heal: function(target) {},
    repair: function(target) {},
    transferEnergy: function(target, amount) {}
};

global.StructureWall = function() {};

StructureWall.prototype = {
    ticksToLive: 0
};
