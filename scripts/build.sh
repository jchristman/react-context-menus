#!/bin/sh

# build minified standalone version in dist
rm -rf dist
./node_modules/.bin/webpack --output-filename=dist/ContextMenu.js
./node_modules/.bin/webpack --output-filename=dist/ContextMenu.min.js --optimize-minimize

# build ES5 modules to lib
rm -rf lib
babel src --out-dir lib
