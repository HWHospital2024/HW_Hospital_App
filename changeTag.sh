#!/bin/bash
sed "s/tagVersion/$1/g" deployment.yaml > node-deployment.yml