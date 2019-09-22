import React, { useState } from "react";
import axios from "axios";

//  name, description, contributors & stars
// This list should be both sortable and searchable by name, owner,and stars.
function renderList(list) {
  return (
    <ul className="trending-list">
      {list.map(project => {
        const {
          name,
          description,
          stargazers_count,
          contributors_url
        } = project;
        return (
          <li>
            <div>{name}</div>
            <div>{description}</div>
            <div>{stargazers_count}</div>
            <div>{contributors_url}</div>
          </li>
        );
      })}
    </ul>
  );
}

function Content() {
  const url =
    "https://api.github.com/search/repositories?q=created:%3E2019-01-22&sort=stars&order=desc";
  const [list, setList] = useState([]);
  const retrieveList = () => {
    axios.get(url).then(response => {
      console.log(response.data);
      if (response.data && response.data.items) {
        setList(response.data.items);
      }
    });
  };

  return (
    <main role="main" className="inner cover">
      <h1 className="cover-heading">Github Trending</h1>
      <button className="trending-apis" type="button" onClick={retrieveList}>
        Click to see Trending Apis
      </button>
      {list.length > 0 && renderList(list)}
    </main>
  );
}

export default Content;
