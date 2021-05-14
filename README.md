## To Do

[] - Add a CRUD logic
[] - Add a database for books
[] - Add a database for each user
[] - Each user have a database cart

## Data

### User

-   \_id;
-   email;
-   name;
-   password;
-   orders; // An array of objects containing books ids, books prices and purchase date

### book

-   \_id;
-   price;
-   title;
-   author;
-   isbn;
-   publisher;
-   image

### Cart

-   \_userId;
-   data; // An array of books ids
