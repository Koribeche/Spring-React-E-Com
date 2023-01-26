DROP DATABASE IF EXISTS testtesttesttesttesttesttest;
CREATE DATABASE testtesttesttesttesttesttest;
USE testtesttesttesttesttesttest;

# --------------------------- Création de la table Users et insertion de quelque valeur  ---------------------------

CREATE TABLE roles
(
    id_role BIGINT      NOT NULL auto_increment,
    name    varchar(25) NOT NULL,
    PRIMARY KEY (id_role)
);

INSERT INTO roles (name)
VALUES ('ROLE_USER'),
       ('ROLE_ADMIN');

# --------------------------- Création de la table Users et insertion de quelque valeur  ---------------------------

CREATE TABLE users
(
    id_user  BIGINT       NOT NULL AUTO_INCREMENT,
    nom_user varchar(15)  NOT NULL,
    prenom   varchar(20)  NOT NULL,
    email    varchar(30)  NOT NULL UNIQUE,
    password varchar(255) NOT NULL DEFAULT 'DKTLSJGDFLKJFSDLMIRKFFZELDGFJG',
    PRIMARY KEY (id_user)
);

INSERT INTO users (nom_user, prenom, email, password)
VALUES ('Koribeche', 'Amir', 'amir@gmail.com', 123456),
       ('Demigha', 'Amine', 'amine@gmail.com', 123456),
       ('Lasnami', 'Sara', 'Saraa@gmail.com', 123456),
       ('Bennaceur', 'Meriem', 'Meriem@gmail.com', 123456),
       ('Bouhafs', 'Zaki', 'Zakii@gmail.com', 123456);

# --------------------------- Création de la table Adresse et insertion de quelque valeur  ---------------------------

CREATE TABLE users_roles
(
    user_id_user  BIGINT NOT NULL,
    roles_id_role BIGINT NOT NULL,
    FOREIGN KEY (roles_id_role) REFERENCES roles (id_role),
    FOREIGN KEY (user_id_user) REFERENCES users (id_user)
);

INSERT INTO users_roles (user_id_user, roles_id_role)
VALUES (1, 1),
       (1, 2),
       (2, 1),
       (3, 1),
       (4, 1),
       (5, 1);

# --------------------------- Création de la table Adresse et insertion de quelque valeur  ---------------------------


CREATE TABLE adresses
(
    id_adresse  BIGINT       NOT NULL AUTO_INCREMENT,
    line1       varchar(100) NOT NULL,
    line2       varchar(100) NOT NULL,
    city        varchar(50)  NOT NULL,
    pays        varchar(50)  NOT NULL,
    code_postal varchar(15)  NOT NULL,
    id_user     BIGINT       NOT NULL,
    PRIMARY KEY (id_adresse),
    FOREIGN KEY (id_user) REFERENCES users (id_user) ON DELETE CASCADE
);

INSERT INTO adresses (line1, line2, city, pays, code_postal, id_user)
VALUES ('25 rue des marjoberts', 'Résidence Kley chêne', 'Cergy', 'France', '95000', 2);

# --------------------------- Création de la table Offre et insertion de quelque valeur  ---------------------------

CREATE TABLE offres
(
    id_offre          BIGINT       NOT NULL AUTO_INCREMENT,
    nom_offre         varchar(35)  NOT NULL,
    photo_offre       varchar(255) NOT NULL,
    categorie         varchar(30)  NOT NULL,
    marque            varchar(30)  NOT NULL,
    min_price         int          NOT NULL,
    description       varchar(255),
    creation_time     DATETIME DEFAULT CURRENT_TIMESTAMP,
    modification_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    id_user           BIGINT       NOT NULL,
    PRIMARY KEY (id_offre),
    FOREIGN KEY (id_user) REFERENCES users (id_user)
);

