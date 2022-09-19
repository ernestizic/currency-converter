import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { MenuItem, TextField, Button } from '@mui/material';
import axios from 'axios';

import { useFormik } from 'formik';
import * as Yup from 'yup';

const ConverterForm = ({ currencySymbols, isLoading }) => {
	const [result, setResult] = useState('');
	const [apiError, setApiError] = useState('');

	const formik = useFormik({
		initialValues: {
			convertFrom: 'AUD',
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
		try {
			const res = await axios.get(
				`https://api.exchangerate.host/convert?from=${values.convertFrom}&to=${values.convertTo}&amount=${values.amount}`
			);
			setResult(res.data.result);
		} catch (err) {
			setApiError(err.message);
		}
	};

	return (
		<form onSubmit={formik.handleSubmit}>
			{/* CONVERT FROM */}
			<TextField
				id='convert-from-select'
				label='Convert from'
				select
				sx={{ m: '20px 0', minWidth: '45%', float: 'left' }}
				color='secondary'
				error={
					formik.errors.convertFrom && formik.touched.convertFrom ? true : false
				}
				helperText={
					formik.errors.convertFrom &&
					formik.touched.convertFrom &&
					formik.errors.convertFrom
				}
				name='convertFrom'
				value={formik.values.convertFrom}
				onChange={formik.handleChange}
				onBlur={formik.handleBlur}
			>
				{isLoading ? (
					<MenuItem value=''>
						<em>Loading list...</em>
					</MenuItem>
				) : (
					currencySymbols?.map((data, idx) => (
						<MenuItem value={data.code} key={idx}>
							{data.code}
						</MenuItem>
					))
				)}
			</TextField>

			{/* CONVERT TO */}
			<TextField
				id='convert-to-select'
				label='Convert to'
				select
				sx={{ m: '20px 0', minWidth: '45%', float: 'right' }}
				color='secondary'
				error={
					formik.errors.convertTo && formik.touched.convertTo ? true : false
				}
				helperText={
					formik.errors.convertTo &&
					formik.touched.convertTo &&
					formik.errors.convertTo
				}
				name='convertTo'
				value={formik.values.convertTo}
				onChange={formik.handleChange}
				onBlur={formik.handleBlur}
			>
				{isLoading ? (
					<MenuItem value=''>
						<em>Loading list...</em>
					</MenuItem>
				) : (
					currencySymbols?.map((data, idx) => (
						<MenuItem value={data.code} key={idx}>
							{data.code}
						</MenuItem>
					))
				)}
			</TextField>

			{/* Amount input field */}
			<TextField
				id='amount'
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
				disabled={!(formik.isValid && formik.dirty)}
			>
				Get Exchange Rate
			</Button>

			{result && (
				<p className='result' data-testid="result">
					{formik.values.amount} {formik.values.convertFrom} = {result}{' '}
					{formik.values.convertTo}
				</p>
			)}
			{apiError && <span className='apiErr'>{apiError}</span>}
		</form>
	);
};

ConverterForm.propTypes = {
	currencySymbols: PropTypes.array.isRequired,
};

export default ConverterForm;
