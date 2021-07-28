import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import logo from "./logo.svg";
import "./App.css";

Sentry.init({
  dsn: "https://855a986620fd432da1f2bd1293b54e52@o934059.ingest.sentry.io/5883361",
  integrations: [new Integrations.BrowserTracing()],

  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0,
});

const CrashButton = () => (
  <button
    onClick={() => {
      throw new Error("The world is on fire");
    }}
  >
    Crash me
  </button>
);

const FetchPokemons = () => (
  <button
    onClick={async () => {
      const response = await fetch("https://pokeapi.co/api/v2/pokemon/ditto");
      console.warn(response);
      throw new Error("Something went wrong");
    }}
  >
    Crash after fetch
  </button>
);

const App = () => (
  <Sentry.ErrorBoundary>
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <CrashButton />
        <FetchPokemons />
      </header>
    </div>
  </Sentry.ErrorBoundary>
);

export default App;
