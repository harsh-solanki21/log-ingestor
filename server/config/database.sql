CREATE DATABASE log-ingestor;

CREATE TABLE IF NOT EXISTS logs (
	id SERIAL PRIMARY KEY,
	level VARCHAR(10) NOT NULL,
	message TEXT NOT NULL,
	resourceId VARCHAR(30) NOT NULL,
	timestamp TIMESTAMP NOT NULL,
	traceId VARCHAR(30) NOT NULL,
	spanId VARCHAR(30) NOT NULL,
	commit VARCHAR(10) NOT NULL,
	metadata JSONB NOT NULL
);
