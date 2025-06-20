INSERT INTO Users(username, email, password_hash, role) VALUES
('alice123','alice@example.com','hashed123','owner'),
('bobwalker','bob@example.com','hashed456','walker'),
('carol123','carol@example.com','hashed789','owner'),
('gary123','gary@123.com','hashed000','walker'),
('gtq123','gtq@123.com','hashed111','owner');

INSERT INTO Dogs(name, size, owner_id) VALUES
('Max','medium', (SELECT user_id FROM Users WHERE username = 'alice123')),
('Bella','small', (SELECT user_id FROM Users WHERE username = 'carol123')),
('Bob','large', (SELECT user_id FROM Users WHERE username = 'gary123')),
('Kevin','medium', (SELECT user_id FROM Users WHERE username = 'gtq123')),
('Shai','small', (SELECT user_id FROM Users WHERE username = 'gary123'));

INSERT INTO WalkRequests(dog_id, requested_time, duration_minutes, location, status) VALUES
(
    (SELECT dog_id FROM Dogs WHERE name = 'Max' AND owner_id = (SELECT user_id FROM Users WHERE username = 'alice123')),
    '2025-06-10 08:00:00',
    30,
    'Parklands',
    'open'
),
(
    (SELECT dog_id FROM Dogs WHERE name = 'Bella' AND owner_id = (SELECT user_id FROM Users WHERE username = 'carol123')),
    '2025-06-10 09:30:00',
    45,
    'Beachside Ave',
    'accepted'
),
(
    (SELECT dog_id FROM Dogs WHERE name = 'Shai' AND owner_id = (SELECT user_id FROM Users WHERE username = 'gary123')),
    '2025-06-12 10:00:00',
    90,
    'Unley',
    'accepted'
),
(
    (SELECT dog_id FROM Dogs WHERE name = 'Bob' AND owner_id = (SELECT user_id FROM Users WHERE username = 'gary123')),
    '2025-06-13 09:00:00',
    35,
    'Unley',
    'completed'
),
(
    (SELECT dog_id FROM Dogs WHERE name = 'Kevin' AND owner_id = (SELECT user_id FROM Users WHERE username = 'gtq123')),
    '2025-06-20 10:00:00',
    40,
    'Norwood',
    'open'
);