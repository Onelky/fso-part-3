const fs = require('fs');

const overwriteFile = async (path, data) => {
    try {
        console.log(path, data)

        await fs.promises.writeFile(path, JSON.stringify(data))
        return data;
    }
    catch (error) {
        throw error;
    }

}
const readFile = async (path) => {
    try {
        const persons = await fs.promises.readFile(path ?? './persons.json')
        return JSON.parse(persons.toString());

    }
    catch (error) {
        throw error;
    }

}


module.exports =
{
    overwriteFile,
    readFile
}