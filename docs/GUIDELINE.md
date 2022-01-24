# How to start developing

## Running the tests

1. Copy the [.env.example](.env.example) file to a new file named `.env`. Change the values according to your need.
2. Run `yarn` at the root project.
3. Run `yarn lerna bootstrap` to install dependencies for each subpackages
4. Run `yarn lerna exec yarn test` to run every tests
