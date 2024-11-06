import checkFile from "eslint-plugin-check-file";
import globals from "globals";

import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";
import { fixupConfigRules } from '@eslint/compat';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [{
    ignores: ["node_modules/*", "public/mockServiceWorker.js", "generators/*", "src/app/_layout.tsx", "src/app/(tabs)/_layout.tsx"],
}, ...compat.extends("eslint:recommended"), {
    plugins: {
        "check-file": checkFile,
    },

    languageOptions: {
        globals: {
            ...globals.node,
        },

        ecmaVersion: "latest",
        sourceType: "module",
    },
}, ...fixupConfigRules(compat.extends(
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:prettier/recommended",
    "plugin:jest-dom/recommended",
)).map(config => ({
    ...config,
    files: ["**/*.ts", "**/*.tsx"],
})), {
    files: ["**/*.ts", "**/*.tsx"],

    languageOptions: {
        globals: {
            ...globals.browser,
            ...globals.node,
        },

        parser: tsParser,
    },

    settings: {
        react: {
            version: "detect",
        },

        "import/resolver": {
            typescript: {},
        },
        "import/ignore": ["react-native"],
    },

    rules: {
        "import/no-restricted-paths": ["error", {
            zones: [{
                target: "./src/features/auth",
                from: "./src/features",
                except: ["./auth"],
            }, {
                target: "./src/features/dial-in",
                from: "./src/features",
                except: ["./dail-in"],
            }, {
                target: "./src/features/home",
                from: "./src/features",
                except: ["./home"],
            }, {
                target: "./src/features/teams",
                from: "./src/features",
                except: ["./teams"],
            }, {
                target: "./src/features/users",
                from: "./src/features",
                except: ["./users"],
            }, {
                target: "./src/features",
                from: "./src/app",
            }, {
                target: [
                    "./src/constants",
                    "./src/components",
                    "./src/hooks",
                    "./src/lib",
                    "./src/store",
                    "./src/usecase",
                    "./src/util",
                ],

                from: ["./src/features", "./src/app"],
            }],
        }],
        "import/no-cycle": "error",
        "linebreak-style": ["off", "windows"],
        "react/prop-types": "off",
        'endOfLine': 'off',
        "import/order": ["warn", {
            groups: ["builtin", "external", "internal", "parent", "sibling", "index", "object"],
            "newlines-between": "always",

            alphabetize: {
                order: "asc",
                caseInsensitive: true,
            },
        }],
        "import/default": "off",
        "import/no-named-as-default-member": "off",
        "import/no-named-as-default": "off",
        "react/react-in-jsx-scope": "off",
        "jsx-a11y/anchor-is-valid": "off",
        "@typescript-eslint/no-unused-vars": ["warn"],
        "@typescript-eslint/explicit-function-return-type": ["off"],
        "@typescript-eslint/explicit-module-boundary-types": ["off"],
        "@typescript-eslint/no-empty-function": ["off"],
        "@typescript-eslint/no-explicit-any": ["off"],
        "prettier/prettier": ["warn", {}, {
            usePrettierrc: true,
        },],
        "@typescript-eslint/no-require-imports": "off",
        "check-file/filename-naming-convention": ["error", {
            "**/*.{ts,tsx}": "KEBAB_CASE",
        }, {
            ignoreMiddleExtensions: true,
        }],
    },
}, {
    files: ["./**/!(__tests__)/*"],

    plugins: {
        "check-file": checkFile,
    },

    rules: {
        "check-file/folder-naming-convention": ["error", {
            "**/*": "KEBAB_CASE",
        }],
    },
}];