Table Role {
  id int [pk, increment]
  name varchar(20)
}

Table User {
  id int [pk, increment]
  fullname varchar(50)
  email varchar(150)
  phone_number varchar(20)
  address varchar(200)
  password varchar(32)
  role_id int
  created_at datetime
  updated_at datetime
  deleted int
}

Table UserToken {
  user_id int [pk]
  token varchar(32) [pk]
  created_at datetime
}

Table Category {
  id int [pk, increment]
  name varchar(100)
}

Table Product {
  id int [pk, increment]
  category_id int
  title varchar(250)
  price int
  discount int
  thumbnail varchar(500)
  description longtext
  created_at datetime
  updated_at datetime
  deleted int
}

Table Gallery {
  id int [pk, increment]
  product_id int
  thumbnail varchar(500)
}

Table Feedback {
  id int [pk, increment]
  firstname varchar(30)
  lastname varchar(30)
  email varchar(250)
  phone_number varchar(20)
  subject_name varchar(350)
  note varchar(1000)
  status int [default: 0]
  created_at datetime
  updated_at datetime
}

Table Order {
  id int [pk, increment]
  user_id int
  fullname varchar(50)
  email varchar(150)
  phone_number varchar(20)
  address varchar(200)
  note varchar(1000)
  order_date datetime
  status int
  total_money int
}

Table OrderDetail {
  id int [pk, increment]
  order_id int
  product_id int
  price int
  num int
  total_money int
}

Ref: "Role"."id" < "User"."role_id"

Ref: "Category"."id" < "Product"."category_id"

Ref: "Product"."id" < "OrderDetail"."product_id"

Ref: "Product"."id" < "Gallery"."product_id"

Ref: "Order"."id" < "OrderDetail"."order_id"

Ref: "User"."id" < "Order"."user_id"

Ref: "User"."id" < "UserToken"."user_id"
-- Thêm dữ liệu vào bảng Category
INSERT INTO Category (id, name) VALUES
(1, 'Điện thoại'),
(2, 'Laptop'),
(3, 'Máy tính bảng'),
(4, 'Tai nghe'),
(5, 'Phụ kiện');

-- Thêm dữ liệu vào bảng Product
INSERT INTO Product (id, category_id, title, price, discount, thumbnail, description, created_at, updated_at, deleted) VALUES
-- Điện thoại
(1, 1, 'iPhone 15 Pro Max 256GB', 31990000, 5, 'iphone15_pro_max.jpg', 'iPhone 15 Pro Max với chip A17 Pro, camera 48MP và màn hình Super Retina XDR 6.7 inch.', NOW(), NOW(), 0),
(2, 1, 'Samsung Galaxy S24 Ultra', 29990000, 10, 'samsung_s24_ultra.jpg', 'Samsung Galaxy S24 Ultra với bút S-Pen, camera 200MP và màn hình Dynamic AMOLED 2X.', NOW(), NOW(), 0),
(3, 1, 'Xiaomi 14 Pro', 19990000, 15, 'xiaomi_14_pro.jpg', 'Xiaomi 14 Pro với chip Snapdragon 8 Gen 3, camera Leica và màn hình AMOLED 6.73 inch.', NOW(), NOW(), 0),
(4, 1, 'Google Pixel 8 Pro', 25990000, 8, 'google_pixel_8_pro.jpg', 'Google Pixel 8 Pro với chip Tensor G3, camera 50MP và khả năng AI tiên tiến.', NOW(), NOW(), 0),

-- Laptop
(5, 2, 'MacBook Pro M4 16 inch', 59990000, 0, 'macbook_pro_m4.jpg', 'MacBook Pro M4 16 inch với hiệu năng đỉnh cao, màn hình Liquid Retina XDR và thời lượng pin lên đến 22 giờ.', NOW(), NOW(), 0),
(6, 2, 'Dell XPS 15', 45990000, 12, 'dell_xps_15.jpg', 'Dell XPS 15 với chip Intel Core i9, màn hình OLED 4K và thiết kế viền mỏng cao cấp.', NOW(), NOW(), 0),
(7, 2, 'ASUS ROG Zephyrus G16', 42990000, 5, 'asus_rog_zephyrus.jpg', 'ASUS ROG Zephyrus G16 với chip Intel Core i9 và card đồ họa NVIDIA RTX 4080 dành cho game thủ.', NOW(), NOW(), 0),
(8, 2, 'Lenovo ThinkPad X1 Carbon', 38990000, 8, 'thinkpad_x1_carbon.jpg', 'Lenovo ThinkPad X1 Carbon với thiết kế mỏng nhẹ, bền bỉ và bảo mật cao cấp cho doanh nhân.', NOW(), NOW(), 0),

