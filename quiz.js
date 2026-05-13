const questions = [
  {
    q: "What do you like to do on a free weekend?",
    opts: [
      ["Train or push myself to get stronger", { action: 3, sports: 2 }],
      ["Play strategy games or solve something challenging", { thriller: 3 }],
      ["Go out and laugh with friends", { comedy: 3, romance: 2 }],
      ["Get lost in a show or fantasy world", { fantasy: 3 }],
    ]
  },
  {
    q: "Pick a vibe that matches you most:",
    opts: [
      ["🔥 Intense and determined", { action: 3 }],
      ["🧠 Calm, smart, and observant", { thriller: 3 }],
      ["😂 Chaotic and funny", { comedy: 3, romance: 1 }],
      ["🌸 Playful and a little dramatic", { romance: 3 }],
    ]
  },
  {
    q: "What kind of main character do you like most?",
    opts: [
      ["An underdog fighting their way up", { action: 3, sports: 2 }],
      ["A genius always in control", { thriller: 3 }],
      ["A chaotic group with big personalities", { romance: 3, comedy: 2 }],
      ["An adventurer exploring a huge world", { fantasy: 3 }],
    ]
  },
  {
    q: "What kind of emotions do you want from a show?",
    opts: [
      ["Adrenaline and hype", { action: 3 }],
      ["Suspense and mind games", { thriller: 3 }],
      ["Laughing nonstop", { comedy: 3 }],
      ["Cute, funny, and a little romantic", { romance: 3 }],
    ]
  },
  {
    q: "Pick a setting you'd want to live in:",
    opts: [
      ["A rough world where you fight to survive", { action: 3 }],
      ["A city full of secrets and hidden motives", { thriller: 3 }],
      ["A chaotic but fun school life", { romance: 3, comedy: 2 }],
      ["A magical world full of adventure", { fantasy: 3 }],
    ]
  },
  {
    q: "What do you want most from a show?",
    opts: [
      ["Raw energy and powerful moments", { action: 3 }],
      ["Twists that shock me", { thriller: 3 }],
      ["Characters that make me smile", { comedy: 3, romance: 2 }],
      ["A world I can escape into", { fantasy: 3 }],
    ]
  },
];

const results = {
  action:  { emoji: "🗑️", title: "You're a Gachiakuta fan!",            desc: "You're drawn to raw energy, rebellion, and characters who fight their way up from nothing.",  links: [["Crunchyroll", "https://www.crunchyroll.com/series/GP5HJ84P7/gachiakuta"]] },
  thriller:{ emoji: "🧠", title: "You're a Death Note fan!",             desc: "You love strategy, mind games, and being 10 steps ahead.",                                      links: [["Netflix", "https://www.netflix.com/title/70204970"]] },
  comedy:  { emoji: "😂", title: "You're a Spy x Family fan!",           desc: "You're fun, chaotic, and love to laugh.",                                                        links: [["Crunchyroll", "https://www.crunchyroll.com/series/GQJQ3Q0P6/spy-x-family"]] },
  romance: { emoji: "🌸", title: "You're an Ouran Host Club fan!",        desc: "You love playful chaos, iconic characters, and fun romantic energy.",                           links: [["Netflix", "https://www.netflix.com/title/70204995"], ["Crunchyroll", "https://www.crunchyroll.com/series/G6P8JX0DR/ouran-high-school-host-club"]] },
  sports:  { emoji: "🏅", title: "You're a Haikyu!! fan!",               desc: "You're competitive, driven, and love growth.",                                                   links: [["Netflix", "https://www.netflix.com/title/80060456"]] },
  fantasy: { emoji: "⚔️", title: "You're an Attack on Titan fan!",       desc: "You love deep worlds and intense storytelling.",                                                 links: [["Crunchyroll", "https://www.crunchyroll.com/series/GR751KNZY/attack-on-titan"]] },
};

let current = 0;
let scores = { action: 0, thriller: 0, comedy: 0, romance: 0, sports: 0, fantasy: 0 };
let picked = null;

function loadQuestion() {
  const { q, opts } = questions[current];
  document.getElementById('question-text').textContent = q;
  document.getElementById('question-count').textContent = `Question ${current + 1} of ${questions.length}`;
  document.getElementById('progress-bar').style.width = `${(current / questions.length) * 100}%`;
  document.getElementById('next-btn').style.display = 'none';
  picked = null;

  const div = document.getElementById('options');
  div.innerHTML = '';
  opts.forEach(([text, s]) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.textContent = text;
    btn.onclick = () => {
      document.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      picked = s;
      document.getElementById('next-btn').style.display = 'inline-block';
    };
    div.appendChild(btn);
  });
}

function nextQuestion() {
  if (!picked) return;
  Object.entries(picked).forEach(([k, v]) => scores[k] += v);
  current++;
  current < questions.length ? loadQuestion() : showResult();
}

function showResult() {
  const top = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
  const { emoji, title, desc, links } = results[top];
  document.getElementById('quiz-section').style.display = 'none';
  document.getElementById('result-section').style.display = 'block';
  document.getElementById('result-emoji').textContent = emoji;
  document.getElementById('result-title').textContent = title;
  document.getElementById('result-desc').textContent = desc;
  document.getElementById('result-watch').innerHTML = `<h4>🎬 Start watching:</h4>` + links.map(([n, u]) => `<a href="${u}" target="_blank">${n}</a>`).join('');
}

function restartQuiz() {
  current = 0;
  scores = { action: 0, thriller: 0, comedy: 0, romance: 0, sports: 0, fantasy: 0 };
  picked = null;
  document.getElementById('quiz-section').style.display = 'block';
  document.getElementById('result-section').style.display = 'none';
  loadQuestion();
}

loadQuestion();