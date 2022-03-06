CREATE TABLE ORDERS_PRODUCTS (
    quantity integer,
    order_id integer, 
    product_id integer, 
    CONSTRAINT fk_order
   FOREIGN KEY(order_id) 
      REFERENCES orders(id), 
    CONSTRAINT fk_product
   FOREIGN KEY(product_id) 
      REFERENCES products(id)
);