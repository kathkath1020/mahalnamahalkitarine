/*
 * BIRTHDAY SURPRISE — PERSONALIZE THIS FILE
 * 1) Change BIRTHDAY_NAME to the name you want on the greeting.
 * 2) Replace LETTER_TEXT with your own essay or birthday letter.
 *    Use a blank line between paragraphs. Keep the backticks around your text.
 */
const BIRTHDAY_NAME = "MY KATHERINE";
const LETTER_TEXT = `happy birthday katherine ko, HAPPY 17TH BIRTHDAY TO MY ONE AND ONLY KATHERINE. My forever person, my baby, my lovelove ko and my everything. (10-20-26) rine you’re all i ever wanted. I’m so grateful everyday cause i met you my baby nobody knows how much i really love you, how much i wished for someone like you katherine,alam mo pangako ko mamahalin kita buong buhay ko kahit ngayon lang ako nabuhay kung mabubuhay ulit ako ikaw parin mamahalin ko. i feel so lucky to have you i love waking up knowing i’m yours and you’re mine. i really love you more than words could ever explain. i love you beyond the stars, beyond the constellations, beyond the galaxies, beyond the universe, and beyond life itself. and even then, it still wouldn’t be enough. I’ll still love you more than that mahal ko im always here for you im never going any where i promise. you’ll always be my pahinga.

as we grow older i’ll love you even better and i promise we will never forget little things and our little memories that made us very happy to the point we love each other so much baby. Ikaw ang bawat piyesa ko.You deserve everything my baby, every day with you changes my life completely baby. In fact you’re my life. i really wish you all the best kath. my best friend my soulmate. ikaw ang panaginip ko at ang pangarap ko. i really really cherish every single second we share together. i love how our love grows deeper baby you mean the world to me.

all i want is spend million birthday and monthsaries with you. Pangako kong di ka mag iisa. i hope everytime you sleep at night you know that i love you kath. i love the life we dream about together, growing old and having a future side by side. i know we’re not perfect and that we have our ups and downs but im sososoosso grateful that we still face everything together and not against each other. i love how we understand each other even in the hardest. baby i really see my future when I’m with you katherine hahahahha. i hope you know this love belongs to no one but you. i cherish every moments with you forever katherine, all you hoped for will be fulfilled baby ko. enjoy your 17th birthday and enjoy being 17 my baby i'm so proud of you always. i wanna be with you the rest of my life i waited my whole to find you katherine ko, HAPPY HAPPYY BIRTHDAY HAPPY 17TH BIRTHDAY. i love you so much,
i'll always be here for you i'll always be loving you and i'll always choose you. i love you alot so much endlessly more kathkath ko HAPPY BIRTHDAY MY KATHERINE mahal na mahal kita kahit anong mangyari`;

