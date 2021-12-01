module.exports = {
	collectCoverageFrom: ['src/**/*.ts'],
	coverageThreshold: {
		global: {
			branches: 10,
			functions: 10,
			lines: 10,
			statements: 10,
		},
	},
	moduleNameMapper: {
		'^src/(.*)$': '<rootDir>/src/$1',
	},
	preset: 'ts-jest',
	testEnvironment: 'node',
};
