#!/bin/bash
echo "export GO111MODULE=off"
export GO111MODULE=off

echo "export GOPATH"
export GOPATH=~/go

echo "Go getting all Golang libraries...please wait..."
echo "Golang version:"
go version
#echo	"github.com/jaytaylor/html2text"
#go get	"github.com/jaytaylor/html2text"

echo "gorm.io/gorm"
go get "gorm.io/gorm"

echo "gorm.io/driver/sqlite"
go get "gorm.io/driver/sqlite"

echo "done!"
