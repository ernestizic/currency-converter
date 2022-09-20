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

        const fromSelectField = screen.getByRole("button", {name: /Convert from/i});
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
    
    // Amount field should be empty on initial render
    test('amount field should be empty on initial render', ()=> {
        render(<ConverterForm currencySymbols={[{code: 'USD'}, {code: 'AUD'}]} />)

        const amountField = screen.getByRole("textbox", {name: /amount/i});
        expect(amountField.value).toBe("")
    })


    // FORM USER EVENTS
    test("CONVERT FROM select box should bring out options when clicked and select an option", async()=> {
      const user = userEvent.setup()
      render(<ConverterForm currencySymbols={[{code: 'USD'}, {code: 'AUD'}]} />)

      const selectBox = screen.getByLabelText(/convert from/i)
      await user.click(selectBox)
      expect(screen.getAllByRole("option")).toHaveLength(2)

      const selectedOption = screen.getByRole("option", {name: 'USD'})
      await user.click(selectedOption)
      expect(selectedOption).toBeTruthy()
    })

    test("CONVERT TO select box should bring out options when clicked and select an option", async()=> {
      const user = userEvent.setup()
      render(<ConverterForm currencySymbols={[{code: 'USD'}, {code: 'AUD'}]} />)

      const selectBox = screen.getByLabelText(/convert to/i)
      await user.click(selectBox)
      expect(screen.getAllByRole("option")).toHaveLength(2)

      const selectedOption = screen.getByRole("option", {name: 'USD'})
      await user.click(selectedOption)
      expect(selectedOption).toBeTruthy()
    })


    test('Submit button should be enabled when the input fields are filled', async () => {
        const user = userEvent.setup()
        render(<ConverterForm currencySymbols={[{code: 'USD'}, {code: 'AUD'}, {code: 'NGN'}]} />)

        // convert from
        await user.click(screen.getByLabelText(/convert from/i))
        await user.click(screen.getByRole("option", {name: 'USD'}))

        // Convert to
        await user.click(screen.getByLabelText(/convert to/i))
        await user.click(screen.getByRole("option", {name: 'NGN'}))

        // amount
        await user.type(screen.getByRole("textbox", {name: /amount/i}), "300")

        // Submit button should become enabled
        expect(await screen.findByRole("button", {name: /get exchange rate/i})).toBeEnabled()

        const submitButton = screen.getByRole("button", {name: /get exchange rate/i})
        await user.click(submitButton)
    })

});