# Dutch Art Daily

[![Netlify Status](https://api.netlify.com/api/v1/badges/8d4c25ae-740d-4471-b62d-abc6740924ce/deploy-status)](https://app.netlify.com/sites/dutchartdaily/deploys) ![build](https://github.com/patrickcate/dutch-art-daily/workflows/build/badge.svg) [![codecov](https://codecov.io/gh/patrickcate/dutch-art-daily/branch/master/graph/badge.svg)](https://codecov.io/gh/patrickcate/dutch-art-daily) ![GitHub package.json version](https://img.shields.io/github/package-json/v/patrickcate/dutch-art-daily) ![GitHub](https://img.shields.io/github/license/patrickcate/dutch-art-daily)

> A new Dutch Golden Age artwork delivered every day!

## Build Setup

```bash
# install dependencies
yarn install

# serve with hot reload at localhost:3000
yarn dev
# or
yarn serve

# build for production and launch server
yarn build
yarn start

# generate static project
yarn run generate:modern
```

## Generate Photos

The photos of artwork are generated in different sizes for use at different screen sizes. To generate the photos run:

```bash
yarn generate:images
```

Photos will be run through `imagemin` when generated.

## Commit Code

This repo uses commitizen to standardize git commits. To run commitizen run:

```bash
yarn gitcommit
```

and follow to CLI prompts.
