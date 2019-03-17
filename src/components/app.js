import { h, Component } from 'preact';
import { Router, route } from 'preact-router';

import Home from '../routes/home';
import Events from '../routes/events';
import Register from '../routes/register';
import Login from '../routes/login';
import Profile from '../routes/profile';
import * as firebase from 'firebase';
import Toast from './Toast';
import Schedule from '../routes/schedule';
import CreateNotification from '../routes/create-notification';
import Feeds from '../routes/feeds';
import Colleges from '../routes/colleges';

//import BG from '../assets/bg.jpg';

export default class App extends Component {
	state={ loggedIn: false }
	constructor(props){
		super(props);
		firebase.auth().onAuthStateChanged((user) => {
			this.setState({ loggedIn: Boolean(user) });
			
		});
	}
	handleRoute = e => {
		this.currentUrl = e.url;
	};
	routeHome(){
		route('/');
	}
	routeProfile(){
		route('/profile');
	}
	routeLogin(){
		route('/login');
	}
	routeFeeds(){
		route('/feeds');
	}
	render() {
		return (
			<div id="app">
				 <header>
					<span onClick={this.routeHome}><img src="/assets/logo.png" /> <span class="headerText">COMPOSITE 2K18</span></span>
					<div class="nav">
						{this.state.loggedIn?<img class="userPhoto" src={firebase.auth().currentUser.photoURL} onClick={this.routeProfile} />:<i class="fa fa-user-o" onClick={this.routeLogin} />}
						<i class="fa fa-globe" onClick={this.routeFeeds} />
					</div>
				</header>
				<Router onChange={this.handleRoute}>
					<Home path="/" />
					<Events path="/events" />
					<Login path="/login" />
					<Profile path="/profile" />
					<Schedule path="/schedule" />
					<CreateNotification path="/create-notification" />
					<Feeds path="/feeds" />
					<Colleges path="/colleges" />
				</Router>
				<div class="footer">
					&copy; 2018 Composite fest
				</div>
				<Toast />
			</div>
			
		);
	}
}
