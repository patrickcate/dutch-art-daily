# Dutch Art Daily

> A new Dutch Golden Age artwork delivered every day!

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
gitcommit
```

and follow to CLI prompts.
