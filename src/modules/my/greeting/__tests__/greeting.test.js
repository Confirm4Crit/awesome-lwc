// These tests are examples to get you started on how how to test
// Lightning Web Components using the Jest testing framework.
//
// See the LWC Recipes Open Source sample application for many other
// test scenarios and best practices.
//
// https://github.com/trailheadapps/lwc-recipes-oss

import { createElement } from 'lwc';
import MyGreeting from 'my/greeting';

describe('my-greeting', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('contains a div that controls animation.', () => {
        const SPEED_CLASS_VALUES = ['fade-slow', 'fade-fast', 'fade-medium'];

        const element = createElement('my-greeting', {
            is: MyGreeting
        });
        document.body.appendChild(element);

        // Get div element
        const divEl = element.shadowRoot.querySelector('div');

        expect(
            SPEED_CLASS_VALUES.indexOf(divEl.className)
        ).toBeGreaterThanOrEqual(0);
    });

    it('contains a span tag that displays the greeting message.', () => {
        const INITIAL_GREETING = 'Hello';

        const element = createElement('my-greeting', {
            is: MyGreeting
        });
        document.body.appendChild(element);

        // Get span element
        const spanEl = element.shadowRoot.querySelector('span');

        expect(spanEl.textContent).toBe(INITIAL_GREETING);
    });
});
