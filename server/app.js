import express from 'express';
import path from 'path';
import fs from 'fs';
import debug from 'debug';

const wayfarer = express();
const infoLog = debug('http:info');
const errorLog = debug('http:error');
const port = process.env.PORT || 7000;

wayfarer.listen(port);
infoLog(`started server at port ${port}`);

// dynamically loads different API versions
wayfarer.use((req, res, next) => {
    // regular expression to get the version number from the url
    let version = req.url.match(/\/api\/(v[0-9]+).*/) || [];
    version = version[1] || '';
    if (version !== '') {
    // absolute path to the api directory
        const appPath = path.join(__dirname, `./api/${version}/index.js`);
        if (!fs.existsSync(appPath)) {
            errorLog(`file path does not exist :(${appPath})`);
            return res.status(404).json({
                status: 404,
                message: 'Sorry, we cant find this endpoint',
            });
        }
        /* eslint-disable-next-line global-require, import/no-dynamic-require */
        require(appPath).default(wayfarer);// pass an instance of express to api version entry point
    }
    next();
});

export default wayfarer;
