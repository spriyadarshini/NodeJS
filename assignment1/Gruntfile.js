// Gruntfile.js
module.exports = function(grunt) {

    grunt.initConfig({

        // configure nodemon
        nodemon: {
            dev: {
                script: 'upload.js'
            }
        }

    });

    // load nodemon
    grunt.loadNpmTasks('grunt-nodemon');

    // register the nodemon task when we run grunt
    grunt.registerTask('default', ['nodemon']);

};