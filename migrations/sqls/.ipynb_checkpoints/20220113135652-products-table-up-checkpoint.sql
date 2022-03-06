CREATE TABLE PRODUCTS (
    id serial primary key,
    name varchar(100),
    price integer,
    category_id integer, 
    CONSTRAINT fk_category
   FOREIGN KEY(category_id) 
      REFERENCES categories(id)
);