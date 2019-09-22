import React, { useState } from 'react';
import axios from 'axios';
import star from './assets/star.svg';
const _ = require('lodash');

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
						<div>
							<h2 className="project-name">{name}</h2>
							<button className="btn btn-primary">
								<img src={star} alt="star" />
								<span>{stargazers_count}</span>
							</button>
						</div>
						<div>
							<p className="project-description">{description}</p>
							<a
								className="btn btn-success"
								target="_blank"
								href={contributors_url}
							>
								Contributors
							</a>
						</div>
					</li>
				);
			})}
		</ul>
	);
}

function Content() {
	const [list, setList] = useState([]);
	const [value, setValue] = useState('');
	const [isDesc, setSort] = useState(true);
	const url = `https://api.github.com/search/repositories?q=created:%3E2019-01-22&sort=stars&order=`;
	const retrieveList = () => {
		axios.get(url + (isDesc ? 'desc' : 'asc')).then(response => {
			console.log(response.data);
			if (response.data && response.data.items) {
				setList(response.data.items);
			}
		});
	};
	const handleChange = event => {
		setValue(event.target.value);
		setList(
			_.filter(
				list,
				o => o.full_name.includes(value) || o.description.includes(value)
			)
		);
	};
	const handleSort = () => {
		setSort(!isDesc);
		setList([]);
		retrieveList();
	};
	return (
		<main role="main" className="inner-cover">
			<h1 className="cover-heading">Github Trending</h1>
			<button className="trending-apis" type="button" onClick={retrieveList}>
				Click here to see Trending Apis
			</button>
			{list.length > 0 && (
				<>
					<div className="action-buttons">
						<input
							className="search-repo"
							value={value}
							onChange={handleChange}
							placeholder="Search..."
						/>
						<div className="arrange-functionalities">
							<div className="sort-by">
								<strong>Sort By:</strong>
								<span>{'stars'}</span>
							</div>
							<div className="order-by">
								<strong>Order By:</strong>
								<span onClick={handleSort}>{isDesc ? 'Asc' : 'Desc'}</span>
							</div>
						</div>
					</div>
					{renderList(list)}
				</>
			)}
		</main>
	);
}

export default Content;
