#!/bin/bash

rm *.exe~
rm *.exe
rm main.go.deployed
rm my.db
rm my.db.lock
git add --all
git commit -m "$@" 
git push google master
