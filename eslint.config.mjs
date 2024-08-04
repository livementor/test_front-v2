// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt(
    {
        rules: {
            "@stylistic/semi": ["error", "always"],
            "@stylistic/indent": ["error", 4],
            "@stylistic/quotes": ["error", "double"],
            "@stylistic/arrow-spacing": ["error", { before: false, after: false }],
            "@stylistic/type-annotation-spacing": ["error", { before: false, after: false }],
            "@stylistic/key-spacing": ["error", { beforeColon: false, afterColon: true }],
            "vue/html-indent": ["error", 4],
        },
    },
);
