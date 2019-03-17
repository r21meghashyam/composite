import { h, Component } from 'preact';
import style from './style.css';
import events from '../../lib/events';

export default class Events extends Component {
	constructor(props){
		super(props);
		if (typeof(document)!=='undefined')
			document.title='Events | Composite Fest 2K18';
	}
	componentDidMount(){
		if (location.hash.length){
			if (typeof(document)!=='undefined')
				document.querySelector(`[name="`+decodeURIComponent(location.hash).replace('#','')+`"]`).scrollIntoView();
		}
	}
	render() {
		
		return (
			<div class={style.events}>
				{
					events.map(i =>
						(<div class={style.event} name={i[0]}>
							<div class={style.left}>
								<img src={'/assets/events/'+i[2]} />
								<h1>{i[0]}</h1>
								<i>{i[1]}</i>
								<div><i class="fa fa-user" /> {i[6]===0?'All participants':i[6]===1?'Individual participation':i[6]+' make a team.'} </div>
							</div>
							<div class={style.right}>
								<h4>Rules:</h4>
								<ul>
									{i[3].map(j => <li>{j}</li>)}
								</ul>
								<h1>Event heads:</h1>
								<div class={style.head}>
									<img src={i[4][2]} />
									<div>
										<h2>{i[4][0]}</h2>
										<h3><i class="fa fa-phone" /> {i[4][1]}</h3>
									</div>
									
								</div>
								<div class={style.head}>
									<img src={i[5][2]} />
									<div>
										<h2>{i[5][0]}</h2>
										<h3><i class="fa fa-phone" /> {i[5][1]}</h3>
									</div>
									
								</div>
							</div>
						</div>)
					)
				}
				<div class={style.general}>
					<h1>General Rules:</h1>
					<ul>
						<li>Maximum participants: 14 per team.</li>
						<li>Participants are required to carry valid identity cards.</li>
						<li>Judges decision is final.</li>
						<li>Overall trophy will be awarded based on maximum points scored on all the events.</li>
						<li>Registration should be done before 29th Jan 2018</li>
						<li>Out-station colleges have to register atleast a week prior to the fest</li>
						<li>Before registering online, teams should pay a registration fee of Rs. 300/- on or before 25<sup>th</sup> January 2018. It can be paid through NEFT as per the bank details given below
							<ol>
								<li>Name of the Beneficiary: Principal St. Aloysius College</li>
								<li>Name of the Bank & Branch with address:
									<div>
										Central Bank of India SAC BRANCH<br />
										Light House Hill Road<br />
										Mangaluru - 57500
									</div>
								</li>
								<li>S.B. Account Number: 3034196729</li>
								<li>IFSC Code: CBI N0283976</li>
								<li>PAN No : AAATM4057D</li>
							</ol>

						</li>
						<li>Registration fee after January 25<sup>th</sup> 2018 will be Rs. 500/-.</li>
						<li>All Participants have to participate in Kryptonite (Ice Breaker)</li>
						<li>Particiant of all events other than IT TechWizard, PORT:80, Innovision & Tech Run can participate in AdIt.</li>
					</ul>
				</div>
			</div>
		);
	}
}
