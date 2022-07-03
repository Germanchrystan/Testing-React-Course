import { render, screen, waitFor } from '@testing-library/react';
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
    render(<OrderEntry />);
    /*
    if we used
     const alerts = await screen.findAllByRole('alert', ...)

    Only one of the two errors is going to come back first,
    the matcher is going to take that one and the toHaveLength assertion will fail.
    That is why we need waitFor.
    */
    return await waitFor(async() => {
        return await screen.findAllByRole('alert', {
            name: 'An unexpected error ocurred. Please try again later'
        })
       
    })
    .then((alerts) =>{
        const alertsLength = alerts.length
        expect(alertsLength).toBe(2)
    })
    .catch(error => error);
})
