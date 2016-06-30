SHELL := /bin/bash

clean:
	rm -rf ./build

dev: clean
	npm run dev

build: clean
	npm run prod

pack:
	mkdir -p ./dist
	pushd ./build && \
	zip -r app_`date -u +"%Y-%m-%dT%H:%M:%SZ"`.zip * && \
	cp app_*.zip ../dist && \
	popd

dist: clean build pack
