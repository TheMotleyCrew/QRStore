DROP TABLE IF EXISTS user;

CREATE TABLE IF NOT EXISTS user 
(
  uid int(100) NOT NULL AUTO_INCREMENT,
  wallet int(100) NOT NULL,
  uname VARCHAR(100) NOT NULL,
  urole VARCHAR(100) NOT NULL,
  username VARCHAR(100) NOT NULL,
  password VARCHAR(100) NOT NULL,
  PRIMARY KEY (uid)
);

DROP TABLE IF EXISTS pending;

CREATE TABLE IF NOT EXISTS pending 
(
  uname VARCHAR(100) NOT NULL,
  urole VARCHAR(100) NOT NULL,
  username VARCHAR(100) NOT NULL,
  password VARCHAR(100) NOT NULL
);

DROP TABLE IF EXISTS stores;

CREATE TABLE IF NOT EXISTS stores 
(
  sid int(100) NOT NULL AUTO_INCREMENT,
  sname VARCHAR(100) NOT NULL,
  slocation VARCHAR(100) NOT NULL,
  PRIMARY KEY (sid)
);

DROP TABLE IF EXISTS cart;

CREATE TABLE IF NOT EXISTS cart 
(
  uid int(100) NOT NULL,
  pid int(100) NOT NULL,
  qty int(100) NOT NULL
);

DROP TABLE IF EXISTS products;

CREATE TABLE IF NOT EXISTS products 
(
  uid int(100) NOT NULL,
  pid int(100) NOT NULL,
  qty int(100) NOT NULL,
  price int(100) NOT NULL,
  pname VARCHAR(100) NOT NULL,
  category VARCHAR(100) NOT NULL,
  sid int(100) NOT NULL
);

DROP TABLE IF EXISTS purchase;

CREATE TABLE IF NOT EXISTS purchase 
(
  bid int(100) NOT NULL,
  uid int(100) NOT NULL,
  pid int(100) NOT NULL,
  qty int(100) NOT NULL
);

INSERT INTO user (uid, uname, urole, username, password, wallet) VALUES
(1, 'Ramadas Mahale', 'admin', 'ramadas', 'ramadas', 0),
(2, 'Ritesh Surana', 'admin', 'ritesh', 'ritesh', 0),
(3, 'Samyak M', 'retail', 'samyak', 'samyak', 250000),
(4, 'Suhas M', 'retail', 'suhas', 'suhas', 275000),
(5, 'Shrinidhi B', 'retail', 'shrinidhi', 'shrinidhi', 260000),
(6, 'Rakshita Prabhu', 'user', 'rakshita', 'rakshita', 50000),
(7, 'Surabhi Ravindra', 'user', 'surabhi', 'surabhi', 69500),
(8, 'Mayank Kumar Singh', 'user', 'mayank', 'mayank', 58500),
(9, 'Varun Pai', 'user', 'varun', 'varun', 79000);

INSERT INTO stores (sid, sname, slocation) VALUES
(1, 'Brand Factory', 'Yelahanka'),
(2, 'Big Bazaar', 'Vijayanagar'),
(3, 'FBB', 'Koramangala');

