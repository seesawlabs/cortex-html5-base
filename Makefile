SHELL := /bin/bash

lint:
	./node_modules/.bin/eslint src

clean:
	rm -rf ./build

dev: clean lint
	npm run dev

build: clean
	npm run prod

watch: clean lint
	npm run watch

pack:
	mkdir -p ./dist
	pushd ./build && \
	zip -r app_`date -u +"%Y-%m-%dT%H:%M:%SZ"`.zip * && \
	cp app_*.zip ../dist && \
	popd

dist: clean build pack
