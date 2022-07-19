import React from 'react';
import SearchField from './SearchField';
const { render, fireEvent, screen } = require('@testing-library/react')

const onChange = (
    jest.fn()
)

const props = {
    placeholder: 'ingrese text',
    onChange,
    type: 'string',
  };

test('Render the search-field', async() => {
    render(<SearchField {...props} style='map'/>)
})

test('Obtain TextField whithin the SearchField', async()=> {
    render(<SearchField {...props} style='map'/>)
    const textArea = screen.getByRole('textbox')
    expect(textArea.classList[0]).toBe('search-field-map-input')
    expect(textArea.value).toBe('')
})

test('Change TextField value', async() => {
    render(<SearchField {...props} style={'map'}/>)
    const textArea = screen.getByRole('textbox')
    
    fireEvent.change(textArea, {target: {value: 'some value'}})
    expect(textArea.value).toBe('some value')
    const button = screen.getByRole('button')
})