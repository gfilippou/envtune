/// <reference types="node" />

type EnvironmentConfig = {
  HOST: string;
  PORT: number;
  GENERATE_SOURCEMAP: boolean;
  REACT_APP_HTTPS: boolean;
  REACT_APP_SENTRY_URL?: string;
  SECRET_SAUCE: any;
};

const prod: EnvironmentConfig = {
  HOST: "www.example.com",
  PORT: 80,
  GENERATE_SOURCEMAP: false,
  REACT_APP_HTTPS: true,
  REACT_APP_SENTRY_URL: "https://sentry.io/17761337",
  SECRET_SAUCE: process.env.SECRET_PROD,
};

const dev: EnvironmentConfig = {
  HOST: "localhost",
  PORT: 3000,
  GENERATE_SOURCEMAP: true,
  REACT_APP_HTTPS: false,
  SECRET_SAUCE: process.env.SECRET_DEV,
};

module.exports = {
  prod,
  dev,
};
