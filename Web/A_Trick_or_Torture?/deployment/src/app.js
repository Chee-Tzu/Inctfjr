const express = require('express');

const app = express();

const PORT = process.env.PORT || 9021;
const flagString = "inctfj{Th1S_IS_IT_MY_FRIEND_WE_W1N}";
const flagInterval = 30 * 1000; // 30 seconds change to HOURS LATER....
let currentIndex = 0;

app.get('/', (req, res) => {
    const currentTime = new Date().getTime();
    const nextIndex = Math.floor((currentTime / flagInterval) % flagString.length);

    if (nextIndex !== currentIndex) {
        currentIndex = nextIndex;
    }

    const binaryLetter = flagString[currentIndex].charCodeAt(0).toString(2);

    res.setHeader('Refresh', `10; url=http://localhost:${PORT}`);
    res.send(binaryLetter);
});

app.listen(PORT, () => {
    console.log(`Server is listening at http://localhost:${PORT}`);
});
