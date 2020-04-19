module.exports = {
    "parser": "babel-eslint",
    "env": {
        "browser": true,
        "es6": true,
        "node": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true
        },
        "sourceType": "module",
        "ecmaVersion": 6,
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ],
        "comma-dangle": [
            "error", 
            "always-multiline",
        ],
        "no-console": [
            1,
            { allow: ["error"] },
        ],
        "prefer-destructuring": [
            "error", {
                "array": true,
                "object": true
            }, 
            {
                "enforceForRenamedProperties": false
            }
        ]
    },
    "settings": {
        "react": {
            "version": "detect",
        }
    },
};