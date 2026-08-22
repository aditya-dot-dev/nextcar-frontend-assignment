# Frontend Assignment — Project Source of Truth

> **Status:** ACTIVE — LOCKED  
> **Purpose:** This document is the single source of truth for the implementation of the Figma → React/Next.js frontend assignment.  
> **Update policy:** Do not modify this document unless Aditya explicitly gives permission. Even with permission, update it only when the change is genuinely necessary to avoid losing focus or introducing scope drift.

---

## 1. Project Objective

Convert the provided Figma design into a professional, pixel-accurate React/Next.js application using Tailwind CSS.

The final submission must:

- Recreate the provided Figma design as accurately as reasonably possible.
- Reproduce the Figma prototype's continuous animation behavior.
- Be responsive on mobile/tablet/desktop.
- Support both light and dark themes.
- Use clean, maintainable, extensible code.
- Be professionally documented and organized.
- Be delivered as a clean Git repository with meaningful commits.
- Include a README, screenshot/video, and runnable project.

Assignment requirements explicitly include React/Next.js, Tailwind (or similar utility CSS), pixel-perfect recreation, mobile responsiveness, light/dark mode, clean extensible code, and a 1–2 day delivery expectation.

---

## 2. Non-Negotiable Architecture Decision

### One composed screen, not 14 swapped pages

The Figma prototype is a sequence of near-duplicate frames connected with Prototype interactions and Smart Animate.

We will NOT implement the animation as:

- 14 separate routes
- 14 unrelated screen components
- hard cuts between screenshots
- arbitrary fade transitions

We WILL implement:

- one main `TimelineScreen`
- stable/reusable child components
- one central timeline/step state
- data-driven state transitions
- Motion-based interpolation between states

Conceptually:

```text
TimelineScreen
    ↓
currentStep
    ↓
timeline configuration
    ↓
reusable components receive props
    ↓
Motion animates changed properties
```

The final "Thank You" state may be treated as a genuinely different layout and mounted separately when appropriate.

---

## 3. Animation Strategy

Use the current Motion package:

```tsx
import { motion, AnimatePresence } from "motion/react";
```

Do NOT assume one global animation configuration.

Figma's Prototype panel is the source of truth for:

- delay
- animation type
- easing
- mass
- stiffness
- damping

Example already observed from the provided Figma screenshot:

```text
Transition: frame-5 → frame-6
Trigger: After delay
Delay: 800ms
Animation: Smart Animate
Easing: Spring
Mass: 1
Stiffness: 64
Damping: 12
```

Previously captured information also indicated a different spring configuration for another transition. Therefore:

> Never hardcode one spring configuration for the entire timeline unless Figma confirms that all transitions use the same values.

### Motion technique selection

Choose the simplest technique that accurately reproduces each Figma transition.

Possible techniques:

- `animate={{ ... }}` for explicit position/rotation/value changes
- `layout` for genuine layout shifts
- `layoutId` for elements that move between layout containers/states
- `AnimatePresence` for entering/exiting elements or the final different layout

Do not automatically use `layoutId` for everything.

### Important

Figma Smart Animate matches persistent layers across frames. We need to inspect layer identity and changed properties before deciding the implementation technique for each moving element.

---

## 4. Figma Is the Visual Source of Truth

Before final animation implementation, extract the required information from Figma.

For each relevant frame:

### Visual data

Record:

- frame width/height
- element dimensions
- x/y positioning where relevant
- padding
- gaps
- border radius
- font family
- font size
- font weight
- line height where relevant
- colors/hex values
- opacity
- shadows/glows
- image/icon dimensions
- asset placement
- relevant layer names/identity

### Prototype data

For each transition record:

| From | To | Trigger | Delay | Animation | Mass | Stiffness | Damping |
|---|---|---|---:|---|---:|---:|---:|

Do not guess missing values.

For each transition, also capture the exact Figma layer/property responsible for the
visible change whenever that information is available. This prevents us from
recreating Smart Animate with an incorrect element or an incorrect animation target.

### State changes

For every consecutive frame pair, identify exactly what changes, e.g.:

- active timeline point changes
- route/path changes
- marker moves
- vehicle moves
- vehicle image changes
- indicator changes
- progress value changes
- text changes
- highlight changes
- controls change state
- element appears/disappears

---

## 5. Current Figma Knowledge

Known from the provided screenshots:

- Main timeline frames are approximately `1894 × 968`.
- The visual design uses a dark/black automotive/racing aesthetic with red accents.
- Branding includes "ENGINEERED FOR PASSION".
- The main composition contains a central visual/vehicle area and a multi-point timeline/path.
- Timeline labels include LAP 01 through LAP 05.
- Multiple circular side controls are present.
- Timeline states progressively change through the prototype.
- The prototype uses Smart Animate + Spring.
- At least one observed transition uses:
  - 800ms delay
  - mass 1
  - stiffness 64
  - damping 12

The exact remaining interaction data is still being collected.

---

## 6. Mobile Strategy

No mobile Figma screens have been provided/identified.

Therefore:

