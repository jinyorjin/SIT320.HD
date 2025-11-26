# Reinforcement Learning for Bayesian Network Structure Discovery (SIT320)

This project investigates the use of reinforcement learning to discover Bayesian Network (BN) structures. Instead of relying solely on traditional search or score-based methods, the agent learns to iteratively improve the network by choosing structural modifications that optimize a combined reward signal.

## Approach

The agent explores BN space through:
- incremental structural changes (edge add/remove/orient)
- state representations embedded from graph features
- reward functions based on:
  - ΔBIC improvement (classical BN quality metric)
  - Generative Score (model’s ability to reproduce synthetic data)
- tiling strategies to stabilize training and avoid pathological graph jumps

This hybrid reward encourages the agent to favor networks that balance structural validity with generative fidelity.

## Highlights

- High Distinction result for SIT320 — Advanced Algorithms  
- Combines statistical model scoring with RL policy learning  
- Supports experimentation with different prior graphs and variable counts  
- Includes tooling for measuring distributional divergence between generated and real data  
- Visualization of evolving BN structure over episodes

## Running the Code

```bash
git clone https://github.com/jinyorjin/SIT320-RL-BN.git
cd SIT320-RL-BN
python main.py
