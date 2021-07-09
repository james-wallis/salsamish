const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const cookieParser = require('cookie-parser');
const { validateProcessEnvs } = require('./modules/utils');
const { setupMongoose } = require('./modules/mongo');
const withAuth = require('./middleware/authentication');

const buildDir = path.join(__dirname, './build');

const { PORT, NODE_ENV } = process.env;
const main = async() => {
    validateProcessEnvs();
    await setupMongoose();

    // Middleware
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cookieParser());

    // Express Routes
    app.use('/api/auth', require('./routes/auth'));
    app.use('/api/user', require('./routes/user'));
    app.use('/api/employees', withAuth, require('./routes/employees'));
    app.use('/api/events', withAuth, require('./routes/events'));

    const port = PORT || 3001;

    // In production there is the need to serve the React files.
    if (NODE_ENV === 'production') {
    // Serve any static files
        app.use(express.static(buildDir));

        // Handle React routing, return all requests to React app
        app.get('*', function (req, res) {
            const indexHTML = path.join(buildDir, 'index.html');
            res.sendFile(indexHTML);
        });
    }

    // eslint-disable-next-line no-console
    app.listen(port, () => console.log(`Listening on port ${port}`));
};

main().catch(err => console.error('main', err));