INSERT INTO offres (nom_offre, photo_offre, categorie, marque, description, min_price, id_user)
VALUES ('iphone 8', 'https://media.ldlc.com/r1600/ld/products/00/04/58/18/LD0004581875_2.jpg', 'informatique', 'Apple',
        'description', 200, 1),
       ('iphone X',
        'https://www.apple.com/newsroom/images/product/iphone/standard/iphonex_front_back_glass_big.jpg.large.jpg',
        'informatique', 'Apple', 'description', 270, 1),
       ('iphone 11',
        'https://static.fnac-static.com/multimedia/Images/FR/MDM/dc/b2/bd/12432092/3756-1/tsp20221116090859/Apple-iPhone-11-6-1-Double-SIM-64-Go-Noir-V2.jpg',
        'informatique', 'Apple', 'description', 350, 1),
       ('iphone 12', 'https://cdn.lesnumeriques.com/optim/product/59/59901/34105c50-iphone-12__450_400.jpeg',
        'informatique', 'Apple', 'description', 450, 1),
       ('iphone 13',
        'https://www.backmarket.fr/cdn-cgi/image/format%3Dauto%2Cquality%3D75%2Cwidth%3D260/https://d1eh9yux7w8iql.cloudfront.net/product_images/512315_3661e00f-5a1a-4252-8945-ba7ac3fd1dee.jpg',
        'informatique', 'Apple', 'description', 550, 1),
       ('Samsung S22', 'https://cdn.lesnumeriques.com/optim/product/66/66009/5f8fce56-galaxy-s22__450_400.jpeg',
        'informatique', 'Samsung', 'description', 200, 1);
# --------------------------- Création de la table Produit et insertion de quelque valeur  ---------------------------

CREATE TABLE produits
(
    id_produit    BIGINT       NOT NULL AUTO_INCREMENT,
    nom_produit   varchar(35)  NOT NULL,
    photo_produit varchar(255) NOT NULL,
    description   varchar(255),
    min_price     INT,
    id_offre      BIGINT       NOT NULL,
    PRIMARY KEY (id_produit),
    FOREIGN KEY (id_offre) REFERENCES offres (id_offre) ON DELETE CASCADE
);

INSERT INTO produits (nom_produit, photo_produit, description, min_price, id_offre)
VALUES ('iphone 8', 'https://fr.shopping.rakuten.com/photo/1932803071_ML.jpg', 'description', 200, 1),
       ('iphone 8 pro', 'https://fr.shopping.rakuten.com/photo/1932803071_ML.jpg', 'description', 230, 1),
       ('iphone 8 pro max', 'https://fr.shopping.rakuten.com/photo/1932803071_ML.jpg', 'description', 250, 1),
       ('iphone X', 'https://www.universmac.com/web/image/product.template/14500/image_1024?unique=5d73a4a',
        'description', 270, 2),
       ('iphone X pro',
        'https://www.apple.com/newsroom/images/product/iphone/standard/iPhone_XR_white-back_09122018_carousel.jpg.large.jpg',
        'description', 300, 2),
       ('iphone X pro max', 'https://cf4.certideal.com/20607-thickbox_default/iphone-xr-64-go-rouge.jpg',
        'description', 330, 2),
       ('iphone 11',
        'https://www.cdiscount.com/pdt2/0/3/9/1/700x700/app3344505967039/rw/apple-iphone-11-64-go-noir-reconditionne-tres.jpg',
        'description', 350, 3),
       ('iphone 11 pro',
        'https://www.backmarket.fr/cdn-cgi/image/format%3Dauto%2Cquality%3D75%2Cwidth%3D260/https://d1eh9yux7w8iql.cloudfront.net/product_images/290034_6062fdf9-c7cd-451b-9b8b-a1a9c2aa2d11.jpg',
        'description', 370, 3),
       ('iphone 11 pro max',
        'https://d1eh9yux7w8iql.cloudfront.net/product_images/290045_d7327841-d981-4566-b4a5-a392912a824f.jpg',
        'description', 420, 3),
       ('iphone 12',
        'https://d1eh9yux7w8iql.cloudfront.net/product_images/None_bb1e34e0-4112-46f4-b7e0-7394beba3f40.jpg',
        'description', 450, 4),
       ('iphone 12 pro',
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/refurb-iphone-12-pro-graphite-2020?wid=2000&hei=1897&fmt=jpeg&qlt=95&.v=1635202842000',
        'description', 470, 4),
       ('iphone 12 pro max',
        'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/MHLN3?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1601352338000',
        'description', 500, 4),
       ('iphone 13',
        'https://www.apple.com/newsroom/images/product/iphone/geo/Apple_iphone13_hero_geo_09142021_inline.jpg.large.jpg',
        'description', 550, 5),
       ('iphone 13 pro',
        'https://www.backmarket.fr/cdn-cgi/image/format%3Dauto%2Cquality%3D75%2Cwidth%3D260/https://d1eh9yux7w8iql.cloudfront.net/product_images/None_4e3c52ad-4504-427f-9416-6ed343576442.jpg',
        'description', 570, 5),
       ('iphone 13 pro max',
        'https://static.fnac-static.com/multimedia/Images/FR/MDM/87/12/04/17044103/3756-1/tsp20221110144523/Apple-iPhone-13-Pro-Max-6-7-5G-512-Go-Double-SIM-Or.jpg',
        'description', 600, 5);


