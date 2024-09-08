# Weather Forecast Web Application

## Overview

This project is a weather forecast web application built using React. It allows users to search for cities, view city details in a table format, and access detailed weather information for each city in a new tab. The application features infinite scrolling for city data and dynamic backgrounds based on weather conditions.

## Features

- **City Search**: Filter cities by name or country with a search bar.
- **Infinite Scroll**: Load more cities as the user scrolls down.
- **Weather Details**: Click on a city to view detailed weather information in a new tab.
- **Dynamic Backgrounds**: Background color changes based on the weather condition of the city.

## Components

1. **`CitiesTable`**:
   - Fetches and displays a list of cities with infinite scroll.
   - Includes a search bar to filter cities by name or country.
   - Links city names to detailed weather information.

2. **`WeatherDetails`**:
   - Displays detailed weather information for a selected city.
   - Background changes based on the weather condition (sunny, rainy, cloudy, snowy).

3. **`NotFound`**:
   - Displays a 404 error message when the user navigates to a non-existent route.

4. **`App`**:
   - Configures routing for the application using `react-router-dom`.

## Setup

1. **Clone the Repository**:

   ```bash
   (https://github.com/Ajayraj1515/Weather-Forecast-Web-Application.git)
