export const profile = {
  name: 'Mengqi Li',
  chineseName: '李梦琦',
  email: 'mengqili1@link.cuhk.edu.cn',
  github: 'https://github.com/ElementQi',
  advisor: { name: 'Xiao Li', url: 'https://www.xiao-li.org/' },
  institution: 'The Chinese University of Hong Kong, Shenzhen',
};

export const publications = [
  {
    id: 'sept',
    name: 'SePT',
    title: 'A Model Can Help Itself: Reward-Free Self-Training for LLM Reasoning',
    authors: ['Mengqi Li', 'Lei Zhao', 'Anthony Man-Cho So', 'Ruoyu Sun', 'Xiao Li'],
    venue: 'Preprint',
    year: '2026',
    topic: 'LLM reasoning',
    description: 'The model samples its own responses at a lower temperature, learns from them with standard SFT, then generates the next batch. No reward, correctness verifier, or teacher solutions are used for training.',
    summary: 'Self-evolving Post-Training alternates between self-generation and negative-log-likelihood training. Each round takes fresh questions and a snapshot of the latest model; the default is one response per prompt. Sampling begins below the training temperature of 1 and anneals toward it. The temperature-ratio analysis characterizes an ideal local target that amplifies existing logit margins. Online refresh matters empirically: training on a frozen self-generated dataset gives much smaller gains. Improvements are model-dependent, with a failure case on Llama-3.1-8B-Instruct.',
    paper: 'https://arxiv.org/abs/2510.18814',
    code: 'https://github.com/ElementQi/SePT',
    bibtex: `@article{li2026modelhelpitselfrewardfree,
  title = {A Model Can Help Itself: Reward-Free Self-Training for LLM Reasoning},
  author = {Li, Mengqi and Zhao, Lei and So, Anthony Man-Cho and Sun, Ruoyu and Li, Xiao},
  journal = {arXiv preprint arXiv:2510.18814},
  year = {2026},
  url = {https://arxiv.org/abs/2510.18814}
}`,
  },
  {
    id: 'streambp',
    name: 'StreamBP',
    title: 'StreamBP: Memory-Efficient Exact Backpropagation for Long Sequence Training of LLMs',
    authors: ['Qijun Luo', 'Mengqi Li', 'Lei Zhao', 'Xiao Li'],
    venue: 'NeurIPS 2025',
    year: '2025',
    topic: 'Efficient training',
    description: 'Recompute and backpropagate through one sequence chunk at a time, preserving its full causal context. Accumulate the exact gradient while releasing temporary activations; stream the LM-head logits too.',
    summary: 'StreamBP decomposes each layer’s chain-rule product over output sequence chunks. For chunk i, attention uses its queries and the cached keys and values through i, retaining the causal mask. The method adds each chunk’s contributions to both weight and input gradients, then frees its temporary activations. Keys, values, and gradient buffers remain. The LM head is also chunked; DPO requires a final correction because its loss is not a sum of independent chunk losses. The published experiments report 2.8–5.5× longer maximum BP sequences than gradient checkpointing on the tested Qwen3 models.',
    paper: 'https://proceedings.neurips.cc/paper_files/paper/2025/hash/f092c84221d73387a6a5dd7517c500a5-Abstract-Conference.html',
    code: 'https://github.com/Ledzy/StreamBP',
    bibtex: `@inproceedings{luo2025streambp,
  title = {StreamBP: Memory-Efficient Exact Backpropagation for Long Sequence Training of LLMs},
  author = {Luo, Qijun and Li, Mengqi and Zhao, Lei and Li, Xiao},
  booktitle = {Advances in Neural Information Processing Systems},
  volume = {38},
  year = {2025},
  url = {https://arxiv.org/abs/2506.03077}
}`,
  },
];

export const projects = [
  { id: 'agents', category: 'TEACHING & DEMOS', name: 'Learning with coding agents', description: 'A hands-on tutorial that goes from a simple prompt to a working experiment, a plot, and a short report—with checks along the way.', label: 'Explore the tutorial', url: 'https://github.com/ElementQi/agents_tut_demo' },
  { id: 'video', category: 'A SMALL AI EXPERIMENT', name: 'A video, in a few words', description: 'A small tool that picks frames from a video and asks an AI model to describe what’s happening.', label: 'Explore Video Frames Summarizer', url: 'https://github.com/ElementQi/Video-Frames-Summarizer' },
  { id: 'documents', category: 'TOOLS & PROTOTYPES', name: 'Chat with your documents', description: 'A document-search chatbot built with FastAPI and the Zhipu API. Choose a collection, then ask questions about it.', label: 'Explore zhipuRAG', url: 'https://github.com/ElementQi/zhipuRAG' },
];

export const education = [
  { period: '2025 — present', degree: 'Ph.D. in Computer Science', school: 'The Chinese University of Hong Kong, Shenzhen', note: 'Advised by Prof. Xiao Li' },
  { period: '2023 — 2025', degree: 'M.S. in Data Science', school: 'The Chinese University of Hong Kong, Shenzhen', note: '' },
  { period: '2019 — 2023', degree: 'B.S. in Computer Science', school: 'Lanzhou University', note: '' },
];

export const experience = [
  { period: 'Apr 2024 — Aug 2025', role: 'Research Assistant', organization: 'School of Data Science, CUHK-Shenzhen', description: 'Efficient optimization and memory-efficient learning algorithms with Prof. Xiao Li.' },
  { period: 'Aug — Dec 2024', role: 'Research Assistant', organization: 'Tsinghua Shenzhen International Graduate School', description: 'Natural language processing and information retrieval with Prof. Yang Li.' },
  { period: 'May — Sep 2024', role: 'Project Lead', organization: 'TIDE, CUHK-Shenzhen', description: 'Led an eight-person team developing and testing a secure data-sharing framework with Prof. Jianhua Huang.' },
];
