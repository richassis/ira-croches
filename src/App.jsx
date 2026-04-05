import { BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { CartProvider } from './context/CartContext';
import Layout from './components/layout/Layout';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <CartProvider>
        <Layout>
          <Home />
        </Layout>
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#1A1A1A',
              color: '#fff',
            },
            success: {
              iconTheme: {
                primary: '#D4AF37',
                secondary: '#fff',
              },
            },
          }}
        />
      </CartProvider>
    </Router>
  );
}

export default App;
