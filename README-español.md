# Ecommerce-mern

## Descripcion

Este es mi primer proyecto luego de haber terminado varios cursos de react. Se trata de un Ecommerce full stack utilizando MERN el cual me demoro un poco mas de 2 semanas.

La idea del mismo era mejorar mis habilidades con redux y typescript (que hasta el momento no había utilizado).

[TOC]

## Demo

[https://ecommercemern-gw.herokuapp.com/](https://ecommercemern-gw.herokuapp.com/)

> Hosteada en heroku, por lo cual en caso de que el servidor se encuentre desconectado puede tardar un tiempo en cargar la página.

### Funcionalidades

- **Usuarios**:
  - **Comprador**: Unicamente puede realizar ordenes, elegir método de pago, ver su perfil/editar datos de usuario y hacer review de los productos comprados.
  - **Administrador**: Además de poseer todas las funcionalidades previas, este tiene acceso a varias vistas en la direccion /admin/\* con las cuales puede crear, editar, modificar estado activo/no-activo y leer registros de: Productos, Categorias, Marcas, Ordenes y Usuarios.
- **Carro de Compras**: El usuario puede agregar productos, aumentar la cantidad en caso de que ya se encuentre agregado o eliminarlo.
- **Ordenes:**
  1.  Una vez complata la orden a través del carro decompras, el usuario puede cancelar el pedido o realizar el pago. El pago esta automatizado (la página del Checkout solo pide la direccion de entrega).
  2.  Una vez pagado el estado de la orden se modifica a **"_Pagado y Entregado"_**.
  3.  Cuando una orden es entregada, el usuario puede hacer una review de cada producto comprado eligiendo un rating de 1-5 y un comentario.
- **Productos: ** Estos pueden ser creados y modificados por el administrador. Poseen stock, precio, descripción, imagen y otros datos:
  - **Categorias y Marcas: ** Todo producto debe poseer una marca y categoría, además de servir como filtro para la busqueda de productos desde la Sidebar.
  - **Reviews: ** Compuesta por un comentario y puntuación elegida por el comprador una vez recibido el producto.
- **Extra: ** Sidebar con filtros de búsqueda (categorias y marcas), cambio de color (tema oscuro y claro) y paginación hecha desde 0 por mi.
- **Backend: ** MongoDB, Express y NodeJs con typescript. La autenticación esta hecha con JWT.

###Imagenes

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
