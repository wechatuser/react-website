import React, { PureComponent } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { LoginWrapper, LoginBox, Input, Button } from './style';
import { actionCreators } from './store';

class Login extends PureComponent {
	render() {
		const { loginStatus } = this.props;
		if (!loginStatus) {
			return (
				<LoginWrapper>
					<LoginBox>
						<Input placeholder='Username' ref={(input) => {this.username = input}} />
						<Input placeholder='Password' type='password' ref={(input) => {this.password = input}} />
						<Button onClick={() => this.props.login(this.username, this.password)}>Login</Button>
					</LoginBox>
				</LoginWrapper>
			)
		} else {
			return <Redirect to='/' />
		}
	}
}

const mapStateToProps = (state) => ({
	loginStatus: state.getIn(['login', 'login'])
})

const mapDispatchToProps = (dispatch) => ({
	login(usernameElem, passwordElem) {
		dispatch(actionCreators.login(usernameElem.value, passwordElem.value));
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);