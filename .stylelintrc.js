module.exports = {
  extends: ['stylelint-config-recommended', 'stylelint-config-recommended-scss', 'stylelint-config-html', 'stylelint-config-sass-guidelines'],
  plugins: ['stylelint-scss'],
  rules: {
    'selector-class-pattern': null,
    'selector-no-qualifying-type': [ true, { ignore: ["attribute", "class", "id"] }],
    'max-nesting-depth': 5,
  },

};
