# Research diagrams

The diagrams on `/research/` are original explanations based on the full public papers. They replace the earlier decorative sketches. The homepage presents the selected contributions in plain language; readers can choose to visit the research page for technical detail.

## SePT

Source: [arXiv:2510.18814v4](https://arxiv.org/html/2510.18814v4), especially Algorithm 1, Equation 1, Proposition 1, Theorem 1, §3.3, and Appendix B.1. The downloaded PDF has 31 pages. The figure shows questions from the task dataset, responses sampled by the current model snapshot, fresh question-response pairs, SFT, and a feedback arrow that refreshes the generator after updating the model. No answer-based selection, reward model, or external teacher is introduced.

Sampling and training temperatures are separate. Training uses τt = 1; the default rollout count is G = 1. In the reported schedule, τs starts at 0.6 for specialized math models or 0.9 for general-purpose models, reaches 1 over two epochs, and stays at 1 for the third. Thus, “low temperature throughout training” would be inaccurate. The figure's caption says the schedule anneals toward 1.

The temperature-ratio theorem characterizes a pointwise ideal target, not a guarantee that a parameter-shared language model improves on every task. The overview preserves the observed dependence on the model family. A verifier used for evaluation is not a training signal.

## StreamBP

Primary source: [NeurIPS 2025 published PDF](https://proceedings.neurips.cc/paper_files/paper/2025/file/f092c84221d73387a6a5dd7517c500a5-Paper-Conference.pdf), 27 pages. Also checked the earlier [arXiv v1](https://arxiv.org/html/2506.03077v1), 18 pages. The published version numbers the partitioned transformer operations as Equation 10 and gradient accumulation as Equation 11; the arXiv draft uses Equations 13 and 14. The figure cites the published numbering.

The central identity is the linear decomposition of a vector-Jacobian product over output chunks, Equation 1. At one transformer layer, Qᵢ comes from input chunk i; attention uses K and V from the entire causal prefix through i, preserving the causal mask inside the chunk. The full K/V cache stays resident for that layer. Recomputed attention and MLP activations for the current chunk are released after accumulating contributions to both weight and input gradients.

The controls inspect a selected chunk; they do not simulate training or reset the gradient buffer. Shaded cache cells show the prefix read by attention, while outlined future cells remain cached. The diagram uses Jᵢ = ∂vec(Hout⁽ⁱ⁾)/∂vec(W) and δᵢ = ∂L/∂vec(Hout⁽ⁱ⁾). Summing Jᵢᵀδᵢ produces the full weight gradient. Input gradients are accumulated analogously. “Exact” refers to the mathematical gradient; floating-point operation order can change rounding.

The LM head separately streams logits. SFT and GRPO permit additive chunk losses; DPO instead accumulates the separable gradient terms and then applies the sequence-level sigmoid correction. The overview mentions this distinction. The figure does not imply that total GPU memory is divided by the chunk count: weights, checkpointed inputs, gradient buffers, and cached K/V remain.
