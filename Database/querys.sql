#CRIAÇÃO DA TABELA DE PAGAMENTOS
CREATE TABLE payment (
    id INT NOT NULL AUTO_INCREMENT,
    typePay VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

#CRIAÇÃO DA TABELA DE TIPO DE PRODUTOS
CREATE TABLE productType(
    id INT NOT NULL AUTO_INCREMENT,
    typePrd VARCHAR(50) NOT NULL,
    PRIMARY KEY (id)
);

#CRIAÇÃO DA TABELA PRODUTOS
CREATE TABLE product(
    id INT NOT NULL AUTO_INCREMENT,
    typePrd INT NOT NULL,
    title VARCHAR (255) NOT NULL,
    descr VARCHAR (255) NOT NULL,
    img VARCHAR(255),
    price DECIMAL(5,2) NOT NULL,
    isActive BOOLEAN NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (typePrd) REFERENCES productType (id)
);

#CRIAÇÃO DA TABELA ADCIONAIS
CREATE TABLE additional(
    id INT NOT NULL AUTO_INCREMENT,
    forTypePrd INT NOT NULL,
    title VARCHAR (255) NOT NULL,
    descr VARCHAR (255) NOT NULL,
    img VARCHAR(255),
    price DECIMAL(5,2) NOT NULL,
    isActive BOOLEAN NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (forTypePrd) REFERENCES productType (id)
);

#CRIAÇÃO DA TABELA CLIENTES
CREATE TABLE clients(
    id INT NOT NULL AUTO_INCREMENT,
    nameCli VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    pass VARCHAR(255) NOT NULL,
    isActive BOOLEAN NOT NULL,
    isLogged BOOLEAN NOT NULL,
    PRIMARY KEY (id)
);

#CRIAÇÃO DA TABELA PEDIDOS
CREATE TABLE orders(
    id INT NOT NULL AUTO_INCREMENT,
    clients INT NOT NULL,
    typePay INT NOT NULL,
    totalPrice DECIMAL(5,2) NOT NULL,
    orderDate TIMESTAMP NOT NULL,
    isFinished BOOLEAN NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (clients) REFERENCES clients (id),
    FOREIGN KEY (typePay) REFERENCES payment (id)
);

#CRIAÇÃO DA TABELA PEDIDOS-PRODUTOS
CREATE TABLE ordersProduct(
    id INT NOT NULL AUTO_INCREMENT,
    orderCli INT NOT NULL,
    product INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (orderCli) REFERENCES orders (id),
    FOREIGN KEY (product) REFERENCES product (id)
);



#CRIANDO OS METODOS DE PAGAMENTO
INSERT INTO payment (typePay) VALUES ('Débido');
INSERT INTO payment (typePay) VALUES ('Crédito');
INSERT INTO payment (typePay) VALUES ('Dinheiro');

#CRIANDO OS TIPOS DE PRODUTOS
INSERT INTO productType (typePrd) VALUES ('Smash');
INSERT INTO productType (typePrd) VALUES ('Combo');
INSERT INTO productType (typePrd) VALUES ('Bebida');
INSERT INTO productType (typePrd) VALUES ('Acompanhamento');
INSERT INTO productType (typePrd) VALUES ('Sobremesa');

#CRIANDO OS PRODUTOS
INSERT INTO product (typePrd, title, descr, price, isActive) VALUES (1, 'Smash da Casa 1', '2x hambúrguer 200g', 30.50, true);
INSERT INTO product (typePrd, title, descr, price, isActive) VALUES (1, 'Smash da Casa 2', '2x hambúrguer 250g', 35.50, true);
INSERT INTO product (typePrd, title, descr, price, isActive) VALUES (1, 'Smash da Casa 3', '3x hambúrguer 250g', 45.50, true);
INSERT INTO product (typePrd, title, descr, price, isActive) VALUES (1, 'Smash Super 1', '4x hambúrguer 250g', 54.50, true);
INSERT INTO product (typePrd, title, descr, price, isActive) VALUES (1, 'Smash Super 2', '5x hambúrguer 300g', 76.50, true);
INSERT INTO product (typePrd, title, descr, price, isActive) VALUES (1, 'Smash Super 3', '5x hambúrguer 350g', 86.50, true);
INSERT INTO product (typePrd, title, descr, price, isActive) VALUES (1, 'Smash Mini', '1x hambúrguer 200g', 13.50, true);
INSERT INTO product (typePrd, title, descr, price, isActive) VALUES (1, 'Smash Mini 2', '2x hambúrguer 200g', 15.50, true);
INSERT INTO product (typePrd, title, descr, price, isActive) VALUES (1, 'Smash Mega Super', '5x hambúrguer 400g', 90.50, true);
INSERT INTO product (typePrd, title, descr, price, isActive) VALUES (1, 'Smash Hiper Mega', '6x hambúrguer 400g', 100.20, true);
INSERT INTO product (typePrd, title, descr, price, isActive) VALUES (1, 'Smash Hiper Mega Super', '10x hambúrguer 500g', 150.20, true);
INSERT INTO product (typePrd, title, descr, price, isActive) VALUES (3, 'Coca-Cola 200 ml', 'Coca-Cola 200 ml', 7.50, true);
INSERT INTO product (typePrd, title, descr, price, isActive) VALUES (3, 'Coca-Cola 600 ml', 'Coca-Cola 600 ml', 14.00, true);
INSERT INTO product (typePrd, title, descr, price, isActive) VALUES (3, 'Coca-Cola 1L', 'Coca-Cola 1L', 15.20, true);
INSERT INTO product (typePrd, title, descr, price, isActive) VALUES (3, 'Fanta Laranja 200 ml', 'Fanta Laranja 200 ml', 7.20, true);
INSERT INTO product (typePrd, title, descr, price, isActive) VALUES (3, 'Fanta Uva 1L', 'Fanta Uva 1L', 14.20, true);
INSERT INTO product (typePrd, title, descr, price, isActive) VALUES (2, 'Combo Smash 1', '2x Smash da Casa 1', 32.20, true);
INSERT INTO product (typePrd, title, descr, price, isActive) VALUES (2, 'Combo Smash 2', '2x Smash da Casa 2', 60.20, true);
INSERT INTO product (typePrd, title, descr, price, isActive) VALUES (2, 'Combo Smash Mini', '2x Smash Mini', 15.20, true);
INSERT INTO product (typePrd, title, descr, price, isActive) VALUES (2, 'Combo Smash Mini 2', '3x Smash Mini 2', 40.50, true);
INSERT INTO product (typePrd, title, descr, price, isActive) VALUES (2, 'Combo Smash Super', '2x Smash Super 1 + Fanta Uva 1L', 100.50, true);
INSERT INTO product (typePrd, title, descr, price, isActive) VALUES (2, 'Combo Smash Hiper Mega Super', '3x Smash Hiper Mega Super + Coca-Cola 1L', 310.50, true);
INSERT INTO product (typePrd, title, descr, price, isActive) VALUES (4, 'Batata Frita', 'Batata Frita 600g', 17.50, true);
INSERT INTO product (typePrd, title, descr, price, isActive) VALUES (4, 'Quibe', 'Quibe 600g', 17.50, true);
INSERT INTO product (typePrd, title, descr, price, isActive) VALUES (4, 'Salada Smash', 'Salada De Legumes 600g', 12.20, true);
INSERT INTO product (typePrd, title, descr, price, isActive) VALUES (5, 'Pudim', 'Pudim de Leite Condensado 400g', 15.40, true);
INSERT INTO product (typePrd, title, descr, price, isActive) VALUES (5, 'Brigadeiro', 'Brigadeiro Tradicional 200g', 8.40, true);
INSERT INTO product (typePrd, title, descr, price, isActive) VALUES (5, 'Bolo de Morango', 'Bolo de Morango 300g', 16.50, true);
INSERT INTO product (typePrd, title, descr, price, isActive) VALUES (5, 'Bolo de Laranja', 'Bolo de Laranja 300g', 16.50, true);

#CRIANDO ADICIONAIS
INSERT INTO additional (forTypePrd, title, descr, price, isActive) VALUES (1, 'Bacon', '10g', 1.50, true);
INSERT INTO additional (forTypePrd, title, descr, price, isActive) VALUES (1, 'Cheddar', '10g', 1.50, true);
INSERT INTO additional (forTypePrd, title, descr, price, isActive) VALUES (1, 'Cebola Caramelizada', '10g', 1.50, true);
INSERT INTO additional (forTypePrd, title, descr, price, isActive) VALUES (1, 'Molho Smash', '10g', 1.50, true);
INSERT INTO additional (forTypePrd, title, descr, price, isActive) VALUES (1, 'Molho Barbecue', '15g', 2.50, true);


#CRIANDO OS CLIENTES
INSERT INTO clients (nameCli, email, pass, isActive, isLogged) VALUES ('Tiago Pereira', 'tiago@email.com', '123', true, true);
INSERT INTO clients (nameCli, email, pass, isActive, isLogged) VALUES ('Maria', 'maria@email.com', '123', true, true);
INSERT INTO clients (nameCli, email, pass, isActive, isLogged) VALUES ('Natalia', 'natalia@email.com', '123', true, true);
INSERT INTO clients (nameCli, email, pass, isActive, isLogged) VALUES ('Julia', 'julia@email.com', '123', true, true);
INSERT INTO clients (nameCli, email, pass, isActive, isLogged) VALUES ('Natan', 'natan@email.com', '123', true, true);


#CRIANDO OS PEDIDOS
INSERT INTO orders (clients, typePay, totalPrice, orderDate, isFinished) VALUES (1, 3, 67.70, NOW(), false);
INSERT INTO orders (clients, typePay, totalPrice, orderDate, isFinished) VALUES (1, 3, 166.50, NOW(), false);
INSERT INTO orders (clients, typePay, totalPrice, orderDate, isFinished) VALUES (2, 2, 30.50, NOW(), false);


#CRIANDO A RELAÇÃO PEDIDO-PRODUTO
INSERT INTO ordersProduct (orderCli, product) VALUES (1, 11);
INSERT INTO ordersProduct (orderCli, product) VALUES (1, 2);
INSERT INTO ordersProduct (orderCli, product) VALUES (2, 2);
INSERT INTO ordersProduct (orderCli, product) VALUES (2, 4);
INSERT INTO ordersProduct (orderCli, product) VALUES (2, 5);
INSERT INTO ordersProduct (orderCli, product) VALUES (3, 1);