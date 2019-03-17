import { h, Component } from 'preact';
import style from './style';

export default class Video extends Component {
	
	componentDidMount(){

	}
	render() {
		//mykey
		return (
			<div class={style.video}>
				<h1>Watch Composite 2K18 Trailer</h1>
				<iframe id="ytplayer" type="text/html" src="https://youtube.com/embed/DzdyL7YJr24?autoplay=0&origin=http://compositefest.com" frameborder="0" />
			</div>
			
		);
	}
}

