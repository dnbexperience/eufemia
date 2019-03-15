# DNB UI Library - HTML Example

This example uses [live-server](https://www.npmjs.com/package/live-server) to start a local server with live reload, serving the static files. But the **index.html** can also be opened without any server as well as long as the package `dnb-ui-lib` is setup correctly.

# Dependencies

To run the ui-lib [React and React-Dom](https://cdnjs.com/libraries/react) is required as an external dependency. Have a look at the **index.html** file.

# Setup `dnb-ui-lib`

To serve the needed files, You have to run a `live-server`, serving the needed files from the package `dnb-ui-lib`.

1. run first `yarn build` to make sure we have a local copy of `dnb-ui-lib/components` and `dnb-ui-lib/style`
1. then run `yarn serve` to make sure we serve the files on port **8081**
1. finally, run `yarn start` for a live reload server - or simply open the **index.html** file from the _static_ folder.
1. Open this location in Your browser: `http://localhost:8080`
