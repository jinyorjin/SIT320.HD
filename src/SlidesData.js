const slidesData = [
  // 0. Intro
  {
    title: "SIT320 — Task 11",
    subtitle: "Advanced Algorithms (HD Option A)",
    content: `Eunjin Kim (223715707)

Goal:
Reinforcement Learning for Bayesian Network (BN) Structure Learning
using a Hybrid Reward (ΔBIC + Generative Score).

Motivation:
- Go beyond classical score-based search methods (Hill-Climb, GES) that often get stuck in local optima.
- Treat BN structure discovery as a sequential decision-making process with RL to move toward a more optimal global structure`,
    code: `// Portfolio Project Intro
console.log("Welcome to my SIT320 TASK 11 Project Slides!");`,
  },

  // 1. Problem & Setup + Figure 1
  {
    title: "Problem & Setup",
    subtitle: "Definition",
    content: `Aim:
Learn a Bayesian Network (BN) structure with an RL agent
optimising both structural quality (BIC) and generative fidelity
(how well simulated data matches held-out real data).

Environment:
- Dataset: 100 samples × 8 binary variables
- Max in-degree: k = 2
- Edit budget: T = 200
- Action masking ensures valid DAGs and bounded parents

Available actions:
- add(i → j)
- delete(i → j)
- reverse(i → j)

Sanity check:
Example step after add(0 → 3):
- Environment reports ΔBIC + new BIC
- ΔBIC < 0 ⇒ improved structure
- Lower BIC = better`,
    code: `// Actions
add(i → j);
delete(i → j);
reverse(i → j);`,
    image: process.env.PUBLIC_URL + "/images/image1.png",
    caption:
      "Figure 1. Example environment step (ΔBIC reward and current BIC after add(0→3)).",
  },

  // 2. Methods — Reward designs
  {
    title: "Methods — Reward Designs",
    subtitle: "Three approaches",
    content: `MVP (edge-count):
+ Dense positive feedback for target edge count
+ Fast convergence
- Too shallow, ignores real dependencies

ΔBIC-only:
r_t = -α·ΔBIC_t
+ Measures structural quality directly
- Rewards mostly negative
- Progress slow; totals approach zero from below

Hybrid (ΔBIC + GenScore):
r_t = -α·ΔBIC_t + β·GenScore(G_t)
- GenScore(G) = per-node log-likelihood gap on held-out set
- Evaluated only at tile ends (variance reduction)
- Balances local edits with global fidelity`,
    code: `Equation:
r_t = -α ΔBIC_t + β GenScore(G_t)`,
    images: [
      process.env.PUBLIC_URL + "/images/image20.png",
      process.env.PUBLIC_URL + "/images/image16.png",
    ],
    captions: [
      "Snippet: Q-learning / reward update (inline note).",
      "Snippet: Hybrid reward / tiling note.",
    ],
  },

  // 3. Methods — Tiling & Parameters
  {
    title: "Methods — Tiling & Parameters",
    subtitle: "Variance control",
    content: `Tiling:
Tile length L = 10

- Most steps (t mod L ≠ L−1) → use ΔBIC only → fast local feedback
- At t mod L = L−1 (last step of each tile) → add Generative Score
→ Dense feedback + periodic global guidance

Parameters:
- Episodes: MVP 200 / ΔBIC 200 / Hybrid 1000
- α (learn rate) = 0.05
- γ (discount) = 0.95
- ε = 0.2 → 0.01, decay 0.995
- Reward clip = ±50
- Max in-degree k = 2
- Edit budget T = 200`,
    code: `if (t % L !== L-1) {
  reward = ΔBIC;
} else {
  reward = ΔBIC + GenScore;
}`,
  },

  // 4. Results — MVP (edge-count)
  {
    title: "4.1 Results — MVP (edge-count)",
    subtitle: "Learning curve & Log",
    content: `Observation (200 episodes):
- Dense positive feedback makes learning stable
- Early phase mostly 4–8 reward
- Gradually improves to 10–12 reward
- Final episodes converge near 12.00
- Agent focuses on matching target edge count rather than full structural dependencies`,
    code: `Figure 2: Total reward per episode — MVP (log excerpt from Python run)`,
    images: [
      process.env.PUBLIC_URL + "/images/image2.png",
      process.env.PUBLIC_URL + "/images/image23.png",
      process.env.PUBLIC_URL + "/images/image24.png",
    ],
    captions: [
      "Figure 2. Total reward per episode — MVP.",
      "Training log excerpt (MVP run).",
    ],
  },

  // 5. Results — ΔBIC-only
  {
    title: "4.2 Results — ΔBIC-only",
    subtitle: "Learning curve & Logs",
    content: `Observation (200 episodes):
- Rewards mostly negative but trend toward zero
- Rare positive episode (Ep.189 = +0.10)
- Final episode = -124.59
- Late range (Ep.178–200): -245 → +0.10
→ Supports use of clipping + moving averages`,
    code: `Figure 3:
Total reward per episode — ΔBIC only`,
    images: [
      process.env.PUBLIC_URL + "/images/image5.png",
      process.env.PUBLIC_URL + "/images/image6.png",
      process.env.PUBLIC_URL + "/images/image7.png",
    ],
    captions: [
      "Figure 3. Total reward per episode — ΔBIC only.",
      "Training log excerpt (ΔBIC run).",
      "Training log excerpt (ΔBIC run, later).",
    ],
  },

  // 6. Results — MVP/ΔBIC 추가 그래프
  {
    title: "Results — Additional views (MVP / ΔBIC)",
    subtitle: "Auxiliary plots & logs",
    content: `Additional views of the same runs are included for verification.`,
    images: [
      process.env.PUBLIC_URL + "/images/image8.png",
      process.env.PUBLIC_URL + "/images/image10.png",
      process.env.PUBLIC_URL + "/images/image9.png",
    ],
    captions: [
      "Extra curve (MVP / ΔBIC auxiliary).",
      "Mixed view with logs.",
      "Training log excerpt.",
    ],
  },

  // 7. Results — Hybrid (tiled)
  {
    title: "4.3Results — Hybrid (tiled)",
    subtitle: "Raw / Moving Average / Clipping",
    content: `Observation (1000 episodes):
- Improves faster than ΔBIC-only
- Variance higher due to periodic generative scoring
- Several late episodes near zero (Ep.972=-4.43, Ep.977=-17.52, Ep.975=-31.21)
- Final episode = -53.15
→ Hybrid reward approaches zero more closely, but noisy`,
    code: `Figures 4–7:
Hybrid rewards — raw, moving averages (50/100), clipping`,
    images: [
      process.env.PUBLIC_URL + "/images/image9.png",
      process.env.PUBLIC_URL + "/images/image12.png",
      process.env.PUBLIC_URL + "/images/image13.png",
      process.env.PUBLIC_URL + "/images/image10.png",
      process.env.PUBLIC_URL + "/images/image15.png",
    ],
    captions: [
      "Hybrid — raw rewards (long run).",
      "Hybrid — moving average (w=50).",
      "Hybrid — moving average (w=100).",
      "Hybrid — clipping + MA (variant 1).",
      "Hybrid — clipping + MA (variant 2).",
    ],
  },

  // 8. Results — Hybrid (no-tiling)
  {
    title: "Results — Hybrid (no-tiling)",
    subtitle: "Control experiment",
    content: `Control run over 300 episodes:
- Generative score applied every step (no tiling)
- Mean return (last 100) = −144.39
- Best 100-episode mean = −137.48
- Both worse than tiled hybrid (−134.7, −121.1)
- Invalid action rate ~83–84%, similar to others
→ Reward curve stays flat near −150, resembling ΔBIC-only and failing to improve`,
    code: `Figure A3:
Reward trajectory (Hybrid no-tiling, MA=50)`,
    images: [
      process.env.PUBLIC_URL + "/images/image18.png",
      process.env.PUBLIC_URL + "/images/picture5.png",
      process.env.PUBLIC_URL + "/images/picture7.png",
    ],
    captions: [
      "Figure A3. Hybrid no-tiling — reward trajectory.",
      "comparison.",
    ],
  },

  // 9. Classical Baselines
  {
    title: "Classical Baselines",
    subtitle: "HC & GES references",
    content: `Hill-Climb (HC):
- Dummy dataset (8 vars)
- BIC = -3542.72, SHD = 18, P=0, R=0, F1=0
→ Stuck in local optima

GES (custom BIC):
- Dummy dataset: BIC = -3543.37, SHD = 15
- ASIA dataset: BIC = -3551.21, SHD = 15, P=0.11, R=0.12, F1=0.12
This is stronger than HC here but still leaves room for improvement.`,
    code: `Notes: BIC ↓ is better (more negative). SHD ↓ is better.`,
    images: [
      process.env.PUBLIC_URL + "/images/image4.png",
      process.env.PUBLIC_URL + "/images/image17.png",
    ],
    captions: [
      "Baseline log: Hill-Climb vs GES summary.",
      "Extra log excerpt.",
    ],
  },

  // 10. Summary tables / notes
  {
    title: "Results Summary & Notes",
    subtitle: "Tables & snippets",
    content: `Summary tables of MVP, ΔBIC-only, Hybrid (tiled / no-tiling).
Arrows: ↑ higher is better; ↓ lower is better.
Small numerical differences appear across runs due to randomness.`,
    images: [
      process.env.PUBLIC_URL + "/images/image19.png",
      process.env.PUBLIC_URL + "/images/image20.png",
    ],
    captions: [
      "Summary table: last-100 mean, best-100 mean, % invalid actions.",
      "Note snippet: equations / settings.",
    ],
  },

  // 11. Discussion
  {
    title: "Discussion",
    subtitle: "Trade-offs",
    content: `MVP (edge-count):
+ Fast convergence
- Too shallow, ignores structure

ΔBIC-only:
+ Direct signal of structural quality
- Progress slow; rewards remain negative

Hybrid (tiled):
+ Best balance, closer to zero
+ Combines local edits + global fidelity
- More variance, higher computational cost

Comparison:
- HC stuck in local optima (0 recovery)
- GES slightly better but still weak (F1=0.12)
- Hybrid RL surpasses traditional methods`,
    code: `Trade-off summary:
Hybrid > ΔBIC > MVP > HC/GES`,
  },

  // 12. Conclusion & Future Work
  {
    title: "Future Work",
    subtitle: "HD Extensions",
    content: `1) DQN for scalability
- Replace tabular Q-learning with a Deep Q-Network
- Generalises across large state spaces; scales to many variables

2) Adaptive tiling (learned schedule)
- Learn when to add GenScore instead of fixed tile length L
- Meta-controller decides: use ΔBIC now, add GenScore later
- Cuts unnecessary evaluations; balances accuracy vs. cost

3) Faster generative scoring
- Reduce simulation cost via caching, batched sampling, or surrogates
- Keep global guidance while lowering variance/latency`,
    code: `Takeaway: Make hybrid RL both smarter (adaptive) and cheaper (efficient).`,
  },
];

export default slidesData;
