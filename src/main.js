/* guim v1.0.0
 * 
 * Guim is a JS library for creating simple
 * desktop-like GUIs.
 *
 * This software is free and anybody can
 * use it with no restrictions
 */

const { Model, ContainerModel, WrapperModel, TextModel, ButtonModel, TextButtonModel } = require('./model.js');
const { View, ContainerView, WrapperView, TextView, ButtonView, TextButtonView } = require('./view.js');
const { Text, Wrapper, Container, Button, TextButton } = require('./component.js');

module.exports = { 
    Model, ContainerModel, WrapperModel, TextModel, ButtonModel, TextButtonModel, // models
    View, ContainerView, WrapperView, TextView, ButtonView, TextButtonView,  // views
    Container, Wrapper, Text, Button, TextButton, // comonenets
};