import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ConverterForm from '../components/ConverterForm';


describe('Conversion form component', () => {

    test('Submit button should be disabled on initial render', ()=> {
        render(<ConverterForm currencySymbols={[{code: 'USD'}, {code: 'AUD'}]}/>)
        expect(screen.getByRole("button", {name: /get exchange rate/i})).toBeDisabled()
    })

    // Input fields should be rendered
    test('convert-from field should be rendered', ()=> {
        render(<ConverterForm currencySymbols={[{code: 'USD'}, {code: 'AUD'}]} />)

        const fromSelectField = screen.getByRole("button", {name: /Convert from AUD/i});
        expect(fromSelectField).toBeInTheDocument()
    })

    test('convert-to field should be rendered', ()=> {
        render(<ConverterForm currencySymbols={[{code: 'USD'}, {code: 'AUD'}]} />)

        const toSelectField = screen.getByRole("button", {name: /convert to/i});
        expect(toSelectField).toBeInTheDocument()
    })

    test('amount field should be rendered', ()=> {
        render(<ConverterForm currencySymbols={[{code: 'USD'}, {code: 'AUD'}]} />)

        const amountField = screen.getByRole("textbox", {name: /amount/i});
        expect(amountField).toBeInTheDocument()
    })



    // convert-from field should be set to AUD on initial render
    test('convert-from field should be set to AUD on initial render', ()=> {
        render(<ConverterForm currencySymbols={[{code: 'USD'}, {code: 'AUD'}]} />)
        
        const convertFromSelectField = screen.getByRole("button", {name: /convert from/i});
        expect(convertFromSelectField.textContent).toBe("AUD")
    })

    
    test('amount field should be empty on initial render', ()=> {
        render(<ConverterForm currencySymbols={[{code: 'USD'}, {code: 'AUD'}]} />)

        const amountField = screen.getByRole("textbox", {name: /amount/i});
        expect(amountField.value).toBe("")
    })



    test('result should be displayed', async()=> {
        const user = userEvent.setup()
        render(<ConverterForm currencySymbols={[{code: 'USD'}, {code: 'AUD'}]} />)

        const submitButton = screen.getByRole("button", {name: /get exchange rate/i})
        await user.click(submitButton)

        expect(screen.getByTestId("result")).toBeInTheDocument()
    })
});