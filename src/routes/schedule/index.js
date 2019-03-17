import { h, Component } from 'preact';
import style from './style.css';

export default class Schedule extends Component {
	constructor(props){
		super(props);
		if (typeof(document)!=='undefined')
			document.title='Shedule | Composite Fest 2K18';
	}
	
	render() {
		
		return (
			<div class={style.schedule} >
				<img src="/assets/schedule.png" />
			</div>
		);
		
	}
}