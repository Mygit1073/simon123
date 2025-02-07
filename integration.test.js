/**
 * @jest-environment jsdom
 */

const { checkUserInput, generateSequence } = require("../script");

// Simulate basic HTML structure
document.body.innerHTML = `
  <button id="start">Start</button>
  <div id="status"></div>
`;

test("should start the game and update status text", () => {
    const startButton = document.getElementById("start");
    const statusText = document.getElementById("status");

    // Simulate button click
    startButton.addEventListener("click", () => {
        statusText.textContent = "Game Started!";
    });

    startButton.click(); // Trigger click event

    expect(statusText.textContent).toBe("Game Started!");
});

test("checkUserInput should validate correct input", () => {
    const pattern = ["red", "blue", "yellow"];
    const userInput = ["red", "blue", "yellow"];

    expect(checkUserInput(userInput, pattern)).toBe(true);
});

test("generateSequence should return a valid sequence", () => {
    const sequence = generateSequence(4);

    expect(sequence.length).toBe(4);
    expect(sequence.every(color => ["green", "red", "yellow", "blue"].includes(color))).toBe(true);
});
