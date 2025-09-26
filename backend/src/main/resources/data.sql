INSERT INTO room (code, name, floor, building, capacity, area, type)
VALUES
    ('IK-F0', 'Nagy előadó', '0', 'IK', 199, 40, 'OTHER'),
    ('IK-F1', 'Kis előadó', '0', 'IK', 100, 40, 'OTHER'),
    ('IK-104', 'Gépterem', '0', 'IK', 17, 30, 'LAB');

INSERT INTO key (room_id, code)
VALUES
    (1, 'AB10000'),
    (1, 'AB10001'),
    (1, 'AB10002');

INSERT INTO requester (first_name, last_name, personal_id_number, email_address, phone_number, type)
VALUES
    ('Nagy', 'István', '123456AB', 'nagy.istvan@email.hu', '+36301231234', 'STUDENT'),
    ('Takarító', 'Ilona', '654321AB', 'takarito.ilona@email.hu', '+36203214321', 'STAFF'),
    ('Külsős', 'Béla', '123321AB', 'kulcsos.bela@email.hu', '+36703211234', 'STAFF');

INSERT INTO "user" (username, password, email_address, is_admin)
VALUES
    ('admin', '$2a$10$YibFlVtQxcgZyHxCkB3VI.RDgDdgEnrt0WEOf3aIfznVe7fGK2rRq', 'admin@email.hu', true),
    ('user', '$2a$10$xg13urHcaGWSUAMgo8MRSeuFIAncKZYkshaJCt4Il2evk63oIform', 'user@email.hu', false);

INSERT INTO borrowing (key_id, user_id, requester_id, start_time, end_time, date, status)
VALUES
    (1, 2, 1, '07:55', '09:42', '2025-09-08', 'RETURNED'),
    (2, 2, 1, '17:50', '20:00', '2025-09-09', 'RETURNED'),
    (2, 2, 2, '13:50', null, '2025-09-11', 'BORROWED'),
    (2, 2, 2, '13:50', null, '2025-09-11', 'BORROWED'),
    (3, 2, 2, '13:50', null, '2025-09-12', 'BORROWED'),
    (3, 2, 2, '13:50', null, '2025-09-13', 'LOST'),
    (3, 2, 3, '13:50', '15:50', '2025-09-14', 'BROKEN');
