import React from "react";
import ReactDOM from "react-dom";
import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";

import "./styles.css";

function App() {
  return (
    <div className="App">
      <Header />
      <Content />
      <Footer />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
