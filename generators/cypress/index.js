/**
 * Copyright 2013-2020 the original author or authors from the JHipster project.
 *
 * This file is part of the JHipster project, see https://www.jhipster.tech/
 * for more information.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/* eslint-disable consistent-return */
const BaseBlueprintGenerator = require('../generator-base-blueprint');
const writeFiles = require('./files').writeFiles;
const constants = require('../generator-constants');

let useBlueprints;

module.exports = class extends BaseBlueprintGenerator {
    constructor(args, opts) {
        super(args, opts);

        this.configOptions = this.options.configOptions || {};
        // This adds support for a `--from-cli` flag
        this.option('from-cli', {
            desc: 'Indicates the command is run from JHipster CLI',
            type: Boolean,
            defaults: false,
        });

        useBlueprints = !this.fromBlueprint && this.instantiateBlueprints('e2e', { 'client-hook': !this.skipClient });
    }

    // Public API method used by the getter and also by Blueprints
    _initializing() {
        return {
            validateFromCli() {
                this.checkInvocationFromCLI();
            },
        };
    }

    get initializing() {
        if (useBlueprints) return;
        return this._initializing();
    }

    // Public API method used by the getter and also by Blueprints
    _default() {
        return {
            loadSharedConfig() {
                this.loadAppConfig();
                this.loadClientConfig();
                this.loadServerConfig();
                this.loadTranslationConfig();
            },
            setupConstants() {
                this.BUILD_DIR = this.getBuildDirectoryForBuildTool(this.buildTool);
                this.CLIENT_DIST_DIR = this.getResourceBuildDirectoryForBuildTool(this.buildTool) + constants.CLIENT_DIST_DIR;
            },
        };
    }

    get default() {
        if (useBlueprints) return;
        return this._default();
    }

    // Public API method used by the getter and also by Blueprints
    _writing() {
        return writeFiles();
    }

    get writing() {
        if (useBlueprints) return;
        return this._writing();
    }
};
