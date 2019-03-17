import { h, Component } from 'preact';
import style from './style.css';
import * as firebase from 'firebase';
import { genDate } from '../../lib';


export default class Schedule extends Component {
	state={
		notifications: []
	}
	constructor(props){
		super(props);
		if (typeof(document)!=='undefined')
			document.title='Feeds | Composite Fest 2K18';
		firebase.firestore().collection('notification').orderBy('time','desc').onSnapshot(i => {
			this.setState({ notifications: i.docs });
		});
	}
	
	render() {
		
		return (
			<div class={style.feeds} >
				<h1>FEEDS</h1>
				<div class={style.cards}>
					{this.state.notifications.length?
						this.state.notifications.map(i => (<div>
							<h3>{i.data().title}</h3>
							<p>{i.data().body}</p>
							<i>{genDate(i.data().time)}</i>
						</div>)):'Loading...'
					}
				</div>
			</div>
		);
		
	}
}