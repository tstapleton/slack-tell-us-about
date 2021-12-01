module.exports = {
	collectCoverageFrom: ['src/**/*.ts'],
	coverageThreshold: {
		global: {
			branches: 57,
			functions: 29,
			lines: 34,
			statements: 34,
		},
	},
	moduleNameMapper: {
		'^src/(.*)$': '<rootDir>/src/$1',
	},
	preset: 'ts-jest',
	testEnvironment: 'node',
};
