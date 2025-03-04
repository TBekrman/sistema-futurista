
CREATE TABLE IF NOT EXISTS usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    sobrenome VARCHAR(100) NOT NULL,
    usuario VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) NOT NULL,
    perfil VARCHAR(20) NOT NULL,
    senha TEXT NOT NULL
);

INSERT INTO usuarios (nome, sobrenome, usuario, email, perfil, senha) VALUES
('Administrador', 'Padrão', 'admin', 'admin@example.com', 'administrador', '$2b$10$wOGw3v.PA1wF/O1KNuC7bOfkHvFZc0gyibms6y7.FbmvFxHfQ5LWa')
ON CONFLICT (usuario) DO NOTHING;
