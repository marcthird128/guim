/* guim v1.0.0
 * 
 * Guim is a JS library for creating simple
 * desktop-like GUIs.
 *
 * This software is free and anybody can
 * use it with no restrictions
 */

const { Model, ContainerModel, WrapperModel, TextModel, ImageModel, ButtonModel, TextButtonModel, ImageButtonModel } = require('./model.js');
const { View, ContainerView, WrapperView, TextView, ImageView, ButtonView, TextButtonView, ImageButtonView } = require('./view.js');
const { Wrapper, Container, Text, Image, Button, TextButton, ImageButton } = require('./component.js');

module.exports = { 
    Model, ContainerModel, WrapperModel, TextModel, ImageModel, ButtonModel, TextButtonModel, ImageButtonModel, // models
    View, ContainerView, WrapperView, TextView, ImageView, ButtonView, TextButtonView, ImageButtonView, // views
    Container, Wrapper, Text, Image, Button, TextButton, ImageButton, // components
};