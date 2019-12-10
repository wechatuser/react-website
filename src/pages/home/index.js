import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Topic from './components/Topic';
import List from './components/List';
import Recommend from './components/Recommend';
import Writer from './components/Writer';
import { actionCreators } from './store';
import { 
	HomeWrapper,
	HomeLeft,
	HomeRight,
	BackTop
} from './style';

class Home extends PureComponent {

	handleScrollTop() {
		window.scrollTo(0, 0);
	}

	render() {
		return (
			<HomeWrapper>
				<HomeLeft>
					<img className='banner-img' alt='' src="https://www.narcity.com/u/2019/12/03/32c4671cd78f098b6f59308381aea01.jpg_1200x630.jpg" />
					<Topic />
					<List />
				</HomeLeft>
				<HomeRight>
					<Recommend />
					<Writer />
				</HomeRight>
				{ this.props.showScroll ? <BackTop onClick={this.handleScrollTop}>Back to Top</BackTop> : null}	
			</HomeWrapper>
		)
	}

	componentDidMount() {
		this.props.changeHomeData();
		this.bindEvents();
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.props.changeScroll)
	}

	bindEvents() {
		window.addEventListener('scroll', this.props.changeScroll)
	}
}

const mapStateToProps = (state) => ({
	showScroll: state.getIn(['home', 'showScroll'])
})

const mapDispatchToProps = (dispatch) => ({
	changeHomeData() {
		dispatch(actionCreators.getHomeInfo());
	},
	changeScroll() {
		if (document.documentElement.scrollTop > 100) {
			dispatch(actionCreators.toggleTop(true))
		} else {
			dispatch(actionCreators.toggleTop(false))
		}
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);