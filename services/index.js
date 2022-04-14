const {overwriteFile, readFile} = require("../utils");
const path = require('path')
const dataPath = path.resolve(__dirname, '../persons.json');

async function getPersons() {
    try {
        return await readFile(dataPath);
    }
    catch (e) {
        throw e;
    }

}

function isRepeatedName(data, name) {
    try {
        return data.some((person) => person.name === name);
    }
    catch (e) {
        throw e;
    }
}

async function addPerson(newPerson) {
    try {
        const persons = await readFile(dataPath);

        if (!(newPerson && newPerson.name && newPerson.number)){
            return {message: 'Incomplete data'};
        }
        if (isRepeatedName(persons, newPerson.name)){
            return {message: 'Name already exists'};
        }
        newPerson.id = Math.round(Math.random() * 10000);
        persons.push(newPerson);
        await overwriteFile(dataPath, persons);
        return newPerson;
    }
    catch (e) {
        throw e;
    }

}

async function getTotalPersons() {
    try {
        const persons = await readFile(dataPath);
        return persons.length;
    }
    catch (e) {
        throw e;
    }

}

async function getPerson(id) {
    try {
        const persons = await readFile(dataPath);
        return persons.find((person) => person.id === parseInt(id));
    }
    catch (e) {
        throw e;
    }
}

async function deletePerson (id) {
    try {
        const persons = await readFile(dataPath);
        const resultData = persons.filter((person) => person.id !== parseInt(id));
        await overwriteFile(dataPath, resultData);
        return resultData;
    }
    catch (error) {
        throw error;
    }
}
module.exports = {getPersons, getPerson, getTotalPersons, deletePerson, addPerson};