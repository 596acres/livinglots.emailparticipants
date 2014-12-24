module.exports = function(grunt) {
    grunt.initConfig({
        handlebars: {
            compile: {
                options: {
                    commonjs: true,
                    namespace: false,
                    processName: function (filename) {
                        return filename.split('/').slice(-1).join('.');
                    }
                },
                files: {
                    'src/templates.js': ['src/**/*.hbs']
                }
            }
        },

        jshint: {
            all: {
                files: {
                    src: ["src/*.js", "!src/templates.js"]
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-handlebars');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.registerTask("build", ["jshint", "handlebars"]);
};
