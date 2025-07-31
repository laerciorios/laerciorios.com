module.exports = {
  parser: "@typescript-eslint/parser",
  env: {
    browser: true,
    es2021: true,
    node: true,
    "cypress/globals": true,
  },
  plugins: [
    "react",
    "prettier",
    "@typescript-eslint",
    "cypress",
    "chai-friendly",
    "no-only-tests",
    "eslint-plugin-import-helpers",
  ],
  extends: [
    "eslint:recommended",
    "next",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:chai-friendly/recommended",
    "plugin:cypress/recommended",
    "plugin:prettier/recommended",
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  settings: {
    react: {
      version: "detect",
    },
    "import/resolver": {
      typescript: {},
    },
  },
  ignorePatterns: ["node_modules/"],
  rules: {
    "no-only-tests/no-only-tests": "error",
    "no-console": ["error", { allow: ["warn", "error"] }],
    "react/no-unknown-property": ["error", { ignore: ["jsx", "global"] }],
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
    "import/no-unresolved": "error",
    "import/prefer-default-export": "off",
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never",
      },
    ],
    "import-helpers/order-imports": [
      "warn",
      {
        newlinesBetween: "always",
        groups: ["module", "/^@/", ["parent", "sibling", "index"]],
        alphabetize: {
          order: "asc",
          ignoreCase: true,
        },
      },
    ],
    "import/no-extraneous-dependencies": [
      "error",
      {
        devDependencies: ["**/*.spec.ts", "**/*.spec.js", "jest.config.ts"],
      },
    ],
  },
};
