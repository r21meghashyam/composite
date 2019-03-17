import { h, Component } from 'preact';
import style from './style';
import * as firebase from 'firebase';
import { store } from '../../lib';
import { route } from 'preact-router';


export default class Login extends Component {
	state={
		query: {}
	}
	constructor(props){
		super(props);
		let query={};
		let search=location.search.split('?')[1];
		if (search)
			search.split('&').map((v) => {
				let q=v.split('=');
				query[q[0]]=q[1];
			});
		
		this.setState({ query });
		console.log(this.state.query.r);
		firebase.auth().onAuthStateChanged((user) => {
			
			if (user) {
				//window.gtag('set', { user_id: firebase.auth().currentUser.uid }); // Set the user ID using signed-in user_id.
				store.dispatch({ type: 'SET', text: 'Successfully logged in :)' });
				setTimeout(() => {
					store.dispatch({ type: 'HIDE' });
				},3000);
				
				if (this.state.query.r){
					
					route(this.state.query.r);
				}
					
				else
					route('/');
				
				
			}
		  });
	}
	loginFacebook(){
		store.dispatch({ type: 'SET',text: 'Logging in using facebook...' });
		store.dispatch({ type: 'SHOW' });
		let provider = new firebase.auth.FacebookAuthProvider();
		provider.addScope('user_likes');
		
		firebase.auth().signInWithPopup(provider).catch((err) => {
			store.dispatch({ type: 'SET',text: 'Some error occurred: '+err.message });
			setTimeout(() => {
				store.dispatch({ type: 'HIDE' });
			},3000);
			
		});
		
	}
	loginGoogle(){
		store.dispatch({ type: 'SET',text: 'Logging in using google...' });
		store.dispatch({ type: 'SHOW' });
		let provider =  new firebase.auth.GoogleAuthProvider();
		

		firebase.auth().signInWithPopup(provider).catch((err) => {
			store.dispatch({ type: 'SET',text: 'Some error occurred: '+err.message });
			setTimeout(() => {
				store.dispatch({ type: 'HIDE' });
			},3000);
			
		});
		
	}
	loginTwitter(){
		store.dispatch({ type: 'SET',text: 'Logging in using twitter...' });
		store.dispatch({ type: 'SHOW' });
		let provider =  new firebase.auth.TwitterAuthProvider();
		

		firebase.auth().signInWithPopup(provider).catch((err) => {
			store.dispatch({ type: 'SET',text: 'Some error occurred: '+err.message });
			setTimeout(() => {
				store.dispatch({ type: 'HIDE' });
			},3000);
			
		});
		
	}
	loginGitHub(){
		store.dispatch({ type: 'SET',text: 'Logging in using github...' });
		store.dispatch({ type: 'SHOW' });
		let provider =  new firebase.auth.GithubAuthProvider();
		firebase.auth().signInWithPopup(provider).catch((err) => {
			store.dispatch({ type: 'SET',text: 'Some error occurred: '+err.message });
			setTimeout(() => {
				store.dispatch({ type: 'HIDE' });
			},3000);
			
		});
		
	}
	render() {
		return (
			<div class="section">
				<div class={style.login}>
					<h1>Select an account to login</h1>
					<i class="fa fa-facebook" aria-hidden="true" onClick={this.loginFacebook} />
					<i class="fa fa-google" aria-hidden="true"  onClick={this.loginGoogle} />
					<i class="fa fa-twitter" aria-hidden="true"  onClick={this.loginTwitter} />
					
					<i class="fa fa-github" aria-hidden="true"  onClick={this.loginGitHub} />
				</div>
			</div>
		);
	}
}


