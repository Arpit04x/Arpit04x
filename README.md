# AdaptiveX – Intelligent Content Delivery Interface

AdaptiveX is a production-grade React frontend that adapts media quality, layout density, and UX behavior in real time based on device type, network conditions, and user preferences.

## Highlights

- **Dark-first premium SaaS UI** with glassmorphism styling
- **Adaptive intelligence layer** powered by:
  - `navigator.connection.effectiveType`
  - device detection (viewport + user agent)
  - `localStorage` preferences
- **Real-time adaptation without reloads**
- **Mode controls**: Performance, Balanced, High Quality, and Auto
- **Simulate Network toggle**: Slow / Medium / Fast / Auto
- **Adaptive media module** using responsive images (`srcset`) and simulated video stream profiles
- **Live system status panel** with network, device, and mode badges
- **Analytics widget** with estimated data savings, load improvement, and score
- **Performance techniques**: lazy loading, React code splitting (`React.lazy`), memoized components, and skeleton loaders

## Tech Stack

- React + Vite
- Tailwind CSS
- Framer Motion

## Project Structure

```text
src/
  components/
  hooks/
  pages/
  utils/
```

## Run Locally

```bash
npm install
npm run dev
```

## Build & Lint

```bash
npm run lint
npm run build
```
