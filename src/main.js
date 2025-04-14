/* guim v1.0.0
 * 
 * Guim is a JS library for creating simple
 * desktop-like GUIs.
 *
 * This software is free and anybody can
 * use it with no restrictions
 */

// import everything and just export it
module.exports = {...require('./model.js'), ...require('./view.js'), ...require('./component.js')};