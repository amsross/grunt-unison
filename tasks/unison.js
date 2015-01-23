/*
 * grunt-unison
 * https://github.com/amsross/grunt-unison
 *
 * Copyright (c) 2014 Matt Ross
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

	grunt.registerTask('unison', 'runs unison to keep hosts in sync', function() {
		var options = this.options({
				verbose: false,
				args: [],
				src: false,
				dest: false,
			}),
			done = this.async(),
			verbose = options.verbose,
			args = options.args.concat([
				'-auto',
				'-batch',
				'-confirmbigdel=false',
				'-times',
			]),
			src = options.src,
			dest = options.dest
			;

		if (!src || !dest) {
			grunt.log.error('Both source and destination must be specified.');
			return false;
		} else {
			grunt.util.spawn({
				args: [src, dest].concat(args),
				cmd: 'unison',
				opts: {
					stdio: verbose ? [
						process.stdin,
						process.stout,
						process.stderr
					] : []
				}
			}, function(error, result, code) {
				if(code === 127) {
					// if unison is not installed, don't explode
					if (result.stderr.search(/not found/) > -1) {
						grunt.log.error('Unison was not found and cannot be executed.');
						done();
						return true;
					}
					grunt.log.error('Synchronization failed. Please consult unison log.');
					done(false);
					return false;
				}
				if (result) {
					var slice_index = result.stderr.search(/Synchronization complete at|Nothing to do/);
					if (slice_index > -1 || verbose) {
						grunt.log.ok(verbose ? result.stdout : result.stderr.slice(slice_index));
						done();
						return true;
					} else {
						if (result.stderr) {
							grunt.log.error(result.stderr);
						} else {
							grunt.log.error('Synchronization failed. Please consult unison log.');
						}
						done(false);
						return false;
					}
				}
			});
		}
	});
};
