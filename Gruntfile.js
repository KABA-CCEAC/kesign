module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib');
  grunt.loadTasks('buildtasks');

  // Project configuration.
  grunt.initConfig({
 
    clean: ['index.html', 'pages', 'doc'],

    stylus: {
      compile: {
        options: {
          'import': ['nib']
        },
        files: [{ dest: 'public/css/doc-kesign.css', src: [ 'src/stylus/main.styl' ] }]
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
          { expand: true, cwd: 'src/jade/doc/', src: ['**/*.jade'], dest: 'doc/', ext: '.html' }
        ]
      }
    },

    prettify: {
      './': [
        'index.html',
        'pages/**/*.html',
        'doc/**/*.html'
      ]
    },

    copy: {
      docPublic: {
        files: [{ expand: true, cwd: 'src/public/', src: ['**/*'], dest: 'public/' }]
      }
    },

    
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
          'public': 'public',
          'bootstrap': 'bootstrap',
          'ratchet': 'ratchet',
          'pages': 'pages',
          'doc': 'doc',
          'samples': 'samples'
      }
    },

    watch: {
      jade: {
        files: 'src/jade/**/*.jade',
        tasks: 'default'
      },

      stylus: {
        files: 'src/stylus/**/*.styl',
        tasks: 'default'
      }
    }

  });

  grunt.registerTask('default', ['clean', 'jade', 'prettify', 'stylus', 'copy']);
};