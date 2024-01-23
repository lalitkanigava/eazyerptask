module.exports = {
    apps: [
      {
        name: 'eazyErp',
        script: 'app.js',
        instances: 'max',
        exec_mode: 'cluster',
        watch: true,
        env: {
          NODE_ENV: 'development',
          PORT: 3000,
          JWT_SECRET: "zxcvbnm",
          JWT_EXP: "1h",
          DB_USERNAME: "postgres",
          DB_PASS:'liberty123@#',
          DB_NAME: 'task'
        },
      },
    ],
  };
  