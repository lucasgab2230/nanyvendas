const path = require("node:path");
const ports = require("./__ports.cjs");

module.exports = {
  apps: [
    {
      name: "web-app",
      cwd: path.join(__dirname, "packages/web"),
      script: "src/server.ts",
      interpreter: "node",
      interpreter_args: ["--import", "tsx", `--env-file-if-exists=${path.join(__dirname, ".env")}`],
      exec_mode: "fork",
      instances: 1,
      autorestart: true,
      restart_delay: 1000,
      env: { PORT: ports.website, NODE_ENV: "production" },
    },
  ],
};