# --------------------------- Création de la table Caracteristique et insertion de quelque valeur  ---------------------------

CREATE TABLE caracteristiques
(
    id_caracteristique BIGINT       NOT NULL AUTO_INCREMENT,
    description        varchar(255) NOT NULL,
    color              varchar(255) DEFAULT '',
    capacite           varchar(255) DEFAULT '',
    prix               int          NOT NULL,
    quantite_dispo     int          NOT NULL,
    id_produit         BIGINT       NOT NULL,
    PRIMARY KEY (id_caracteristique),
    FOREIGN KEY (id_produit) REFERENCES produits (id_produit) ON DELETE CASCADE
);

INSERT INTO caracteristiques (id_produit, prix, quantite_dispo, description, color, capacite)
VALUES (1, 100, 1000, 'description', 'rouge', '240go'),
       (1, 100, 1000, 'description', 'blue', '128go'),
       (1, 120, 1000, 'description', 'noir', '256go'),
       (1, 130, 1000, 'description', 'rose', '512go'),
       (1, 150, 1000, 'description', 'rose', '1to'),
       (2, 150, 1000, 'description', 'rouge', '240go'),
       (2, 150, 1000, 'description', 'blue', '128go'),
       (2, 170, 1000, 'description', 'noir', '256go'),
       (2, 180, 1000, 'description', 'rose', '512go'),
       (2, 200, 1000, 'description', 'rose', '1to'),
       (3, 200, 1000, 'description', 'rouge', '240go'),
       (3, 200, 1000, 'description', 'blue', '128go'),
       (3, 220, 1000, 'description', 'noir', '256go'),
       (3, 250, 1000, 'description', 'rose', '512go'),
       (3, 270, 1000, 'description', 'rose', '1to'),
       (4, 270, 1000, 'description', 'rouge', '240go'),
       (4, 270, 1000, 'description', 'blue', '128go'),
       (4, 300, 1000, 'description', 'noir', '256go'),
       (4, 320, 1000, 'description', 'rose', '512go'),
       (4, 350, 1000, 'description', 'rose', '1to'),
       (5, 300, 1000, 'description', 'rouge', '240go'),
       (5, 300, 1000, 'description', 'blue', '128go'),
       (5, 320, 1000, 'description', 'noir', '256go'),
       (5, 330, 1000, 'description', 'rose', '512go'),
       (5, 350, 1000, 'description', 'rose', '1to'),
       (6, 330, 1000, 'description', 'rouge', '240go'),
       (6, 330, 1000, 'description', 'blue', '128go'),
       (6, 350, 1000, 'description', 'noir', '256go'),
       (6, 350, 1000, 'description', 'rose', '512go'),
       (6, 370, 1000, 'description', 'rose', '1to'),
       (7, 350, 1000, 'description', 'rouge', '240go'),
       (7, 350, 1000, 'description', 'blue', '128go'),
       (7, 370, 1000, 'description', 'noir', '256go'),
       (7, 380, 1000, 'description', 'rose', '512go'),
       (7, 400, 1000, 'description', 'rose', '1to'),
       (8, 350, 1000, 'description', 'rouge', '240go'),
       (8, 350, 1000, 'description', 'blue', '128go'),
       (8, 380, 1000, 'description', 'noir', '256go'),
       (8, 400, 1000, 'description', 'rose', '512go'),
       (8, 420, 1000, 'description', 'rose', '1to'),
       (9, 400, 1000, 'description', 'rouge', '240go'),
       (9, 400, 1000, 'description', 'blue', '128go'),
       (9, 420, 1000, 'description', 'noir', '256go'),
       (9, 430, 1000, 'description', 'rose', '512go'),
       (9, 450, 1000, 'description', 'rose', '1to'),
       (10, 450, 1000, 'description', 'rouge', '240go'),
       (10, 450, 1000, 'description', 'blue', '128go'),
       (10, 480, 1000, 'description', 'noir', '256go'),
       (10, 500, 1000, 'description', 'rose', '512go'),
       (10, 530, 1000, 'description', 'rose', '1to'),
       (11, 500, 1000, 'description', 'rouge', '240go'),
       (11, 500, 1000, 'description', 'blue', '128go'),
       (11, 520, 1000, 'description', 'noir', '256go'),
       (11, 530, 1000, 'description', 'rose', '512go'),
       (11, 550, 1000, 'description', 'rose', '1to'),
       (12, 500, 1000, 'description', 'rouge', '240go'),
       (12, 500, 1000, 'description', 'blue', '128go'),
       (12, 520, 1000, 'description', 'noir', '256go'),
       (12, 530, 1000, 'description', 'rose', '512go'),
       (12, 550, 1000, 'description', 'rose', '1to'),
       (13, 550, 1000, 'description', 'rouge', '240go'),
       (13, 550, 1000, 'description', 'blue', '128go'),
       (13, 570, 1000, 'description', 'noir', '256go'),
       (13, 580, 1000, 'description', 'rose', '512go'),
       (13, 600, 1000, 'description', 'rose', '1to'),
       (14, 580, 1000, 'description', 'rouge', '240go'),
       (14, 580, 1000, 'description', 'blue', '128go'),
       (14, 600, 1000, 'description', 'noir', '256go'),
       (14, 620, 1000, 'description', 'rose', '512go'),
       (14, 650, 1000, 'description', 'rose', '1to'),
       (15, 650, 1000, 'description', 'rouge', '240go'),
       (15, 650, 1000, 'description', 'blue', '128go'),
       (15, 680, 1000, 'description', 'noir', '256go'),
       (15, 700, 1000, 'description', 'rose', '512go'),
       (15, 750, 1000, 'description', 'rose', '1to');

