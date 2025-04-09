/* guim v1.0.0
 * 
 * Guim is a JS library for creating simple
 * desktop-like GUIs.
 *
 * This software is free and anybody can
 * use it with no restrictions
 */

const { Model, TextModel, WrapperModel } = require('./model.js');
const { View, TextView, WrapperView } = require('./view.js');
const { Text, Wrapper } = require('./component.js');

module.exports = { 
    Model, TextModel, WrapperModel, // models
    View, TextView, WrapperView, // views
    Text, Wrapper, // comonenets
};