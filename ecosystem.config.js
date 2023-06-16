module.exports = {
  apps : [{
    name: "app",
    script: "./SRC/Server.js",
    instances: "max",
    env: {
      NODE_ENV: "development",
    },
    env_production: {
      NODE_ENV: "production",
    }
  }]
}