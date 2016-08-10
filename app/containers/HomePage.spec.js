import {expect} from 'chai';
import React from 'react';
import {
    renderIntoDocument,
    findRenderedDOMComponentWithClass
} from 'react-addons-test-utils';
import {Provider} from 'react-redux';
import HomePage from './HomePage';
import configureStore from '../store/configureStore';

function setup(initialState) {
    const store = configureStore(initialState);
    const homePage = renderIntoDocument(
        <Provider store={store}>
            <HomePage />
        </Provider>
    );
    return {
        homePage,
        div: findRenderedDOMComponentWithClass(homePage, 'home-page')
    };
}

describe('containers', () => {
    describe('HomePage', () => {
        it('should display Hello, World!', () => {
            const {div} = setup();
            expect(div.textContent).to.match(/^Hello, World!$/);
        });
    });
});