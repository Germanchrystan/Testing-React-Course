import { render, screen } from '@testing-library/react';

import Options from './../Options';

test('displays images for each scoop option from server', async() => {
    render(<Options optionType="scoops" />)
    //find images
    const scoopImages = await screen.findAllByRole('img', { name: /scoop$/i }); // Name of image = alt prop
    expect(scoopImages).toHaveLength(2)

    // confirm alt text of images
    const altText = scoopImages.map(element => element.alt);
    expect(altText).toEqual(['Chocolate scoop', 'Vanilla scoop']); // Arrays and Objects need to use the toEqual matcher



})