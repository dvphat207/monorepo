import './register';
import 'react-toastify/dist/ReactToastify.css';

import HomePage from './pages/HomePage/HomePage';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
      <HomePage />
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
