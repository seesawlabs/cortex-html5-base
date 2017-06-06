SHELL := /bin/bash

lint:
	./node_modules/.bin/eslint src

clean:
	rm -rf ./build

dev: clean lint
	npm run dev

build: clean lint
	npm run prod

pack:
	mkdir -p ./dist
	pushd ./build && \
	zip -r transit-uk-`date -u +"%Y-%m-%dT%H:%M:%SZ"`.zip * && \
	cp transit-uk-*.zip ../dist && \
	popd

dist: clean build pack