-- Máy tính bảng
(9, 3, 'iPad Pro M3 12.9 inch', 32990000, 0, 'ipad_pro_m3.jpg', 'iPad Pro M3 12.9 inch với chip M3, màn hình mini-LED Liquid Retina XDR và Apple Pencil 3.', NOW(), NOW(), 0),
(10, 3, 'Samsung Galaxy Tab S10 Ultra', 28990000, 7, 'galaxy_tab_s10.jpg', 'Samsung Galaxy Tab S10 Ultra với bút S-Pen, màn hình Super AMOLED 14.6 inch và pin 11200mAh.', NOW(), NOW(), 0),
(11, 3, 'Xiaomi Pad 7 Pro', 15990000, 12, 'xiaomi_pad_7.jpg', 'Xiaomi Pad 7 Pro với chip Snapdragon 8 Gen 3, màn hình 2.8K 144Hz và hệ thống bốn loa.', NOW(), NOW(), 0),
(12, 3, 'Microsoft Surface Pro 10', 29990000, 5, 'surface_pro_10.jpg', 'Microsoft Surface Pro 10 với chip Intel Core Ultra, màn hình PixelSense và tính năng cảm ứng.', NOW(), NOW(), 0),

-- Tai nghe
(13, 4, 'Apple AirPods Pro 2', 6990000, 10, 'airpods_pro_2.jpg', 'Apple AirPods Pro 2 với khả năng chống ồn chủ động, âm thanh không gian và chống thấm nước.', NOW(), NOW(), 0),
(14, 4, 'Sony WH-1000XM5', 8490000, 15, 'sony_wh1000xm5.jpg', 'Sony WH-1000XM5 với công nghệ chống ồn hàng đầu và chất lượng âm thanh Hi-Res.', NOW(), NOW(), 0),
(15, 4, 'Samsung Galaxy Buds3 Pro', 4990000, 8, 'galaxy_buds3_pro.jpg', 'Samsung Galaxy Buds3 Pro với âm thanh 360 độ, chống ồn và kết nối Bluetooth 5.3.', NOW(), NOW(), 0),
(16, 4, 'Bose QuietComfort Ultra', 10990000, 0, 'bose_qc_ultra.jpg', 'Bose QuietComfort Ultra với công nghệ chống ồn tiên tiến và âm thanh đẳng cấp.', NOW(), NOW(), 0),

-- Phụ kiện
(17, 5, 'Apple MagSafe Charger', 1490000, 0, 'magsafe_charger.jpg', 'Sạc không dây MagSafe chính hãng Apple với khả năng sạc nhanh lên đến 15W.', NOW(), NOW(), 0),
(18, 5, 'Samsung 45W Super Fast Charger', 990000, 20, 'samsung_fast_charger.jpg', 'Bộ sạc nhanh Samsung 45W với công nghệ Power Delivery và Adaptive Fast Charging.', NOW(), NOW(), 0),
(19, 5, 'Anker PowerCore 26800mAh', 1890000, 15, 'anker_powercore.jpg', 'Pin dự phòng Anker PowerCore 26800mAh với 3 cổng USB và công nghệ sạc nhanh PowerIQ.', NOW(), NOW(), 0),
(20, 5, 'Belkin BoostCharge Pro', 2490000, 5, 'belkin_boostcharge.jpg', 'Đế sạc không dây 3 trong 1 Belkin BoostCharge Pro cho iPhone, Apple Watch và AirPods.', NOW(), NOW(), 0);

-- Thêm dữ liệu vào bảng Gallery
INSERT INTO Gallery (product_id, thumbnail) VALUES
-- iPhone 15 Pro Max gallery
(1, 'iphone15_pro_max_1.jpg'),
(1, 'iphone15_pro_max_2.jpg'),
(1, 'iphone15_pro_max_3.jpg'),
-- Samsung S24 Ultra gallery
(2, 'samsung_s24_ultra_1.jpg'),
(2, 'samsung_s24_ultra_2.jpg'),
(2, 'samsung_s24_ultra_3.jpg'),
-- MacBook Pro gallery
(5, 'macbook_pro_m4_1.jpg'),
(5, 'macbook_pro_m4_2.jpg'),
(5, 'macbook_pro_m4_3.jpg'),
-- iPad Pro gallery
(9, 'ipad_pro_m3_1.jpg'),
(9, 'ipad_pro_m3_2.jpg'),
(9, 'ipad_pro_m3_3.jpg'),
-- AirPods Pro gallery
(13, 'airpods_pro_2_1.jpg'),
(13, 'airpods_pro_2_2.jpg'),
(13, 'airpods_pro_2_3.jpg');
