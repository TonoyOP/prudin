// ─── BFCACHE OPT-OUT ─────────────────────────────────────────────────────────
// Forces the browser to do a real reload on back/forward navigation instead of
// restoring from cache. This means `load` always fires and the full loader
// animation always plays — seamless navigation in every direction.
window.addEventListener("unload", () => {});

document.querySelectorAll("a[href]").forEach(link => { const url = link.getAttribute("href"); if (url.startsWith("#") || url.startsWith("mailto") || url.startsWith("tel")) return; link.addEventListener("click", e => { e.preventDefault(); gsap.to(".strip", { scaleY: 1, transformOrigin: "top", stagger: 0.1, duration: 0.5, ease: "power2.inOut", onComplete: () => { window.location.href = url } }) }) });

window.addEventListener("load", () => {
  const lenis = new Lenis({ smooth: true, lerp: 0.08 }); lenis.on("scroll", ScrollTrigger.update); function raf(time) { lenis.raf(time); requestAnimationFrame(raf) }
  requestAnimationFrame(raf); const isPlaying = localStorage.getItem("themePlaying") === "true"; if (isPlaying) { playThemeAudio() }
  gsap.to(".strip", { scaleY: 0, transformOrigin: "bottom", stagger: 0.1, duration: 0.6, ease: "power2.inOut", }); ScrollTrigger.refresh(); initCursor(); if (document.querySelector('.menu')) { navCode(); } soundPlayer(); gsapWordScrollReveal(); tApSectionFunctionality(); workSectionFunctionality(); cardFunctionality(); gsapSmoothScrollSections(); counterProgressionNgsap()
}); let themeAudio = new Audio('/assets/theme.mp3'); themeAudio.loop = true; themeAudio.volume = .4; themeAudio.preload = "auto"; themeAudio.currentTime = localStorage.getItem("themeTime") || 0; setInterval(() => { if (!themeAudio.paused) { localStorage.setItem("themeTime", themeAudio.currentTime) } }, 300); const clickSoundSrc = "/assets/HT/sfxallclickt.mp3"; document.addEventListener("click", function (e) {
  const target = e.target; if (target.closest(".no-click-sound") || target.closest("[disabled]") || target.closest("input, textarea") || target.isContentEditable) return; const link = target.closest("a"); if (link) { const url = link.getAttribute("href"); if (!url || url.startsWith("#") || url.startsWith("mailto") || url.startsWith("tel")) return }
  const sound = new Audio(clickSoundSrc); sound.volume = 0.1; sound.play().catch(() => { })
}, true); function navCode() { const menuIcon = document.querySelector('.menu'); const cancelMenuIcon = document.querySelector('.canceli'); const mobileNavbar = document.querySelector('.mnav'); const bodySelect = document.querySelector('body'); menuIcon.addEventListener('click', () => { mobileNavbar.classList.add('menu-active'); document.querySelector('html').style.overflow = "hidden" }); cancelMenuIcon.addEventListener('click', () => { mobileNavbar.classList.remove('menu-active'); document.querySelector('html').style.overflow = "scroll" }); const mobileNavLinks = document.querySelectorAll('.mlinks'); mobileNavLinks.forEach((link) => { link.addEventListener('click', () => { setTimeout(function () { mobileNavbar.classList.remove('menu-active'); document.querySelector('html').style.overflow = "scroll" }, 300) }) }) }; function initCursor() {
  const coords = { x: 0, y: 0 }; const circles = document.querySelectorAll(".circle"); const hero = document.querySelector(".hero"); const colors = ["#2776B7", "#2f7fc4", "#3b8bcf", "#4a98d8", "#5aa4e0", "#6fb1e7", "#84bdec", "#9bc9f0", "#b2d5f3", "#c7e1f6", "#d9ecf9", "#eaf6fc"]; const isHome = !!hero; let isLightBG = false; let isInsideHero = false; function adjustColor(hex, amount) { let num = parseInt(hex.replace("#", ""), 16); let r = Math.max(0, Math.min(255, (num >> 16) + amount)); let g = Math.max(0, Math.min(255, ((num >> 8) & 255) + amount)); let b = Math.max(0, Math.min(255, (num & 255) + amount)); return `rgb(${r}, ${g}, ${b})` }
  function updateColors() {
    if (isHome) { const rect = hero.getBoundingClientRect(); isInsideHero = coords.y >= rect.top && coords.y <= rect.bottom; if (!isInsideHero) { const el = document.elementFromPoint(coords.x, coords.y); if (el) { const bg = getComputedStyle(el).backgroundColor; const rgb = bg.match(/\d+/g); if (rgb) { const brightness = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000; isLightBG = brightness > 150 } } } }
    circles.forEach((circle, index) => {
      const base = colors[index % colors.length]; let adjusted; if (isHome) { adjusted = isInsideHero ? adjustColor(base, -170) : isLightBG ? adjustColor(base, -170) : adjustColor(base, +200) } else { adjusted = adjustColor(base, +180) }
      circle.style.backgroundColor = adjusted
    })
  }
  window.addEventListener("mousemove", (e) => { coords.x = e.clientX; coords.y = e.clientY; if (isHome) updateColors(); }); if (isHome) { window.addEventListener("scroll", updateColors) }
  circles.forEach(circle => { circle.x = 0; circle.y = 0 }); function animate() { let x = coords.x; let y = coords.y; circles.forEach((circle, index) => { circle.style.transform = `translate(${x - 12}px, ${y - 12}px) scale(${(circles.length - index) / circles.length})`; circle.x = x; circle.y = y; const next = circles[index + 1] || circles[0]; x += (next.x - x) * 0.3; y += (next.y - y) * 0.3 }); requestAnimationFrame(animate) }
  updateColors(); animate()
}; function soundPlayer() {
  const soundBtn = document.querySelector('.sound-lottie'); const soundMain = document.querySelector('.sound-main'); if (!soundBtn || !soundMain) return; let isPlaying = localStorage.getItem("themePlaying") === "true"; if (isPlaying) {
    soundMain.innerHTML = `
      <dotlottie-wc src="https://lottie.host/cba0e2ca-ef96-4592-be25-b0b6d7b6e52a/CxboA3pfnw.lottie"
      style="width: 60px; height: 60px"
      loop autoplay></dotlottie-wc>
    `} else {
    soundMain.innerHTML = `
      <dotlottie-wc src="https://lottie.host/cba0e2ca-ef96-4592-be25-b0b6d7b6e52a/CxboA3pfnw.lottie"
      style="width: 60px; height: 60px"></dotlottie-wc>
    `}
  soundBtn.addEventListener('click', () => {
    if (!isPlaying) {
      playThemeAudio(); localStorage.setItem("themePlaying", "true"); soundMain.innerHTML = `
        <dotlottie-wc src="https://lottie.host/cba0e2ca-ef96-4592-be25-b0b6d7b6e52a/CxboA3pfnw.lottie"
        style="width: 60px; height: 60px"
        loop autoplay></dotlottie-wc>
      `; isPlaying = true
    } else {
      themeAudio.pause(); localStorage.setItem("themePlaying", "false"); soundMain.innerHTML = `
        <dotlottie-wc src="https://lottie.host/cba0e2ca-ef96-4592-be25-b0b6d7b6e52a/CxboA3pfnw.lottie"
        style="width: 60px; height: 60px"></dotlottie-wc>
      `; isPlaying = false
    }
  })
}; function playThemeAudio() { const savedTime = parseFloat(localStorage.getItem("themeTime")) || 0; themeAudio.currentTime = savedTime; themeAudio.volume = 0; themeAudio.play().then(() => { gsap.to(themeAudio, { volume: 0.3, duration: 0.3 }) }).catch(() => { setTimeout(() => { themeAudio.play() }, 50) }) }; function gsapWordScrollReveal() { gsap.registerPlugin(ScrollTrigger, SplitText); const split = new SplitText(".mainpbtext", { type: "words" }); const words = split.words; gsap.set(words, { opacity: 0.2 }); gsap.to(words, { opacity: 1, stagger: { each: 0.5 }, ease: "none", scrollTrigger: { trigger: ".problemtxt", start: "top top", end: "+=200%", scrub: true, pin: true, } }) }; 
function tApSectionFunctionality() {

    const buttons = document.querySelectorAll(".btns");
    const tImage = document.querySelector(".tmainimg img");
    const tMainTxt = document.querySelector(".tmaintxt");

    if (!tImage || !tMainTxt) return;

    const tapContent = [
        {
            img: "./assets/HT/we innovatet.webp",
            text: "We deal the complexity of modern web trends and technologies with innovative approaches and measures, so that it can reach everyone regardless of their current stature."
        },
        {
            img: "./assets/HT/we revolutionizet.webp",
            text: "We refine and utilize complex revolutionary technologies into thoughtful, elegant solutions, and help brands step into the future of the web with confidence."
        },
        {
            img: "./assets/HT/we servet.webp",
            text: "We ensure that your brand or personal presence doesn't remain left out amongst the crowd and dirt. So, you can tell your story the way it is, without noise."
        }
    ];

    const preloadedImages = tapContent.map(item => {
        const img = new Image();
        img.src = item.img;
        return img;
    });

    function changeTab(index) {
        const content = tapContent[index];
        const preloadedImage = preloadedImages[index];
        const changeImage = () => {
            tImage.src = content.img;
            tMainTxt.innerHTML = content.text;
            gsap.fromTo(tImage, { opacity: 0, x: -60 }, { opacity: 1, x: 0, duration: 1.1, ease: "power2.out" });
            gsap.fromTo(tMainTxt, { opacity: 0, x: 60 }, { opacity: 0.4, x: 0, duration: 1.1, ease: "power2.out" });
        };
        if (preloadedImage.complete) { changeImage(); } else { preloadedImage.onload = changeImage; }
    }

    buttons.forEach((btn, index) => {
        btn.addEventListener("click", () => {
            const btnClickAudio = new Audio('./assets/HT/sfxclickt.mp3');
            btnClickAudio.volume = 0.2;
            btnClickAudio.play();
            buttons.forEach(b => b.classList.remove("btnactive"));
            btn.classList.add("btnactive");
            changeTab(index);
        });
    });

    const tBtnOne = document.querySelector('.btnt1');
    const tBtnTwo = document.querySelector('.btnt2');
    const tBtnThree = document.querySelector('.btnt3');

    if (tBtnOne) { tBtnOne.addEventListener('click', () => { tBtnOne.classList.add('btnactive'); tBtnTwo?.classList.remove('btnactive'); tBtnThree?.classList.remove('btnactive'); changeTab(0); }); }
    if (tBtnTwo) { tBtnTwo.addEventListener('click', () => { tBtnTwo.classList.add('btnactive'); tBtnOne?.classList.remove('btnactive'); tBtnThree?.classList.remove('btnactive'); changeTab(1); }); }
    if (tBtnThree) { tBtnThree.addEventListener('click', () => { tBtnThree.classList.add('btnactive'); tBtnOne?.classList.remove('btnactive'); tBtnTwo?.classList.remove('btnactive'); changeTab(2); }); }
}
function workSectionFunctionality() {
  const wsb1Audio = new Audio('./assets/HT/sfxacfastt.mp3'); wsb1Audio.volume = 0.08; const wsb2Audio = new Audio('./assets/HT/sfxacfastt.mp3'); wsb2Audio.volume = 0.08; const wsb3Audio = new Audio('./assets/HT/sfxacfastt.mp3'); wsb3Audio.volume = 0.08; function hoverIntent(el, callback, delay = 0.3) { let t; el.addEventListener("mouseenter", () => { t = gsap.delayedCall(delay, callback) }); el.addEventListener("mouseleave", () => t && t.kill()) }
  hoverIntent(document.querySelector(".wsb1"), () => wsb1Audio.play()); hoverIntent(document.querySelector(".wsb2"), () => wsb2Audio.play()); hoverIntent(document.querySelector(".wsb3"), () => wsb3Audio.play())
}; function cardFunctionality() {
  const cardContainer = document.querySelector(".card-container"); const stickyHeader = document.querySelector(".sticky-header"); const cards = document.querySelectorAll(".card"); let isGapAnimationCompleted = false; let isFlipAnimationCompleted = false; const gapTl = gsap.timeline({ paused: true }); gapTl.to(cardContainer, { gap: 30, duration: 1, ease: "power3.out" }, 0).to("#card1", { x: -10, duration: 1, ease: "power3.out" }, 0).to("#card3", { x: 10, duration: 1, ease: "power3.out" }, 0).to(cards, { borderRadius: "20px", duration: 1, ease: "power3.out" }, 0); const flipTl = gsap.timeline({ paused: true }); flipTl.to(".card", { rotationY: 180, duration: 1, ease: "power3.inOut", stagger: 0.1, transformOrigin: "center center" }, 0).to(["#card1", "#card3"], { y: 30, rotationZ: (i) => (i === 0 ? -15 : 15), duration: 1, ease: "power3.inOut" }, 0); function setDefaults() { document.querySelectorAll(".card, .card-container, .sticky-header h1").forEach((el) => { if (el && el.style) el.style.cssText = "" }); gapTl.pause(0); flipTl.pause(0); isGapAnimationCompleted = false; isFlipAnimationCompleted = false }
  function updateHeader(progress) { if (progress >= 0.1 && progress <= 0.35) { const headerProgress = gsap.utils.mapRange(0.1, 0.35, 0, 1, progress); const yValue = gsap.utils.mapRange(0, 1, 40, 0, headerProgress); const opacityValue = gsap.utils.mapRange(0, 1, 0, 1, headerProgress); gsap.set(stickyHeader, { y: yValue, opacity: opacityValue }) } else if (progress < 0.1) { gsap.set(stickyHeader, { y: 40, opacity: 0 }) } else { gsap.set(stickyHeader, { y: 0, opacity: 1 }) } }
  function getEffectiveViewportWidth() { return Math.min(window.innerWidth, 1440) }
  function updateCardWidth(progress) { const viewport = getEffectiveViewportWidth(); if (progress <= 0.35) { const widthPercentage = gsap.utils.mapRange(0, 0.35, 75, 60, progress); const baseWidth = viewport * (widthPercentage / 100); gsap.set(cardContainer, { width: `${baseWidth}px` }) } else { const baseWidth = viewport * 0.60; gsap.set(cardContainer, { width: `${baseWidth}px` }) } }
  function handleGapAnimation(progress) { if (progress >= 0.45 && !isGapAnimationCompleted) { gapTl.play(); isGapAnimationCompleted = true } else if (progress < 0.45 && isGapAnimationCompleted) { gapTl.reverse(); isGapAnimationCompleted = false } }
  function handleFlipAnimation(progress) { if (progress >= 0.7 && !isFlipAnimationCompleted) { flipTl.play(); isFlipAnimationCompleted = true } else if (progress < 0.7 && isFlipAnimationCompleted) { flipTl.reverse(); isFlipAnimationCompleted = false } }
  function initAnimations() {
    let cardScrollTrigger; if (cardScrollTrigger) { cardScrollTrigger.kill() }
    setDefaults(); const mm = gsap.matchMedia(); mm.add("(max-width: 999px)", () => { setDefaults(); return () => { } }); mm.add("(min-width: 1225px)", () => { cardScrollTrigger = ScrollTrigger.create({ trigger: ".sticky", start: "top top", end: `+=${window.innerHeight * 2}px`, scrub: 1, pin: true, pinSpacing: true, onUpdate(self) { const progress = self.progress; updateHeader(progress); updateCardWidth(progress); handleGapAnimation(progress); handleFlipAnimation(progress) } }); return () => cardScrollTrigger.kill() }); return () => mm.revert()
  }
  initAnimations()
}; function gsapSmoothScrollSections() { document.querySelectorAll('a[href^="#"]').forEach(link => { link.addEventListener('click', e => { e.preventDefault(); const target = document.querySelector(link.getAttribute('href')); gsap.to(window, { duration: 1, scrollTo: { y: target, offsetY: 50 }, ease: "power2.out" }) }) }) }; function counterProgressionNgsap() {
  class MaskedLineReveal {
    constructor() { this.init() }
    init() { gsap.utils.toArray(".mask-reveal").forEach((el) => { const split = new SplitText(el, { type: "lines", linesClass: "line" }); split.lines.forEach((line) => { const wrapper = document.createElement("div"); wrapper.classList.add("line-inner"); wrapper.innerHTML = line.innerHTML; line.innerHTML = ""; line.appendChild(wrapper) }); gsap.from(el.querySelectorAll(".line-inner"), { yPercent: 100, duration: 1.2, stagger: 0.1, delay: .1, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 85%" } }) }) }
  }
  new MaskedLineReveal(); class GSAPTextPro {
    constructor() { this.init() }
    init() { this.blurReveal() }
    blurReveal() { gsap.utils.toArray(".blur-reveal").forEach((el) => { gsap.fromTo(el, { filter: "blur(12px)", opacity: 0 }, { filter: "blur(0px)", opacity: 1, duration: 1, delay: .1, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 85%" } }) }) }
  }
  new GSAPTextPro(); if (window.innerWidth > 1024) { const wsSectionMask = document.querySelector('.memaskhu'); wsSectionMask.classList.add('wsmainmask'); gsap.to(".wsmainmask", { height: '0%', delay: 0, duration: .5, scrub: true, ease: "expo.out", scrollTrigger: { trigger: ".wsmain", start: "top 70%", toggleActions: "play none none none", } }) }
  gsap.to(".wsmainmask", { height: '0%', delay: 0, duration: .5, scrub: true, ease: "expo.out", scrollTrigger: { trigger: ".wsmain", start: "top 70%", toggleActions: "play none none none", } }); gsap.from(".tmainimg img", { x: '-20%', opacity: 0, delay: 0, duration: 2, scrub: true, ease: "expo.out", scrollTrigger: { trigger: ".tapmain", start: "top 70%", toggleActions: "play none none none", } }); document.querySelectorAll(".counter").forEach((el) => { const target = +el.getAttribute("data-target"); let obj = { val: 0 }; gsap.to(obj, { val: target, duration: 2, ease: "power2.out", onUpdate: () => { el.textContent = Math.floor(obj.val) }, scrollTrigger: { trigger: el, start: "top 80%", toggleActions: "play none none none", } }) })
}