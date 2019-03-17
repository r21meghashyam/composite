import { h, Component } from 'preact';
import style from './style';

export default class Landing extends Component {
	
	componentDidMount(){

	}
	render() {
		return (
			<div class={style.home}>
				
				<div class={style.top}>
					<div class={style.div2}>
						<div class={style.logo}>
							<img src="/assets/logo.png" />
						</div>
						<div class={style.text}>
							<h1>COMPOS<span>IT</span>E 2K18</h1>
							<span>Battle of Technocrats</span>
						</div>
						
					</div>
					
				</div>

			</div>
		);
	}
}

