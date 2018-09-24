import React from 'react';
import { connect } from 'react-redux';
import { Alert } from 'antd';

const NotFound = () => {
	return (
		<div>
			<h3
				style={{
					textAlign: 'center',
					fontSize: '24px',
					fontWeight: 'bold',
					margin: '20px auto',
				}}>
				404 Not Found
			</h3>
			<div
				style={{
					textAlign: 'left',
					width: '500px',
					margin: '0 auto',
				}}>
				<Alert
					message="404"
					description="This page is Not Found"
					type="error"
					showIcon
				/>
			</div>
		</div>
	);
};

const mapStateToProps = ({ users }) => users;

export default connect(mapStateToProps)(NotFound);
