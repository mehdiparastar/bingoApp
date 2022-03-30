
const getNewTableDetail = () => {
    const temp =
        (
            [
                '(child noises in the background)',
                'Hello, Hello?',
                'i need to jump in another call',
                'can everyone go on mute',
                'could you please get closer to the mic',

                '(load painful echo / feedback)',
                'Next slide, please.',
                'can we take this offline?',
                'is __ on the call?',
                'Could you share this slides afterwards?',

                'can somebody grant presenter rights',
                'can you email that to everyone?',
                'sorry, i had problems logging in',
                '(animal noises in the background)',

                'sorry, i did not found the conference id',
                'i was having connection issues',
                'i will have to get back to you',
                'who just joined',
                'sorry, something __ with my calendar',

                'do you see my screen?',
                'lets wait for __!',
                'You will send the minutes?',
                'sorry, i was in mute.',
                'can you repeat, please?',
            ].sort(function () { return 0.5 - Math.random() })
        )
    return ([...temp.slice(0, 12), 'CONF CALL BINGO 😷', ...temp.slice(12)])
}

const validSelections = [
    [0, 1, 2, 3, 4],
    [5, 6, 7, 8, 9],
    [10, 11, 12, 13, 14],
    [15, 16, 17, 18, 19],
    [20, 21, 22, 23, 24],
    [0, 5, 10, 15, 20],
    [1, 6, 11, 16, 21],
    [2, 7, 12, 17, 22],
    [3, 8, 13, 18, 23],
    [4, 9, 14, 19, 24],
    [0, 6, 12, 18, 24],
    [4, 8, 12, 16, 20],
]

module.exports = {
    getNewTableDetail,
    validSelections
}


