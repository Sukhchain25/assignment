# Licensing System

## Overview

The Licensing System is a Node.js and Express-based application designed to manage license plans and enforce API usage limits. The system includes functionality for CRUD operations on license plans, enforces API usage limits based on user license plans, and provides a simple UI for managing these aspects. It also includes initial data seeding, error handling, and basic testing.

## Features

- **CRUD Operations:** Create, read, update, and delete license plans and users.
- **API Usage Limits:** Enforces API usage limits based on the user's license plan.
- **Seeding:** Automatically seeds the database with initial license plans.
- **Error Handling:** Custom error messages when API usage limits are exceeded.
- **UI:** Simple UI for managing license plans and viewing user API usage.
- **Testing:** Unit tests for API usage tracking and limit enforcement.

## Prerequisites

- Node.js (v14 or higher recommended)
- MongoDB (local or remote instance)
- npm (Node Package Manager)

## Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/sukhchain25/asignment.git
   cd assignment
   ```

2. **Install Dependencies:**

   Run the following command to install the required dependencies:

   ```bash
   npm install

   ```

3. **Create a .env file in the root directory of the project and add the following content:**

   ```bash
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/licensing-system
   ```

## Usage

1. **Use the following command to start the server in development mode. This command uses nodemon to automatically restart the server whenever you make changes to the code:**

   ```bash
    npm run start:dev

   ```
