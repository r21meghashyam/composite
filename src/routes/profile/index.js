import { h, Component } from 'preact';
import style from './style';
import * as firebase from 'firebase';
import { route ,Link } from 'preact-router';


export default class Profile extends Component {
	constructor(props){
		super(props);
		firebase.auth().onAuthStateChanged((user) => {
			if (!user)
				route('/');
			if (user){
				firebase.firestore().doc('users/'+user.uid).onSnapshot(d => {
					if (d.exists){
						if (d.data().type==='admin')
							this.setState({ admin: true });
					}
				});
			}
			firebase.firestore().doc('colleges/'+firebase.auth().currentUser.uid).onSnapshot(i => {
				if (i.exists)
					this.setState({ registered: true });
				if (i.data().names)
					this.setState({ partcipantsList: true });
			});
		});
		
	}
	logOut(){
		firebase.auth().signOut().then(() => {
			route('/');
		});
	}
	render() {
		return (
			<div class="section">
				<div class={style.profile}>
					
					<div class={style.profileCard} >
						<img src={firebase.auth().currentUser.photoURL} />
						<h1>{firebase.auth().currentUser.displayName}</h1>
						<div>
							<ul>
								
								{this.state.admin?<li><Link href="/create-notification">Create Notification</Link></li>:(
									<li><Link href="/register">Register my team</Link></li>&&
									(this.state.registered?<li><Link href="/register/step-2">Add/Modify participants names</Link></li>:'')&&
									(this.state.partcipantsList?<li><Link href="/register/step-3">Assign/Modify participants for events</Link></li>:''))
								}
							</ul>
						</div>
						<button onClick={this.logOut}>Log out</button>
					</div>
				</div>
			</div>
		);
	}
}


