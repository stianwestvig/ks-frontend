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
              compress: false,
              beautify: true
          },
          files: {
              'dist/baked.js': [
                  'bower_components/modernizr/modernizr.js',
                  'bower_components/angular/angular.min.js',
                  'bower_components/angular-animate/angular-animate.js',
                  'bower_components/angular-foundation/mm-foundation.js',
                  'bower_components/angular-sanitize/angular-sanitize.min.js',
                  'bower_components/angular-route/angular-route.min.js',
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


    'string-replace': {
        files: {
            /*'dist/baked.js': 'dist/baked_server.js'*/
            src: 'dist/baked.js',
            dest: 'dist/baked_server.js'
        },
        options: {
            replacements: [
                /*{
                    pattern: /views\*//*//*i,
                    replacement: '/frontend/views/'
                },
                {
                    pattern: /template\*//*//*i,
                    replacement: '/frontend/template/'
                },*/


                {
                    pattern: 'views/datepicker/datepicker.html',
                    replacement: '/frontend/views/datepicker/datepicker.html'
                },
                {
                    pattern: 'views/datepicker/day.html',
                    replacement: '/frontend/views/datepicker/day.html'
                },
                {
                    pattern: 'views/datepicker/month.html',
                    replacement: '/frontend/views/datepicker/month.html'
                },
                {
                    pattern: 'views/datepicker/year.html',
                    replacement: '/frontend/views/datepicker/year.html'
                },
                {
                    pattern: 'views/datepicker/popup.html',
                    replacement: '/frontend/views/datepicker/popup.html'
                },
                {
                    pattern: 'template/tabs/tabset.html',
                    replacement: '/frontend/template/tabs/tabset.html'
                },
                {
                    pattern: 'template/tabs/tab.html',
                    replacement: '/frontend/template/tabs/tab.html'
                },
                {
                    pattern: 'views/slider.html',
                    replacement: '/frontend/views/slider.html'
                },
                {
                    pattern: 'views/status_update.html',
                    replacement: '/frontend/views/status_update.html'
                },
                {
                    pattern: 'img/statusimageplaceholder1.png',
                    replacement: '/frontend/img/statusimageplaceholder1.png'
                },
                {
                    pattern: 'img/statusimageplaceholder2.png',
                    replacement: '/frontend/img/statusimageplaceholder2.png'
                },
                {
                    pattern: 'image: "img/statusimageplaceholder1.png"',
                    replacement: 'image: "/frontend/img/statusimageplaceholder1.png"'
                }

            ]
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
  grunt.loadNpmTasks('grunt-string-replace');

  grunt.registerTask('build', ['sass', 'uglify', 'string-replace']);
  grunt.registerTask('default', ['build']);
};