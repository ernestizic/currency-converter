import React, { useState } from 'react';
import PropTypes from 'prop-types';

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

import { useFormik } from 'formik';
import * as Yup from 'yup';

const ConverterForm = ({ currencySymbols }) => {
	const [result, setResult] = useState('');

	const formik = useFormik({
		initialValues: {
			convertFrom: '',
			convertTo: '',
			amount: '',
		},
		validationSchema: Yup.object({
			convertFrom: Yup.string().required('Required field'),
			convertTo: Yup.string().required('Required field'),
			amount: Yup.number()
				.typeError('Invalid entry!')
				.positive()
				.integer()
				.required('Required field'),
		}),
		onSubmit: (values) => {
			performConversion(values);
		},
	});

	// Function to perform conversion
	const performConversion = async (values) => {
		const res = await axios.get(
			`https://api.exchangerate.host/convert?from=${values.convertFrom}&to=${values.convertTo}&amount=${values.amount}`
		);
		setResult(res.data.result);
	};

	return (
		<form onSubmit={formik.handleSubmit}>
			{/* Convert From */}
			<FormControl
				// required
				sx={{ m: '20px 0', minWidth: '45%', float: 'left' }}
				color='secondary'
				error={formik.errors.convertFrom && formik.touched.convertFrom && true}
			>
				{/* <InputLabel id='select-label'>Convert From</InputLabel> */}
				<Select
					labelId='select-label'
					id='demo-simple-select-required'
					name='convertFrom'
					value={formik.values.convertFrom}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					// label='Convert from *'
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
				{formik.errors.convertFrom && formik.touched.convertFrom && (
					<FormHelperText>{formik.errors.convertFrom}</FormHelperText>
				)}
			</FormControl>

			{/* Convert to */}
			<FormControl
				sx={{ m: '20px 0', minWidth: '45%', float: 'right' }}
				color='secondary'
				error={formik.errors.convertTo && formik.touched.convertTo && true}
			>
				<InputLabel id='select-convert-to-label'>Convert To</InputLabel>
				<Select
					labelId='select-convert-to-label'
					id='convert-to'
					name='convertTo'
					label='Convert from *'
					value={formik.values.convertTo}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
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
				{formik.errors.convertTo && formik.touched.convertTo && (
					<FormHelperText>{formik.errors.convertTo}</FormHelperText>
				)}
			</FormControl>

			{/* Amount input field */}
			<TextField
				id='outlined-basic'
				label='Amount'
				name='amount'
				variant='outlined'
				error={formik.errors.amount && formik.touched.amount ? true : false}
				helperText={
					formik.errors.amount && formik.touched.amount && formik.errors.amount
				}
				fullWidth
				value={formik.values.amount}
				onChange={formik.handleChange}
				onBlur={formik.handleBlur}
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

			{result && (
				<p className='result'>
					{formik.values.amount} {formik.values.convertFrom} = {result}{' '}
					{formik.values.convertTo}
				</p>
			)}
		</form>
	);
};

ConverterForm.propTypes = {
	currencySymbols: PropTypes.array.isRequired,
};

export default ConverterForm;
