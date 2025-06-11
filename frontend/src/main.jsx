import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import App from './App.jsx'
import { ChakraProvider } from '@chakra-ui/react'

// import Footer from '../components/Footer'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ChakraProvider>
    <App />
    {/* <Footer /> */}
    </ChakraProvider>
  </StrictMode>,
)
