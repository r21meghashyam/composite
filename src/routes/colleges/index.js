import { h, Component } from 'preact';
import style from './style.css';
import * as firebase from 'firebase';
import { genDate } from '../../lib';

export default class Schedule extends Component {
	state={
		colleges: []
	}
	constructor(props){
		super(props);
		if (typeof(document)!=='undefined')
			document.title='Shedule | Composite Fest 2K18';
		firebase.firestore().collection('colleges').orderBy('date','desc').onSnapshot(i => {
			this.setState({ colleges: i.docs });
		});
	}

	
	render() {
		return (
			<div class={style.schedule} >
				{this.state.colleges.length?
					<table>
						<tr><th>College</th><th>City</th><th>Date</th><th>NEFT</th></tr>
						{
							this.state.colleges.map(i => (
								<tr>
									<td>{i.data().college}</td>
									<td>{i.data().city}</td>
									<td>{genDate(i.data().date)}</td>
									<td>{i.data().neft}</td>
								</tr>))}
					</table>:'Loading...'
				}
			</div>
		);
		
	}
}