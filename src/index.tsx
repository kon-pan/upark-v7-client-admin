import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { AuthContextProvider } from './common/contexts/AuthContex';
import ScreenSizeContextProvider from './common/contexts/ScreenSizeContext';

ReactDOM.render(
  <AuthContextProvider>
    <ScreenSizeContextProvider>
      <App />
    </ScreenSizeContextProvider>
  </AuthContextProvider>,
  document.getElementById('root')
);
