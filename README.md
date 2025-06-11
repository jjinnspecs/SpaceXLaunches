# SpaceX Launches

This project is a web application that displays information about SpaceX launches. It features a user-friendly interface built with React and Chakra UI for the frontend, and an Express.js server for the backend API.

## Table of Contents

- [SpaceX Launches](#spacex-launches)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Technologies Used](#technologies-used)
  - [Installation](#installation)
  - [Usage](#usage)
  - [API Endpoints](#api-endpoints)

## Features

- View a list of SpaceX launches with details such as mission name, launch date, and status.
- Filter launches by year and status (success, failed, upcoming).
- Search for launches by mission name.
- View detailed information about each launch, including links to articles, videos, and images.
- Responsive design for optimal viewing on various devices.

## Technologies Used

- **Frontend:**
  - React
  - Chakra UI
  - Axios (for API requests)
  - lodash (for debouncing)
  
- **Backend:**
  - Node.js
  - Express.js
  - CORS
  - node-fetch (for fetching data from SpaceX API)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/spaceX-launches.git
   cd spaceX-launches
   ```

2. Navigate to the root directory and install dependencies:

   ```bash
   npm install
   ```

## Usage

1. Start the server:

   ```bash
   npm run start
   ```

2. Open your browser and navigate to `http://localhost:5000` to view the application.

## API Endpoints

The backend server provides the following API endpoint:

- **GET /api/launches**
  - Utilizes the SpaceX API endpoint: [https://api.spacexdata.com/v3/launches](https://api.spacexdata.com/v3/launches)
  - Query parameters:
    - `search`: Filter launches by mission name.
    - `year`: Filter launches by launch year.
    - `status`: Filter launches by status (success, failed, upcoming).
    - `limit`: Number of launches to return (default is 10).
    - `offset`: Number of launches to skip (for pagination).
