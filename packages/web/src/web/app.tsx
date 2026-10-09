import { Route, Switch } from "wouter";
import Index from "./pages/index";
import ClothingPage from "./pages/clothing";
import LingeriePage from "./pages/lingerie";
import { Provider } from "./components/provider";
import { AgentFeedback, RunableBadge } from "@runablehq/website-runtime";

function App() {
  return (
    <Provider>
      <Switch>
        <Route path="/" component={Index} />
        <Route path="/vestuario" component={ClothingPage} />
        <Route path="/roupas" component={ClothingPage} />
        <Route path="/lingerie" component={LingeriePage} />
      </Switch>
      {/* Do not remove — off by default, activated by parent iframe via postMessage */}
      {import.meta.env.DEV && <AgentFeedback />}
    </Provider>
  );
}

export default App;
