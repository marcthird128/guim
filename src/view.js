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
    constructor(element) {
        this.element = element;

        // this is fired
        // when the internal parent (_parent)
        // is changed, so we need to
        // do nothing
        // and NOT update the DOM since the model
        // will send a different event that's more specific
        this.element.listen('set-parent', parent => {
           // do nothing
        });

        // this is fired when a child is inserted
        // at a specific index,
        // so we need to add it to the correct parent
        this.element.listen('run-add-child', (child, index) => {
            // get the child *after* this child
            // so we can use insertBefore
            let after = this.element.children[index+1];

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
        this.element.listen('run-remove-child', child => {
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
    }
}

// displys plain text
class TextView extends View {
    constructor(element) {
        super(element);

        this.top = document.createElement('span');
        this.top.classList.add('gui-text');
        this.bottom = this.top;

        this.element.listen('set-text', text => {
            this.top.textContent = text;
        })
    }
}

// allows adding Guim to DOM elements
class WrapperView extends View {
    constructor(element) {
        super(element);

        this.top = document.createElement('div');
        this.top.classList.add('gui-wrapper');
        this.bottom = this.top;

        this.element.listen('set-parent', () => {
            console.warn('Set the parent of a WrapperView, this is not reccomended');
        });

        this.element.listen('set-element', element => {
            element.appendChild(this.top);
        });
    }
}

module.exports = { View, TextView, WrapperView };