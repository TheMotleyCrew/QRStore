DROP TABLE IF EXISTS user;

CREATE TABLE IF NOT EXISTS user 
(
  uid int(100) NOT NULL AUTO_INCREMENT,
  wallet int(100) NOT NULL,
  uname VARCHAR(100) NOT NULL,
  urole VARCHAR(100) NOT NULL,
  username VARCHAR(100) NOT NULL,
  password VARCHAR(100) NOT NULL,
  address VARCHAR(500) NOT NULL,
  phone VARCHAR(12) NOT NULL,
  email VARCHAR(100) NOT NULL,
  PRIMARY KEY (uid)
);

DROP TABLE IF EXISTS pending;

CREATE TABLE IF NOT EXISTS pending 
(
  uname VARCHAR(100) NOT NULL,
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
  sid int(100) NOT NULL,
  description VARCHAR(500) NOT NULL,
  PRIMARY KEY (pid)
);

DROP TABLE IF EXISTS deleted;

CREATE TABLE IF NOT EXISTS deleted
(
	pid int(100) NOT NULL,
	PRIMARY KEY (pid)
);

DROP TABLE IF EXISTS purchase;
	
CREATE TABLE IF NOT EXISTS purchase 
(
  bid int(100) NOT NULL,
  pdate DATE NOT NULL, 
  uid int(100) NOT NULL,
  pid int(100) NOT NULL,
  qty int(100) NOT NULL,
  price int(100) NOT NULL
);

INSERT INTO user (uid, uname, urole, username, password, wallet, address, phone, email) VALUES
(1, 'Ramadas Mahale', 'admin', 'ramadas', 'ramadas', 0, '', '', ''),
(2, 'Ritesh Surana', 'admin', 'ritesh', 'ritesh', 0, '', '', ''),
(3, 'Samyak M', 'retail', 'samyak', 'samyak', 250000, '', '', ''),
(4, 'Suhas M', 'retail', 'suhas', 'suhas', 275000, '', '', ''),
(5, 'Shrinidhi B', 'retail', 'shrinidhi', 'shrinidhi', 2600000, '', '', ''),
(6, 'Rakshita Prabhu', 'user', 'rakshita', 'rakshita', 50000, 'PESIT, Banashakari, Bangalore', '1234567892', 'rakshitha@email.com'),
(7, 'Surabhi Ravindra', 'user', 'surabhi', 'surabhi', 69500, 'PESU, BSK, Bangalore', '7984265651', 'surabhi@email.com'),
(8, 'Mayank Kumar Singh', 'user', 'mayank', 'mayank', 58500, 'MRD, Banashakari 3 Stage', '6546852764', 'mayank@email.com'),
(9, 'Varun Pai', 'user', 'varun', 'varun', 79000, 'Sutta, PESIT, Bangalore', '7459612848', 'varun@email.com');

INSERT INTO pending (uname, username, password) VALUES
('Vin Diesel', 'diesel', 'diesel'),
('Petrol Man', 'petrol', 'petrol');

INSERT INTO stores (sid, sname, slocation) VALUES
(1, 'Online', 'Online'),
(2, 'Brand Factory', 'Yelahanka'),
(3, 'Big Bazaar', 'Vijayanagar'),
(4, 'FBB', 'Koramangala');

