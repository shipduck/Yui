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
	$(BIN)/istanbul instrument --output $(INSTRUMENTATION_OUTPUT) --no-compact	\
	--variable global.__coverage__ lib

# run tests with instrumented code
coverage: instrument
	@ISTANBUL_REPORTERS=html,text-summary,cobertura EXPRESS_COV=1 \
	$(BIN)/mocha --bail --reporter mocha-istanbul $(UNIT_TESTS)
	$(MAKE) move-reports

complexity:
	mkdir -p reports
	$(BIN)/cr -f xml -o reports/complexity.xml lib

move-reports:
	-mkdir -p reports
	-mv cobertura-coverage.xml reports
	-cp -r html-report reports/
	-rm -rf html-report

clean-coverage:
	-rm -rf $(INSTRUMENTATION_OUTPUT)
	-rm -rf $(REPORTS)

publish:
	mkdir -p publish
	bower install
