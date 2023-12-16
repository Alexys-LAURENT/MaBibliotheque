import { format } from 'date-fns';
type Categories = 'Fiction' | 'Romance' | 'Contemporary' | 'history' | 'medical' | 'poetry';


const booksApi = {

    async getBookById(bookId: string) {
        const res = await fetch(`https://www.googleapis.com/books/v1/volumes/${bookId}?key=${process.env.NEXT_PUBLIC_API_KEY}`, {
            cache: 'force-cache',
        });
        return res.json();
    },


    async getBookByName(bookName: string) {
        const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:'${bookName}'&maxResults=40&key=${process.env.NEXT_PUBLIC_API_KEY}`, {
            cache: 'force-cache',
            next: {
                revalidate: 86400
            }
        });
        return res.json();
    },


    async getBooksFromShelf(bookShelfId: number, access_token: string) {
        try {
            const res = await fetch(`https://www.googleapis.com/books/v1/mylibrary/bookshelves/${bookShelfId}/volumes?maxResults=40&key=${process.env.NEXT_PUBLIC_API_KEY}`, {
                headers: {
                    Authorization: `Bearer ${access_token}`
                },
                next: {
                    revalidate: 300
                }
            });
            const book = await res.json();
            return book;
        }
        catch (error) {
            console.log(error);
        }
    },


    async getRandomAuthorBooks(access_token: string) {
        try {
            // Récupérer la liste des livres favoris de l'utilisateur depuis l'API Google Books
            const books = await this.getBooksFromShelf(0, access_token);

            // Vérifier s'il y a des livres dans les favoris
            if (books.totalItems > 0) {
                // Filtrer les livres qui ont des auteurs définis
                const booksWithAuthors = books.items.filter((book: any) => book.volumeInfo.authors && book.volumeInfo.authors.length > 0);

                // Si au moins un livre a un auteur
                if (booksWithAuthors.length > 0) {
                    // Récupérer la liste de tous les auteurs
                    const allAuthors = booksWithAuthors.reduce((authors: String[], book: any) => {
                        const bookAuthors = book.volumeInfo.authors;
                        return authors.concat(bookAuthors);
                    }, []);

                    // Supprimer les doublons des auteurs
                    const uniqueAuthors = [...new Set(allAuthors)];

                    // Générer un nombre basé sur la date du jour
                    const today = new Date();
                    const dayNumber = parseInt(format(today, 'd'), 10);

                    // Choisissez 5 auteurs aléatoires si le nombre d'auteurs est supérieur à 5
                    const startSliceIndex = dayNumber % uniqueAuthors.length;
                    const endSliceIndex = startSliceIndex + 5 > uniqueAuthors.length
                        ? uniqueAuthors.length
                        : startSliceIndex + 5;

                    const selectedAuthors = uniqueAuthors.slice(startSliceIndex, endSliceIndex);

                    // Faire une requête pour chaque auteur
                    const allAuthorsBooksPromises = selectedAuthors.map(async author => {
                        const authorBooksResponse = await fetch(`https://www.googleapis.com/books/v1/volumes?q=+inauthor:${author}&maxResults=40&key=${process.env.NEXT_PUBLIC_API_KEY}`, {
                            next: {
                                revalidate: 86400
                            }
                        });
                        return authorBooksResponse.json();
                    });

                    // Attendre toutes les requêtes pour les auteurs
                    const allAuthorsBooksData = await Promise.all(allAuthorsBooksPromises);

                    // Retourner la liste de livres de tous les auteurs
                    return allAuthorsBooksData.flatMap(data => data.items);
                }
            }

            // Si aucun livre favori avec auteur n'est trouvé, faire une requête pour récupérer des livres aléatoires
            const randomBooksResponse = await fetch(`https://www.googleapis.com/books/v1/volumes?q=subject:+Fiction&langRestrict=fr&key=${process.env.NEXT_PUBLIC_API_KEY}`, {
                next: {
                    revalidate: 86400
                }

            });
            const randomBooksData = await randomBooksResponse.json();

            // Retourner la liste de livres aléatoires
            return randomBooksData.items;
        } catch (error) {
            console.error(error);
            throw error;
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