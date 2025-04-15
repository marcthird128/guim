/* guim v1.0.0
 * 
 * Guim is a JS library for creating simple
 * desktop-like GUIs.
 *
 * This software is free and anybody can
 * use it with no restrictions
 * 
 * component.js
 * Contains component classes
 */

// import models
const { 
    ContainerModel, DivModel, TextModel, ImageModel, WrapperModel, ButtonModel, TextButtonModel, ImageButtonModel,
    LabelModel, InputModel, NumberInputModel,
} = require('./model.js');

// import views
const { 
    ContainerView, DivView, TextView, ImageView, WrapperView, ButtonView, TextButtonView, ImageButtonView,
    TextInputView, LabelView, NumberInputView,
} = require('./view.js');

// container
class Container extends ContainerModel {
    constructor(parent) {
        super();

        this.view = new ContainerView(this);

        this.parent = parent;
    }
}

// div, container with no styling
class Div extends DivModel {
    constructor(parent) {
        super();

        this.view = new DivView(this);

        this.parent = parent;
    }
}

// wrapper componenet
// allows adding Guim components to DOM elements
class Wrapper extends WrapperModel {
    constructor(element) {
        super();

        this.view = new WrapperView(this);

        this.element = element;
    }
}

// text componenet
class Text extends TextModel {
    constructor(text, parent) {
        super();

        this.view = new TextView(this);

        this.text = text;
        this.parent = parent;
    }
}

// image
class Image extends ImageModel {
    constructor(src, alt, parent) {
        super();

        this.view = new ImageView(this);

        this.src = src;
        this.alt = alt;
        this.parent = parent;
    }
}

// button that can have anything in it
class Button extends ButtonModel {
    constructor(parent) {
        super();

        this.view = new ButtonView(this);

        this.parent = parent;
    }
}

// button that can have text in it
class TextButton extends TextButtonModel {
    constructor(text, parent) {
        super();

        this.view = new TextButtonView(this);

        this.text = text;
        this.parent = parent;
    }
}

// button with an image
class ImageButton extends ImageButtonModel {
    constructor(src, alt, parent) {
        super();

        this.view = new ImageButtonView(this);

        this.src = src;
        this.alt = alt;
        this.parent = parent;
    }
}

// label
class Label extends LabelModel {
    constructor(text, target, parent) {
        super();

        this.view = new LabelView(this);

        this.text = text;
        this.target = target;
        this.parent = parent;
    }
}

// text input
class TextInput extends InputModel {
    constructor(value, parent) {
        super();

        this.view = new TextInputView(this);

        this.value = value;
        this.parent = parent;
    }
}

// number input
class NumberInput extends NumberInputModel {
    constructor(value, min, max, step, parent) {
        super();

        this.view = new NumberInputView(this);

        this.value = value;
        this.min = min;
        this.max = max;
        this.step = step;
        this.parent = parent;
    }
}

module.exports = { Container, Div, Wrapper, Text, Image, Button, TextButton, ImageButton, Label, TextInput, NumberInput };