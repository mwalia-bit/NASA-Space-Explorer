# NASA Space Explorer App 🌌

Explore the cosmos through NASA's "Astronomy Picture of the Day" (APOD) program.  
This interactive web app lets users browse real NASA images and videos from a selected date range — all powered by a JSON feed that mirrors NASA’s APOD API.

---

## 🚀 Features

- **Dynamic Gallery** – Fetches and displays NASA APOD entries (title, date, and image/video).  
- **Modal View** – Click any image to view a full-size version with detailed explanation.  
- **NASA Branding** – Styled with NASA’s official colors, fonts, and authentic footer.  
- **Smart Date Handling** – Automatically adjusts selected dates to available data.  
- **Random Space Fact** – Displays a fun astronomy fact each time the app loads.  
- **Loading Message** – "🚀 Loading space photos…" appears while fetching data.  
- **Hover Effects & Animations** – Smooth zoom and fade-in animations enhance interactivity.  
- **Video Handling (LevelUp)** – Video entries open directly on YouTube for a seamless experience.  
- **Reset Button** – Instantly clears filters and shows the latest NASA images.  
- **Space-Themed Design** – Milky Way background and glowing hover effects create a cinematic look.

---

## Technologies Used

- **HTML5** – Structure  
- **CSS3** – NASA-inspired styling, animations, and layout  
- **JavaScript (ES6)** – API fetching, data filtering, and dynamic DOM rendering  

---

## 🛰️ Data Source

This project uses a static JSON feed that mirrors the NASA APOD API:
```js
https://cdn.jsdelivr.net/gh/GCA-Classroom/apod/data.json
