import { render, screen } from '../../../test-utils/testing-library-utils';
import userEvent from "@testing-library/user-event";

import Options from '../Options';

test('displays images for each scoop option from server', async() => {
    render(<Options optionType="scoops" />)
    //find images. Async request => await + findBy
    const scoopImages = await screen.findAllByRole('img', { name: /scoop$/i }); // Name of image = alt prop
    expect(scoopImages).toHaveLength(2)

    // confirm alt text of images
    const altText = scoopImages.map(element => element.alt);
    expect(altText).toEqual(['Chocolate scoop', 'Vanilla scoop']); // Arrays and Objects need to use the toEqual matcher
})

/*
Code Quiz: 
- Create tests for toppings
- add handler for /toppings route
- Handler can return three toppings
[
    {name: 'Cherries', imagePath: '/images/cherries.png'},
    {name: 'M&Ms', imagePath: '/images/m-and-ms.png'},
    {name: 'Hot Fudge', imagePath: '/images/hot-fudge.png'}
]
- Update Options.jsx and create ToppingOption.jsx
*/

test('display images for each topping option from server', async() => {
    render(<Options optionType="toppings" />)
    const toppingImages = await screen.findAllByRole('img', {name: /topping$/i});
    expect(toppingImages).toHaveLength(3)
    
    const altText = toppingImages.map(element => element.alt);
    expect(altText).toEqual(['Cherries topping', 'M&Ms topping', 'Hot Fudge topping'])
})

test("don't updated total if scoops input is invalid", async () => {
    const user = userEvent.setup();
    render(<Options optionType="scoops"/>);

    // wait for the vanilla input to appear after server call
    const vanillaInput = await screen.findByRole("spinbutton", {
        name: "Vanilla",
    })

    // find the scoops subtotal, which starts out at 0
    const scoopsSubtotal = screen.getByText("Scoops total: $0.00");

    // claer the input
    await user.clear(vanillaInput);

    //.type() will type one character at a time
    await user.type(vanillaInput, "2.5");

    // make sure scoops subtotal hasn't updated
    expect(scoopsSubtotal).toHaveTextContent("$0.00");

    // do the same test for "100"

})