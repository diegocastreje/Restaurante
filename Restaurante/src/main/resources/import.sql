INSERT INTO roles (nombre) VALUES ('ROL_EMPLEADO');
INSERT INTO roles (nombre) VALUES ('ROL_JEFE');

INSERT INTO empleados(usuario, password, nombre, apellido, email, salario) VALUES ('diegocastreje','1234','Diego', 'Castreje', 'diegocastreje@gmail.com', 2000);
INSERT INTO empleados(usuario, password, nombre, apellido, email, salario) VALUES ('hlopis','1234','Hector', 'Lopez', 'hectorlopez@gmail.com', 1200);
INSERT INTO empleados(usuario, password, nombre, apellido, email, salario) VALUES ('zapi','1234','Jose', 'Zapata', 'josezapata@gmail.com', 1500);
INSERT INTO empleados(usuario, password, nombre, apellido, email, salario) VALUES ('niquikiller','1234','Hector', 'Niqui', 'hectorniqui@gmail.com', 1200);

INSERT INTO productos(nombre, precio, stock, tipo, alcohol) VALUES ('Nestea 350ml','1.70', 20, 'bebida', false);
INSERT INTO productos(nombre, precio, stock, tipo, alcohol) VALUES ('Coca cola 350ml','2', 40, 'bebida', false);
INSERT INTO productos(nombre, precio, stock, tipo, alcohol) VALUES ('Copa Ron Kraken 700ml','6', 15, 'bebida', true);
INSERT INTO productos(nombre, precio, stock, tipo, alcohol) VALUES ('Copa Ginebra Puerto de Indias','5', 18, 'bebida', true);
INSERT INTO productos(nombre, precio, stock, tipo, alcohol) VALUES ('Agua 500ml','1.80', 50, 'bebida', false);
INSERT INTO productos(nombre, precio, stock, tipo, alcohol) VALUES ('Pizza Margarita','9', 25, 'comida', false);
INSERT INTO productos(nombre, precio, stock, tipo, alcohol) VALUES ('Hamburguesa Simple','3', 20, 'comida', false);
INSERT INTO productos(nombre, precio, stock, tipo, alcohol) VALUES ('Tortilla','8', 10, 'comida', false);
INSERT INTO productos(nombre, precio, stock, tipo, alcohol) VALUES ('Tiramisú','4.50', 15, 'comida', false);

INSERT INTO mesas (empleado_id) VALUES (1);
INSERT INTO mesas (empleado_id) VALUES (1);
INSERT INTO mesas (empleado_id) VALUES (3);
INSERT INTO mesas (empleado_id) VALUES (2);
INSERT INTO mesas (empleado_id) VALUES (4);

INSERT INTO productos_mesa (mesa, cantidad, producto) VALUES (2, 2, 1);
INSERT INTO productos_mesa (mesa, cantidad, producto) VALUES (3, 2, 5);
INSERT INTO productos_mesa (mesa, cantidad, producto) VALUES (1, 4, 3);
INSERT INTO productos_mesa (mesa, cantidad, producto) VALUES (2, 1, 2);
INSERT INTO productos_mesa (mesa, cantidad, producto) VALUES (4, 5, 7);
INSERT INTO productos_mesa (mesa, cantidad, producto) VALUES (2, 1, 9);
INSERT INTO productos_mesa (mesa, cantidad, producto) VALUES (1, 3, 6);
INSERT INTO productos_mesa (mesa, cantidad, producto) VALUES (3, 2, 8);
INSERT INTO productos_mesa (mesa, cantidad, producto) VALUES (5, 5, 4);