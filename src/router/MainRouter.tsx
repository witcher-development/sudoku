import React, { ReactNode } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Paths } from '@router';

import { generateField } from '../features/sudoku/core/generateFiled';


const Page = () => {
	generateField().then(console.log)
	return <>hi</>;
};

export const routes = new Map<Paths, {
  element: ReactNode
}>([
	['/', { element: <Page /> }],
	['/game/:gameId', { element: null }],
]);

export const MainRouter = () => (
	<BrowserRouter>
		<Routes>
			{Array.from(routes).map(([path, { element }]) => (
				<Route key={path} path={path} element={element} />
			))}
		</Routes>
	</BrowserRouter>
);
