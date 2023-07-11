module.exports = {
    apps: [
        {
            name: "node-ibmi",
            script: "./index.js",
            log_file: "./logs/production.log",
            exec_interpreter: "node",
            exec_mode: "cluster",
            instances: 2
        }
    ]
}