# Spotify Web Player UI Clone

A responsive Spotify Web Player front-end clone built with only HTML, CSS, and vanilla JavaScript.

## Features

- Dark Spotify-style layout
- Collapsible sidebar navigation
- Recently played, popular playlists, Made For You, and Charts sections
- Hover-reveal play buttons on playlist cards
- Real-time search for songs and playlists
- Playlist detail pages with playable track rows
- Your Library view with recently played and liked songs
- Liked Songs persistence with `localStorage`
- Recently played persistence with `localStorage`
- Queue panel for upcoming tracks
- Shuffle, repeat-all, and repeat-one controls
- Theme toggle for dark and light modes
- Mock login/profile menu
- Mobile full-screen player
- Animated equalizer while music is playing
- Lyrics view for demo tracks
- Mock Spotify API information/results panel
- Bottom music player with:
  - Track thumbnail
  - Song title and artist
  - Previous, play/pause, next, shuffle, and repeat controls
  - Seekable progress bar
  - Volume slider
- Playable demo tracks generated in JavaScript
- Responsive desktop, tablet, and mobile layouts

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript
- Font Awesome icons
- Unsplash placeholder images

## Project Structure

```text
.
├── index.html
├── style.css
├── script.js
└── README.md
```

## How To Run

Open `index.html` directly in your browser, or serve the folder with any static server.

Example:

```bash
python -m http.server 3000
```

Then open:

```text
http://localhost:3000
```

## Audio Note

This project does not include Spotify's real music catalog. Spotify songs are licensed content and require Spotify APIs, user authentication, and Spotify playback permissions.

Instead, this clone includes playable demo tracks generated in vanilla JavaScript so the player controls work without a backend or audio files.

## Spotify API Note

The app includes a mock Spotify API info/results panel. To connect real Spotify metadata, you would need to register a Spotify developer app, add OAuth, request user authorization, and call the Spotify Web API. Real in-browser playback of Spotify tracks requires Spotify Web Playback SDK support and the required Spotify account permissions.

## Browser Note

Most browsers block autoplay. Click a green play button or the main player play button to start playback.
