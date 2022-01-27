#!/usr/bin/env bash

# Migrate the database
node ./src/db/init.js

# Run the server
node ./src/server.js 
