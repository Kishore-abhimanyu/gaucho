"use strict";

const Store = require('electron-store');
const utils = require('./utils');
const defaultTasks = require('./default_tasks');

const FIELDS = {
    WINDOW_SIZE: "windowSize",
    DEVTOOLS_SIZE: "devToolsSize",
    MAXIMIZED: "maximized"
};

const defaultUserConfig = {
    windowSize: [500, 600],
    devToolsSize: 300,
    outputMaxSize: 10000,
    maximized: false,
    bottomBar: true,
    showTimer: true,
    theme: "classic",
    checkUpdates: true
};

// Just for basic offuscation of the config file
const defaultKey = "ro64wz3l7d";

class AppConfig {
    constructor(configName, key, defaultData = {}) {
        if (utils.isDevEnv()) configName += "_dev";
        if (utils.isTestEnv()) {
            this.store = new Map(Object.entries(defaultData));
        } else {
            this.store = new Store({
                name: configName,
                defaults: defaultData,
                encryptionKey: key
            });
        }
    }

    set(key, value) {
        this.store.set(key, value);
    }

    get(key) {
        return this.store.get(key);
    }
}

class UserConfig extends AppConfig {
    constructor() {
        super("gaucho_config", defaultKey, defaultUserConfig);
    }
}
class TasksConfig extends AppConfig {
    constructor() {
        super("gaucho_tasks", defaultKey, defaultTasks);
    }
}

module.exports = {
    FIELDS,
    User: UserConfig,
    Tasks: TasksConfig
};
