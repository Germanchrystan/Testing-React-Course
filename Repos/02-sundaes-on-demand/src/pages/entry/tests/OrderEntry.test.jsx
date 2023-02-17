import { render, screen, waitFor } from './../../../test-utils/testing-library-utils';
import OrderEntry from '../OrderEntry';
// Overriding server
import { rest } from 'msw';
import { server } from './../../../mocks/server';

test.only('handles error for scoops and toppings routes', async() => {
    server.resetHandlers(
        rest.get('http://localhost:3030/scoops', (req, res, ctx) => 
            res(ctx.status(500))
        ),
        rest.get('http://localhost:3030/toppings', (req, res, ctx) => 
            res(ctx.status(500))
        )
    )
    render(<OrderEntry setOrderPhase={jest.fn()}/>);
    /*
    if we used
     const alerts = await screen.findAllByRole('alert', ...)

    Only one of the two errors is going to come back first,
    the matcher is going to take that one and the toHaveLength assertion will fail.
    That is why we need waitFor.
    */
    waitFor(async() => {
        const alerts = await screen.findAllByRole('alert', {
            name: 'An unexpected error ocurred. Please try again later'
        })
        const alertsLength = alerts.length
        expect(alertsLength).toBe(2)
       
    })
})
