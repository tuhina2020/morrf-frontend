module.exports = grunt => {
  grunt.initConfig({
    atomizer: {
      pwa: {
        options: {
          configFile: 'atomic/atomCssConfig.js',
        },
        files: [
          {
            src: [
              `app/components/**/*.js`,
              'app/containers/**/*.js',
              'app/utils/*.js',
              'app/utils/**/*.js',
            ],
            dest: 'css/generatedAtoms.css',
          },
        ],
      },
    },
  });

  grunt.loadNpmTasks('grunt-atomizer');
  // grunt.loadNpmTasks("grunt-contrib-htmlmin");

  grunt.registerTask('default', ['atomizer']);
};
