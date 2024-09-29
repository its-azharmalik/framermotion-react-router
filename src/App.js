import React from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
//Pages
import Home from './pages/home';
import Model from './pages/model';
//components
import Header from './components/header';
//Styles
import './App.scss';
import { AnimatePresence } from 'framer-motion';

function App() {
	const imageDetails = {
		width: 254,
		height: 320,
	};

	return (
		<Router>
			<Header />

			<Route
				render={({ location }) => (
					<AnimatePresence initial={false} exitBeforeEnter>
						<Switch location={location} key={location.pathname}>
							<Route
								exact
								path='/'
								render={() => <Home imageDetails={imageDetails} />}
							/>
							<Route
								exact
								path='/model/:id'
								render={() => <Model imageDetails={imageDetails} />}
							/>
						</Switch>
					</AnimatePresence>
				)}
			/>
		</Router>
	);
}

export default App;
