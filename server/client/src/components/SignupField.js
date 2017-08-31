import React from 'react';

export default ({ input, id, type, label, meta: { error, touched } }) => {
	return (
		<div>
			<label className="form-label">
				{label}
			</label>
			<input id={id} type={type} {...input} />
			<div className="red-text">
				{touched && error}
			</div>
		</div>
	);
};
