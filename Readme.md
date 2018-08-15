Frontend for [kryptokongen.com](http://kryptokongen.com)

## Frontend
* Vue.js
* HTML5/CSS3/ES6

## Infrascructure & Backend
* AWS Cloudfront
* AWS S3
* AWS Api gateway
* AWS Lambda

## Motivation
Based off an interest to learn Vue.js and serverless architecture, i decided to build a very simple web-app and api. The underlying infrastructure for the web-app is very over-engineered. Static files are stored on S3 and distributed with Cloudfront. The api is constructed with API-gateway, which forwards requests to api.kryptokongen.com to lambda functions based on the specified path.
