require('dotenv').config({path:'./server/.env'});
require('babel-register');
require('babel-polyfill');
require('./libraries/array');
require('./server');