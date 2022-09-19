import { render, screen } from '@testing-library/react';
import App from './App';
import axios from 'axios';


jest.mock('axios');

const countryCode = [
  {
    id: 1,
    code: 'AUD',
  },
  {
    id: 2,
    code: 'USD',
  },
  {
    id: 3,
    code: 'NGN',
  },
]

const mockChildComponent = jest.fn();

jest.mock("./components/ConverterForm", () => (props) => {
  mockChildComponent(props);
  return <mock-childComponent />;
});

describe('Main App component', ()=> {
  test('App header should be rendered', () => {
    render(<App />);

    const header = screen.getByText(/Lexie.ai Currency Converter/i);
    expect(header).toBeInTheDocument();
  });

  test('country code data props should be passed to child component', ()=> {
    axios.get.mockResolvedValue({ data: countryCode });
    render(<App />)

    expect(mockChildComponent).toHaveBeenCalledWith(
      expect.objectContaining({
        currencySymbols: [],
        isLoading: true
      })
    )
  })
})

