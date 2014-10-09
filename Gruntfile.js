module.exports = function(grunt){
	// Project configuration.
  grunt.initConfig({
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
    		src: '**',
    		dest: 'www/'
  		}
	},

  	watch: {
  		all: {
  			files: [ '**/*.html'],
  			tasks: ['copy'],
  			options: {
        		nospawn: true,
        		livereload: true
      		}
  		}
  	}

  	

  });

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.registerTask('default', ['connect']);
  grunt.registerTask('serve', ['connect:server', 'watch']);

}