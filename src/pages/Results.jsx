import React from 'react';
import { Header, Sidebar, Footer, Breadcrumbs } from '../components';


const Results = ({ isOpen }) => {
	return (
		<div className={isOpen ? 'content with-sidebar results' : 'content with-sidebar results m-less'}>
			<Sidebar />
			<div className="container">
				<Header />
				<div className="inner">
					<Breadcrumbs />
					res

				</div>
				<Footer />
			</div>
		</div>
	)
}

export default Results