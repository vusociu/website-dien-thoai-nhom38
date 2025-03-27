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
