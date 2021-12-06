module.exports = {
	collectCoverageFrom: ['src/**/*.ts'],
	coverageThreshold: {
		global: {
			branches: 41,
			functions: 29,
			lines: 36,
			statements: 35,
		},
	},
	moduleNameMapper: {
		'^src/(.*)$': '<rootDir>/src/$1',
	},
	preset: 'ts-jest',
	testEnvironment: 'node',
};
