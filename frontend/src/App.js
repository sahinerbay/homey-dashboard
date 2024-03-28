import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './App.css';
import Main from './main';
import {
  createClient,
  cacheExchange,
  fetchExchange,
} from '@urql/core';
import { Provider } from 'urql';
import { HSL_API_URL } from './config';

const client = createClient({
  url: `${HSL_API_URL}?digitransit-subscription-key=${process.env.REACT_APP_HSL_KEY}`,
  exchanges: [cacheExchange, fetchExchange],
});

function App() {
  return (
    <Provider value={client}>
      <div className="App">
        <Main />
      </div>
    </Provider>
  );
}

export default App;
