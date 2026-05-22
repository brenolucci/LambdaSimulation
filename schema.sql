-- Create a schema for our project
CREATE SCHEMA IF NOT EXISTS dcc_monitor;

-- 1. Users table (1NF/2NF/3NF compliant)
CREATE TABLE dcc_monitor.users (
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Transactions Table
-- Note how we link to user_id instead of storing the email again (Normalization!)
CREATE TABLE dcc_monitor.transactions (
    transaction_id UUID PRIMARY KEY,
    amount DECIMAL(12, 2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'GBP',
    user_id INT REFERENCES dcc_monitor.users(user_id),
    processed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
); -- Added the default value and closed the parenthesis
