module.exports = {
    apps: [
      {
        name: 'learn-react',
        script: 'serve',
        watch: true,
        env: {
          PM2_SERVE_PATH: './dist',
          PM2_SERVE_PORT: 8081
        }
      }
    ]
  }
  