import { ThemeProvider } from '../context/themeContext';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { swapiApi } from '../store/swapiApi';
import type { RenderOptions } from '@testing-library/react';
import { render } from '@testing-library/react';
import React, { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { charactersReducer } from '../store/charactersSlice';
import { selectedCharactersReducer } from '../store/selectedCharactersSlice';

const rootReducer = combineReducers({
  [swapiApi.reducerPath]: swapiApi.reducer,
  characters: charactersReducer,
  selected: selectedCharactersReducer,
});

export function setupStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(swapiApi.middleware),
    preloadedState,
  });
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: Partial<RootState>;
  store?: AppStore;
}

export function renderWithProviders(ui: React.ReactElement, extendedRenderOptions: ExtendedRenderOptions = {}) {
  const { preloadedState = {}, store = setupStore(preloadedState), ...renderOptions } = extendedRenderOptions;

  const Wrapper = ({ children }: PropsWithChildren) => (
    <Provider store={store}>
      <ThemeProvider>{children}</ThemeProvider>
    </Provider>
  );

  return {
    store,
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
}
