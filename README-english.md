# Ecommerce-mern

## Descripcion

This is the first real proyect i make after finishing some react courses. Its a Full Stack MERN ecommerce that took me a little more that 2 weeks.

The idea behind it was to improve my skills with redux and typescript (wich i hadnt used before).

## Demo

[https://ecommercemern-gw.herokuapp.com/](https://ecommercemern-gw.herokuapp.com/)

> Admin Login:

- User: Admin
- Password: asdasd

> **Hosted by Heroku**, in case that the server is turned off, it might take some time to load the page, after that it should work fine.

### Features

- **Users**:
  - **Customer**: Only can place orders, choose payment method, view your profile/edit user data and review recived products.
  - **Admin**: Additional to all the features of the customer, the admin has access to all the pages at the /admin\* url with wich it can create, edit, modify the state active/non-active and read data from : Brands, Categories, Products, Users and Orders.
- **Shopping Cart**: The user can add products, increase the quanitty of an existing product at cart or elimite it.
- **Orders:**
  1. Once the order is completed through the shopping cart, the user can Cancel or Pay the order. The payment is automated (the Checkout page only asks for the delivery address).
  2. When a order is paid the state of the order is modidied to **"_Paid y Delivered"_**.
  3. When a order is delivered, the user have the option to review every product of the order by choosing a rating between 1-5 and making a comment.
- **Products:** These are created and modified by the admin. They have an image, description, price, stock quantity and more data:
  - **Brands and Categories:** Every product must have a brand and category, additionaly these serve as a filtering option for products at the Sidebar.
  - **Reviews:** Contain a comment and rating choosed by the customer once the product has been recived.
- **Extra:** Sidebar with custom filtering search (brand and category), Theme-Color (dark and light) y and custom magination made by my from scratch.
- **Backend:** MongoDB, Express y NodeJs with typescript. The autentication was made using JWT.

## Images

![](https://i.imgur.com/fhm9HAI.png)

> Products navigation.

![](https://i.imgur.com/PvmpGOU.png)

> Product information

![](https://i.imgur.com/RazGkFt.png)

> Admin-only CRUD views

![](https://i.imgur.com/amoMjfz.png)

> Admin-only actions

![](https://i.imgur.com/9uGEokX.png)

> User Page

![](https://i.imgur.com/zaZcpMT.png)

> User Information change

![](https://i.imgur.com/737MjL4.png)

> Checkout page

![](https://i.imgur.com/TImZ6PQ.png)

> Order Modal

![](https://i.imgur.com/BclbCcH.png)

> Review Modal

![](https://i.imgur.com/hedlDAp.png)

> Authentication