- Do not pretend a Figma mobile specification exists.
- Build a deliberate responsive adaptation based on the desktop design.
- Preserve the visual hierarchy and interaction intent.
- Use sensible responsive layout changes rather than simply shrinking the desktop canvas.
- Validate at least:
  - 375px
  - 768px
  - desktop
- Document the mobile behavior as an assumption in README.

Do not let an AI coding agent invent arbitrary responsive behavior without considering the established design hierarchy.

---

## 7. Theme Strategy

The assignment requires both light and dark themes.

No separate light/dark Figma variants have been identified.

Therefore:

- Treat the existing Figma design as the visual reference.
- Build semantic design tokens.
- Preserve layout and component structure across themes.
- Create a coherent light theme without changing the application's fundamental design.
- Create a theme toggle.
- Verify all major components, controls, text, borders, icons, glows, and backgrounds in both modes.
- Document theme assumptions in README.

Do not invent an unrelated visual design for the alternate theme.

---

## 8. Assets

For pixel accuracy:

### Prefer

- actual Figma-exported images
- actual Figma SVG/vector assets
- actual logos/custom graphics

### Use generic icon libraries only when appropriate

`lucide-react` may be used for genuinely generic icons if doing so does not materially change the Figma appearance.

Do NOT replace a distinctive/custom Figma icon with a visually different Lucide icon merely for convenience.

Do not use screenshot images of the entire Figma frame as a substitute for rebuilding the interface.

### Asset handling rule

Export and keep only the assets that are actually required by the implementation.
Before recreating a visual with CSS or a generic icon, check whether the original
Figma asset can be exported. For distinctive/custom visuals, fidelity takes priority
over convenience.

---

## 9. Proposed Project Structure

Final structure may be refined after inspecting the Figma layer hierarchy, but the baseline architecture is:

```text
project/
├── public/
│   └── assets/
│       ├── images/
│       └── icons/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── ui/
│   │   ├── timeline/
│   │   │   ├── TimelineScreen.tsx
│   │   │   ├── Speedometer.tsx
│   │   │   ├── ProgressDots.tsx
│   │   │   ├── DeliveryTracker.tsx
│   │   │   └── ThankYouMessage.tsx
│   │   └── theme/
│   │       ├── ThemeProvider.tsx
│   │       └── ThemeToggle.tsx
│   ├── hooks/
│   │   └── useTimelineSequence.ts
│   ├── lib/
│   │   └── utils.ts
│   └── data/
│       ├── timelineSteps.ts
│       └── timelineTransitions.ts
├── README.md
└── package.json
```

Do not create components merely to increase the component count. Component boundaries should reflect meaningful reusable responsibilities.

---

## 10. Data-Driven Timeline

Timeline state must be separated from rendering logic.

Conceptually:

```ts
type TimelineStep = {
  id: string;
  // visual state values
};

type TimelineTransition = {
  from: string;
  to: string;
  delay: number;
  spring: {
    mass: number;
    stiffness: number;
    damping: number;
  };
};
```

The exact types will be determined after Figma extraction.

### Principle

If a Figma timing value changes, we should ideally update configuration/data rather than rewrite component logic.

---

## 11. Implementation Order

### Phase 1 — Figma extraction

Complete:

1. Frame measurements
2. Visual properties
3. Asset identification/export
4. Prototype interaction table
5. Consecutive-frame state changes
6. Persistent layer identity

### Phase 2 — Project setup

Create the Next.js/React + TypeScript + Tailwind project and install only the dependencies we actually need.

Once the stack is chosen, avoid unnecessary dependency upgrades or replacements during implementation.

### Phase 3 — Static shell

Build the base screen first.

Target:

> Frame-3 should visually match Figma before animation work begins.

### Phase 4 — Reusable components

Build and test moving parts independently with static props.

### Phase 5 — Timeline state machine

Implement the timer/state progression using the extracted Figma transition data.

### Phase 6 — Motion animation

Add the exact animation techniques and per-transition spring values.

### Phase 7 — Final transition

Implement the genuinely different final Thank You state appropriately.

### Phase 8 — Theme

Implement and verify light/dark mode.

### Phase 9 — Responsive

Implement and verify mobile/tablet/desktop behavior.

### Phase 10 — Visual QA

Compare the implementation against the Figma prototype at matching viewport sizes.

Check:

- static layout
- spacing
- typography
- colors
- assets
- animation timing
- spring behavior
- intermediate states
- final state
- responsive behavior
- light mode
- dark mode

### Phase 11 — Submission

Complete:

- README
- GitHub repository
- production build
- screenshot/video
- final cleanup
- final review

---

## 12. Professional Code Quality Rules

This is not just a "make it work" assignment.

The implementation should look like professional production-quality frontend work.

### Code

- Use TypeScript properly.
- Avoid `any` unless genuinely unavoidable.
- Keep components focused.
- Keep business/sequence data separate from UI.
- Avoid duplicated constants.
- Use semantic naming.
- Avoid giant components.
- Avoid deeply nested conditional rendering when configuration can simplify it.
- Keep animation logic understandable.
- Avoid unnecessary dependencies.
- Remove unused imports/code before submission.
- Do not leave debugging `console.log` statements in the final build.

### Comments

