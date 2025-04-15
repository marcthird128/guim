/* guim v1.0.0
 * 
 * Guim is a JS library for creating simple
 * desktop-like GUIs.
 *
 * This software is free and anybody can
 * use it with no restrictions
 * 
 * view.js
 * Contains view classes
 */

// base view class
class View {
    constructor(model) {
        this.model = model;
    }

    // initializes the view
    init() {
        // this is fired when a child is inserted
        // at a specific index,
        // so we need to add it to the correct parent
        this.model.listen('run-add-child', (child, index) => {
            // get the child *after* this child
            // so we can use insertBefore
            let after = this.model.children[index+1];

            if (after) {
                // if there is a child after child,
                // add the child *before* after
                this.bottom.insertBefore(child.view.top, after.view.top);
            } else {
                // otherwise,
                // just append it to the end
                this.bottom.appendChild(child.view.top);
            }
        });

        // this is fired
        // when a child is removed
        this.model.listen('run-remove-child', child => {
            // simple, just call
            // removeChild to automatically
            // remove it. But check if it is a child
            // first or else an error will happen
            // (however this edge case shouldn't occurr);
            if (this.bottom.contains(child.view.top))
                // if so, remove it
                this.bottom.removeChild(child.view.top);
            else {
                // otherwise log to the console
                // that something unexpected happened
                // (nice for debugging)
                console.warn('Removed a child from the DOM that wasn\'t added first');
            }
        });

        this.model.listen('run-add-class', cls => {
            this.top.classList.add(cls);
        });

        this.model.listen('run-remove-class', cls => {
            this.top.classList.remove(cls);
        });

        this.model.listen('set-id', id => {
            this.top.id = id;
        });
    }
}

// focusable
class FocusableView extends View {
    init() {
        super.init();

        this.top.classList.add('gui-focusable');

        this.model.listen('set-focused', () => {
            if (this.model.focused)
                this.top.focus();
            else
                this.top.blur();
        })

        this.top.addEventListener('focus', () => {
            if (!this.model.focused)
                this.model.focused = true;
        })

        this.top.addEventListener('blur', () => {
            if (this.model.focused)
                this.model.focused = false;
        })
    }
}


// basic container
class ContainerView extends View {
    constructor(model) {
        super(model);

        this.top = document.createElement('div');
        this.bottom = this.top;
        this.top.classList.add('gui-container');

        this.init();
    }

    init() {
        super.init();
    }
}

// allows adding Guim to DOM elements
class WrapperView extends View {
    constructor(model) {
        super(model);

        this.top = document.createElement('div');
        this.bottom = this.top;
        this.top.classList.add('gui-wrapper');

        this.init();
    }

    init() {
        super.init();

        this.model.listen('set-parent', () => {
            console.warn('Set the parent of a WrapperView, this is not reccomended');
        });

        this.model.listen('set-element', element => {
            element.appendChild(this.top);
        });
    }
}

// displys plain text
class TextView extends View {
    constructor(model) {
        super(model);

        this.top = document.createElement('span');
        this.bottom = this.top;        
        this.top.classList.add('gui-text');

        this.init();
    }

    init() {
        super.init();

        this.model.listen('set-text', text => {
            this.top.textContent = text;
        })
    }
}

// image
class ImageView extends View {
    constructor(model) {
        super(model);

        this.top = document.createElement('img');
        this.bottom = this.top;        
        this.top.classList.add('gui-image');

        this.init();
    }

    init() {
        super.init();

        this.model.listen('set-src', src => {
            this.top.src = src;
        });

        this.model.listen('set-alt', alt => {
            this.top.alt = alt;
        });
    }
}

// generic button
class ButtonView extends FocusableView {
    constructor(model) {
        super(model);

        this.top = document.createElement('button');
        this.bottom = this.top;        
        this.top.classList.add('gui-button');

        this.init();
    }

    init() {
        super.init();

        this.top.addEventListener('click', () => {
            this.model.click();
        })
    }
}

// text button
class TextButtonView extends ButtonView {
    constructor(model) {
        super(model);

        this.top.classList.add('gui-text-button');

        this.init();

    }

    init() {
        super.init();
        
        this.model.listen('set-text', text => {
            this.top.textContent = text;
        })
    }
}

// image button
class ImageButtonView extends ButtonView {
    constructor(model) {
        super(model);

        this.top.classList.add('gui-image-button');

        this.image = document.createElement('img');
        this.image.classList.add('gui-image-button-image');
        this.top.appendChild(this.image);

        this.init();
    }

    init() {
        super.init();

        this.model.listen('set-src', src => {
            this.image.src = src;
        });

        this.model.listen('set-alt', alt => {
            this.image.alt = alt;
        });
    }
}

// label
class LabelView extends View {
    constructor(model) {
        super(model);

        this.top = document.createElement('label');
        this.bottom = this.top;
        this.top.classList.add('gui-label');

        this.init();
    }

    init() {
        super.init();

        this.model.listen('set-text', text => {
            this.top.textContent = text;
        });

        this.model.listen('set-target', target => {
            this.top.htmlFor = target;
        })
    }
}

// any input
class InputView extends FocusableView {
    init() {
        super.init();

        this.top.classList.add('gui-input');
    }
}

// text input
class TextInputView extends InputView {
    constructor(model) {
        super(model);

        this.top = document.createElement('input');
        this.top.type = 'text';
        this.bottom = this.top;
        this.top.classList.add('gui-text-input');

        this.init();
    }

    init() {
        super.init();

        this.model.listen('set-value', value => {
            this.top.value = value;
        });

        this.top.addEventListener('input', () => {
            this.model.value = this.top.value;
        });
    }
}

// number input
class NumberInputView extends InputView {
    constructor(model) {
        super(model);

        this.top = document.createElement('input');
        this.top.type = 'number';
        this.bottom = this.top;
        this.top.classList.add('gui-number-input');

        this.init();
    }

    init() {
        super.init();

        this.model.listen('set-value', value => {
            this.top.value = value;
        });

        this.model.listen('set-min', min => {
            this.top.min = min;
        });

        this.model.listen('set-max', max => {
            this.top.max = max;
        });

        this.model.listen('set-step', step => {
            this.top.step = step;
        });

        this.top.addEventListener('input', () => {
            // IMPORTANT: make sure it changed or weird artifacts happen
            if (this.model.value != this.top.value)
                this.model.value = this.top.value;
        });
    }
}

module.exports = { 
    View, FocusableView, ContainerView, WrapperView, TextView, ImageView, ButtonView, TextButtonView, ImageButtonView,
    LabelView, InputView,TextInputView, NumberInputView,
};