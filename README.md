### Hexlet tests and linter status:

[![Actions Status](https://github.com/Manuwehi/frontend-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/Manuwehi/frontend-project-46/actions)

<img src="https://api.codeclimate.com/v1/badges/1f674f119438ffbccefb/maintainability" />
<img src="https://api.codeclimate.com/v1/badges/1f674f119438ffbccefb/test_coverage" />

## Description

This is a utility to find the differences between a two files.

Supports working with two files of different formats: json, yaml.
Works with flat and nested structures.
Has various output formats: stylish, plain, json

## Installation

### 1. Clone repository:

    https://github.com/Manuwehi/frontend-project-46.git

### 2. Install dependencies:

    npm install

### 3. Install local packages:

    sudo npm link

## Usage

### to get help:

    gendiff -h  

### to generate differences with default stylish output:

    gendiff <path to file1> <path to file2>

### to plain output:

    gendiff --format plain <path to file1> <path to file2> 

### to json output:

    gendiff --format json <path to file1> <path to file2> 
