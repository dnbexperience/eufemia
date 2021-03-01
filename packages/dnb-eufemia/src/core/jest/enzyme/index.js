/**
 * Default Component Test Setup
 *
 */

// enzyme setup
const enzyme = require('enzyme')

// TODO: This may not be needed in future
const Adapter = require('enzyme-adapter-react-16')
enzyme.configure({ adapter: new Adapter() })

module.exports = enzyme
