import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { actionCreators } from './store';
import { actionCreators as loginActionCreators } from '../../pages/login/store';
import {
	HeaderWrapper,
	Logo,
	Nav,
	NavItem,
	NavSearch,
	SearchInfo,
	SearchInfoTitle,
	SearchInfoSwitch,
	SearchWrapper,
	SearchInfoItem,
	SearchInfoList,
	Addition,
	Button
} from './style';

class Header extends Component {

	getListArea() {
		const { focused, list, page, totalPage, mouseIn, handleMouseEnter, handleMouseLeave, handleChangePage } = this.props;
		const newList = list.toJS();
		const pageList = [];

		if (newList.length) {
			for (let i = (page - 1) * 5; i < page * 5; i++) {
				pageList.push(
					<SearchInfoItem key={newList[i]}>{newList[i]}</SearchInfoItem>
				)
			}
		}

		if (focused || mouseIn) {
			return (
				<SearchInfo 
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}
				>
					<SearchInfoTitle>
						Popular Searches
						<SearchInfoSwitch 
							onClick={() => handleChangePage(page, totalPage, this.spinIcon)}
						>
							<i ref={(icon) => {this.spinIcon = icon}} className="iconfont spin">&#xe851;</i>
							Change Interests
						</SearchInfoSwitch>
					</SearchInfoTitle>
					<SearchInfoList>
						{pageList}
					</SearchInfoList>
				</SearchInfo>
			)
		} else {
			return null;
		}
	}

	render() {
		const { focused, handleInputFocus, handleInputBlur, list, login, logout } = this.props;
		return (
			<HeaderWrapper>
				<Link to='/'>
					<Logo/>
				</Link>
				<Nav>
					<NavItem className='left active'>Home</NavItem>
					<NavItem className='left'>Download APP</NavItem>
					{
						login ? 
						<NavItem onClick={logout} className='right'>Logout</NavItem> : 
						<Link to='/login'><NavItem className='right'>Login</NavItem></Link>
					}
					<NavItem className='right'>
						<i className="iconfont">&#xe704;</i>
					</NavItem>
					<SearchWrapper>
						<CSSTransition
							in={focused}
							timeout={200}
							classNames="slide"
						>
							<NavSearch
								className={focused ? 'focused': ''}
								onFocus={() => handleInputFocus(list)}
								onBlur={handleInputBlur}
							></NavSearch>
						</CSSTransition>
						<i className={focused ? 'focused iconfont zoom': 'iconfont zoom'}>
							&#xe62a;
						</i>
						{this.getListArea()}
					</SearchWrapper>
					<Addition>
						<Link to='/write'>
							<Button className='writing'>
								<i className="iconfont">&#xe617;</i>
								Post
							</Button>
							<Button className='reg'>Sign up</Button>	
						</Link>
					</Addition>
				</Nav>
			</HeaderWrapper>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		focused: state.getIn(['header','focused']),
		list: state.getIn(['header', 'list']),
		page: state.getIn(['header', 'page']),
		totalPage: state.getIn(['header', 'totalPage']),
		mouseIn: state.getIn(['header', 'mouseIn']),
		login: state.getIn(['login', 'login'])
	}
}

const mapDispatchToProps = (disptach) => {
	return {
		handleInputFocus(list) {
			(list.size === 0) && disptach(actionCreators.getList());
			disptach(actionCreators.searchFocus());
		},
		handleInputBlur() {
			disptach(actionCreators.searchBlur());
		},
		handleMouseEnter() {
			disptach(actionCreators.mouseEnter());
		},
		handleMouseLeave() {
			disptach(actionCreators.mouseLeave());
		},
		handleChangePage(page, totalPage, spin) {
			let originAngle = spin.style.transform.replace(/[^0-9]/ig, '');
			if (originAngle) {
				originAngle = parseInt(originAngle, 10);
			} else {
				originAngle = 0;
			}
			spin.style.transform = 'rotate('+ (originAngle + 360) +'deg)';
			if (page < totalPage) {
				disptach(actionCreators.changePage(page + 1));
			} else {
				disptach(actionCreators.changePage(1));
			}
		},
		logout() {
			disptach(loginActionCreators.logout())
		},
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);