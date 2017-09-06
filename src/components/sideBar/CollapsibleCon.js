import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Collapsible from './Collapsible';
import { checkDB, newStock, deleteStock } from '../../ducks/stocks';

export class CollapsibleCon extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: ''
		};
		this.addStock = this.addStock.bind(this);
		this.removeStock = this.removeStock.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}
	componentWillMount() {
		this.props.checkDB();
	}


	handleChange(e) {
		this.setState({ value: e.target.value });
	}
	addStock(e) {
		e.preventDefault();
		this.props.newStock(this.state.value);
		this.setState({ value: '' });
	}
	removeStock(ind, stockCode) {
		this.props.deleteStock(ind, stockCode);
	}
	render() {
		return (
			<Collapsible
				stocks={this.props.stocks}
				addStock={this.addStock}
				removeStock={this.removeStock}
				onChange={this.handleChange}
				value={this.state.value}
			/>
		);
	}
}

const mapStateToProps = state => ({
	stocks: state.stocks
});

export default connect(mapStateToProps, { checkDB, newStock, deleteStock })(CollapsibleCon);

CollapsibleCon.propTypes = {
	stocks: PropTypes.arrayOf(
		PropTypes.shape({
			dataset: PropTypes.shape({
				database_code: PropTypes.string.isRequired,
				name: PropTypes.string.isRequired
			})
		})
	).isRequired
};
