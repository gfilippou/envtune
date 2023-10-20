![envtune](./assets/envtuneLogo.svg)

Define and manage environment variables in a single entrypoint TypeScript file, and seamlessly switch between environments in your scripts.

## An Environment Variables Manager for Modern Applications

Envtune was created for managing environment variables across different environments (e.g., development, staging, production) in modern Node / TypeScript / JavaScript applications:

- **Single Source of Truth:** Consolidate all your environment variables into a single TypeScript file, making it easy to manage and update them across different environments.
- **Type Safety:** Leverage TypeScript to make environment configuration explicit and clear, and your configuration more robust.
- **Seamless Environment Switching:** With a simple command, switch between entire sets of environment variables, streamlining tasks like deployment or testing in various environments.
- **Extensibility:** Import variables from external files, allowing modular configurations and even programmatic generation of variables.
- **.env Compatibility:** Keep sensitive data in separate .env files and easily reference them in your main config, offering an extra layer of security without sacrificing organization.
- **Scriptable:** Integrate envtune easily into your npm scripts, CI/CD pipelines, or any automation workflow.

## Install

Install with npm `npm install envtune` or yarn `yarn add envtune`

## Simple Usage

1. Install envtune
2. Create a `.envtunerc.ts` file at your project's root with all of your environment definitions and variables. Here's an example:

`.envtunerc.ts`

```typescript
// This basic example exports two environments: prod and dev

import { hosts } from "config.ts"; // can import from external files

export const prod = {
  HOST: "www.example.com",
  PORT: 80,
  GENERATE_SOURCEMAP: false,
  REACT_APP_HTTPS: true,
  REACT_APP_SENTRY_URL: "https://sentry.io/1821_1776",
  SECRET_SAUCE: process.env.SECRET_PROD, // can reference variables from local .env files
  // more variables
};

export const dev = {
  HOST: hosts.local, // can reference variables from external files
  PORT: 3000,
  GENERATE_SOURCEMAP: true,
  REACT_APP_HTTPS: false,
  // more variables
};

// more environments
```

3. Update your package.json scripts to run envtune first, with your environment of choice. Here's an example:

`package.json`

```json
"scripts": {
  "start": "envtune -e dev react-scripts start",
}
```

4. All done! Now when running `npm start` or `yarn start`, the subsequent commands will have access to your selected environment variables. In this basic example the subsequent command is `react-scripts start`, so in your react app you could do:

```tsx
// index.tsx

console.log(process.env.REACT_APP_HTTPS);
// will log true when using argument -e prod
// will log false when using argument -e dev
```

## Advanced Usage

### How Envtune Works

Running `npm run start:dev` for the script `"start:dev": "envtune -e development npm run serve"` will run `npm run serve` with access to the custom environment variables

However, running `npm run start:dev` for the script `"start:dev": "envtune -e development && npm run serve"` will also run both commands, but the chained command `npm run serve` will not have access to the custom environment variables (they will be undefined).

That's because envtune sets the environment variables in the `process.env` object, and then spawns a child process within which it runs any subsequent commands. Since they run in a child process, the subsequent commands passed will have access to the custom environment variables. So when chaining commands using `&&` the custom environment variables will not be available to any chained commands, only to commands subsequent to envtune.

