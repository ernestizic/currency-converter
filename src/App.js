import axios from 'axios';
import { useState, useEffect } from 'react';
import './App.css';
import Converter from './components/ConverterForm';

function App() {
  const [currencySymbols, setCurrencySymbols] = useState([])

  useEffect(()=> {
  // Get supported symbols that can be converted
    (async()=> {
      const res = await axios.get('https://api.exchangerate.host/symbols')
      const data = res.data.symbols
      let objectValues = Object.values(data)
      setCurrencySymbols(objectValues)
      console.log(objectValues)
    })()
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <h3>Lexie.ai Currency Converter</h3>
      </header>
      <Converter currencySymbols={currencySymbols}/>
    </div>
  );
}

export default App;