INSERT INTO products (uid, pid, qty, price, pname, category, sid, description) VALUES
(0, 1, 20, 5000, 'Dress Shoes', 'Apparel', 2, ''),
(0, 2, 15, 5000, 'Dress Shoes', 'Apparel', 3, ''),
(0, 3, 25, 5000, 'Dress Shoes', 'Apparel', 4, ''),
(0, 4, 30, 10000, 'Tuxedo', 'Apparel', 2, ''),
(0, 5, 25, 10000, 'Tuxedo', 'Apparel', 3, ''),
(0, 6, 10, 500, 'Cufflinks', 'Apparel', 3, ''),
(0, 7, 15, 500, 'Cufflinks', 'Apparel', 4, ''),
(0, 8, 50, 2000, 'Gold Watch Male', 'Apparel', 2, ''),
(0, 9, 50, 2000, 'Gold Watch Female', 'Apparel', 2, ''),
(0, 10, 20, 15000, 'Evening Gown', 'Apparel', 2, ''),
(0, 11, 35, 15000, 'Evening Gown', 'Apparel', 4, ''),
(0, 12, 10, 5000, 'Stilettos', 'Apparel', 2, ''),
(0, 13, 35, 5000, 'Stilettos', 'Apparel', 3, ''),
(0, 14, 15, 5000, 'Stilettos', 'Apparel', 4, ''),
(0, 15, 15, 500, 'Money Clip', 'Apparel', 3, ''),
(0, 16, 15, 500, 'Money Clip', 'Apparel', 4, ''),
(0, 17, 15, 500, 'Clutch', 'Apparel', 2, ''),
(0, 18, 15, 500, 'Clutch', 'Apparel', 3, ''),
(0, 19, 15, 500, 'Clutch', 'Apparel', 4, ''),
(0, 20, 15, 2000, 'Platinum Necklace', 'Apparel', 2, ''),
(3, 21, 20, 13000, 'SmartPhone', 'Electronic', 1, 'Samsung has been experimenting with curved screens for years. The subtly contoured display combined with the nearly non-existent borders framing the screen give the phone such a sleek and fresh look that it almost makes the iPhone seem archaic. The S8’s software is also much simpler and easier to use than that of Samsung’s previous phones, providing a smoother overall experience on par with that of the Google Pixel or the iPhone.'),
(4, 22, 10, 13000, 'SmartPhone', 'Electronic', 1, 'The Google Pixel, with its sharp camera, good looks, and easy-to-use software, make it a tempting choice for both Android lovers and iPhone users considering a switch. Google is betting that its virtual helper, named the Google Assistant, will set its phone apart from other competing Android devices.'),
(5, 23, 30, 13000, 'SmartPhone', 'Electronic', 1, 'OnePlus calls its phones “flagship killers,” mainly because it prices its smartphones aggressively compared to more well-known competitors like Apple, Samsung, and LG. The company’s most recent smartphone, the OnePlus 3T, delivers on that promise more so than ever before. It offers the same slim and polished design as the OnePlus 3, but with a slightly faster processor, larger battery, and sharper front camera.'),
(3, 24, 15, 30000, 'IPhone', 'Electronic', 1, 'For many people, Apple’s iPhone embodies the best mix of design, usability, and processing power. Apple’s most recent flagship smartphones are no different: both models feature improved cameras, speedy performance, and long battery life.'),
(5, 25, 10, 30000, 'IPhone', 'Electronic', 1, 'The iPhone SE is designed for Apple fans who want something smaller and cheaper than what Apple usually has to offer. It looks almost identical to the iPhone 5s, but with iPhone 6s-level guts on the inside. It has the same processor and camera as Apple’s previous generation flagship, packed into a compact 4-inch device.'),
(3, 26, 30, 1000, 'Earphones', 'Electronic', 1, 'Covered in a soft, pliable, tangle-free rubber, the winged earbuds slip right into the ear, forming a seal that not only keeps your music in and outside sound out, but is also extremely comfortable whether you’re exercising or not. The SoundSports output like most Bose headphones — clear and well balanced, but not particularly dynamic. The Bose headphones won out, with a six-hour battery life.'),
(4, 27, 40, 1000, 'Earphones', 'Electronic', 1, 'The Swiss Army Knife of wireless headphones, Apple’s AirPods are great wireless earbuds for anybody — yes, even Android users. The sound is good — not great, a bit thin on the bass, but it will get your toes tapping.'),
(5, 28, 40, 1000, 'Earphones', 'Electronic', 1, 'The $299 QuietControls are covered in a soft, comfortable rubber that lets them ease comfortably into your ear canal, rest easy on your neck, and not slide around on top of your shirt. The QuietControls are Bluetooth only, which means you’ll want to charge them up before a long flight to get their maximum 10 hours of battery life. But when you’re wearing these and the noise canceling is cranked, practically nothing is going to interfere with your music.'),
(3, 29, 30, 2500, 'Headphones', 'Electronic', 1, 'The best way to describe Bang & Olufsen’s Play H4 is that they’re Isotoners for your ears. Their big, soft lambskin cups sit comfortably on your skin, while the stainless steel headband provides a firm grip on your skull — but without squeezing too tight. While the H4s feel airy as they envelope your ear in sound, they aren’t overly bulky. And that’s despite offering 19 hours of battery life, Bluetooth wireless connectivity, and a 3.5mm audio jack for the rare occasions when you run out of juice.'),
(4, 30, 25, 2500, 'Headphones', 'Electronic', 1, 'But just as important as the sound is how the QC 35s feel. Despite the isolation technology, the over-ear headset feels airy, gripping the skull with a light tension that ensures they’ll neither fall off nor cause discomfort. The ear cups are roomy, improving sound quality by not blasting tunes right into your ear canal. The headphone’s battery life is as good as you can get, an impressive feat figuring the amount of circuitry needed to power those mics, and they also have a 3.5mm audio jack, just in case you’re somehow able to wear them out.'),
(5, 31, 30, 2500, 'Headphones', 'Electronic', 1, 'A pair of high-end, over-the-ear, open-back, wired headphones, the Oppo’s flagship sound machines can help audiophiles make out every note of nuance in their most beloved tracks—sounds that they never knew were there before—adding value to whatever audio source they’re listening to, from streaming tracks to vinyl.. A denim travel case is also included, in case you want to take these cans on the road with you, as are both a woven 6.3mm audio cable, and a (an admittedly platry) 3.5mm stereo headphone cord.'),
(3, 32, 20, 60000, 'Laptop', 'Electronic', 1, 'The Razer Blade Stealth is Razer’s first foray outside of the gaming laptop genre, and it’s exceptionally good. With a dazzling rainbow backlit keyboard, a Core i7-powered base configuration, an eye-popping high resolution (and optional 4K) screen, and a beautiful aluminum build, it’s without a doubt one of the best out there.'),
(5, 33, 25, 60000, 'Laptop', 'Electronic', 1, 'With its marvelously attractive looks, excellent keyboard, and solid performance, the HP Spectre is a top contender among Windows laptops. The trackpad can be a bit sluggish and the fans sometimes get noisy, but those looking for a portable general-purpose Windows laptop will be pleased with the Spectre. Its Bang & Olufsen speakers are great for those who watch movies and blast music from their laptops as well.'),
(4, 34, 30, 75000, 'MacBook', 'Electronic', 1, 'The MacBook’s gorgeous 12-inch screen, long battery life, and compact design make it an excellent choice if you’re an Apple fan who desires portability. Carrying it around in my bag didn’t feel much different than toting around an iPad. If you’re the type of person that primarily works in the cloud, you’ll likely be pleased with the new MacBook.'),
(4, 35, 20, 150000, 'LED TV', 'Electronic', 1, 'This Samsung LED TV is designed for Indian homes - it comes with Indian Cinema Mode which makes pictures brighter and more vivid, and the Cricket Mode which gives you a surround sound experience you almost feel like you’re in a stadium. You can also download, save, and replay your favourite moments.'),
(3, 36, 15, 5000, 'Switch Controller', 'Electronic', 1, 'Nintendo considers the Switch a "hybrid" console; it is designed primarily as a home console, with the main unit inserted onto a docking station to connect to a television. Alternatively, it can be removed from the dock and used similarly to a tablet computer through its LCD touchscreen, or placed in a standalone tabletop mode visible to several players. The Switch uses Joy-Con wireless controllers, which include standard buttons and a directional joystick for user input, motion sensing, and high-definition tactile feedback.'),
(4, 37, 25, 5000, 'Switch Controller', 'Electronic', 1, 'Nintendo considers the Switch a "hybrid" console; it is designed primarily as a home console, with the main unit inserted onto a docking station to connect to a television. Alternatively, it can be removed from the dock and used similarly to a tablet computer through its LCD touchscreen, or placed in a standalone tabletop mode visible to several players. The Switch uses Joy-Con wireless controllers, which include standard buttons and a directional joystick for user input, motion sensing, and high-definition tactile feedback.'),
(5, 38, 20, 5000, 'Switch Controller', 'Electronic', 1, 'Nintendo considers the Switch a "hybrid" console; it is designed primarily as a home console, with the main unit inserted onto a docking station to connect to a television. Alternatively, it can be removed from the dock and used similarly to a tablet computer through its LCD touchscreen, or placed in a standalone tabletop mode visible to several players. The Switch uses Joy-Con wireless controllers, which include standard buttons and a directional joystick for user input, motion sensing, and high-definition tactile feedback.'),
(4, 39, 20, 35000, 'Oculus Rift', 'Electronic', 1, 'Oculus Rift advanced display technology combined with its precise, low-latency constellation tracking system enables the sensation of presence. Customizable, comfortable, adaptable, and beautiful, Rift is technology and design as remarkable as the experiences it enables. Every aspect of Rift was designed to be easy, inviting, and comfortable to use - and that extends to the VR environment weve created as a starting point for your journeys.'),
(5, 40, 10, 35000, 'Oculus Rift', 'Electronic', 1, 'Oculus Rift advanced display technology combined with its precise, low-latency constellation tracking system enables the sensation of presence. Customizable, comfortable, adaptable, and beautiful, Rift is technology and design as remarkable as the experiences it enables. Every aspect of Rift was designed to be easy, inviting, and comfortable to use - and that extends to the VR environment weve created as a starting point for your journeys.'),
(3, 41, 40, 1500, 'DragonWar Mouse', 'Electronic', 1, 'For most games, I don’t recommend mice loaded down with thumb buttons. Those arrays of 6-12 buttons can make the individual buttons harder to differentiate by touch, and they usually interfere with a great mouse grip. And realistically, you’re going to be faster hitting hotkeys with your keyboard hand, anyway. For most games, a couple extra buttons are all you need. But if you really, really want a mouse with a whole bunch of buttons, I think Razer’s Naga Hex v2 is the best you can buy.'),
(4, 42, 35, 1500, 'DragonWar Mouse', 'Electronic', 1, 'The Corsair M65 is one of the top contenders that didn’t make the cut, and I think it’s a good mouse for FPS players who like bulkier mice. It has a great, heavy scroll wheel, very low lift-off distance, and a well-placed “sniper” button under the thumb. Unfortunately, its other thumb buttons are small, and you can’t have your thumb in the cradle and press up to press them easily. You have to move your thumb up and press with flat of thumb. The driver software is also fairly ugly and barebones and not as feature-packed or well-designed as some of the competitors. It’s on the heavy side, even with weights removed.'),
(4, 43, 50, 3000, 'Power Bank', 'Electronic', 1, 'RAVPower portable charger is a great choice if you need a device that can charge both your laptop and your phone. It features USB-C and normal USB outputs as well as an AC output, so you can plug your laptop charger directly in. Theres also a 20,100mAh capacity battery inside, so this will be able to juice up your phone or tablet multiple times before you need to put it back on charge.'),
(5, 44, 35, 3000, 'Power Bank', 'Electronic', 1, 'The picture above may be deceptive, as this isnt a small charger and is capable of charging up your laptop or tablet as well as your phone simultaneously. You can charge up to three devices at the same time and it comes with a 23,000mAh capacity, so it should last long enough between recharges.'),
(3, 45, 25, 11000, 'Surround Speakers', 'Electronic', 1, 'Featuring Dolby Atmos technology, LG’s SJ9 sound bar is the clear winner when it comes to audio quality. A 5.1.2 speaker setup, this 500 watt, 55-inch bar has an external subwoofer, two front speakers, a center channel, and a pair of ceiling-angled surrounds that simulate sound effects coming from above. With Wi-Fi and Bluetooth connectivity, the SJ9 can carry a signal without wires, or if HDMI is your jam, the speaker can handle 4K pass-through.');

