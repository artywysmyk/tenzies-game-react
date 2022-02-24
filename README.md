## Tenzies Game App

This is the Tenzies Project from Scrimba, part of their React Course. The challenged included a design file from figma, and its main purpose was to get more comfortable working with React components, useState and useEffect.

The rules of the tenzies game: there are 10 dice. The user can click on the dice to hold it (the color of the held dice turns green). Now, when the user clicks on the "roll" button, the held dice won't change. The user will play this game until all the dice are the same number. Once she/he wins, the app will play a fun confetti drop and the "roll" button will now read "play again". Clicking "play again" will reset the game and the player will start from the beginning.

I added extra features:

- Real dots on the dice (CSS)
- Tracking the number of rolls and time it took to win the game
- Saving best time to Local Storage so the user can try to beat his record in the next round
- Reset button to remove items from Local Storage and reset the game
