# Transactional Monitor (Lambda Simulation)

This project provides a local environment to simulate AWS Lambda functions, DynamoDB, and S3 interactions, integrated with a PostgreSQL database.

## Application Overview and Workflow

This project is designed to simulate a local AWS serverless environment, enabling the development and testing of applications that utilize Lambda, DynamoDB, and S3, with data persistence in a PostgreSQL database. 
Trying to follow this flow:
![alt text](image.png)

The practical flow of the application is as follows:

1.  **Local Infrastructure:** We use `docker-compose` to spin up **LocalStack** (to emulate AWS services like Lambda, S3, and DynamoDB) and **PostgreSQL** (for relational data storage).
2.  **Infrastructure as Code (IaC):** The AWS resources are defined using the **AWS CDK (Cloud Development Kit)** in TypeScript. This ensures the local environment perfectly mirrors the intended cloud architecture.
3.  **Local Deployment:** By running CDK commands, the defined resources are provisioned directly into the LocalStack container.
4.  **Business Logic:** The core application (`bin/transactional_monitor.ts`) orchestrates the logic, interacting with both the simulated AWS services and the PostgreSQL database.
5.  **Local Execution:** The project uses `ts-node` to run the simulation, allowing you to trigger and debug the monitor's behavior without deploying to a real AWS account.
6.  **Automated Validation:** A comprehensive test suite using **Jest** verifies that the interactions between the services and the database function correctly within this isolated sandbox.

In summary, this project provides a complete, zero-cost development "sandbox" for building complex cloud-native applications locally.

## Prerequisites

Ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (v16+ recommended)
- [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/)
- [AWS CLI](https://aws.amazon.com/cli/) (optional, for manual resource inspection)

## Getting Started

Follow these steps to set up the project from scratch.

### 1. Environment Configuration

Ensure your `.env` file is present in the root directory. Based on the project requirements, it should look like this:

```dotenv
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=test
AWS_SECRET_ACCESS_KEY=test
AWS_ENDPOINT_URL=http://localhost:4566
LAMBDA_ENDPOINT=http://localhost:4566
DYNAMODB_ENDPOINT=http://localhost:4566
S3_ENDPOINT=http://localhost:4566
DB_HOST=localhost
DB_PORT=5432
DB_NAME=lambda_simulation_db
DB_USER=postgres
DB_PASSWORD=password
DATABASE_URL=postgresql://postgres:password@localhost:5432/lambda_simulation_db
NODE_ENV=development
DEBUG=lambda-simulation:*
```

### 2. Install Dependencies

Install the project dependencies using npm:

```bash
npm install
```

### 3. Start Infrastructure (Docker)

The project relies on LocalStack and PostgreSQL. To start these services, run:

```bash
docker-compose up -d
```

*Note: Wait a few seconds for LocalStack and Postgres to become healthy.*

### 4. Build and Deploy Infrastructure

Since this project uses AWS CDK, you must compile the TypeScript code and then deploy the resources to LocalStack:

```bash
npm run build
npm run cdk bootstrap
npm run cdk bootstrap
npm run cdk deploy
```

### 5. Run the Simulation

Start the local simulation environment:

```bash
npm start
```

## Testing

To run the automated test suite:

```bash
npm test
```

## Troubleshooting

- **Docker Containers:** If services aren't responding, check container status with `docker ps`.
- **Logs:** Use `DEBUG=lambda-simulation:* npm start` to see detailed execution logs.
- **LocalStack:** You can verify local AWS resources by pointing your CLI to the endpoint: 
  `aws s3 ls --endpoint-url=http://localhost:4566`