INSERT INTO products (uid, pid, qty, price, pname, category, sid) VALUES
(0, 1, 20, 5000, 'Dress Shoes', 'Apparel', 1),
(0, 2, 15, 5000, 'Dress Shoes', 'Apparel', 2),
(0, 3, 25, 5000, 'Dress Shoes', 'Apparel', 3),
(0, 4, 30, 10000, 'Tuxedo', 'Apparel', 1),
(0, 5, 25, 10000, 'Tuxedo', 'Apparel', 3),
(0, 6, 10, 500, 'Cufflinks', 'Apparel', 2),
(0, 7, 15, 500, 'Cufflinks', 'Apparel', 3),
(0, 8, 50, 2000, 'Gold Watch Male', 'Apparel', 1),
(0, 9, 50, 2000, 'Gold Watch Female', 'Apparel', 1),
(0, 10, 20, 15000, 'Evening Gown', 'Apparel', 1),
(0, 11, 35, 15000, 'Evening Gown', 'Apparel', 3),
(0, 12, 10, 5000, 'Stilettos', 'Apparel', 1),
(0, 13, 35, 5000, 'Stilettos', 'Apparel', 2),
(0, 14, 15, 5000, 'Stilettos', 'Apparel', 3),
(0, 15, 15, 500, 'Money Clip', 'Apparel', 2),
(0, 16, 15, 500, 'Money Clip', 'Apparel', 3),
(0, 17, 15, 500, 'Clutch', 'Apparel', 1),
(0, 18, 15, 500, 'Clutch', 'Apparel', 2),
(0, 19, 15, 500, 'Clutch', 'Apparel', 3),
(0, 20, 15, 2000, 'Platinum Necklace', 'Apparel', 1),
(3, 21, 20, 13000, 'SmartPhone', 'Electronic', 0),
(4, 22, 10, 13000, 'SmartPhone', 'Electronic', 0),
(5, 23, 30, 13000, 'SmartPhone', 'Electronic', 0),
(3, 24, 15, 30000, 'IPhone', 'Electronic', 0),
(5, 25, 10, 30000, 'IPhone', 'Electronic', 0),
(3, 26, 30, 1000, 'Earphones', 'Electronic', 0),
(4, 27, 40, 1000, 'Earphones', 'Electronic', 0),
(5, 28, 40, 1000, 'Earphones', 'Electronic', 0),
(3, 29, 30, 2500, 'Headphones', 'Electronic', 0),
(4, 30, 25, 2500, 'Headphones', 'Electronic', 0),
(5, 31, 30, 2500, 'Headphones', 'Electronic', 0),
(3, 32, 20, 60000, 'Laptop', 'Electronic', 0),
(5, 33, 25, 60000, 'Laptop', 'Electronic', 0),
(4, 34, 30, 75000, 'MacBook', 'Electronic', 0),
(4, 35, 20, 150000, 'LED TV', 'Electronic', 0),
(3, 36, 15, 5000, 'Switch Controller', 'Electronic', 0),
(4, 37, 25, 5000, 'Switch Controller', 'Electronic', 0),
(5, 38, 20, 5000, 'Switch Controller', 'Electronic', 0),
(4, 39, 20, 35000, 'Oculus Rift', 'Electronic', 0),
(5, 40, 10, 35000, 'Oculus Rift', 'Electronic', 0),
(3, 41, 40, 1500, 'DragonWar Mouse', 'Electronic', 0),
(4, 42, 35, 1500, 'DragonWar Mouse', 'Electronic', 0),
(4, 43, 50, 3000, 'Power Bank', 'Electronic', 0),
(5, 44, 35, 3000, 'Power Bank', 'Electronic', 0),
(3, 45, 25, 11000, 'Surround Speakers', 'Electronic', 0);

INSERT INTO cart (uid, pid, qty) VALUES
(6, 11, 5),
(6, 20, 5),
(6, 13, 10),
(6, 44, 2),
(6, 25, 2),
(6, 26, 3),
(7, 40, 1),
(7, 32, 1),
(7, 31, 2),
(7, 42, 1),
(7, 21, 5),
(7, 17, 3),
(7, 9, 2),
(9, 2, 3),
(9, 4, 2),
(9, 7, 10),
(9, 8, 1),
(9, 15, 5),
(9, 35, 1),
(9, 38, 4),
(9, 45, 3),
(9, 28, 3),
(9, 22, 2);

INSERT INTO purchase (bid, uid, pid, qty) VALUES
(1, 6, 45, 5),
(1, 6, 35, 1),
(1, 6, 30, 2),
(1, 6, 45, 3),
(2, 8, 45, 5),
(2, 8, 35, 1),
(2, 8, 30, 2),
(2, 8, 45, 3),
(2, 8, 2, 3),
(2, 8, 4, 2),
(2, 8, 7, 10),
(2, 8, 8, 1),
(2, 8, 15, 5),
(3, 6, 42, 1),
(3, 6, 21, 5),
(3, 6, 17, 3),
(3, 6, 9, 2);