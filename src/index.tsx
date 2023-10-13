import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux';
import { BrowserRouter } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AdaptivityProvider } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import LightThemeWrapper from './utils/ChangeTheme'; 

const client = new QueryClient()

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <BrowserRouter>
      <QueryClientProvider client={client}>
        <Provider store={store}>
          <LightThemeWrapper>
            <AdaptivityProvider>
              <App />
            </AdaptivityProvider>
          </LightThemeWrapper>
          <ReactQueryDevtools initialIsOpen={false} />
        </Provider>
      </QueryClientProvider>
    </BrowserRouter>
);
