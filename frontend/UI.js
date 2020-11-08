import BookService from './services/BookService';
const bookService = new BookService;
import {format} from 'timeago.js';

class UI{
    async renderBooks(){
        const books = await bookService.getBooks();
        const booksCardContainer = document.getElementById('books-cards');
        booksCardContainer.innerHTML='';
        console.log(books)
        books.forEach(books => {
            const div=document.createElement('div');
            div.className='';
            div.innerHTML=`
                <div class="card m-2">
                    <div class="row">
                        <div class="col-md-4">
                            <img src="http://localhost:3000${books.imagePath}" alt="" class="img-fluid"/>
                        </div>
                        <div class="col-md-8">
                            <div class="card-block px-2">
                                <h4 class="card-title">${books.title}</h4>
                                <p class="card-text">${books.author}</p>
                                <a href="#" class="btn btn-danger delete" _id="${books._id}">X</a>
                            </div>
                            <div class="card-footer">
                                ${format(books.created_at)}
                            </div>
                        </div>
                    </div>
                </div>
            `;
            booksCardContainer.appendChild(div);
        });
    }

    async addANewBook(book){
        await bookService.postBook(book);
        this.clearBookForm();
        this.renderBooks();
    }

    clearBookForm(){
        document.getElementById('book-form').reset();
    }

    renderMessage(message,colorMessage,secondsToRemove){
        const div=document.createElement('div');
        div.className=`alert alert-${colorMessage} message`;
        div.appendChild(document.createTextNode(message))    

        const container =document.querySelector('.col-md-4');
        const bookForm = document.querySelector('#book-form');
        container.insertBefore(div,bookForm);

        setTimeout(()=>{
            document.querySelector('.message').remove();
        },secondsToRemove)
        console.log('messageR');
    }

    async deleteBook(bookId){
        await bookService.deleteBook(bookId)
        this.renderBooks();
    }
} 


export default UI;