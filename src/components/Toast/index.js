import { h, Component } from 'preact';
import style from './style.css';
import  { store } from '../../lib';
import Logo from '../../assets/bg.jpg';

export default class Toast extends Component {
	constructor(props){
		super(props);
		
		store.subscribe(() => {
			this.setState(store.getState());
		});
	}
	render() {
		
		return (
			<div class={style.toast+' '+(this.state.show?style.view:null)}>
				{this.state.text}
			</div>
		);
	}
}