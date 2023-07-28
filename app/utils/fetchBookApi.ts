type Categories = 'Fiction' | 'Romance' | 'Contemporary' | 'history' | 'medical' | 'poetry';


const booksApi = {

    async getBookById(bookId: string) {
        const res = await fetch(`https://www.googleapis.com/books/v1/volumes/${bookId}?key=${process.env.NEXT_PUBLIC_API_KEY}`);
        return res.json();
    },


    // PAS FINI
    async getBookByCategorie() {
        const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=subject:Romance&langRestrict=fr&key=${process.env.NEXT_PUBLIC_API_KEY}`);
        return res.json();
    },



    async getRandomBooks() {
        const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=""&langRestrict=fr&key=${process.env.NEXT_PUBLIC_API_KEY}`);
        return res.json();
    },



    async getBookByName(bookName: string) {
        const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=+intitle:'${bookName}'&key=${process.env.NEXT_PUBLIC_API_KEY}`);
        return res.json();
    },


    async getBooksFromShelf(bookShelfId: number, access_token: string) {
        try {
            const res = await fetch(`https://www.googleapis.com/books/v1/mylibrary/bookshelves/${bookShelfId}/volumes?key=${process.env.NEXT_PUBLIC_API_KEY}`, {
                headers: {
                    Authorization: `Bearer ${access_token}`
                },
            });
            const book = await res.json();
            return book;
        }
        catch (error) {
            console.log(error);
        }
    },


    async addBookToBookShelve(bookId: string, bookShelfId: number, access_token: string) {
        try {
            const res = await fetch(`https://www.googleapis.com/books/v1/mylibrary/bookshelves/${bookShelfId}/addVolume?volumeId=${bookId}&key=${process.env.NEXT_PUBLIC_API_KEY}`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${access_token}`
                },
            });
            const book = await res.json();
            return book;
        }
        catch (error) {
            console.log(error);
        }
    },


    async deleteBookFromShelf(bookId: string, bookShelfId: number, access_token: string) {
        try {
            const res = await fetch(`https://www.googleapis.com/books/v1/mylibrary/bookshelves/${bookShelfId}/removeVolume?volumeId=${bookId}&key=${process.env.NEXT_PUBLIC_API_KEY}`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${access_token}`
                },
            });
            const book = await res.json();
            return book;
        }
        catch (error) {
            console.log(error);
        }
    },


}

export default booksApi;