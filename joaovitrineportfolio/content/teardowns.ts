export type Teardown = {
  /** Anchor id — matches the teardownHref on the project (e.g. "atrib-teardown"). */
  id: string;
  project: string;
  title: string;
  intro: string;
  stack: string[];
  metrics: { label: string; value: string }[];
  sections: { label: string; body: string }[];
  projectHref: string;
};

export const teardowns: Teardown[] = [
  {
    id: "atrib-teardown",
    project: "Atrib · Municipal Attribution",
    title: "Building for the public sector, where downtime is a real-world stop",
    intro:
      "Atrib runs daily for thousands of municipal workers. The engineering brief was never 'make it impressive' — it was 'make it survive'. Here is how the constraint shaped every decision.",
    stack: ["PHP", "Yii2", "MySQL", "Server-rendered"],
    metrics: [
      { label: "Daily users", value: "5,000+" },
      { label: "Municipalities", value: "3+" },
      { label: "In production", value: "Since 2024" },
    ],
    sections: [
      {
        label: "01 · The constraint",
        body: "The users are non-technical municipal staff, often on older hardware and uneven connections. A slow or flaky screen is not a UX nitpick — it stalls a public process that people depend on. So the priority order was fixed from day one: reliability, then clarity, then everything else.",
      },
      {
        label: "02 · Boring tech on purpose",
        body: "Yii2 + MySQL, server-rendered. No SPA, no build-step gymnastics. Battle-tested, predictable, and cheap to operate — a small operational surface is a feature when one engineer owns the whole system. Server rendering also means the app is fast on constrained devices because the client does almost no work.",
      },
      {
        label: "03 · Component isolation",
        body: "Each attribution workflow is isolated as its own module, so a change to one process can't cascade into another. This keeps the blast radius of any edit small — critical when you ship solo and can't afford a regression taking down an unrelated municipal flow.",
      },
      {
        label: "04 · Traceability as a first-class feature",
        body: "Public-sector work demands accountability. Atrib replaced a manual, opaque process with workflows where every action is traceable and auditable. The audit trail isn't bolted on — it's part of the data model, so 'who did what, when' is always answerable.",
      },
      {
        label: "05 · The trade-off",
        body: "I deliberately traded SPA polish and animation for server-rendered density and speed. The right call for this audience: municipal workers need to find the right field and move on, not watch transitions. Performance above spectacle.",
      },
    ],
    projectHref: "/projects/atribuicao-prefeitura-jacarei",
  },
  {
    id: "playoff-teardown",
    project: "PlayOff · Real-time Battles",
    title: "Sub-120ms real-time, because perceived lag kills a live battle",
    intro:
      "PlayOff is a real-time music-battle platform — live voting and dynamic ranking under burst load. The whole product lives or dies on one thing: it has to feel instant. Polling was never an option.",
    stack: ["Vue 3", "Node.js", "Socket.IO", "PostgreSQL", "Tailwind"],
    metrics: [
      { label: "Sync latency", value: "<120ms" },
      { label: "Concurrent", value: "5K users" },
      { label: "Model", value: "Event-driven" },
    ],
    sections: [
      {
        label: "01 · The problem",
        body: "In a competitive battle, a stale ranking or a laggy vote breaks the entire experience — the tension is the product. Request-poll loops can't deliver that: they waste bandwidth, show stale state, and introduce jitter that users feel immediately.",
      },
      {
        label: "02 · Real-time over polling",
        body: "Votes and ranking updates are pushed as events over Socket.IO, keeping clients synchronized in under 120ms. I chose managed real-time (Socket.IO) over raw WebSocket specifically for reconnection handling and room semantics — when a connection drops mid-battle, the client rejoins the right room and resyncs without a full reload.",
      },
      {
        label: "03 · Ranking integrity under load",
        body: "Votes are treated as events; rankings are recomputed and persisted in PostgreSQL as the source of truth. The hard part is consistency under burst — thousands of concurrent voters hitting the same ranking. The persistence layer is the arbiter so the live view can stay fast while the numbers stay correct.",
      },
      {
        label: "04 · The interface is the scoreboard",
        body: "I modeled the UX on competitive-sports scoring: maximum information density without cognitive overload. You should read the state of a battle at a glance. Vue 3 + Tailwind kept iteration tight while I tuned that density against real sessions.",
      },
      {
        label: "05 · Why it's a product, not a demo",
        body: "Users return session after session. The systems run in real time without polling, the rankings hold under load, and the platform is live. That's the line between a portfolio showcase and something with founder potential.",
      },
    ],
    projectHref: "/projects/playoff",
  },
];
