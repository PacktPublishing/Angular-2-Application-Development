module.exports = function (config) {
    config.set({
        frameworks: ["browserify", "jasmine"],
        browsers: ["Chrome"],
        files: [
            "node_modules/es6-shim/es6-shim.min.js",
            "node_modules/zone.js/dist/zone.min.js",
            "node_modules/reflect-metadata/Reflect.js",
            "node_modules/zone.js/dist/long-stack-trace-zone.js",
            "node_modules/zone.js/dist/proxy.js",
            "node_modules/zone.js/dist/sync-test.js",
            "node_modules/zone.js/dist/jasmine-patch.js",
            "node_modules/zone.js/dist/async-test.js",
            "node_modules/zone.js/dist/fake-async-test.js",
            "dist/**/*.spec.js"
        ],
        preprocessors:  {
            "**/*.spec.js": ["browserify"]
        },
        browserify: {
            debug: true
        }
    })
}