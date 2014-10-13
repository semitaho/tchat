module.exports = function(grunt){
	// Project configuration.
  grunt.initConfig({

  	express: {
  		dev: {
      options: {
        script: 'server/app.js'
      }
    }
  	},
  	connect: {
  		server: {
  			options : {
  				port: 9001,
  				base: 'www',
  				livereload: true
  			}
  		}
  	},

  	pkg: grunt.file.readJSON('package.json'),
  	

  	copy: {
  		main: {
  			expand: true,
  		  	cwd: './src/',
    		src: ['**/*.js','**/*.css', '**/*.jpg'],
    		dest: 'www/'
  		}
	},

	jade: {
		compile : {
			options: {
				pretty: true

    		},
    		files : [ {
    			cwd : 'src',
    			src : '**/*.jade',
    			expand: true,
    			ext: ".html",
    			dest: 'www'
    		}]
  		}
	},

  	watch: {
  		all: {
  			files: [ '**/*.jade', './src/**/*.js', './src/**/*.css'],
  			tasks: ['jade','copy'],
  			options: {
        		nospawn: true,
        		livereload: true
      		}
  		}
  	}

  	

  });

  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jade');

  grunt.registerTask('default', ['connect']);
  grunt.registerTask('server', ['express', 'watch']);

}