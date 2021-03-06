#!/bin/bash

# Generate build output for deploy environment
echo Starting Alexa Skill Build

# get rid of the old dist folder
rm -rf ./dist

# npm install
yarn

# transpile typescript to js (into ./dist subfolder)
yarn build

# copy package.json to dist
cp package.json ./dist

# copy node_modules to dist
cp -R node_modules dist/node_modules/

# zip the files
echo Creating 
cd ./dist
zip -r dist.zip .


echo "Build Finished. Look for dist.zip in the dist folder if you are wanting to push it out live!"