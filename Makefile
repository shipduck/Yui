BIN = ./node_modules/.bin
UNIT_TEST = $(shell find test -name '*-test.js')
INSTRUMENTATION_OUTPUT = lib-cov
REPORTS = reports

xunit:
	mkdir -p reports
	mocha test	\
		--compilers coffee:coffee-script/register	\
		--recursive	\
		-R xunit > reports/js-xunit.xml

instrument: clean-coverage
	$(BIN)/coffeeCoverage lib $(INSTRUMENTATION_OUTPUT)

# run tests with instrumented code
coverage: instrument
	EXPRESS_COV=1	\
	$(BIN)/mocha --reporter mocha-cobertura-reporter --compilers coffee:coffee-script/register $(UNIT_TESTS) > cobertura-coverage.xml
	$(MAKE) move-reports

complexity:
	mkdir -p reports
	$(BIN)/cr -f xml -o reports/complexity.xml lib

move-reports:
	-mkdir -p reports
	-mv cobertura-coverage.xml reports

clean-coverage:
	-rm -rf $(INSTRUMENTATION_OUTPUT)
	-rm -rf $(REPORTS)

publish:
	mkdir -p publish
	bower install
