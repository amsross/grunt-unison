# [grunt-unison](https://github.com/amsross/grunt-unison) [![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/) [![Build Status](https://travis-ci.org/amsross/grunt-unison.png?branch=master)](https://travis-ci.org/amsross/grunt-unison)

> runs unison to keep hosts in sync

## Getting Started
If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-unison --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-unison');
```

## The "unison" task

### Overview
In your project's Gruntfile, add a section named `unison` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
	unison: {
		options: {
			verbose: false,
			args: [],
			src: '/path/to/source',
			dest: '/path/to/destination/'
		},
	},
});
```

### Options

#### options.verbose
Type: `Boolean`
Default value: `false`

Display `unison` command's output in console.

#### options.args
Type: `Array`
Default value: `[]`

An array of command-line arguments to pass to `unison`. Valid arguments are provided in the [Unison User Manual](http://www.cis.upenn.edu/~bcpierce/unison/download/releases/stable/unison-manual.html)

The following arguments are added by default:
```
	[
		'-auto',
		'-batch',
		'-confirmbigdel=false',
		'-times'
	]
```

#### options.src
Type: `String`
Default value: ``

The source directory to sync from.

Accepted formats are:
* `relative/path/of/root`
* `/absolute/path/of/root`
* `[protocol:]//[user@][host][:port][/path]`

#### options.dest
Type: `String`
Default value: ``

The destination directory to sync to.

Accepted formats are:
* `relative/path/of/root`
* `/absolute/path/of/root`
* `[protocol:]//[user@][host][:port][/absolute/path]`

### Usage Examples

#### Custom Options
In this example, custom options are used to do sync files between the local source and remote destination ignoring permissions and allowing for FAT drives.

```js
grunt.initConfig({
	unison: {
		options: {
			verbose: false,
			args: [
				'-perms 0',
				'-fat'
			],
			src: '/path/to/source',
			dest: 'ssh://remote.host:22//absolute/path/to/destination/'
		},
	},
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History

 * 2014-12-02   v0.1.1   Better logging
 * 2014-12-02   v0.1.0   Initial release
