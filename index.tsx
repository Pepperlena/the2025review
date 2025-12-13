import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";

function YearInReview() {
  return <div style={{ padding: 24 }}>Year in Review</div>;
}

const container = document.getElementById("root");

if (!container) {
  throw new Error("Root container missing in index.html");
}

createRoot(container).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/year-in-review" element={<YearInReview />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);