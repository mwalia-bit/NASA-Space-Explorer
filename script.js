// NASA Space Explorer App (Final Version)
// ----------------------------------------
// Fetches APOD-style JSON data from CDN, builds a gallery, handles videos,
// shows modals, random space facts, and never leaves an empty screen.

const API_URL = "https://cdn.jsdelivr.net/gh/GCA-Classroom/apod/data.json";

const getImageBtn = document.getElementById("getImageBtn");
const gallery = document.getElementById("gallery");
const factBox = document.getElementById("fact-box");

// Modal elements
const modal = document.getElementById("modal");
const closeModal = document.getElementById("closeModal");
const modalImage = document.getElementById("modalImage");
const modalVideo = document.getElementById("modalVideo");
const modalTitle = document.getElementById("modalTitle");
const modalDate = document.getElementById("modalDate");
const modalExplanation = document.getElementById("modalExplanation");

// Date pickers
const startDateInput = document.getElementById("startDate");
const endDateInput = document.getElementById("endDate");

// Fun space facts for LevelUp feature
const spaceFacts = [
  "Venus spins backwards compared to most planets.",
  "One day on Venus is longer than a year on Venus.",
  "There are more trees on Earth than stars in the Milky Way.",
  "The footprints on the Moon will stay there for millions of years.",
  "Space smells like seared steak and hot metal.",
  "Neutron stars can spin 600 times per second.",
  "A day on Jupiter lasts only about 10 hours.",
  "There may be a planet made entirely of diamonds.",
  "Saturn could float on water—it’s less dense than H₂O.",
  "The Sun makes up 99.8% of our solar system’s mass."
];

// Pick and display a random space fact
function showRandomFact() {
  const fact = spaceFacts[Math.floor(Math.random() * spaceFacts.length)];
  factBox.textContent = `💫 Did You Know? ${fact}`;
}

// Fetch JSON data and filter it by available range
async function fetchSpaceData() {
  let startDate = startDateInput.value;
  let endDate = endDateInput.value;

  // Show loading message
  gallery.innerHTML = `
    <div class="placeholder">
      <div class="placeholder-icon">🚀</div>
      <p>Loading space photos...</p>
    </div>`;

  try {
    const response = await fetch(API_URL);
    const data = await response.json();

    // Sort data newest → oldest
    const sorted = data.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Get min/max available range
    const earliest = sorted[sorted.length - 1].date;
    const latest = sorted[0].date;

    // Auto-fill inputs on first load if empty
    if (!startDateInput.value && !endDateInput.value) {
      startDateInput.value = earliest;
      endDateInput.value = latest;
    }

    // If user didn’t select any date, show the most recent 9
    if (!startDate || !endDate) {
      const latestNine = sorted.slice(0, 9);
      displayGallery(latestNine);
      return;
    }

    // Adjust user range if out of bounds
    if (startDate < earliest) startDate = earliest;
    if (endDate > latest) endDate = latest;

    // Filter the results
    const filtered = sorted.filter(
      (item) => item.date >= startDate && item.date <= endDate
    );

    // If still empty → show latest 9 and a note
    if (filtered.length === 0) {
      const latestNine = sorted.slice(0, 9);
      displayGallery(latestNine);
      factBox.textContent = `⚠️ No entries found for that range. Showing the most recent NASA images instead.`;
      return;
    }

    displayGallery(filtered);
  } catch (error) {
    gallery.innerHTML = `<p>Error loading data. Please try again later.</p>`;
    console.error("Fetch error:", error);
  }
}

// Build the gallery grid dynamically
function displayGallery(items) {
  gallery.innerHTML = ""; // clear previous results

  items.forEach((item) => {
    const card = document.createElement("div");
    card.classList.add("gallery-item");

    // Handle image vs video thumbnails
    const media =
      item.media_type === "video"
        ? `<img src="${
            item.thumbnail_url ||
            "https://img.youtube.com/vi/1R5QqhPq1Ik/hqdefault.jpg"
          }" alt="${item.title}">`
        : `<img src="${item.url}" alt="${item.title}">`;

    card.innerHTML = `
      ${media}
      <p><strong>${item.title}</strong><br>${item.date}</p>
    `;

    // Add click handler to open modal
    card.addEventListener("click", () => openModal(item));
    gallery.appendChild(card);
  });
}

// Open modal with detailed info
function openModal(item) {
  modal.classList.remove("hidden");

  // Handle image vs video in modal
  if (item.media_type === "image") {
    modalImage.src = item.hdurl || item.url;
    modalImage.style.display = "block";
    modalVideo.style.display = "none";
  } else if (item.media_type === "video") {
    modalVideo.src = item.url;
    modalVideo.style.display = "block";
    modalImage.style.display = "none";
  }

  modalTitle.textContent = item.title;
  modalDate.textContent = item.date;
  modalExplanation.textContent = item.explanation;
}

// Close modal when clicking X or outside area
closeModal.addEventListener("click", () => {
  modal.classList.add("hidden");
  modalVideo.src = ""; // stop video playback
});
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.add("hidden");
    modalVideo.src = "";
  }
});

// Initialize app
showRandomFact();
getImageBtn.addEventListener("click", fetchSpaceData);
// Reset button: clears dates and shows latest images
const resetBtn = document.getElementById("resetBtn");
resetBtn.addEventListener("click", () => {
  startDateInput.value = "";
  endDateInput.value = "";
  fetchSpaceData(); // reload latest 9
  factBox.textContent = "💫 Showing the latest NASA images!";
});

