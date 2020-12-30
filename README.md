# TheLazyTraveler

1911 - Fullstack Academy Capstone Project

Project URL: https://lazy-traveler.herokuapp.com/

## Description

![Screen Demo](https://media.giphy.com/media/R43Q42JzDULsYdN2aL/giphy.gif)

An automated trip planner that generates an itinerary with dates and times for a traveler. The automated itinerary is based on user inputs (such as location to where they are traveling to, duration of the trip and any specific areas of interest.

* A user is able to input their trip by location, duration and include their interest(s).
* A user can customize their itinerary through a drag and drop feature.
* A user is able to save their itinerary.

![Screen 1 Demo](https://media.giphy.com/media/37gHOTTmCp5nZ1LW9K/giphy.gif)

![Screen 2 Demo](https://media.giphy.com/media/41dcXyKqCy7kFwjBoz/giphy.gif)

![Screen 3 Demo](https://media.giphy.com/media/IXpHe6ACMz5Wgbo3jM/giphy.gif)

## Tech Stack

Our tech stack includes React, Redux, Express, Sequelize, PostgreSQL, Google Places/Maps/Geocoding API and Node.js.

Major packages used include: Material-UI React and React Beautiful DnD.

Aspects of the project we found interesting were:

* Creating an interactive drag and drop feature for the user to control which places they would like to include in their itinerary.
* Designing an algorithm using Google Places API to create a recommendation list of places for the user based on where they are traveling to (i.e. location), dates of travel and their interested preferences. We scoped those preferences by the following categories: arts, museums, fine dining, nightlife, shopping and family friendly activities.

## Technical Challenges

One of our main challenges was managing the usage of our premium API calls.  We noticed fairly quickly that our usage of the Google Places API would soon reach our limit.  To slow the rate of request in the API, we decided to cache the photos to local storage.  This helped decrease our request in the Google Places API by 33%. 

## Notes

TheLazyTraveler uses the following APIs:

* Google Places API,
* Google Geocoding API and
* Google Maps Javascript API

## Video Link

https://www.youtube.com/watch?v=XXnbfUNUM6w&list=PLx0iOsdUOUmkGPFdAt5kHKxGQw_YseAQI&index=14
