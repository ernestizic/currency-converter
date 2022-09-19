import axios from 'axios';
import { useState, useEffect } from 'react';
import './App.css';
import Converter from './components/ConverterForm';

function App() {
	const [currencySymbols, setCurrencySymbols] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		// Get supported symbols that can be converted
		(async () => {
			setIsLoading(true)
			try {
				const res = await axios.get('https://api.exchangerate.host/symbols')
				const data = res.data.symbols
				let objectValues = Object.values(data)
				setCurrencySymbols(objectValues)
				setIsLoading(false)
			} catch (err) {
				console.log(err.message);
			}
		})();
	}, []);

	return (
		<div className='App'>
			<header className='App-header'>
				<h3>Lexie.ai Currency Converter</h3>
			</header>
			<Converter currencySymbols={currencySymbols} isLoading={isLoading} />
		</div>
	);
}

export default App;
