// Initialize the neural network using Brain.js
const network = new brain.NeuralNetwork();

// Train the neural network with examples of background colors and ideal text colors
network.train([
    {input: {r: 0, g: 0, b: 0}, output: {color: 1}},   // Black background -> White text
    {input: {r: 1, g: 1, b: 1}, output: {color: 0}},   // White background -> Black text
    {input: {r: 0, g: 1, b: 0}, output: {color: 0}},   // Green background -> Black text
    {input: {r: 0, g: 0.43, b: 1}, output: {color: 1}}, // Blue background -> White text
    {input: {r: 1, g: 0, b: 0}, output: {color: 1}}    // Red background -> White text
]);

/**
 * Function to update the background color and predict the ideal text color
 * based on the selected color using the neural network.
 * @param {Object} color - Color object from the jscolor input.
 */
const updateColor = (color) => {
    const { r, g, b } = color.channels; // Destructure RGB channels

    // Normalize RGB values (0-255) to the range (0-1) for neural network input
    const input = {
        r: r / 255,
        g: g / 255,
        b: b / 255
    };

    // Run the neural network to predict the appropriate text color
    const result = network.run(input);

    // Get the website section to update its styles
    const sitio = document.getElementById('sitio');
    sitio.style.backgroundColor = color.toHEXString();  // Update background color
    sitio.style.color = result.color > 0.5 ? 'white' : 'black';  // Update text color based on prediction
};
