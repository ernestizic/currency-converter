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

const ConverterForm = () => {
	const [amount, setAmount] = useState('');
	const [formError, setFormError] = useState(false);
	const [convertFrom, setConvertFrom] = useState('');
	const [convertTo, setConvertTo] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(amount);
		console.log(convertFrom);
	};
	return (
		<form onSubmit={handleSubmit}>
			<FormControl
				required
				sx={{ m: '20px 0', minWidth: '45%', float: 'left' }}
                color="secondary"
			>
				<InputLabel id='select-label'>Convert From</InputLabel>
				<Select
					labelId='select-label'
					id='demo-simple-select-required'
					value={convertFrom}
					label='Convert from *'
					onChange={(e) => setConvertFrom(e.target.value)}
				>
					<MenuItem value=''>
						<em>None</em>
					</MenuItem>
					<MenuItem value={10}>Ten</MenuItem>
					<MenuItem value={20}>Twenty</MenuItem>
					<MenuItem value={30}>Thirty</MenuItem>
				</Select>
				{/* <FormHelperText>Required</FormHelperText> */}
			</FormControl>

			<FormControl
				required
				sx={{ m: '20px 0', minWidth: '45%', float: 'right' }}
                color="secondary"
			>
				<InputLabel id='select-label'>Convert From</InputLabel>
				<Select
					labelId='select-label'
					id='demo-simple-select-required'
					value={convertFrom}
					label='Convert from *'
					onChange={(e) => setConvertFrom(e.target.value)}
				>
					<MenuItem value=''>
						<em>None</em>
					</MenuItem>
					<MenuItem value={10}>Ten</MenuItem>
					<MenuItem value={20}>Twenty</MenuItem>
					<MenuItem value={30}>Thirty</MenuItem>
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
                color="secondary"
			/>

			<Button variant='contained' sx={{ width: '100%', margin: '20px 0' }} size="large" color='secondary'>
				Get Rate
			</Button>
		</form>
	);
};

export default ConverterForm;
