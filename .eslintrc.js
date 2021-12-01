module.exports = {
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:functional/external-recommended',
		'plugin:functional/no-mutations',
		'prettier',
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: 'tsconfig.json',
	},
	plugins: ['@typescript-eslint', 'functional'],
	root: true,
	rules: {
		'sort-keys': ['error', 'asc', { caseSensitive: false, natural: false }],
	},
};
