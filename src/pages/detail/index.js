import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { DetailWrapper, DetailHeader, DetailContent } from './style';
import { actionCreators } from './store';

class Detail extends PureComponent {
	render() {
		return (
			<DetailWrapper>
				<DetailHeader>{this.props.title}</DetailHeader>
				<DetailContent 
					dangerouslySetInnerHTML={{__html: this.props.content}}
				/>
			</DetailWrapper>
		)
	}

	componentDidMount() {
		this.props.getDetail(this.props.match.params.id);
	}
}

const mapStateToProps = (state) => ({
	title: state.getIn(['detail', 'title']),
	content: state.getIn(['detail', 'content'])
});

const mapDispatchToProps = (dispatch) => ({
	getDetail(id) {
		dispatch(actionCreators.getDetail(id))
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Detail));