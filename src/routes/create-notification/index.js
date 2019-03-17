import { h, Component } from 'preact';
import style from './style.css';
import * as firebase from 'firebase';
import { route } from 'preact-router';
import { empty, Info } from '../../lib';


export default class CreateNotification extends Component {
	state={
		button: 'Create'
	}
	constructor(props){
		super(props);
		this.input=this.input.bind(this);
		this.createNotification=this.createNotification.bind(this);
		if (typeof(document)!=='undefined')
			document.title='Create Notification | Composite Fest 2K18';
		firebase.auth().onAuthStateChanged((user) => {
			if (!user)
				route('/');
			if (user){
				firebase.firestore().doc('users/'+user.uid).onSnapshot(d => {
					if (d.exists){
						if (d.data().type!=='admin')
							route('/');
					}
				});
			}
			
		});
	}
	createNotification(){
		this.setState({ button: 'Please wait...' });
		try {
			if (empty(this.state.title))
				throw 'Please enter title.';
			if (empty(this.state.body))
				throw 'Please enter message.';
		}
		catch (msg){
			this.setState({ infoMessage: msg, button: 'Create' });
			return;
		}
		firebase.firestore().collection('notification').add({
			title: this.state.title,
			body: this.state.body,
			time: Date.now(),
			postedBy: firebase.auth().currentUser.uid
		}).then(i => route('/feeds'),e => this.setState({ infoMessage: e.message, button: 'Create' }));
	}

	input(e){
		this.setState({ [e.target.name]: e.target.value });
	}
	render() {
		
		return (
			<div class={style.createNotification} >
				<div class={style.form}>
					<div>Title:<input type="text" name="title" value={this.state.title} onChange={this.input} /></div>
					<div>Body:<textarea name="body" onChange={this.input} />{this.state.body}</div>
					<Info that={this} />
					<div><button onClick={this.createNotification}>{this.state.button}</button></div>
				</div>
			
			</div>
		);
		
	}
}