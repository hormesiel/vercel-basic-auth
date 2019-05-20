#!/bin/bash

# node
rm -rf node/_static/ \
&& cp -r _static/ node/

# node-express
rm -rf node-express/_static/ \
&& cp -r _static/ node-express/

# node-static-auth
rm -rf node-static-auth/_static/ \
&& cp -r _static/ node-static-auth/
