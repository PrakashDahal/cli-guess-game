#!/usr/bin/env node

import inquirer from 'inquirer';
import chalkAnimation from 'chalk-animation';


let attempt = 3;
let randomNumber;

const levelRules = {
    Easy: '10',
    Medium: '50',
    Hard: '100',
    SuperHard: '1000'
}


function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    //The maximum and minimum is inclusive
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function setRandomNumber() {
    const level = await setLevel()

    randomNumber = getRandomIntInclusive(1, levelRules[level] || levelRules.Easy)
}

async function setLevel() {
    const level = await inquirer.prompt({
        name: 'value',
        type: 'list',
        message: 'Choose level?',
        choices: [
            'Easy',
            'Medium',
            'Hard',
            'SuperHard'
        ]
    });
    console.log();
    return level.value
}

async function takeValue() {
    const userValue = await inquirer.prompt({
        name: 'entered_number',
        type: 'input',
        message: 'GUESS THE NUMBER?',
        default() {
            return '0';
        }
    });
    return userValue.entered_number
}

const sleep = (ms = 1000) => new Promise((r) => setTimeout(r, ms))


async function checkNumber(num) {
    if (num == randomNumber) {
        const winner = chalkAnimation.rainbow('WINNER');
        await sleep()
        winner.stop()
        process.exit(0);
    } else if (num < randomNumber) {
        console.log("TOO LOW\n");
    } else {
        console.log("TOO HIGH\n");
    }
    await startGame()
}

async function startGame() {
    if (attempt > 0) {
        attempt--;
        let userNumber = await takeValue()
        checkNumber(userNumber)
    } else {
        const looser = chalkAnimation.karaoke(`YOU LOSE! THE NUMBER WAS ${randomNumber}`);
        await sleep()
        looser.stop()
        process.exit(1);
    }
}

async function main() {
    await setRandomNumber()
    await startGame()
}

main()
