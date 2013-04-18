// more information about grunt:
// http://gruntjs.com
module.exports = function(grunt) {

  // specify the versions with respect to
  // http://semver.org
  var version = '1.0.0'
    , mobileVersion = '0.5.0';


  grunt.loadNpmTasks('grunt-contrib');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-rigger');
  grunt.loadTasks('buildtasks');

  // Project configuration.
  grunt.initConfig({

    meta: {
      version: version,
      mobileVersion: mobileVersion,
      banner: '// kesign, v<%= meta.version %>\n' +
        '// Copyright (c)<%= grunt.template.today("yyyy") %> Kaba AG.\n' + 
        '// Distributed under MIT license\n' + 
        '// http://kaba-cceac.github.com/kesign/\n\n',
      bannerCSS: '/*!' +
        ' * kesign, v<%= meta.version %>\n' +
        ' * Copyright (c)<%= grunt.template.today("yyyy") %> Kaba AG.\n' + 
        ' * Distributed under MIT license\n' + 
        ' * http://kaba-cceac.github.com/kesign/\n' +
        ' */\n\n',
      bannerMobile: '// kesign-mobile, v<%= meta.mobileVersion %>\n' +
        '// Copyright (c)<%= grunt.template.today("yyyy") %> Kaba AG.\n' + 
        '// Distributed under MIT license\n' + 
        '// http://kaba-cceac.github.com/kesign/\n\n',
      bannerMobileCSS: '/*!' +
        ' * kesign-mobile, v<%= meta.mobileVersion %>\n' +
        ' * Copyright (c)<%= grunt.template.today("yyyy") %> Kaba AG.\n' + 
        ' * Distributed under MIT license\n' + 
        ' * http://kaba-cceac.github.com/kesign/\n' +
        ' */\n\n'
    },

    // builds the javascript file (adds the includes)
    // add banners to js and css files
    rig: {
      kesign: {
        options: {
          banner: '<%= meta.bannerCSS %>'
        },
        files: [
          { dest: 'public/css/kesign.css', src: ['bin/css/kesign.css'] }
        ]
      },
      kesignResponsive: {
        options: {
          banner: '<%= meta.bannerCSS %>'
        },
        files: [
          { dest: 'public/css/kesign-responsive.css', src: ['bin/css/kesign-responsive.css'] }
        ]
      },
      kesignMobile: {
        options: {
          banner: '<%= meta.bannerMobileCSS %>'
        },
        files: [
          { dest: 'public/css/kesign-mobile.css', src: ['bin/css/kesign-mobile.css'] }
        ]
      },
      kesignJS: {
        options: {
          banner: '<%= meta.banner %>'
        },
        files: [
          { dest: 'public/js/kesign.js', src: ['src/js/main.js'] }
        ]
      }
    },

    // removes file so old/unused files don't linger in new builds
    clean: ['index.html', 'pages', 'samples', 'dist'],

    // generates css from the stylus files
    // http://learnboost.github.io/stylus
    // http://visionmedia.github.io/nib
    stylus: {
      compile: {
        options: {
          'import': ['nib']
        },
        files: [
          { dest: 'bin/css/kesign.css', src: [ 'src/stylus/main.styl' ] },
          { dest: 'bin/css/kesign-responsive.css', src: [ 'src/stylus/responsive.styl' ] },
          { dest: 'bootstrap/assets/css/kesign.css', src: [ 'src/stylus/main.styl' ] },
          { dest: 'bootstrap/assets/css/kesign-responsive.css', src: [ 'src/stylus/responsive.styl' ] },
          { dest: 'bin/css/kesign-mobile.css', src: [ 'src-mobile/stylus/main.styl' ] },
          { dest: 'ratchet/docs/css/kesign-mobile.css', src: [ 'src-mobile/stylus/main.styl' ] }
        ]
      }
    },

    // generates html files from jade
    // https://github.com/visionmedia/jade#readme
    jade: {
      compile: {
        options: { },
        files: [
          {'./index.html': [ 'src/jade/index.jade' ] },
          { expand: true, cwd: 'src/jade/pages/', src: ['**/*.jade'], dest: 'pages/', ext: '.html' },
          { expand: true, cwd: 'src/jade/samples/', src: ['**/*.jade'], dest: 'samples/', ext: '.html' },
          { expand: true, cwd: 'src-mobile/jade/samples/oracode/', src: ['**/*.jade'], dest: 'samples/mobile/oracode/', ext: '.html' }
        ]
      }
    },

    // prettify (syntax highlighting) code sections in html files
    prettify: {
      './': [
        'index.html',
        'pages/**/*.html',
        'samples/**/*.html'
      ]
    },

    // copy around our files and add version numbers on need
    copy: {
      versions: {
        files: [{ 
          expand: true, 
          cwd: 'public/', 
          src: [
            'css/kesign-combined-min.css', 
            'css/kesign.css', 
            'css/kesign-min.css', 
            'css/kesign-responsive.css', 
            'css/kesign-responsive-min.css',
            'css/kesign-mobile.css',
            'css/kesign-mobile-min.css',
            'js/kesign.js'
          ], 
          dest: 'public/', 
          rename: function(dest, src) { 
            if (src == 'js/kesign.js') {
              dest += 'js/kesign-' + version + '.js';
            }
            if (src == 'css/kesign-combined-min.css') {
              dest += 'css/kesign-combined-min-' + version + '.css';
            }
            if (src == 'css/kesign.css') {
              dest += 'css/kesign-' + version + '.css';
            }
            if (src == 'css/kesign-min.css') {
              dest += 'css/kesign-min-' + version + '.css';
            }
            if (src == 'css/kesign-responsive.css') {
              dest += 'css/kesign-responsive-' + version + '.css';
            }
            if (src == 'css/kesign-responsive-min.css') {
              dest += 'css/kesign-responsive-min-' + version + '.css';
            }
            if (src == 'css/kesign-mobile.css') {
              dest += 'css/kesign-mobile-' + mobileVersion + '.css';
            }
            if (src == 'css/kesign-mobile-min.css') {
              dest += 'css/kesign-mobile-min-' + mobileVersion + '.css';
            }
            console.log('public/' + src + ' -> ' + dest);
            return dest;
          }
        }]
      },
      latest: {
        files: [{ 
          expand: true, 
          cwd: 'public/', 
          src: [
            'js/kesign.js',
            'css/kesign-combined-min.css', 
            'css/kesign.css', 
            'css/kesign-min.css', 
            'css/kesign-responsive.css', 
            'css/kesign-responsive-min.css',
            'css/bootstrap-2.3.0.css',
            'css/bootstrap-responsive-2.3.0.css',
            'css/font-awesome-3.0.css',
            'css/font-awesome-ie7-3.0.css',
            'css/ratchet-1.0.0.css',
            'css/kesign-mobile.css',
            'css/kesign-mobile-min.css'
          ], 
          dest: 'public/download/latest/'
        }]
      },
      release: {
        files: {
          'dist/release/': [
            'public/**/*',
            'bootstrap/**/*',
            'ratchet/**/*',
            'samples/**/*']
        }
      }
    },

    // generate zib files for download
    compress: {
      zip: {
        options: {
          archive: 'public/download/versions/kesign-<%= meta.version %>.zip',
          mode: 'zip',
          level: 1
        },
        files: [
          {
            expand: true,
            flatten: false,
            cwd: 'public/',
            src: [
              'css/kesign-combined-min-' + version + '.css', 
              'css/kesign-' + version + '.css', 
              'css/kesign-min-' + version + '.css', 
              'css/kesign-responsive-' + version + '.css', 
              'css/kesign-responsive-min-' + version + '.css',
              'css/bootstrap-2.3.0.css',
              'css/bootstrap-responsive-2.3.0.css',
              'css/font-awesome-3.0.css',
              'css/font-awesome-ie7-3.0.css',
              'font/*',
              'img/**/*',
              'js/*'
            ],
            dest: 'kesign-<%= meta.version %>/'
          }
        ]
      },
      zipMobile: {
        options: {
          archive: 'public/download/versions/kesign-mobile-<%= meta.mobileVersion %>.zip',
          mode: 'zip',
          level: 1
        },
        files: [
          {
            expand: true,
            flatten: false,
            cwd: 'public/',
            src: [
              'css/kesign-mobile-combined-min-' + mobileVersion + '.css', 
              'css/kesign-mobile-' + mobileVersion + '.css', 
              'css/kesign-mobile-min-' + mobileVersion + '.css',
              'css/ratchet-1.0.0.css',
              'js/ratchet-1.0.0.js'
            ],
            dest: 'kesign-mobile-<%= meta.version %>/'
          }
        ]
      }
    },

    // run command to build bootstrap documentation
    shell: {
        doc_bootstrap: {
            command: 'node bootstrap/build'
        }
    },

    // create minimized versions of our css
    cssmin: {
      doc: {
        files: [
          { 
            dest: 'public/css/doc-base.css', 
            src: [
              'public/css/bootstrap-2.3.0.css',
              'public/css/bootstrap-responsive-2.3.0.css',
              'public/css/font-awesome-3.0.css',
              'public/css/prettify.css'
            ] 
          }
        ]
      },
      kesignCombined: {
        options: {
          banner: '<%= meta.bannerCSS %>'
        },
        files: [
          { 
            dest: 'public/css/doc-base.css', 
            src: [
              'public/css/bootstrap-2.3.0.css',
              'public/css/bootstrap-responsive-2.3.0.css',
              'public/css/font-awesome-3.0.css',
              'public/css/kesign.css',
              'public/css/kesign-responsive.css'
            ] 
          }
        ]
      },
      kesignMobileCombined: {
        options: {
          banner: '<%= meta.bannerMobileCSS %>'
        },
        files: [
          { 
            dest: 'public/css/kesign-mobile-combined-min.css', 
            src: [
              'public/css/ratchet-1.0.0.css',
              'public/css/kesign-mobile.css'
            ] 
          }
        ]
      },
      kesignFiles: {
        files: [
          {'public/css/kesign-min.css': [ 'public/css/kesign.css' ] },
          {'public/css/kesign-responsive-min.css': [ 'public/css/kesign-responsive.css' ] },
          {'public/css/kesign-mobile-min.css': [ 'public/css/kesign-mobile.css' ] }
        ]
      }
    },

    // Starts a localserver for testing
    server: {
      host: '0.0.0.0',
      files: { 
        'favicon.ico': './favicon.ico',
        'public/font/fontawesome-webfont.eot?': 'public/font/fontawesome-webfont.eot',
        'public/font/fontawesome-webfont.woff?': 'public/font/fontawesome-webfont.woff',
        'public/font/fontawesome-webfont.ttf?': 'public/font/fontawesome-webfont.ttf'
      },

      folders: {
          '/': './',
          'bin': 'bin',
          'public': 'public',
          'bootstrap': 'bootstrap',
          'ratchet': 'ratchet',
          'pages': 'pages',
          'samples': 'samples'
      }
    },

    // run grunt watch and on save your files get rebuild
    watch: {
      jade: {
        files: 'src/jade/**/*.jade',
        tasks: 'default'
      },

      stylus: {
        files: 'src/stylus/**/*.styl',
        tasks: 'default'
      },

      js: {
        files: 'src/js/**/*.js',
        tasks: 'default'
      },

      jadeMobile: {
        files: 'src-mobile/jade/**/*.jade',
        tasks: 'default'
      },

      stylusMobile: {
        files: 'src-mobile/stylus/**/*.styl',
        tasks: 'default'
      }
    }

  });

  // build bootstrap
  grunt.registerTask('bootstrap', ['shell', 'stylus']);

  // default task for developing (runs on grunt watch)
  grunt.registerTask('default',['clean', 'jade', 'prettify', 'stylus']);

  // generates and minimize sources
  grunt.registerTask('build', ['default', 'bootstrap', 'rig', 'cssmin']);

  // build and copy stuff around for copy&paste to github pages
  grunt.registerTask('release', ['build', 'copy:versions', 'copy:latest', 'compress', 'copy:release']);
};