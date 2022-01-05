# Pendle SDK Contribution Guideline

Last update: 11 Dec 2021 By An Tran

## My approach to TDD:

For a small library, in my opinion there should be two to three test levels:

- _Unit test_: for each and every function or class
- _Module level integration tests_: test the main exports of a given module (subfolders of the src folder).
  - This is optional if the library is small enough.
- _End-to-end tests (or acceptance tests)_: test the main export of the whole library.
  - This level tests the **behaviour** of the SDK toward library consumers.

## Structure

- The src folder is for writing the source code, unit tests and module level integration tests.
- The src file is the main export point of the library.
- The test folder is for writing end-to-end tests
  - Those tests will test what the SDK user will use.
  - Note that those test must only import from the src/types.ts file, because this is the only place that user can reliably import anything from our library.

## Commands

Along with the npm commands provided by tsdx, I have created several extra commands for development:

- `lint`: this command is overrided, because tsdx doesn't provide a stable eslint configuration. May update later.
- `commitlint`: run the commitlint. Included in the commit-msg hook, so you don't need to use this.
- `format`: format the codebase with prettier.
- `test:{unit,e2e}`: run the respective test scope. If we choose the `unit` scope, we will run the _unit tests_ and _integration tests_, which resides in the src folder.
- `test:{unit,e2e}:cov`: run a coverage test on the chosen test scope.
- `test:{unit,e2e}:watch`: re-run the test suite on changes detected.
- `test:{unit,e2e}:debug`: debug run the chosen test scope.
- `test:all`: run all test scopes.
- `test:all:cov`: run a coverage test on all test scope.

## Recommended workflow:

- Reformat your code oftenly. You can run `yarn format` after a while, or set up the `prettier` plugin on your text editor/IDE.
- Lint your code oftenly. You can run `yarn lint` after a while, or set up the `eslint` plugin on your text editor/IDE, which will show you lint errors.
- Test your code as often as you can, or keep the test watch on.
- Ensure your code pass the `test:all:cov` test before pushing. This test ensures that your code is fully tested with 80% coverage.
- Write your commit message in commitlint convention.

## Automatic documentation generation:

We use [typedoc](https://typedoc.org/) to extract doc comments, type information from the source code and compile it into an automated documentation.
This approach ensure Single Source of Truth state of the repo, everything auxiliary data is generated from the code, which helps ease development.

To manually generate and view documentation locally on your development machine:

- Run `yarn typedoc`
- Use a quick webserver like [serve](https://www.npmjs.com/package/serve) to serve up the documentation
