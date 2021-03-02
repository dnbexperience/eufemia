/**
 * Default Component Test Setup
 *
 */

// enzyme setup
const enzyme = require('enzyme')

// TODO: This may not be needed in future
const Adapter = require('@wojtekmaj/enzyme-adapter-react-17')
enzyme.configure({ adapter: new Adapter() })

module.exports = enzyme
