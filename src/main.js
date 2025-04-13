/* guim v1.0.0
 * 
 * Guim is a JS library for creating simple
 * desktop-like GUIs.
 *
 * This software is free and anybody can
 * use it with no restrictions
 */

const { Model, ContainerModel, WrapperModel, TextModel, ImageModel, ButtonModel, TextButtonModel } = require('./model.js');
const { View, ContainerView, WrapperView, TextView, ImageView, ButtonView, TextButtonView } = require('./view.js');
const { Wrapper, Container, Text, Image, Button, TextButton } = require('./component.js');

module.exports = { 
    Model, ContainerModel, WrapperModel, TextModel, ImageModel, ButtonModel, TextButtonModel, // models
    View, ContainerView, WrapperView, TextView, ImageView, ButtonView, TextButtonView,  // views
    Container, Wrapper, Text, Image, Button, TextButton, // comonenets
};