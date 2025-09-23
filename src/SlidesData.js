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
- Go beyond classical score-based search (Hill-Climb, GES).
- Treat BN structure discovery as a sequential decision process with RL.`,
    code: `// Portfolio Project Intro
console.log("Welcome to my SIT320 TASK 11 Project Slides!");`,
  },

  // 1. Problem & Setup + Figure 1 (image1)
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
    image: "/images/image1.png",
    caption:
      "Figure 1. Example environment step (ΔBIC reward and current BIC after add(0→3)).",
  },

  // 2. Methods — Reward designs (+ 작은 참고 이미지들 16,20)
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
    images: ["/images/image20.png", "/images/image16.png"],
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
- For steps where t mod L ≠ L−1 → use ΔBIC only
- At t mod L = L−1 → add generative score
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

  // 4. Results — MVP (edge-count): curve + 로그 (image2 + image3)
  {
    title: "Results — MVP (edge-count)",
    subtitle: "Learning curve & Log",
    content: `Observation (100 episodes):
- Fast convergence from dense positive feedback
- Final reward = -116.59
- Mid-run often in -200s, variance shrinks toward end
- Agent learns to match edge count, not real dependencies`,
    code: `Figure 2:
Total reward per episode — MVP`,
    images: ["/images/image2.png", "/images/image3.png", "/images/image4.png"],
    captions: [
      "Figure 2. Total reward per episode — MVP.",
      "Training log excerpt (MVP run).",
    ],
  },

  // 5. Results — ΔBIC-only: curve + 로그들 (image5 + image6 + image7)
  {
    title: "Results — ΔBIC-only",
    subtitle: "Learning curve & Logs",
    content: `Observation (200 episodes):
- Rewards mostly negative but trend toward zero
- Rare positive episode (Ep.189 = +0.10)
- Final episode = -124.59
- Late range (Ep.178–200): -245 → +0.10
→ Supports use of clipping + moving averages`,
    code: `Figure 3:
Total reward per episode — ΔBIC only`,
    images: ["/images/image5.png", "/images/image6.png", "/images/image7.png"],
    captions: [
      "Figure 3. Total reward per episode — ΔBIC only.",
      "Training log excerpt (ΔBIC run).",
      "Training log excerpt (ΔBIC run, later).",
    ],
  },

  // 6. Results — MVP/ΔBIC 추가 그래프(보조) (image8 + image10 + image9)
  {
    title: "Results — Additional views (MVP / ΔBIC)",
    subtitle: "Auxiliary plots & logs",
    content: `Additional views of the same runs are included for verification.`,
    images: ["/images/image8.png", "/images/image10.png", "/images/image9.png"],
    captions: [
      "Extra curve (MVP / ΔBIC auxiliary).",
      "Mixed view with logs.",
      "Training log excerpt.",
    ],
  },

  // 7. Results — Hybrid (tiled): raw/MA/clipping (image11~image15)
  {
    title: "Results — Hybrid (tiled)",
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
      "/images/image11.png",
      "/images/image12.png",
      "/images/image13.png",
      "/images/image14.png",
      "/images/image15.png",
    ],
    captions: [
      "Hybrid — raw rewards (long run).",
      "Hybrid — moving average (w=50).",
      "Hybrid — moving average (w=100).",
      "Hybrid — clipping + MA (variant 1).",
      "Hybrid — clipping + MA (variant 2).",
    ],
  },

  // 8. Results — Hybrid (no-tiling / control) (image18 + image21)
  {
    title: "Results — Hybrid (no-tiling)",
    subtitle: "Control experiment",
    content: `Observation (300 episodes):
- GenScore added every step (no tiling)
- Mean return (last-100) = -144.39
- Best 100-ep mean = -137.48
- Worse than tiled hybrid (-134.7, -121.1)
- Invalid action rate similar (~83–84%)
→ Behaves like ΔBIC-only, fails to reach near-zero rewards`,
    code: `Figure A3:
Hybrid no-tiling — moving average`,
    images: ["/images/image18.png", "/images/image21.png"],
    captions: [
      "Figure A3. Hybrid no-tiling — reward trajectory.",
      "Hybrid variant (clipping/MA) comparison.",
    ],
  },

  // 9. Classical Baselines (HC/GES) + 로그 (image4 + image17)
  {
    title: "Classical Baselines",
    subtitle: "HC & GES references",
    content: `Hill-Climb (HC):
- Dummy dataset (8 vars)
- BIC = -3542.72, SHD = 18, P=0, R=0, F1=0
→ Stuck in local optima

GES (custom BIC):
- Dummy dataset: BIC = -3543.37, SHD = 15
- ASIA dataset: BIC = -3551.21, SHD = 15, P=0.11, R=0.12, F1=0.12`,
    code: `Baseline:
HC → SHD=18, P=R=F1=0
GES(ASIA) → SHD=15, P=0.11, R=0.12`,
    images: ["/images/image4.png", "/images/image17.png"],
    captions: [
      "Baseline log: Hill-Climb vs GES summary.",
      "Extra log excerpt.",
    ],
  },

  // 10. Summary tables / notes (image19 + image20 again for 표/노트)
  {
    title: "Results Summary & Notes",
    subtitle: "Tables & snippets",
    content: `Summary tables of MVP, ΔBIC-only, Hybrid (tiled / no-tiling).
Arrows: ↑ higher is better; ↓ lower is better.
Small numerical differences appear across runs due to randomness.`,
    images: ["/images/image19.png", "/images/image20.png"],
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
    title: "Conclusion & Future Work",
    subtitle: "Summary",
    content: `Conclusion:
Hybrid reward with tiling gave the best trade-off:
- Stronger structural recovery
- Better generative fidelity
- At the cost of variance + compute

Future extensions:
1) Deep Q-Network (DQN) — scalable approximation
2) Adaptive tiling — learn when to evaluate GenScore
3) Faster generative scoring — reduce simulation cost`,
    code: `console.log("Hybrid RL + Tiling = promising but costly");`,
  },
];

export default slidesData;
