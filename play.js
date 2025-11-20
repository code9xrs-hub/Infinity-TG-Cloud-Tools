// Open/Close Report Form
function openReport() {
  document.getElementById("myForm").style.display = "block";
}
function closeReport() {
  document.getElementById("myForm").style.display = "none";
}

// Close Link Modal
function closeLinkModal() {
  document.getElementById("link-modal").style.display = "none";
}

// Share Button
function shareButton() {
  if (navigator.share) {
    const url = window.location.href;
    const title = document.title;
    navigator.share({
      title: title,
      text: "You can watch high-quality videos on this Stream page.\n\n" + title,
      url: url
    })
    .then(() => console.log("Thanks for sharing!"))
    .catch(e => console.log(`Couldn't share: ${e.message}`));
  } else {
    alert("Sharing isn't supported in this browser. Try copying the link manually.");
  }
}

// Ads Link Modal with countdown
function showAdsLinkModal(url) {
  const modal = document.getElementById("link-modal");
  const timerEl = document.getElementById("link-timer");
  modal.style.display = "block";
  let timeLeft = 5;
  const countdown = setInterval(() => {
    timeLeft--;
    timerEl.innerHTML = timeLeft;
    if (timeLeft === 0) {
      clearInterval(countdown);
      timerEl.innerHTML = "";
      window.location.href = url;
      closeLinkModal();
    }
  }, 1000);
}

// Main DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
  // ArtPlayer initialization
  const art = new Artplayer({
    container: document.getElementById('artplayer-container'),
    url: "{{file_url}}",
    autoplay: false,
    autoSize: true,
    theme: '#ff4c3b',
    pip: true,
    mutex: true,
    setting: true,
    moreVideoAttr: { crossOrigin: 'anonymous' },
    quality: [
      { name: '1080p', url: '{{file_url}}' }
      // যদি multi-quality চান, আরও add করতে পারেন
    ]
  });

  // Theme Toggle
  const themeBtn = document.getElementById("theme-toggle-btn");
  let theme = localStorage.getItem("theme") || "dark";

  const applyTheme = mode => {
    if (mode === "light") {
      document.body.classList.remove("bg-dark", "text-light");
      document.body.classList.add("bg-light", "text-dark");
      themeBtn.innerHTML = '<i class="fa-solid fa-moon"></i> Dark Mode';
      themeBtn.classList.replace("btn-light", "btn-dark");
    } else {
      document.body.classList.remove("bg-light", "text-dark");
      document.body.classList.add("bg-dark", "text-light");
      themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i> Light Mode';
      themeBtn.classList.replace("btn-dark", "btn-light");
    }
  };

  themeBtn.addEventListener("click", () => {
    const current = document.body.classList.contains("bg-dark") ? "light" : "dark";
    localStorage.setItem("theme", current);
    applyTheme(current);
  });

  applyTheme(theme);

  // Footer Inject
  const style = document.createElement("style");
  style.innerHTML = `
    @keyframes devBounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-4px); }
    }
    .dev-icon {
      display: inline-block;
      animation: devBounce 1.2s infinite;
      color: #0dcaf0;
      margin-left: 6px;
    }
    .footer-text {
      color: #0dcaf0;
      text-decoration: none;
    }
  `;
  document.head.appendChild(style);

  const footer = document.createElement("footer");
  footer.className = "py-2 text-center border-top border-secondary bg-dark text-light";

  const para = document.createElement("p");
  para.className = "mb-0";

  const link = document.createElement("a");
  link.href = "https://t.me/+f0E-qd1lIHI2Mzk1";
  link.target = "_blank";
  link.className = "footer-text";

  const icon = document.createElement("i");
  icon.className = "fa-solid fa-robot me-2";

  const text = document.createTextNode("Made with by Infinity-TG-Cloud!");
  const devIcon = document.createElement("i");
  devIcon.className = "fa-solid fa-laptop-code dev-icon";

  link.appendChild(icon);
  link.appendChild(text);
  link.appendChild(devIcon);
  para.appendChild(link);
  footer.appendChild(para);
  document.body.appendChild(footer);
});

// Helper functions
function Open_Link(url) {
  if (url) window.open(url, "_blank");
}
function showLinkModal(url) {
  window.open(url, "_blank");
}
function Open_DL(url) {
  window.location.href = url.replace("replace", "dl");
}
function Open_TG(url) {
  window.location.href = url.replace("replace", "tg");
}

// Streamlink setup
const videolink = window.location.href;
const streamlink = videolink.replace("/watch/", "/dl/");

// External players
function vlc_player() {
  const clean = streamlink.replace(/^https?:\/\//, "");
  window.location.href = `vlc://${clean}`;
}
function mx_player() {
  const clean = streamlink.replace(/^https?:\/\//, "");
  window.location.href = `intent://${clean}#Intent;scheme=https;package=com.mxtech.videoplayer.ad;action=android.intent.action.VIEW;end`;
}
function playit_player() {
  const clean = streamlink.replace(/^https?:\/\//, "");
  window.location.href = `intent://${clean}#Intent;package=com.playit.videoplayer;action=android.intent.action.VIEW;end`;
}

// Download
function streamDownload() {
  window.location.href = streamlink;
}
