CREATE DATABASE IF NOT EXISTS phonebook;
USE phonebook;

CREATE TABLE IF NOT EXISTS contacts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  number VARCHAR(11)
);

INSERT INTO contacts (name, number) VALUES ("dummy1", "6666666");
INSERT INTO contacts (name, number) VALUES ("dummy2", "6666666");
INSERT INTO contacts (name, number) VALUES ("dummy3", "6666666");
INSERT INTO contacts (name, number) VALUES ("dummy4", "6666666");
INSERT INTO contacts (name, number) VALUES ("dummy5", "6666666");
INSERT INTO contacts (name, number) VALUES ("dummy6", "6666666");
INSERT INTO contacts (name, number) VALUES ("dummy7", "6666666");
INSERT INTO contacts (name, number) VALUES ("dummy8", "6666666");
INSERT INTO contacts (name, number) VALUES ("dummy9", "6666666");