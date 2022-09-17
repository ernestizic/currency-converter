import React, { useState } from 'react';
import {
	MenuItem,
	Select,
	TextField,
	FormControl,
	InputLabel,
	FormHelperText,
	Button,
} from '@mui/material';
import axios from 'axios';

const ConverterForm = ({ currencySymbols }) => {
	const [amount, setAmount] = useState('');
	const [formError, setFormError] = useState(false);
	const [convertFrom, setConvertFrom] = useState('');
	const [convertTo, setConvertTo] = useState('');
	const [result, setResult] = useState('');

	// Function to perform conversion
	const performConversion = async () => {
		const res = await axios.get(
			`https://api.exchangerate.host/convert?from=${convertFrom}&to=${convertTo}&amount=${amount}`
		);
		setResult(res.data.result);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		performConversion();
	};
	return (
		<form onSubmit={handleSubmit}>
			{/* Convert From */}
			<FormControl
				// required
				sx={{ m: '20px 0', minWidth: '45%', float: 'left' }}
				color='secondary'
			>
				{/* <InputLabel id='select-label'>Convert From</InputLabel> */}
				<Select
					labelId='select-label'
					id='demo-simple-select-required'
					value={convertFrom}
					// label='Convert from *'
					onChange={(e) => setConvertFrom(e.target.value)}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
				>
					<MenuItem value=''>
						<em>AUD</em>
					</MenuItem>
					{currencySymbols?.map((data, idx) => (
						<MenuItem value={data.code} key={idx}>
							{data.code}
						</MenuItem>
					))}
				</Select>
				{/* <FormHelperText>Required</FormHelperText> */}
			</FormControl>

			{/* Convert to */}
			<FormControl
				// required
				sx={{ m: '20px 0', minWidth: '45%', float: 'right' }}
				color='secondary'
			>
				<InputLabel id='select-label'>Convert To</InputLabel>
				<Select
					labelId='select-label'
					id='demo-simple-select-required'
					value={convertTo}
					label='Convert from *'
					onChange={(e) => setConvertTo(e.target.value)}
				>
					<MenuItem value=''>
						<em>None</em>
					</MenuItem>
					{currencySymbols?.map((data, idx) => (
						<MenuItem value={data.code} key={idx}>
							{data.code}
						</MenuItem>
					))}
				</Select>
				{/* <FormHelperText>Required</FormHelperText> */}
			</FormControl>

			{/* Amount input field */}
			<TextField
				id='outlined-basic'
				label='Amount'
				variant='outlined'
				error={formError ? true : false}
				autoFocus={formError ? true : false}
				helperText={formError ? 'Incorrect entry!' : ''}
				fullWidth
				value={amount}
				onChange={(e) => setAmount(e.target.value)}
				color='secondary'
			/>

			<Button
				type='submit'
				variant='contained'
				sx={{ width: '100%', margin: '20px 0' }}
				size='large'
				color='secondary'
			>
				Get Exchange Rate
			</Button>

			{result && <p className='result'>Result here: {result}</p>}

		</form>
	);
};

export default ConverterForm;
