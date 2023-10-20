- add tests
  - to run any tests using echo variables, add cross-env as envtune dev dependency
    - {"scripts": {"lala": "cross-env echo $MY_ENV_VARIABLE"}}
- why / benefits
- .env compatibility for secrets
- .envtunerc.ts example
- usage examples
  - basic -e usage, basic usage without custom -f flag requires `.envtunerc.ts` or `.envtunerc.js` file at root
  - -f custom path to file, allows for any filename
  - --verbose
  - infered scripts npm run some-script-in-package.json
  - pass commands without &&, if && will run but not with set env vars

![envtune](./assets/envtuneLogo.drawio.svg)

Define and manage environment variables in a TypeScript file, and seamlessly switch between environments in your scripts.

## Install

Install with npm `npm install envtune` or yarn `yarn add envtune`

## Simple Usage

1. Create a `.envtunerc.ts` file at your project's root with all your environments and environment variables. Here's an example:

```typescript
// .envtunerc.ts
/* This basic example exports two environments: PRODUCTION and DEVELOPMENT, that we can later use to asdlfkjas;ldkfj */

export const PRODUCTION = {
  HOST: "www.example.com",
  PORT: 80,
  GENERATE_SOURCEMAP: false,
  REACT_APP_HTTPS: true,
  REACT_APP_SENTRY_URL: "https://sentry.io/17761337",
  SECRET_SAUCE: process.env.SECRET_PROD,
};

export const DEVELOPMENT = {
  HOST: "localhost",
  PORT: 3000,
  GENERATE_SOURCEMAP: true,
  REACT_APP_HTTPS: false,
  SECRET_SAUCE: process.env.SECRET_DEV,
};
```

## Advanced Configuration

You can configure `envtune` using ...

### Building the Project

To build the project, run the following command:

```bash
npm run build
```

### Running Tests

To run tests, execute:

```bash
npm test
```

## Contributing

Contributions are welcome! See [CONTRIBUTING.md](CONTRIBUTING.md) for more details.

## License

This project is licensed under the ISC License. See [LICENSE.md](LICENSE.md) for details.
