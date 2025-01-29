// Imports
const { Console } = require("console");
const fs = require("fs");
const readline = require('readline');
const crypto = require('crypto');

// Global variables
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const JSON_USERFILE = "UserData.json";


keepConsoleOpen();


function keepConsoleOpen()
{


    // const JSON_FILE = "BookCollection.json";

    // try
    // {
    //     const jsonData = fs.readFileSync(JSON_FILE);

    //     const currentBooks = JSON.parse(jsonData);
    //     IsBookInLibrary(currentBooks);



    //     console.log(currentBooks);
    //     const currentBookList = [];
    //     currentBooks.forEach(element =>
    //     {
    //         currentBookList.push(element);
    //     });
    //     console.log(currentBookList);

    // }
    // catch (error)
    // {
    //     console.error(error);
    // }
    try
    {
        const user = UserInput();
        if (user === null)
        {
            throw new Error("ERROR: User value null");
        }

    }
    catch (error)
    {
        console.error(error);
    }

}


function UserInput()
{
    const minLength = 4;
    var user = null;
    console.log("Input username");
    try
    {

        rl.on('line', (input) =>
        {
            // Does user exist?
            // If yes -> return that user
            // If no -> create a new user and return this
            if (input.length < minLength)
            {
                throw new Error("ERROR: Username must be at least " + minLength + " characters long.")
            }

            // Functions should never be called on empty string
            if (!DoesUserExist(input))
            {
                user = WriteUserData(input);
                console.log(user);
                console.log("User does not exist, adding new user: " + user.username);
            }
            else
            {
                user = GetUser(input);
                console.log("Welcome back to the library " + user.username)
            }
            rl.close();
            return user;

        });
    }
    catch (error)
    {
        console.error(error);
    }
}

function BookInput()
{


    var libraryLimit = 50;
    var books = Array(libraryLimit);
    var currentIndex = 0;
    console.log("What books would you like to add?");
    rl.on('line', (input) =>
    {
        if (currentIndex >= libraryLimit || input.toLowerCase() == "exit")
        {
            console.log("Exiting the program, you have added " + currentIndex + " books to your library: ");
            books.forEach(book =>
            {
                console.log("> " + book)
            });
            rl.close();
            return;
        }
        books[currentIndex] = input;
        console.log(`Added: ${input}`);
        console.log('Add another book or EXIT?');
        currentIndex++;
    });

}


function DoesUserExist(username)
{
    return GetUser(username) !== null;
}

function GetUser(username)
{
    const data = ReadUserData();
    var currentUser = null;
    data.forEach(user =>
    {
        if (user.username == username)
        {
            currentUser = user;
        }
    });
    return currentUser;
}

function GetAllUsers()
{
    const data = ReadUserData();
    return data;
}

// Reads data from UserData.json file
function ReadUserData()
{
    const userData = fs.readFileSync(JSON_USERFILE);
    return JSON.parse(userData);
}


// Writes data to UserData.json file
function WriteUserData(username)
{
    const currentUserData = ReadUserData();

    const ID = GenerateRandomID(username);
    const newUser = { username, ID };
    const newUserData = [];
    newUserData.push(newUser);
    currentUserData.forEach(user =>
    {
        newUserData.push(user);
        newUserData.reverse();
    });

    fs.writeFileSync(JSON_USERFILE, JSON.stringify(newUserData));
    return newUser;
}

function GenerateRandomID(username)
{
    return crypto.createHash('sha1').update(username).digest('hex');
}


class Book
{
    constructor(title, author)
    {
        this.title = title;
        this.author = author;
    }
}