gsap.registerPlugin(SplitText, ScrambleTextPlugin);

// ====== CONFIG ======
const quotes = gsap.utils.toArray('.quote');
const target = document.getElementById('scrambleText');
const button = document.getElementById('toggleBtn');
const message = 'WhatsApp: +90 533 282 67 83';
const scrambleChars = 'upperAndLowerCase';
let isDecoded = false;

// Random position function
const getRandomPosition = () => {
  const x = Math.random() * (window.innerWidth - 200);
  const y = Math.random() * (window.innerHeight - 100);
  return { x, y };
};

// Scramble quote animation
const scrambleQuote = (quote, text) => {
  const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
  tl.call(() => {
    const { x, y } = getRandomPosition();
    gsap.set(quote, { x, y });
  })
  .to(quote, {
    delay: Math.random() * 5,
    duration: 1,
    opacity: 1,
    scrambleText: { text, chars: scrambleChars, revealDelay: 0.5, speed: 1 },
    ease: 'power2.out',
  })
  .to(quote, {
    delay: 0.5,
    duration: 1,
    scrambleText: { text: '', chars: scrambleChars },
    opacity: 0,
    ease: 'power2.in',
  });
};

// Initial quotes animation
quotes.forEach(quote => {
  gsap.set(quote, { position: 'absolute', opacity: 0, whiteSpace: 'nowrap' });
  scrambleQuote(quote, quote.textContent ?? '');
});

// Scramble text for target
gsap.set(target, {
  scrambleText: {
    text: 'Düşük fiyatlı yazılım mı lazım?',
    chars: scrambleChars,
    speed: 0.3,
  },
});

// Toggle scramble button
function toggleScramble() {
  const text = isDecoded ? 'Düşük fiyatlı yazılım mı lazım?' : message;
  const duration = isDecoded ? 1 : 1.5;
  const speed = isDecoded ? 0.3 : 1;
  gsap.to(target, {
    duration,
    scrambleText: {
      text,
      chars: scrambleChars,
      revealDelay: isDecoded ? 0 : 0.5,
      speed,
    },
  });
  button.textContent = isDecoded ? 'Evet' : 'Tamam';
  isDecoded = !isDecoded;
}

// Toggle button event listener
button?.addEventListener('click', toggleScramble);

// H1 animation
const split = SplitText.create('h1', { type: 'words, lines' });
gsap.from(split.words, {
  x: 'random([-1000, 1000])',
  y: 'random([-1000, 1000])',
  opacity: 0,
  ease: 'expo.inOut',
  duration: 1.25,
});
