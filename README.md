# AAPOD API

This is the API for AAPOD (Another Astronomy Picture of the Day), which is a personal project inspired by NASA's Astronomy Picture of the Day ([APOD](http://apod.nasa.gov)).

## Motivations

Why create another APOD API when NASA already [provides one](https://api.nasa.gov/api.html#apod)? Three main reasons:

1. The APOD API has a rate limit of 1000 requests per hour, which is quite restrictive. The goal of this project is to create a similar API with no rate limit (for now).
2. When testing with the APOD API, I noticed that it experienced some short but significant periods of downtime, which would also take AAPOD down. I wanted to be able to respond to server outages.
3. For fun.

## Notable Dependencies

* [Knex](http://knexjs.org/) - A Javascript SQL query builder
* [Bookshelf](http://bookshelfjs.org/) - A Javascript ORM
* [Hapi](https://hapijs.com/) - A Javascript framework for building APIs

## Project Structure

* `assets/` - Any non-APOD images. Currently there is only one image for testing purposes.
* `config/` - Contains test, development, and production configs
* `db/` - Contains Knex and Bookshelf instances, as well as all database migrations.
* `scripts/` - Contains scripts needed for seeding the AAPOD database with the resources from the APOD API.
* `src/libraries/` - Various helper libraries for interfacing with the APOD API, S3, etc.
* `src/models/` - Contains Bookshelf (a Javascript ORM) models
* `src/plugins/` - Hapi.js plugins (currently only the `/media` routes).
* `test/` - Tests which completely cover the `src/` directory.

## Overview

The AAPOD API still relies on NASA's APOD API for its data, but only uses a few API calls per day. Here is the process for getting that data into the database:

1. Fetch a response from the NASA APOD API.
2. Check the date in the response. If there is already a record for that day, exit early. Otherwise, continue on to 3.
3. If the response is for a video `media_type`, save the response to the database. If it is for an image `media_type`:
  - Download the image to a temp file
  - Upload the image to S3
  - Store the S3 image url along with the rest of the APOD response in the database.

This process is run several times per day in order to make sure that the database always contains the most up-to-date information. There is no harm in running it multiple times on the same day, since the APOD resopnse is stored only if it has not been stored already.

## Endpoints

Currently, there are two endpoints for this API:

* `/media/latest` - Fetches the latest media model from the DB.
* `/media/{date}` - Fetches the media model for the given date, if present.

## Future Ideas/Improvements

* Implement a `/media/random` endpoint to fetch a random media model.
* Implement a `/media/` endpoint for fetching collections, filtering, etc.
* Implement an API key system with rate limits.
