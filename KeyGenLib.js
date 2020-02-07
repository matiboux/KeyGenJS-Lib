﻿/*\
|*|  ---------------------------
|*|  --- [  KeyGenLib.js  ] ---
|*|  --- [   BETA: 0.2.0   ] ---
|*|  ---------------------------
|*|
|*|  KeyGenLib.js is an open source password generator JavaScript library.
|*|
|*|  Copyright (C) 2017 Matiboux (Mathieu Guérin)
|*|  You'll find a copy of the MIT LICENSE in the LICENSE file.
|*|  Please see the README.md file for more infos!
|*|
|*|  --- --- ---
|*|
|*|  Developer: Matiboux (Mathieu Guérin)
|*|
|*|  --- --- ---
|*|
|*|  (ORIGINAL PROJECT) KeyGen: Created on July 30th, 2014
|*|    Github repository: https://github.com/matiboux/KeyGen
|*|
|*|  Releases date:
|*|    BETA: January 1st, 2017
|*|    * Initial development phase
|*|    * [version 0.1]:
|*|              (0.1.0): January 12th, 2017
|*|    * [version 0.2]:
|*|              (0.2.0): ...
\*/

class KeygenLib {

    // *** Public fields & properties

    // Keygen generation parameters
    parameters = {
        numeric: true,
        lowercase: true,
        uppercase: true,
        special: false,
        length: 12,
        redundancy: false
    };

    // *** Private fields & properties

    // The current KeyGen Lib version
    #_version = "0.2.0";
    get version() {
        return this.#_version;
    }

    // Allowed Characters Sets
    #_characterSets = {
        numeric: "1234567890",
        lowercase: "abcdefghijklmnopqrstuvwxyz",
        uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        special: "!#$%&\\()+-;?@[]^_{|}"
    };
    get characterSets() {
        return this.#_characterSets;
    }

    // Archived state for last used parameters
    #_lastUsedParameters = this.parameters;
    get lastUsedParameters() {
        return this.#_lastUsedParameters;
    }

    // Error information
    #_errorInfo = {
        code: 0,
        message: "No error"
    };
    get errorInfo() {
        return this.#_errorInfo;
    }

    // *** Methods

    // Set Keygen generation parameters
    setParameters(numeric, lowercase, uppercase, special, length, redundancy) {
        if (typeof numeric === 'object') {
            const parameters = numeric;

            numeric = parameters.numeric;
            lowercase = parameters.lowercase;
            uppercase = parameters.uppercase;
            special = parameters.special;
            length = parameters.length;
            redundancy = parameters.redundancy;
        }

        this.parameters.numeric = !!numeric;
        this.parameters.lowercase = !!lowercase;
        this.parameters.uppercase = !!uppercase;
        this.parameters.special = !!special;
        this.parameters.length = length;
        this.parameters.redundancy = !!redundancy;
    }

    // Generate a Keygen
    generateKeygen() {
        let charactersAllowed = "";
        if (this.parameters.numeric) charactersAllowed += this.#_characterSets.numeric;
        if (this.parameters.lowercase) charactersAllowed += this.#_characterSets.lowercase;
        if (this.parameters.uppercase) charactersAllowed += this.#_characterSets.uppercase;
        if (this.parameters.special) charactersAllowed += this.#_characterSets.special;

        if (charactersAllowed === "") {
            this.#_errorInfo = {
                code: 1,
                message: 'charactersAllowed string empty'
            };
            return false;
        }
        if (this.parameters.length === "" || this.parameters.length <= 0) {
            this.#_errorInfo = {
                code: 2,
                message: 'length empty or negative'
            };
            return false;
        }

        if (!this.parameters.redundancy && this.parameters.length > charactersAllowed.length) KeygenLib._parameters.redundancy = true;

        let keygen = "";
        while (keygen.length < this.parameters.length) {
            //var randomCharacter = substr(charactersAllowed, mt_rand(0, charactersAllowed.length - 1), 1);
            const randomCharacter = charactersAllowed[this.randomNumber(0, charactersAllowed.length - 1)];

            if (this.parameters.redundancy || keygen.indexOf(randomCharacter) < 0)
                keygen += randomCharacter;
        }

        if (keygen === "") {
            this.#_errorInfo = {
                code: '03',
                message: 'Generated keygen empty'
            };
            return false;
        }

        this.#_errorInfo = {
            code: '00',
            message: 'No error'
        };
        this.#_lastUsedParameters = this.parameters;
        return keygen;
    }

    // Generate a random int number
    randomNumber(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

module.exports = KeygenLib;