import { h, Component } from 'preact';
import style from './style';

export default class venue extends Component {
	
	componentDidMount(){

	}
	render() {
		//mykey
		return (
			<div class={style.peopleComp}>
				<h1>CONTACT</h1>
				<div>
					<img src="/assets/people/hansen.jpg" />
					<div>
						<h1>Hansen Quadros</h1>
						<p>Student co-ordinator</p>
						<p><a href="tel:+91 9972660624"><i class="fa fa-phone" /> +91 9972660624</a></p>
					</div>
				</div>
				<div>
					<img src="/assets/people/neha2.jpg" />
					<div>
						<h1>Neha Bojamma</h1>
						<p>Student co-ordinator</p>
						<p><a href="tel:+91 80504 93260"><i class="fa fa-phone" /> +91 8050493260</a></p>
					</div>
				</div>
				<div>
					<img src="/assets/people/renita.jpg" />
					<div>
						<h1>Renita Menezes</h1>
						<p>Staff co-ordinator</p>
						<p><a href="tel:+91 9880119255"><i class="fa fa-phone" /> +91 9880119255</a></p>
					</div>
				</div>
			</div>
			
		);
	}
}

