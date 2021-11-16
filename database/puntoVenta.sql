CREATE DATABASE puntoVenta;
USE puntoVenta;



CREATE TABLE clientes(idCliente INT AUTO_INCREMENT NOT NULL,
	nombres VARCHAR(60) NOT NULL,
	Apaterno VARCHAR(50) NOT NULL,
	Amaterno VARCHAR(50) NOT NULL,
	telefono VARCHAR(15) NOT NULL,
	correo VARCHAR(100) NOT NULL,
	fechaRegistro timestamp NOT NULL DEFAULT current_timestamp,
	PRIMARY KEY(idCliente));

CREATE TABLE empleados(idEmpleado INT AUTO_INCREMENT NOT NULL,
	nombres VARCHAR(60) NOT NULL,
	Apaterno VARCHAR(50) NOT NULL,
	Amaterno VARCHAR(50) NOT NULL,
	nombreUsuario VARCHAR(10) NOT NULL,
	telefono VARCHAR(15) NOT NULL,
	correo VARCHAR(100) NOT NULL,
	fechaRegistro timestamp NOT NULL DEFAULT current_timestamp,
	password VARCHAR(60) NOT NULL,
	PRIMARY KEY(idEmpleado));

CREATE TABLE proveedores(idProveedor INT AUTO_INCREMENT NOT NULL,
	nombreEmpresa VARCHAR(60) NOT NULL,
	telefono VARCHAR(15) NOT NULL,
	correo VARCHAR(100) NOT NULL,
	fechaRegistro timestamp NOT NULL DEFAULT current_timestamp,
	PRIMARY KEY(idProveedor));

CREATE TABLE IF NOT EXISTS facturasProveedores(idFactura INT NOT NULL AUTO_INCREMENT,
	idProveedor INT NOT NULL,
	subtotal FLOAT NOT NULL,
	descuento FLOAT NOT NULL,
	IEPS FLOAT NOT NULL,
	IVA FLOAT NOT NULL,
	total FLOAT NOT NULL,
	fechaRegistro timestamp NOT NULL DEFAULT current_timestamp,
	PRIMARY KEY(idFactura),
	FOREIGN KEY(idProveedor) REFERENCES proveedores(idProveedor));

CREATE TABLE IF NOT EXISTS inventario(idProducto INT NOT NULL AUTO_INCREMENT,
	idProveedor INT NOT NULL,
	fechaRegistro timestamp NOT NULL DEFAULT current_timestamp,
	nombreArticulo VARCHAR(60) NOT NULL,
	precioCompra FLOAT NOT NULL,
	precioVenta FLOAT NOT NULL,
	entradas INT NOT NULL,
	salidas INT NOT NULL,
	existencias INT NOT NULL,
	codigoBarras VARCHAR(60) NOT NULL,
	PRIMARY KEY(idProducto),
	FOREIGN KEY(idProveedor) REFERENCES proveedores(idProveedor));
 
CREATE TABLE IF NOT EXISTS ventas(idVenta INT NOT NULL AUTO_INCREMENT,
	total FLOAT NOT NULL,
	fechaRegistro timestamp NOT NULL DEFAULT current_timestamp,
	PRIMARY KEY(idVenta));

CREATE TABLE IF NOT EXISTS productosVendidos(idVenta INT NOT NULL,
	idProducto INT NOT NULL,
	FOREIGN KEY(idVenta) REFERENCES ventas(idVenta),
	FOREIGN KEY(idProducto) REFERENCES inventario(idProducto));

CREATE TABLE IF NOT EXISTS facturaCliente(idFacturaCliente INT NOT NULL AUTO_INCREMENT,
	idCliente INT NOT NULL,
	idVenta INT NOT NULL,
	fechaRegistro timestamp NOT NULL DEFAULT current_timestamp,
	PRIMARY KEY(idFacturaCliente),
	FOREIGN KEY(idCliente) REFERENCES clientes(idCliente),
	FOREIGN key(idVenta) REFERENCES ventas(idVenta));