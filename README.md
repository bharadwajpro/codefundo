# Android app for posting news regarding Natural Calamities

## How to Use & Installation
- Download apk file from [here](https://github.com/bharadwajpro/codefundo/releases)
- Open the app, Plus button at the bottom right corner is for adding a new Post/News
- Click the profile icon on top right to edit your name
- Click the topic name at the center of the header to edit the topic
- `info` icon for the link to this repository

## Features
- Works with or without internet/cellular connection (especially useful when serious natural disasters like Floods, Earthquakes disrupt basic communication system like cell phone towers, fiber optical cables)
- Secure communication
- Uses Wi-Fi Direct and has a blockchain like architecture
- Centralized server for keeping the blockchain in sync with other far away nodes

## Uses
- Anyone in any part of the world can post news or important announcements in case of a natural disaster.
- If there is a new post by someone all the nearby nodes immediately fetch, thus creating a chain like network which works as long as there is someone in between two different networks seperated by a distance within Wi-Fi range.

## Walkthrough
- If a user posts an item, their copy of the blockchain gets modified and broadcasts that a new copy is available which is immediately fetched by nearby nodes.
- The identification of new information can either be done by using Wi-Fi direct or creating an open Wi-Fi whose SSID--is encrypted with a shared secret key shipped along with the build of the app--contains information about the cryptographic hash of the blockchain and timestamp of when it was updated.
- The centralized server gets the new copy when atleast one user in the local network gets an internet connection. Similarly, the same internet connected user, can get new information from outside network through the server and share it with its peers.
- Reputation based system to prevent spam or abuse which works by upvotes or downvotes given by users (scope of Machine Learning/NLP)

## Technologies to be used
- Centralized server to be done in Node.js with Express.js for handling routes, creating an API and for keeping the blockchain in sync with the nodes.
- Android app to be done in React Native and Android SDK

## TODO
[x] Complete UI
[x] Integrate with Redux
[x] Backend in Node.js, Express.js and Database(Database TBD)
[-] Wi-Fi Direct or Wi-Fi P2P in React Native or in Native Java Code

## Team
|          Name         |                              Email                              |           University          |
|:---------------------:|:---------------------------------------------------------------:|:-----------------------------:|
| B V Krishna Bharadwaj | bharadwaj6598@gmail.com (f20150076@hyderabad.bits-pilani.ac.in) | BITS Pilani, Hyderabad Campus |
|   B Sai Venkat Reddy  |              f20150073@hyderabad.bits-pilani.ac.in              | BITS Pilani, Hyderabad Campus |
|        M Anurag       |              f20150074@hyderabad.bits-pilani.ac.in              | BITS Pilani, Hyderabad Campus |
