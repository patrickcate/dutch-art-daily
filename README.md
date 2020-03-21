# Dutch Art Daily

> A new Dutch Golden Age artwork delivered every day!

[![Netlify Status](https://api.netlify.com/api/v1/badges/8d4c25ae-740d-4471-b62d-abc6740924ce/deploy-status)](https://app.netlify.com/sites/dutchartdaily/deploys) ![Tests](https://github.com/patrickcate/dutch-art-daily/workflows/Tests/badge.svg) [![codecov](https://codecov.io/gh/patrickcate/dutch-art-daily/branch/master/graph/badge.svg)](https://codecov.io/gh/patrickcate/dutch-art-daily)

## Build Setup

```bash
# install dependencies
yarn install

# serve with hot reload at localhost:3000
yarn run dev

# build for production and launch server
yarn run build
yarn start

# run development server
yarn serve

# generate static project
yarn run generate
```

## Generate Photos

The photos of artwork are generated in different sizes for use at different screen sizes. To generate the photos run:

```bash
yarn generatePhotoData
```

Photos will be run through `imagemin` when generated.

## Commit Code

This repo uses commitizen to standardize git commits. To run commitizen run:

```bash
yarn gitcommit
```

and follow to CLI prompts.
