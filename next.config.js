module.exports = {
    webpack: true,
    webpack: (config) => {
      config.resolve.fallback = { fs: false };
  
      return config;
    },
  };