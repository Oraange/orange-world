// .eslintrc.js
module.exports = {
  env: {
    node: true,
  },
  extends: [
    "eslint:recommended",
    "@vue/typescript/recommended",
    "plugin:vue/vue3-recommended",
    "@vue/prettier",
    "@vue/prettier/@typescript-eslint",
  ],
  globals: {
    defineProps: "readonly",
    defineEmits: "readonly",
    defineExpose: "readonly",
    withDefaults: "readonly",
  },

  rules: {
    semi: ["error", "never"],
  },
};
