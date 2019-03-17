import { h, Component } from 'preact';
import style from './style';
import { Link }  from 'preact-router';
import events from '../../../lib/events';

export default class Events extends Component {

	render() {
	
		return (
			<div class={style.events}>
				
				<h1>EVENTS</h1>
				
				{events.map(i => (
					<Link href={'/events#'+i[0]}>
						<div class={style.event}>
							<img src={'/assets/events/'+i[2]} />
							<h1>{i[0]}</h1>
							<p>{i[1]}</p>
						</div>
					</Link>
				))}

				<div>
					<Link href="/events">
						<span class={style.button}>View in detail</span>
					</Link>

					<Link href="/schedule">
						<span class={style.button}>View schedule</span>
					</Link>
				</div>
			</div>
		);
	}
}

