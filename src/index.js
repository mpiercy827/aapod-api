'use strict';

const Config = require('../config');

const Server = require('./server');

Server.start()
.then(() => { console.log(`Server started on port: ${Config.PORT}`) });
