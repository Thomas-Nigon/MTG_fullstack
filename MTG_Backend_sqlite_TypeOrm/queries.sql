CREATE TABLE IF NOT EXISTS  (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  author VARCHAR(255) NOT NULL,
  price INT NOT NULL,
  created_at DATE NOT NULL DEFAULT CURRENT_DATE,
  img_url VARCHAR(255) NOT NULL,
  city TEXT NOT NULL
);

INSERT INTO ad (title, description, author, price, created_at, img_url, city) VALUES ('Ad 1', 'Description of ad 1', 'Author 1', 30, '2023-09-01', 'https://example.com/image1.jpg', 'Bordeaux');

INSERT INTO ad (title, description, author, price, created_at, img_url, city) VALUES ('Ad 2', 'Description of ad 2', 'Author 2', 25, '2023-09-02', 'https://example.com/image2.jpg', 'Lille');

INSERT INTO ad (title, description, author, price, created_at, img_url, city) VALUES ('Ad 3', 'Description of ad 3', 'Author 3', 40, '2023-09-03', 'https://example.com/image3.jpg', 'Paris');

INSERT INTO ad (title, description, author, price, created_at, img_url, city) VALUES ('Ad 4', 'Description of ad 4', 'Author 4', 35, '2023-09-04', 'https://example.com/image4.jpg', 'Bordeaux');

INSERT INTO ad (title, description, author, price, created_at, img_url, city) VALUES ('Ad 5', 'Description of ad 5', 'Author 5', 50, '2023-09-05', 'https://example.com/image5.jpg', 'Lille');

INSERT INTO ad (title, description, author, price, created_at, img_url, city) VALUES ('Ad 6', 'Description of ad 6', 'Author 6', 20, '2023-09-06', 'https://example.com/image6.jpg', 'Paris');

INSERT INTO ad (title, description, author, price, created_at, img_url, city) VALUES ('Ad 7', 'Description of ad 7', 'Author 7', 45, '2023-09-07', 'https://example.com/image7.jpg', 'Bordeaux');

INSERT INTO ad (title, description, author, price, created_at, img_url, city) VALUES ('Ad 8', 'Description of ad 8', 'Author 8', 55, '2023-09-08', 'https://example.com/image8.jpg', 'Lille');

INSERT INTO ad (title, description, author, price, created_at, img_url, city) VALUES ('Ad 9', 'Description of ad 9', 'Author 9', 60, '2023-09-09', 'https://example.com/image9.jpg', 'Paris');

INSERT INTO ad (title, description, author, price, created_at, img_url, city) VALUES ('Ad 10', 'Description of ad 10', 'Author 10', 70, '2023-09-10', 'https://example.com/image10.jpg', 'Bordeaux');

INSERT INTO ad (title, description, author, price, created_at, img_url, city) VALUES ('Ad 11', 'Description of ad 11', 'Author 11', 80, '2023-09-11', 'https://example.com/image11.jpg', 'Lille');

INSERT INTO ad (title, description, author, price, created_at, img_url, city) VALUES ('Ad 12', 'Description of ad 12', 'Author 12', 90, '2023-09-12', 'https://example.com/image12.jpg', 'Paris');

INSERT INTO ad (title, description, author, price, created_at, img_url, city) VALUES ('Ad 13', 'Description of ad 13', 'Author 13', 100, '2023-09-13', 'https://example.com/image13.jpg', 'Bordeaux');

INSERT INTO ad (title, description, author, price, created_at, img_url, city) VALUES ('Ad 14', 'Description of ad 14', 'Author 14', 110, '2023-09-14', 'https://example.com/image14.jpg', 'Lille');

INSERT INTO ad (title, description, author, price, created_at, img_url, city) VALUES ('Ad 15', 'Description of ad 15', 'Author 15', 120, '2023-09-15', 'https://example.com/image15.jpg', 'Paris');

INSERT INTO ad (title, description, author, price, created_at, img_url, city) VALUES ('Ad 16', 'Description of ad 16', 'Author 16', 130, '2023-09-16', 'https://example.com/image16.jpg', 'Bordeaux');

INSERT INTO ad (title, description, author, price, created_at, img_url, city) VALUES ('Ad 17', 'Description of ad 17', 'Author 17', 140, '2023-09-17', 'https://example.com/image17.jpg', 'Lille');

INSERT INTO ad (title, description, author, price, created_at, img_url, city) VALUES ('Ad 18', 'Description of ad 18', 'Author 18', 150, '2023-09-18', 'https://example.com/image18.jpg', 'Paris');

INSERT INTO ad (title, description, author, price, created_at, img_url, city) VALUES ('Ad 19', 'Description of ad 19', 'Author 19', 160, '2023-09-19', 'https://example.com/image19.jpg', 'Bordeaux');

INSERT INTO ad (title, description, author, price, created_at, img_url, city) VALUES ('Ad 20', 'Description of ad 20', 'Author 20', 170, '2023-09-20', 'https://example.com/image20.jpg', 'Lille');




SELECT * FROM ad;


SELECT * FROM ad WHERE city = 'Bordeaux';


DELETE FROM ad WHERE price > 40;


UPDATE ad SET price = 0 WHERE created_at = '2023-09-01';


SELECT AVG(price) FROM ad WHERE city = 'Paris';


SELECT AVG(price) FROM ad GROUP BY city;

DROP TABLE ad;

INSERT INTO category (name) VALUES ('Vêtements');
INSERT INTO category (name) VALUES ('Voitures');
INSERT INTO category (name) VALUES ('Autres');

SELECT * FROM category;