# --------------------------- Création de la table Paiement et insertion de quelque valeur  ---------------------------

CREATE TABLE paiements
(
    id_paiement     BIGINT       NOT NULL AUTO_INCREMENT,
    status_paiement varchar(255) NOT NULL DEFAULT 'pending',
    paiement_intent varchar(100),
    id_commande     BIGINT,
    PRIMARY KEY (id_paiement)
);

# --------------------------- Création de la table Commande et insertion de quelque valeur  ---------------------------

CREATE TABLE commandes
(
    id_commande          BIGINT NOT NULL AUTO_INCREMENT,
    id_user              BIGINT NOT NULL,
    id_adresse_livraison BIGINT NOT NULL,
    status_commande      varchar(255) DEFAULT 'PAYEMENT EN ATTENTE',
    prix_total           int    not null,
    PRIMARY KEY (id_commande),
    FOREIGN KEY (id_user) REFERENCES users (id_user),
    FOREIGN KEY (id_adresse_livraison) REFERENCES adresses (id_adresse)
);

INSERT INTO commandes (id_user, id_adresse_livraison, prix_total)
VALUES (2, 1, 500),
       (3, 1, 550),
       (4, 1, 600);

# --------------------------- Ajouter la clé étrangere commande sur la table de paiements  ----------------------------

ALTER TABLE paiements
    ADD FOREIGN KEY (id_commande) REFERENCES commandes (id_commande);

INSERT INTO paiements (status_paiement, id_commande)
VALUES ('paied', 1),
       ('not enough credit', 2),
       ('refused', 3);

# --------------------------- Création de la table Paiement et insertion de quelque valeur  ---------------------------

CREATE TABLE produitpaniers
(
    id_produit_panier  BIGINT NOT NULL AUTO_INCREMENT,
    quantite_achat     int    NOT NULL DEFAULT 1,
    status_panier      varchar(255)    DEFAULT 'en cours',
    id_caracteristique BIGINT NOT NULL,
    id_user            BIGINT NOT NULL,
    id_commande        BIGINT,
    PRIMARY KEY (id_produit_panier),
    FOREIGN KEY (id_user) REFERENCES users (id_user),
    FOREIGN KEY (id_commande) REFERENCES commandes (id_commande),
    FOREIGN KEY (id_caracteristique) REFERENCES caracteristiques (id_caracteristique)
);

INSERT INTO produitpaniers(id_user, id_caracteristique, quantite_achat)
VALUES (2, 1, 1),
       (2, 10, 1),
       (3, 8, 10),
       (4, 14, 5);