

keepConsoleOpen();

function keepConsoleOpen()
{
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
        if(currentIndex >= libraryLimit || input.toLowerCase() == "exit")
        {
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


class Library
{

}

class Book
{
    constructor(title, author)
    {
        this.title = title;
        this.author = author;
    }
}