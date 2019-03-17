import { createStore } from 'redux';
import { Component } from 'preact';
import './style.css';

export const genDate=(timestamp) => {
	let d = new Date(timestamp);
	let date = d.getDate();
	let postfix = 'th';
	if (date%10===1&&date!==11)
		postfix='st';
	if (date%10===2&&date!==12)
		postfix='nd';
	if (date%10===3&&date!==13)
		postfix='rd';

	let months=['January','Febuary','March','April','May','June','July','August','September','October','November','December'];
	let month=months[d.getMonth()];

	let hours = d.getHours();
	let median = 'am';
	if (hours>11)
		median='pm';
	if (hours>12)
		hours-=12;
	
	if (hours<10)
		hours='0'+hours;

	let minutes = d.getMinutes();
	if (minutes<10)
		minutes='0'+minutes;
	return <span>{date}<sup>{postfix}</sup> {month} {d.getFullYear()} {hours}:{minutes} {median}</span>;
};

export const input=(event) => {
	
	let node=event.target;
	let form = exports.store.getState().form;
	if (node.type==='checkbox')
		form.setState({ [node.name]: !form.state[node.name] });
};

export const empty=v => !v||v.length===0;

export const mix = e => e.toString().replace(/,/g,' ');


export const store = createStore((state={},action) => {
	switch (action.type) {
		case 'SET':
			state.text=action.text;
			return state;
		case 'SHOW':
			state.show=true;
			return state;
		case 'HIDE':
			state.show=false;
			return state;
		default:
			return state;
	}
});

export class Info extends Component{
	state={
		show: false
	}
	constructor(props){
		super(props);
		this.hide=this.hide.bind(this);
		
	}
	componentWillReceiveProps(props){
		if (!empty(props.that.state.infoMessage))
			this.setState({ show: true });
		this.props=props;
	}
	hide(){
		this.setState({ show: false });
		this.props.that.setState({ infoMessage: null });
	}
	render(){
		return this.state.show?
			(<div class="info" onClick={this.hide}><i class="fa fa-exclamation-circle" /> {this.props.that.state.infoMessage} <i class="small">(Click to disappear)</i></div>)
			:false;
	}
}

