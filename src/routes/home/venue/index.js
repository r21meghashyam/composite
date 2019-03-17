import { h, Component } from 'preact';
import style from './style';

export default class Venue extends Component {
	
	componentDidMount(){

	}
	render() {
		//AIzaSyDZEG1vp2giAovx9yF0bY5ivU0K1Kw_XOA
		return (
			<div class={style.venueComp}>
				
				<div class={style.venue}>
					<div class={style.text}>
						<i class="fa fa-map-marker" />
						<h1>Venue</h1>
						<p>St. Aloysius College,</p>
						<p>Light House Hill Road,Hampankatta,</p>
						<p>Mangaluru 575002</p>
					</div>
					<div>
						<iframe src="https://www.google.com/maps/embed?pb=!4v1515333043943!6m8!1m7!1sCAoSLEFGMVFpcFBETUVESDhoT3RiRDJZMlNaWi1sQS1nanZzU3FxWURnNjlTd3Nt!2m2!1d12.8728848!2d74.84474260000002!3f97!4f0!5f0.7820865974627469" width="600" height="450" frameborder="0" style="border:0" allowfullscreen />
					</div>
				</div>
			</div>
			
		);
	}
}

