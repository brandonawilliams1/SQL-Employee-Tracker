USE tracker_db;

INSERT INTO departments (name)
    VALUES ("Upper Managment"),
           ("Lumber Yard"),
           ("Hardware"),
           ("Interior Design");

INSERT INTO roles (title, salary, department_id)
   VALUES ("Owner", 500000, 1),
          ("Lumber Manager", 150000, 2),
          ("Lumber Employee", 60000, 2),
          ("Hardware Manager", 70000, 3),
          ("Hardware Employee", 63000, 3),
          ("Int Design Manager", 55000, 3),  
          ("Int Design Employee", 35000, 4);
   
INSERT INTO employees (first_name, last_name, role_id, manager_id)
  VALUES ("Tom", "Kelly", 1, null),
         ("Rocco", "Baldelli", 2, 1),
         ("Rick", "Anderson", 4, 1),
         ("Brie", "Larson", 6, 1),
         ("Ann", "Williams", 3, 2),
         ("Ownen", "Wilson", 3, 2),
         ("Chipper", "Jones", 3, 2),
         ("Paul", "Moliter", 3, 2),
         ("Chadwick", "Boseman", 3, 2),
         ("Gal", "Gadot", 5, 4),
         ("Kirby", "Puckett", 5, 4),
         ("Shelly", "Mickson", 5, 4),
         ("Jim", "Carey", 7, 6),         
         ("Lizzy", "Lopez", 7, 6),
         ("Benedict", "Cumberbatch", 7, 6),
         ("Michael", "Jordan", 7, 6);