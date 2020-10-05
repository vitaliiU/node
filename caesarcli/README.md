# Caesar cipher CLI tool Manual

## Table of contents

- [General info](#general-info)
- [Technologies](#technologies)
- [Setup](#setup)
- [Using](#using)
- [Comands examples](#comands-examples)
- [Cases using application](#cases-using-application)

## General info

This project Caesar cipher CLI tool implements functionality for encryption/decryption of text using the Caesar Cipher (shift in the alphabet by a given amount "Shift"). For example, if Shift = 2 then word "BE" will be encoded in "DG". Used for English (Latin), numbers, symbols, Cyrillic are not encoded.

## Technologies

Project is created with:

- NodeJS version: 12.18.4
- Commander version: 6.1.0
- Through2 version: 4.0.2

## Setup

To setup this project, first install Node JS v12.18.4, then put project folder (CAESAR CLI) in any directory. After that install it locally using npm:

```
$ npm install

```

## Using

To use this application, open a terminal, go to the project directory (cd .../caesarcli). Next, create two text files in a convenient directory (for example, ".../caesarcli/io") "input.txt" && "outpu.txt". After that, enter the required command in the terminal and press Enter. Application has four possible ways to use below.

### Comands examples:

```
$ node app -a encode -s 3 -i ./io/input.txt -o ./io/output.txt
$ node app -a encode -s 3 -i "./io/input.txt" -o "./io/output.txt"
$ node app --action encode --shift 3 --input ./io/input.txt --output /home/node/Desktop/NodeJS/caesarcli/io/output.txt

```

Where:

- "app" - app.js
- "-a, --action" - an actions encode/decode. Possible values: encode || decode. Mandatory required attribut.
- "-s, --shift" - the amount to shift the characters of the alphabet. Possible values: any negative and positive integers. Mandatory required attribut.
- "-i, --input" - Full or relative path to the file input.txt. Optional attribute
- "-o, --output" - Full or relative path to the file output.txt. Optional attribute

### Cases using application

There are four possible ways to use the application:

#### Case using input file && output files

Text from input.txt are encoding/decoding and are writing to output.txt. Example command:

```
$ node app -a encode -s 3 -i ./io/input.txt -o ./io/output.txt

```

#### Case using only input file

Text from input.txt are encoding/decoding and are writing to terminal. Example command:

```
$ node app -a encode -s 3 -i ./io/input.txt

```

#### Case using only output file

Text from terminal are encoding/decoding and are writing to output.txt. Example command:

```
$ node app -a decode -s 3 -o ./io/output.txt

```

#### Case using only terminal

Text from terminal are encoding/decoding and are writing to terminal. Example command:

```
$ node app -a encode -s 3

```
