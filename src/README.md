# src/lib

The `lib` directory contains core libraries and shared utilities used throughout the project. Each subfolder represents a specific functionality or domain. Below is a description of the contents and their usage.

## **Folder Structure**

### 1. api

1. What's included ?

- API client - `apiClient.ts` - contains the base API client implementation with basic configuration
- API services logically grouped. Eg. `auth`, `post` etc.
- schema validation - Each service contains it's own schema validation using `zod`
- custom react query hooks
- type of request and response payloads

2. Dependencies -

- `ky` - for making HTTP requests
- `zod` - for schema validation

### 2. mocker

**Purpose**: Contains request handlers for mocking API requests using `msw`.

### 3. store

**Purpose**: Contains the store configuration, and state management solution using `zustand`.

### 4. types

### 5. config

### 6. httpClient
