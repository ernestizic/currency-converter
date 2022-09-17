import { useEffect } from 'react';
import './App.css';
import Converter from './components/ConverterForm';

function App() {
  useEffect(()=> {
    
  }, [])

  // Get supported symbols that can be converted
  // const getSupportedSymbols =()=> {
  //   const res = 
  // }

  return (
    <div className="App">
      <header className="App-header">
        <h3>Lexie.ai Currency Converter</h3>
      </header>
      <Converter />
      <p className='result'>Result here: 0.00</p>
    </div>
  );
}

export default App;
