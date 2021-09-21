<p align="center">
  <a href="" rel="noopener">
 <img width=200px height=200px src="https://spotify-api-create-playlist.netlify.app/spotify-icon.png" alt="Project logo"></a>
</p>

<h3 align="center">Playlist Maker - Spotify</h3>

<div align="center">

  [![Status](https://img.shields.io/badge/status-active-success.svg)]() 
  [![GitHub Issues](https://img.shields.io/github/issues/hwattenberger/make_spotify_playlist.svg)](https://github.com/hwattenberger/make_spotify_playlist/issues)
  [![GitHub Pull Requests](https://img.shields.io/github/issues-pr/hwattenberger/make_spotify_playlist.svg)](https://github.com/hwattenberger/make_spotify_playlist/pulls)
  [![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

---

<p align="center"> This uses the Spotify APIs to create a playlist.  You choose up to 5 songs and then generate a recommended playlist that you can save to Spotify.  You can listen to songs to help determine if you want to include them.
    <br> 
</p>

## 📝 Table of Contents
- [About](#about)
- [Example](#example)
- [Learnings](#learnings)
- [Built Using](#built_using)
- [TODO](#todos)
- [Authors](#authors)

## 🧐 Features <a name = "about"></a>
Select songs from either:
<ul>
<li>The top songs that you have been listening to recently</li>
<li>Search for additional tracks by track name or artist </li></ul>
Click any song to play <br>
Drag songs that you want to base your playlist off of to the recommended tracks area (warnings will show if you drag the same song twice) <br>
Click "Get Recommendations" to recommend songs for a Spotify playlist based off your selected tracks <br>
Remove songs from the recommended tracks and save a new playlist to Spotify

## 🏁 Example <a name = "example"></a>
See this image for workflow:
<img width=800px src="https://hilary-wattenberger.netlify.app/images/SpotifyProject2.gif" alt="Sample workflow">

## 🎈 What did I learn? <a name="learnings"></a>
This was one of my first React projects so I learned loads about API calls, lifting up state, the overall idea of components.  Really fun project because I kept getting to hear different music.

## 🎈 Todos <a name="todos"></a>
Things that I would have loved to do:
- Improve the music player (currently using a library).  Would make my own and improve the look and feel.
- Release this for use.  Given Spotify restrictions, that isn't currently possible (they don't allow API calls outside of development for projects).
- Used Redux or some other state manager

## ⛏️ Built Using <a name = "built_using"></a>
- [React](https://reactjs.org/) - Front end framework
- [Spotify APIs](https://developer.spotify.com/) - APIs

## ✍️ Author <a name = "authors"></a>
- [@hwattenberger](https://github.com/hwattenberger) - Idea & Initial work

