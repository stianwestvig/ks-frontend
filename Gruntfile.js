module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    sass: {
      options: {
        includePaths: ['bower_components/foundation/scss']
      },
      dist: {
        options: {
          // outputStyle: 'compressed'
        },
        files: {
          'dist/app.css': 'scss/app.scss'
        }        
      }
    },
      uglify: {
          js: {
              options: {
                  mangle: false,
                  compress: false
              },
              files: {
                  'dist/baked.js': [
                      'bower_components/modernizr/modernizr.js',
                      'bower_components/angular/angular.min.js',
                      'bower_components/angular-animate/angular-animate.js',
                      'bower_components/angular-foundation/mm-foundation.js',
                      'bower_components/angular-sanitize/angular-sanitize.min.js',
                      'bower_components/angular-bootstrap/ui-bootstrap.min.js',
                      'bower_components/ngLocale/angular-locale_no.js',
                      'bower_components/fastclick/lib/fastclick.js',
                      'js/vendor/ui-bootstrap-custom/datepicker.js',
                      'js/app.js',
                      'js/controllers/navigation_controller.js',
                      'js/controllers/slider_controller.js',
                      'js/controllers/status_update_controller.js',
                      'js/controllers/calendar_controller.js',
                      'js/directives/slider.js',
                      'js/directives/status_update.js',
                      'js/directives/tooltip.js',
                      'js/directives/multi_menu.js',
                      'js/filters/date_filter.js',
                      'js/services/helper_service.js',
                      'js/services/data_service.js',
                      'js/services/async_data_service.js'
                  ]
              }
          }
      },

    watch: {
      grunt: { files: ['Gruntfile.js'] },

        js: {
            files: ["js/**/*.js"],
            tasks: ["uglify"]
        },

      sass: {
        files: 'scss/**/*.scss',
        tasks: ['sass']
      }
    }
  });

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('build', ['sass', 'uglify']);
  grunt.registerTask('default', ['build','watch']);
}