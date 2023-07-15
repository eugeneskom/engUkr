import type { ConfigFunction } from '@babel/core';

function config(api: { cache: (arg0: boolean) => void; }) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
  };
}

export default config;