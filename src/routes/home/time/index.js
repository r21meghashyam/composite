import { h, Component } from 'preact';
import style from './style';
import { Link } from 'preact-router';

export default class Time extends Component {
	
	componentDidMount(){

	}
	render() {
		//mykey
		return (
			<div class={style.timeSection}>
				<h1><i class="fa fa-calendar" /> <span>1<sup>st</sup> & 2<sup>nd</sup> Febuary 2018</span></h1>
				{/* <button><i class="fa fa-calendar-plus-o" /> Save the date</button> */}

				<Link href="/register" class={style.button+' fa fa-pencil'} > Register now</Link> <a href="https://www.google.com/calendar/render?action=TEMPLATE&text=Composite+Fest+2K18&dates=20180201/20180203&details=National+level+IT+Fest+organized+by+Department+of+Computer+Science+Applications+and+Animation%2C+St.+Aloysius+College%2C+Mangaluru&location=St.+Aloysius+College%2C+Mangaluru&sf=true&output=xml" class={style.button+' fa fa-calendar-plus-o'} target="_blank" > Save the date</a>
			</div>
			
		);
	}
}

