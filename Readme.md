
# Express - Hogan.js adapter

 Enables use of Hogan.js templates in Express framework

## Installation

    $ npm install express-hogan.js

## Quick Start

    $ npm install express-hogan.js
    $ cd node_modules/express-hogan.js

  Install express

    $ npm install express

  Start test app:

    $ node testapp.js

## Usage
    
    // include Express-hogan
    var expressHogan = require('express-hogan.js');

    // register templating
    app.register('.html', expressHogan);

    // more can be found in testapp.js
