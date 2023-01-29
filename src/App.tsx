import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "urql";
import { client } from "./services/api";
import { FeedbackProvider } from "./context/feedback";
import { ToggleColorProvider } from "./context/theme";
import TodosList from "./pages/TodosList";
import "./reset.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider value={client}>
      <ToggleColorProvider>
        <FeedbackProvider>
          <TodosList />
        </FeedbackProvider>
      </ToggleColorProvider>
    </Provider>
  </React.StrictMode>
);
