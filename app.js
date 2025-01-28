const { Console } = require("console");


keepConsoleOpen();

function keepConsoleOpen() {

    // BookInput();
    // const currentBook = {
    //     title: "Elantris",
    //     Author: "Brandon Sanderson"
    // }
    const currenBookList = BookInput();




    const fs = require("fs");

    const JSON_FILE = "BookCollection.json";

    try {
        const jsonData = fs.readFileSync(JSON_FILE);

        const currentBooks = JSON.parse(jsonData);
        IsBookInLibrary(currentBooks);



        console.log(currentBooks);

        // const newBookList = Object.assign({},currentBooks,currenBookList);
        currentBooks.forEach(element => {
            currenBookList.push(element);
        });
        console.log(currenBookList);

    }
    catch (error) {
        console.error(error);
    }
}


function BookInput() {
    const readline = require('readline');
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });




    var libraryLimit = 50;
    var books = Array(libraryLimit);
    var currentIndex = 0;
    console.log("What books would you like to add?");
    rl.on('line', (input) => {
        if (currentIndex >= libraryLimit || input.toLowerCase() == "exit") {
            console.log("Exiting the program, you have added " + currentIndex + " books to your library: ");
            books.forEach(book => {
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

function IsBookInLibrary(currentBooks, bookToCheck)
{

}


class Library {

}

class Book {
    constructor(title, author) {
        this.title = title;
        this.author = author;
    }
}