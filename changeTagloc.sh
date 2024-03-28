#!/bin/bash
sed "s/tagVersion/$1/g" deployment_local.yaml > node-deployment.yml