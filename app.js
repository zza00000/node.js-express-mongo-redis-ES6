'use strict';
/***** import node.js librarie *****/
import path from 'path';

/***** import third-party libraries *****/
import express from 'express';
import debugg from 'debug';
import bodyParser from 'body-parser';

/***** import own libraries *****/
import configs from './app/configs';
import router from './app/routes/routes'

const app = express();
let debug = debugg('MERN');

/** app 设置 **/
app
    .set('views', path.join(__dirname, 'app/views/pages'))
    .set('view engine', 'pug')

/** 注册中间件**/
app
    .use(express.static(path.join(__dirname, 'app/public')))
    .use(bodyParser.urlencoded({ extended: false }))
    .use(bodyParser.json())
    .use(router)

if (process.env.NODE_ENV === 'production') {
    debug('Enviroment is product')
} else { //增加错误处理
    app.use((err, req, res, next) => {
        console.log(err.stack);
        next();
    })
    debug('Enviroment is development')
}


app.listen(configs.port, (err) => {
    debug('listen')
    if (err) {
        throw new Error(err);
    }
    console.log('Server start at ' + configs.port);
})