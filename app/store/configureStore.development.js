import {createStore, applyMiddleware, compose} from 'redux';
import {hashHistory} from 'react-router';
import {routerMiddleware} from 'react-router-redux';
import rootReducer from '../reducers';

const router = routerMiddleware(hashHistory);

const enhancer = compose(
    applyMiddleware(router),
    window.devToolsExtension ? window.devToolsExtension() : noop => noop
);

export default function configureStore(initialState) {
    const store = createStore(rootReducer, initialState, enhancer);

    if (window.devToolsExtension) {
        window.devToolsExtension.updateStore(store);
    }

    if (module.hot) {
        module.hot.accept('../reducers', () =>
            store.replaceReducer(require('../reducers')) // eslint-disable-line global-require
        );
    }

    return store;
}