(() => {
  "use strict";

  const stages = Array.from(document.querySelectorAll(".stage"));
  const countdownSymbol = document.getElementById("countdownSymbol");
  const countdownNumber = document.getElementById("countdownNumber");
  const countdownEyebrow = document.getElementById("countdownEyebrow");
  const countdownHeading = document.getElementById("countdownHeading");
  const countdownCaption = document.getElementById("countdownCaption");
  const startButton = document.getElementById("startButton");
  const blowButton = document.getElementById("blowButton");
  const cakeNextButton = document.getElementById("cakeNextButton");
  const letterNextButton = document.getElementById("letterNextButton");
  const replayButton = document.getElementById("replayButton");
  const cakeScene = document.querySelector(".cake-scene");
  const cakeStage = document.getElementById("stage-cake");
  const cakeBackgroundVideo = document.getElementById("cakeBackgroundVideo");
  const wishStatus = document.getElementById("wishStatus");
  const letterText = document.getElementById("letterText");
  const floatingDecorations = document.getElementById("floatingDecorations");
  const confettiLayer = document.getElementById("confettiLayer");
  const nameHeading = document.getElementById("birthdayNameHeading");
  const letterNameHeading = document.getElementById("letterNameHeading");

  nameHeading.textContent = BIRTHDAY_NAME;
  letterNameHeading.textContent = BIRTHDAY_NAME;
  letterText.textContent = LETTER_TEXT;

  let countdownTimer = null;
  let currentStage = "countdown";
  let candleBlown = false;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function showStage(id) {
    currentStage = id;
    stages.forEach((stage) => {
      const active = stage.id === `stage-${id}`;
      const wasActive = stage.classList.contains("is-active");
      if (active) {
        stage.classList.remove("is-leaving");
        stage.classList.add("is-active");
      } else {
        stage.classList.remove("is-active");
        if (wasActive) {
          stage.classList.add("is-leaving");
          window.setTimeout(() => {
            if (stage.id !== `stage-${currentStage}`) stage.classList.remove("is-leaving");
          }, reducedMotion ? 0 : 900);
        }
      }
      stage.inert = !active;
      stage.setAttribute("aria-hidden", String(!active));
    });
    if (id === "letter") {
      const letterStage = document.getElementById("stage-letter");
      letterStage.scrollTop = 0;
    }

    // Fade the animated backdrop in over its poster and resume from the paused frame.
    // Keeping its position avoids a visible jump or decode hitch when revisiting the cake.
    if (cakeBackgroundVideo) {
      if (id === "cake") {
        if (cakeBackgroundVideo.readyState >= 2) cakeStage.classList.add("is-video-ready");
        const playback = cakeBackgroundVideo.play();
        if (playback && typeof playback.catch === "function") playback.catch(() => {});
      } else {
        cakeBackgroundVideo.pause();
      }
    }
  }

  function replayCountdownPop() {
    countdownSymbol.classList.remove("is-counting");
    // Let the browser commit the class removal before restarting the CSS animation.
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        if (currentStage === "countdown" && !countdownSymbol.classList.contains("is-party")) {
          countdownSymbol.classList.add("is-counting");
        }
      });
    });
  }

  function resetCountdown() {
    if (countdownTimer) window.clearInterval(countdownTimer);
    let count = 5;
    countdownSymbol.textContent = String(count);
    countdownSymbol.classList.remove("is-party");
    replayCountdownPop();
    countdownEyebrow.textContent = "A LITTLE SURPRISE";
    countdownHeading.textContent = "Something lovely is coming...";
    countdownCaption.innerHTML = 'Get ready in <span id="countdownNumber">5</span>';
    // Re-acquire the number span because the caption is reset as a string.
    const numberSpan = document.getElementById("countdownNumber");
    startButton.hidden = true;
    startButton.disabled = true;
    countdownTimer = window.setInterval(() => {
      count -= 1;
      if (count > 0) {
        countdownSymbol.textContent = String(count);
        numberSpan.textContent = String(count);
        countdownSymbol.classList.remove("is-party");
        replayCountdownPop();
        return;
      }
      window.clearInterval(countdownTimer);
      countdownTimer = null;
      countdownSymbol.textContent = "🎉";
      countdownSymbol.classList.remove("is-counting");
      countdownSymbol.classList.add("is-party");
      countdownEyebrow.textContent = "JUST FOR YOU";
      countdownHeading.textContent = "happy 17th birthday asawa ko";
      countdownCaption.textContent = "i love all cats but i love my kath more 💗";
      startButton.hidden = false;
      startButton.disabled = false;
      burstConfetti(48);
    }, reducedMotion ? 250 : 1000);
  }

  function createFloatingHearts() {
    const hearts = ["♥", "♡", "💕", "💗", "✦"];
    for (let i = 0; i < 13; i += 1) {
      const item = document.createElement("span");
      item.className = "float-heart";
      item.textContent = hearts[i % hearts.length];
      item.style.left = `${Math.random() * 100}%`;
      item.style.setProperty("--size", `${11 + Math.random() * 12}px`);
      item.style.setProperty("--duration", `${7 + Math.random() * 7}s`);
      item.style.setProperty("--delay", `${-Math.random() * 13}s`);
      item.style.setProperty("--drift", `${Math.round(Math.random() * 90 - 45)}px`);
      floatingDecorations.appendChild(item);
    }
  }

  function burstConfetti(amount = 65) {
    const colors = ["#ff4f91", "#ffb7d4", "#f9df7b", "#86e1ef", "#bda0ff", "#ffffff"];
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < amount; i += 1) {
      const piece = document.createElement("span");
      piece.className = "confetti-piece";
      piece.style.setProperty("--x", `${Math.random() * 100}%`);
      piece.style.setProperty("--w", `${4 + Math.random() * 6}px`);
      piece.style.setProperty("--h", `${7 + Math.random() * 9}px`);
      piece.style.setProperty("--color", colors[Math.floor(Math.random() * colors.length)]);
      piece.style.setProperty("--fall", `${2.1 + Math.random() * 2.4}s`);
      piece.style.setProperty("--delay", `${Math.random() * 0.45}s`);
      piece.style.setProperty("--sway", `${Math.round(Math.random() * 260 - 130)}px`);
      piece.style.setProperty("--spin", `${Math.round(Math.random() * 950 - 475)}deg`);
      piece.style.setProperty("--radius", Math.random() > .5 ? "50%" : "2px");
      fragment.appendChild(piece);
      piece.addEventListener("animationend", () => piece.remove(), { once: true });
    }
    confettiLayer.appendChild(fragment);
  }

  // Reveal the video only after its first drawable frame is ready; the poster stays visible before then.
  if (cakeBackgroundVideo && cakeStage) {
    const revealCakeVideo = () => cakeStage.classList.add("is-video-ready");
    cakeBackgroundVideo.addEventListener("loadeddata", revealCakeVideo, { once: true });
    cakeBackgroundVideo.addEventListener("playing", revealCakeVideo);
    if (cakeBackgroundVideo.readyState >= 2) revealCakeVideo();
  }

  startButton.addEventListener("click", () => {
    showStage("cake");
  });

  blowButton.addEventListener("click", () => {
    if (candleBlown) return;
    candleBlown = true;
    cakeScene.classList.add("is-blown");
    blowButton.hidden = true;
    cakeNextButton.hidden = false;
    wishStatus.textContent = "Wish made! May it come true ✨";
    burstConfetti(90);
  });

  cakeNextButton.addEventListener("click", () => {
    showStage("celebration");
    burstConfetti(55);
  });

  letterNextButton.addEventListener("click", () => showStage("letter"));

  replayButton.addEventListener("click", () => {
    candleBlown = false;
    cakeScene.classList.remove("is-blown");
    blowButton.hidden = false;
    cakeNextButton.hidden = true;
    wishStatus.textContent = "Close your eyes, make a wish, then blow the candle ✨";
    showStage("countdown");
    resetCountdown();
  });

  createFloatingHearts();
  showStage("countdown");
  resetCountdown();
})();
