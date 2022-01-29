#!/usr/bin/env bash

# Create the synlink for the database
ln -f ./src/db/config.sqlite.js ./src/db/config.js
ln -f ./src/db/init.sqlite.js ./src/db/init.js

# Migrate the database
node ./src/db/init.js

# Run the server
node ./src/server.js 
