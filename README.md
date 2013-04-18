## To Contribute

The html samples are written in [jade](https://github.com/visionmedia/jade#readme) template language.

The css is build up on [stylus](http://learnboost.github.io/stylus).

### current branches to push

kesign source: __master__
kesign documentation: __gh-pages__

In the near future we will change to push to extra branches for new versions so the master and gh-pages branches are the current/stable released state.

### Prereqisitions

1) You will need to install node.js on your computer - download it from [http://nodejs.org/](http://nodejs.org/)

2) next we need to install grunt

	npm install -g grunt-cli

3) clone the repository

	git clone git@github.com:KABA-CCEAC/kesign.git

4) open the project folder and install the node dependencies

	cd kesign
	npm install


### Development

To generate the sources you could:

	grunt build

To watch your changes in a browser you could start a local webserver:

	grunt server

	// -> head your browser to http://localhost:8000/samples/default.html or any other page you want to test

To generate the files on change (save)

	grunt watch

### Release

Befor you crate a new version be sure to set the new version numbers inside the Gruntfile.js.

To package the sources for release:

	grunt release

Now you could copy the files from __/dist/release/__ to the current documentation branch and if needed add documentation content there for the new functionality.