For an example on how to use this functionality, see the `package.json` example in the [Advanced Usage Example](#advanced-usage-example) section. In this case, running `npm run build` or `yarn run build` will work as expected, despite using && to chain commands. The subsequent command to envtune `npm run compile` will have access to the custom environment variables, and produce a compiled file using webpack. Then once the build process exits successfully, the command `npm run optimize` will run to optimize the built version, without having access to the custom environment variables, since it doesn't require so as those are "baked in" to the build.

### Envtune Command Arguments

Envtune can accept the following command arguments:

- `-e <environment_name>`
  - Mandatory argument to define the required environment name
  - This environment must be exported from the `.envtunerc.ts` file
- `-f <custom_path_to_config_file>`
  - Optional argument to define a custom path to the `.envtunerc.ts` config file
  - When the `-f` argument isn't included, envtune expects to find in the project root either an `.envtunerc.ts` or `.envtunerc.js` file with the environment definitions
  - When the `-f` argument is used, there is no naming restriction for the `.envtunerc.ts` file, although it is recommended to use a clear naming convention, such as `.envtunerc-<some_descriptive_text>.ts`
- `--verbose`
  - Optional argument, off by default
  - Include the `--verbose` flag to activate verbose logs, useful for debugging purposes

You can also use local `.env` files in together with envtune, to handle environment variables containing sensitive information. It is recommended that the variables within those `.env` files are referenced in your `.envtunerc.ts` file, in order to keep things organized and have a single entry-point for defining all your environment variables.

### Advanced Usage Example

Here's an advanced envtune usage example with more complex configuration consisting of `package.json`, `.envtunerc.ts`, `config.ts`, and `.env` files examples.

`package.json`

```json
"scripts": {
  "start": "envtune -e dev npm run serve",
  "build": "envtune -e prod npm run compile && npm run optimize",
  "test": "envtune -e test -f ../test.envtunerc-module.ts --verbose npm run test:suite",
  "deploy:global": "envtune -e prod -f ./env-configs/global.envtunerc.ts --verbose npm run build && npm run deployGlobal",
  "compile": "webpack --config webpack.config.js",
  "optimize": "webpack --mode=production",
  "serve": "webpack-dev-server",
  "test:suite": "jest",
  "deployGlobal": "aws s3 sync build/ s3://my-global-bucket"
}
```

`.envtunerc.ts`

```typescript
/// <reference types="node" />

import { awsRegions } from "./config";

// Declare an EnvironmentConfig type to make environment configuration explicit and clear

type EnvironmentConfig = {
  HOST: string;
  PORT: number;
  GENERATE_SOURCEMAP: boolean;
  REACT_APP_HTTPS: boolean;
  REACT_APP_SENTRY_URL?: string;
  SECRET_SAUCE: any;
  DB_HOST: string;
  DB_PORT: number;
  AWS_REGION: string;
  EXTRA_FEATURE_FLAG: boolean;
  // more params here
};

export const prod: EnvironmentConfig = {
  HOST: "www.example.com",
  PORT: 80,
  GENERATE_SOURCEMAP: false,
  REACT_APP_HTTPS: true,
  REACT_APP_SENTRY_URL: "https://sentry.io/17761337",
  SECRET_SAUCE: process.env.SECRET_PROD,
  DB_HOST: process.env.DB_HOST || "default-db-host",
  DB_PORT: Number(process.env.DB_PORT) || 3306,
  AWS_REGION: process.env.AWS_REGION || awsRegions.usEast,
  EXTRA_FEATURE_FLAG: true,
  // more params here
};

export const dev: EnvironmentConfig = {
  HOST: "localhost",
  PORT: 3000,
  GENERATE_SOURCEMAP: true,
  REACT_APP_HTTPS: false,
  SECRET_SAUCE: process.env.SECRET_DEV,
  DB_HOST: process.env.DB_HOST || "default-db-host",
  DB_PORT: Number(process.env.DB_PORT) || 3306,
  AWS_REGION: process.env.AWS_REGION || awsRegions.usEast,
  EXTRA_FEATURE_FLAG: false,
  // more params here
};

// more environments here
```

`.env`

```env
DB_HOST=database.example.com
DB_PORT=3306
AWS_REGION=us-east-1
```

`config.ts`

```ts
export const awsRegions = {
  usEast: "us-east-1",
  usWest: "us-west-2",
  euWest: "eu-west-1",
  // More AWS regions
};
```

### Known Limitations

1. Envtune can work with typescript configuration files `.envtune.ts` using either ES module exports, or common JS exports. However, it can only work with javascript configuration files `.envtune.js` that use common JS exports.

## Building the Project

To build the project, run the following command:

```bash
npm run build
```

## Running Tests

To run tests, execute:

```bash
npm test
```

## Contributing

Contributions are welcome! See [CONTRIBUTING.md](CONTRIBUTING.md) for more details.

## License

This project is licensed under the ISC License. See [LICENSE.md](LICENSE.md) for details.
