const { generateApi } = require('swagger-typescript-api');
const path = require('path');
const config = require('../config.json');

async function generate() {
    try {
        await generateApi({
            name: 'api.ts',
            output: path.resolve(__dirname, '../src/api'),
            url: config.openapi.url,
            httpClientType: 'axios',
            generateClient: true,
            generateRouteTypes: true,
            generateResponses: true,
            extractRequestParams: true,
            extractRequestBody: true
        });

        console.log('API 生成成功！');
    } catch (error) {
        console.error('API 生成失败：', error);
        process.exit(1);
    }
}

generate();