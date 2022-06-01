# Color Button App


### What if I am not sure of which role to use?
As far as the role goes, there is always the option to give a nonexistent role. When we do this, the console would return an error in which it tells which roles it found.

´´´
...
const colorButton = screen.getByRole('butt', {name: 'Change to blue'})
...
´´´

´´´
Here are the accessible roles: 
    button:

    Name "Change to blue":
    <button />
´´´