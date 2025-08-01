# Travel-Tales

Travel-Tales is a web application that allows users to track their travels around the world. It provides an interactive map where you can pin the cities you've visited, add notes about your trips, and view a curated "memories" slideshow of your adventures.

## Features

- **Interactive Map**: Utilizes Mapbox to display a world map.
- **Add Cities**: Click on the map to add a new city to your visited list.
- **City & Country Lists**: View organized lists of all the cities and countries you have visited.
- **Trip Details**: Add the date of your visit and personal notes for each city.
- **Geolocation**: Automatically find and center the map on your current location.
- **Memories Slideshow**: An animated slideshow (`Memories` page) showcasing the cities you've visited with dynamic images.
- **User Authentication**: A mock authentication system to manage user sessions.
- **Backend with Supabase**: City data is fetched from and stored in a Supabase backend.
- **Location Search**: Search for places directly on the map.
- **Map Themes**: Switch between light and dark themes for the map.

## Tech Stack

- **Frontend**:
  - [React](https://reactjs.org/)
  - [React Router](https://reactrouter.com/) for routing.
  - [Vite](https://vitejs.dev/) as a build tool.
- **Mapping**:
  - [Mapbox GL JS](https://docs.mapbox.com/mapbox-gl-js/api/)
  - [React Map GL](https://visgl.github.io/react-map-gl/)
  - [@mapbox/search-js-react](https://github.com/mapbox/search-js/tree/main/packages/react) for search.
- **Backend**:
  - [Supabase](https://supabase.io/) for the database and city data API.
- **Styling & Animations**:
  - CSS Modules
  - [Anime.js](https://animejs.com/) for the "Memories" page animation.
- **Linting**:
  - [ESLint](https://eslint.org/) with `eslint-config-react-app`.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js (v14 or later)
- npm

### Installation

1.  **Clone the repository:**

    ```sh
    git clone https://github.com/anuragK2048/Travel-Tales.git
    cd Travel-Tales
    ```

2.  **Install NPM packages:**

    ```sh
    npm install
    ```

3.  **Set up environment variables:**

    Create a `.env` file in the root of your project and add the following environment variables. You will need to get your own API keys from [Supabase](https://supabase.io/) and [Mapbox](https://www.mapbox.com/).

    ```env
    VITE_SUPABASE_URL="YOUR_SUPABASE_URL"
    VITE_SUPABASE_ANON_KEY="YOUR_SUPABASE_ANON_KEY"
    VITE_mapboxAccessToken="YOUR_MAPBOX_ACCESS_TOKEN"
    ```

### Running the Application

- **To run the app in development mode:**
  This will start the Vite development server, typically on `http://localhost:5173`.

  ```sh
  npm run dev
  ```

- **To build the app for production:**
  This will create a `dist` folder with the optimized production build.

  ```sh
  npm run build
  ```

- **To preview the production build locally:**
  ```sh
  npm run preview
  ```

## Usage

Once the application is running, you can:

1.  **Login**: The login is pre-filled with a dummy user. Click the "Login" button to enter the main app.
2.  **Explore the Map**: Pan and zoom around the map.
3.  **Add a City**: Click anywhere on the map to open a form and add a new city to your list.
4.  **View Cities/Countries**: Use the navigation to switch between your city and country lists.
5.  **View Memories**: Navigate to the "Memories" page to see an animated slideshow of your travels.
6.  **Use Your Location**: Click the "Go to your position" button to center the map on your current location.