INSERT INTO cart (uid, pid, qty) VALUES
(6, 11, 5),
(6, 20, 5),
(6, 13, 3),
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
(9, 7, 1),
(9, 8, 1),
(9, 15, 5),
(9, 35, 1),
(9, 38, 4),
(9, 45, 3),
(9, 28, 3),
(9, 22, 2);

INSERT INTO purchase (bid, uid, pid, qty, pdate, price) VALUES
(1, 6, 45, 5, '2017-11-10', 11000),
(1, 6, 35, 1, '2017-11-10', 150000),
(1, 6, 30, 2, '2017-11-10', 2500),
(1, 6, 43, 3, '2017-11-10', 3000),
(2, 8, 45, 5, '2017-08-05', 11000),
(2, 8, 35, 1, '2017-08-05', 150000),
(2, 8, 30, 2, '2017-08-05', 2500),
(2, 8, 43, 3, '2017-08-05', 3000),
(2, 8, 2, 3, '2017-08-05', 5000),
(2, 8, 4, 2, '2017-08-05', 10000),
(2, 8, 7, 10, '2017-08-05', 500),
(2, 8, 8, 1, '2017-08-05', 2000),
(2, 8, 15, 5, '2017-08-05', 500),
(3, 6, 42, 1, '2016-01-01', 1500),
(3, 6, 21, 5, '2016-01-01', 13000),
(3, 6, 17, 3, '2016-01-01', 500),
(3, 6, 9, 2, '2016-01-01', 2000);