Use comments where they add engineering value.

Good comments explain:

- why a non-obvious animation technique is used
- why a particular Figma workaround exists
- why a responsive assumption was made
- why a component behaves differently at a specific breakpoint
- important mapping between Figma state and code state

Do NOT add meaningless comments such as:

```ts
// Set step
setStep(...)
```

The goal is professional documentation, not comment quantity.

---

## 13. Git Repository Standards

Maintain a proper Git repository throughout development.

### Branching

Use a clean primary branch such as:

```text
main
```

Feature/fix branches may be used when appropriate.

### Commits

Commits should be:

- small enough to understand
- logically grouped
- descriptive
- professional
- focused on one meaningful change

Examples:

```text
chore: initialize Next.js project
feat: add timeline screen shell
feat: implement timeline state configuration
feat: add Figma timeline transitions
feat: implement speedometer animation
feat: add responsive timeline layout
feat: add light and dark theme toggle
fix: align timeline markers with Figma
fix: tune frame 5 to 6 spring transition
docs: add project README
chore: remove unused assets and code
```

Avoid commits such as:

```text
update
changes
final
final2
test
asdf
```

### Git history

Do not wait until the end to create one giant commit.

Commit progressively as meaningful milestones are completed.

Before submission:

- confirm clean working tree
- verify intended files are committed
- verify no secrets are committed
- verify no unnecessary generated files are committed
- verify README is present
- verify project builds successfully

---

## 14. AI Agent / Antigravity Rules

Antigravity/AI agents may be used to accelerate implementation, but the agent must operate within this source of truth.

The agent must NOT independently:

- change the architecture
- replace Motion with another animation library
- replace Next.js/React/Tailwind without explicit approval
- invent Figma measurements
- invent animation timings
- invent spring values
- replace custom Figma assets without reason
- create 14 separate pages
- remove required responsive/theme behavior
- add unnecessary libraries
- upgrade dependencies casually
- rewrite working architecture without justification

If the agent encounters missing information:

> It should stop and ask for clarification rather than silently guessing when the decision affects pixel accuracy or architecture.

---

## 15. Scope Control

The assignment has a 1–2 day deadline.

Priority order:

1. Pixel-accurate core desktop UI
2. Correct prototype animation sequence
3. Responsive behavior
4. Light/dark theme
5. Code quality
6. Professional documentation
7. Git quality
8. Submission video/screenshots

Avoid scope creep.

Do not add:

- unnecessary backend
- unnecessary authentication
- unnecessary state management libraries
- unnecessary animations
- unrelated UI
- features not required by the assignment

Bonus requirements are secondary to the core frontend deliverable.

---

## 16. Current Open Items

These remain intentionally unresolved until Figma data is provided:

- Complete transition table
- Exact delay for every transition
- Exact spring values for every transition
- Exact layer identities across frames
- Exact changed properties between each frame
- Complete asset inventory
- Exact typography details
- Exact color/token inventory
- Final responsive behavior
- Final light-theme design decisions
- Exact component boundaries after layer inspection

Do not guess these values when they can be extracted from Figma.

---

## 17. Decision Log

### Locked decisions

- One composed timeline screen
- Data-driven timeline sequence
- Motion for animation
- Tailwind for styling
- TypeScript
- Responsive implementation required
- Light/dark theme required
- Actual Figma assets preferred
- Professional comments/documentation required
- Proper Git repository required
- Meaningful incremental commits required
- README + screenshot/video required

### Pending decisions

- Exact project dependency versions
- Exact component boundaries
- Exact animation technique per moving element
- Exact Figma transition data
- Exact responsive implementation
- Exact alternate light-theme visual treatment

---

## 18. Source of Truth Rule

When there is a conflict between:

1. this document,
2. a previous conversation suggestion,
3. an AI agent's assumption,

the implementation should follow this document.

However, this document itself must NOT be changed casually.

### Update policy

**No update without explicit user permission.**

If a change appears necessary:

1. Explain what needs to change.
2. Explain why it is necessary.
3. Wait for explicit permission.
4. Only then update this document.
5. Keep the change minimal and record it in the Decision Log if appropriate.

Until then, treat the current document as locked.

---

## 19. Implementation Handoff

This document is intended to be copied into the project repository (for example as
`PROJECT_SOURCE_OF_TRUTH.md`) before implementation begins.

The codebase and any AI coding agent should treat that repository copy as the active
implementation reference. If the document changes later, the change must follow the
explicit update policy above and the Decision Log should record the reason.

The document is a reference/specification, not runtime configuration. Figma remains
the visual source of truth for exact measurements, assets, layer identity, and
prototype behavior that have not yet been captured here.

---

## 20. Immediate Next Action

Do NOT begin final implementation yet.

Continue extracting the missing Figma information, especially:

- Prototype interaction details for each transition
- Frame screenshots/exports
- Important assets

Once enough Figma data is collected, review the complete specification against this document before beginning implementation.

The first implementation milestone is the **static desktop shell**. Animation/state
logic should only be wired after the static frame has been brought into close visual
alignment with the Figma reference.

**Implementation starts only after the Figma extraction phase is sufficiently complete.**
