/* guim v1.0.0
 * 
 * Guim is a JS library for creating simple
 * desktop-like GUIs.
 *
 * This software is free and anybody can
 * use it with no restrictions
 */

const { Model, ContainerModel, WrapperModel, TextModel } = require('./model.js');
const { View, ContainerView, WrapperView, TextView } = require('./view.js');
const { Text, Wrapper, Container } = require('./component.js');

module.exports = { 
    Model, ContainerModel, WrapperModel, TextModel, // models
    View, ContainerView, WrapperView, TextView, // views
    Container, Wrapper, Text, // comonenets
};