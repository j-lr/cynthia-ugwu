module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: "airbnb-base",
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    // Enforce double quotes for strings
    quotes: ["error", "double"],
    "no-plusplus": ["error", { allowForLoopAfterthoughts: true }],

    "import/extensions": [
      "error",
      "ignorePackages", // Ignore packages from npm/yarn
      {
        js: "always", // Allow .js files without extension
      },
    ],
  },
};
