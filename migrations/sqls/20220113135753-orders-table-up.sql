CREATE TABLE ORDERS (
    id serial primary key,
    status varchar(50),
    user_id integer, 
    CONSTRAINT fk_user
   FOREIGN KEY(user_id) 
      REFERENCES users(id)
);