const fs = require('fs');

async function addUserCommandCount(commandName, userId, userDatabase) {
    let userIndex = userDatabase.findIndex(user => user.jid === userId);

    if (userIndex === -1) {
        userDatabase.push({
            jid: userId,
            commandCounts: [{
                name: commandName,
                count: 0
            }]
        });
        saveDatabase('./database/commandUser.json', userDatabase);
        userIndex = userDatabase.length - 1; // Get the new user index
    }

    const commandIndex = userDatabase[userIndex].commandCounts.findIndex(cmd => cmd.name === commandName);

    if (commandIndex === -1) {
        userDatabase[userIndex].commandCounts.push({
            name: commandName,
            count: 1
        });
    } else {
        userDatabase[userIndex].commandCounts[commandIndex].count += 1;
    }
    
    saveDatabase('./database/commandUser.json', userDatabase);
}

async function getUserPosition(userId, commandDatabase) {
    return commandDatabase.findIndex(user => user.jid === userId);
}

async function addCommandCount(commandName, userId, commandDatabase) {
    let _cmdUser = JSON.parse(fs.readFileSync('./database/commandUser.json'));
    await addUserCommandCount(commandName, userId, _cmdUser);
    
    const commandIndex = commandDatabase.findIndex(cmd => cmd.name === commandName);

    if (commandIndex === -1) {
        commandDatabase.push({
            name: commandName,
            count: 1
        });
    } else {
        commandDatabase[commandIndex].count += 1;
    }
    
    saveDatabase('./database/command.json', commandDatabase);
}

function saveDatabase(filePath, data) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

module.exports = {
    addUserCommandCount,
    getUserPosition,
    addCommandCount
};