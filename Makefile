install: 
	npm ci
test:
	npm test
lint:
	npx eslint .
publish:
	npm publish
test-coverage:
	npm test -- --coverage --coverageProvider=v8

