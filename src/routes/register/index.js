import { h, Component } from 'preact';
import style from './style';
import events from '../../lib/events';
import { empty, Info } from '../../lib';
import { route,Link,Router } from 'preact-router';
import * as firebase from 'firebase';

class Step3 extends Component {
	state={
		names: [],
		events: [],
		hide: { },
		button: 'Register'
	};
	constructor(props){
		super(props);
		this.handleSubmit=this.handleSubmit.bind(this);
		this.select=this.select.bind(this);
		let hide={};
		events.map(i => '.'.repeat(i[6]).split('.').slice(1).map((o,j) => hide[i[0]+'_'+j]=''));
		this.setState({ hide });
		firebase.firestore().collection('colleges').doc(firebase.auth().currentUser.uid).onSnapshot((d) => {
			this.setState(d.data());
		});
		firebase.firestore().collection('colleges/'+firebase.auth().currentUser.uid+'/names').onSnapshot(d => {
			d.docs.map(i => i.data().names.map((j,k) => this.setState({ [i.id+'_'+k]: j })));
		});
	}
	handleSubmit(){
		this.setState({ button: 'Registering...' });
		try {
			
			events.map(i => '.'.repeat(i[6]).split('.').slice(1).map((o,j) => {
				
				if (empty(this.state[i[0]+'_'+j])&&this.state.events[i[0]])
					throw 'Please select the particiant for '+i[0]+'.';
			}));
		}
		catch (msg){
			this.setState({ infoMessage: msg, button: 'Register' });
			return;
		}
		
		events.map(i => {
			if (i[0]==='Kryptonite'&&this.state.events[i[0]]){
				firebase.firestore().collection('colleges').doc(firebase.auth().currentUser.uid).collection('names').doc('Kryptonite').set({
					names: this.state.names
				});
			}
			else if (this.state.events[i[0]]){
				let names=[];
				for (let j=0;j<i[6];j++)
					names.push(this.state[i[0]+'_'+j]);
				firebase.firestore().collection('colleges').doc(firebase.auth().currentUser.uid).collection('names').doc(i[0]).set({
					names
				}).then(() => {
					this.setState({ showDone: true });
				});
			}
		});
	}
	select(e){
		
		let hide = this.state.hide;
		let n=e.target.name,
			v=e.target.value;
		this.setState({ [n]: v ,hide });
		
	}
	render() {
		
		return this.state.college?(this.state.showDone?
			<div class={style.register}>
				<div class={style.section}>
					<h1>Thank you for registering. We will verify your registration soon.</h1>
					<Link href="/" class={style.button}>Go Home</Link>
				</div></div>:(
				<div class={style.register+' '+style.step3}>
					<div class={style.center}>
						<h1>Register your team - Step 3/3</h1>
						Assign participants to events
						<p>Note:</p>
						<ul>
							<li>All Participants have to participate in Kryptonite (Ice Breaker)</li>
							<li>Particiant of all events other than IT TechWizard, PORT:80, Innovision & Tech Run can participate in AdIt.</li>
						</ul>
					</div>
					<div>
						
						<div class={style.event}>
							<div>
								<h1>Kryptonite</h1>
								<p>Ice-Breaker</p>
								
								<img src={'/assets/events/ice-breaker.png'} />
								<div>
									<ul>
										{this.state.names.map(i => <li>{i}</li>)}
									</ul>
								</div>
							</div>
						</div>

						{events.slice(1).map(i => (
							this.state.events[i[0]]?
								<div class={style.event}>
									<div>
										<h1>{i[0]}</h1>
										<p>{i[1]}
											<div><i class="fa fa-user" /> {i[6]===0?'All participants':i[6]===1?'Individual participation':i[6]+' make a team.'} </div>
										</p>
										
										<img src={'/assets/events/'+i[2]} />
										<div>
											Select participants:
											{'.'.repeat(i[6]).split('.').slice(1)
												.map((k,j) => (<div>
													
													<select name={i[0]+'_'+j} onChange={this.select} value={this.state[i[0]+'_'+j]}>
														<option value="">Select</option>
														{this.state.names.map(k => {
															let pass=true;
															Object.keys(this.state.hide).map(l => {
																
																if ((i[0]+'_'+j).match(/AdIT/)){
																	
																	if (l==='PORT:80_0'||l==='TechWizard_0'||l==='Innovision_0'||l==='Innovision_1'||l==='TechRun_0'||l==='TechRun_1'){
																		if (this.state[l]===k){
																			pass=false;
																		}
																	}
																	for (let m=0;m<6;m++)
																		if (this.state['AdIT_'+m]===k&&'AdIT_'+m!==i[0]+'_'+j)
																			pass=false;
																}
																else if (i[0]+'_'+j==='PORT:80_0'||i[0]+'_'+j==='TechWizard_0'||i[0]+'_'+j==='Innovision_0'||i[0]+'_'+j==='Innovision_1'||i[0]+'_'+j==='TechRun_0'||i[0]+'_'+j==='TechRun_1'){
																	if (this.state[l]===k&&l!==i[0]+'_'+j)
																		pass=false;
																}
																else if (this.state[l]===k&&l!==i[0]+'_'+j&&!(l).match(/AdIT/))
																	pass=false;
																
															});
															if (pass)
																return <option>{k}</option>;
														})}
													</select></div>))}
										</div>
									</div>
								</div>:''
						)
						)}
					</div>
					<Info that={this} />
					<div class={style.center}><button onClick={this.handleSubmit}>{this.state.button}</button></div>

					
				</div>
			)):'';
	}
}

class Step2 extends Component {
	state={
		totalParticipants: 19,
		button: 'Next'
	}
	constructor(props){
		super(props);
		events.map(i => this.setState({ [i[0]+'_p']: i[6] }));
		this.toggleEvent=this.toggleEvent.bind(this);
		this.handleSubmit=this.handleSubmit.bind(this);
		this.input=this.input.bind(this);
		let _events={};
		events.map(i => {_events[i[0]]=true;});
		this.setState( { events: _events });

		firebase.firestore().doc('colleges/'+firebase.auth().currentUser.uid).onSnapshot(d => {
			d.data().names.map((i,j) => this.setState({ ['name['+j+']']: i }));
			this.setState({ events: d.data().events });
			let total=0;
			events.map(i => d.data().events[i[0]]?total+=i[6]:'');
			this.setState({ totalParticipants: total });
		});
	}
	toggleEvent(e){
		let bool = e.target.className===style.red;
		let totalParticipants= this.state.totalParticipants+(this.state[e.target.getAttribute('data')+'_p']*(bool?1:-1));
		if (totalParticipants<0)
			totalParticipants=0;
	
		e.target.className=bool?'':style.red;
		let _events = this.state.events;
		_events[e.target.getAttribute('data')]=bool;
		this.setState({ [e.target.getAttribute('data')]: !bool,
			totalParticipants,
			events: _events
		});
	}
	handleSubmit(){
		let names=[];
		this.setState({ button: 'Please wait..' });
		try {
			if (this.state.totalParticipants<1)
				throw 'So in which event are you participating?';
			for (let i=0;i<this.state.totalParticipants&&i<14;i++){
				if (empty(this.state['name['+i+']']))
				 throw 'Please enter participant '+(i+1)+' name.';
				 for (let j=0;j<names.length;j++){
					if (String(this.state['name['+i+']']).toLowerCase().trim()===String(names[j]).toLowerCase().trim())
						throw names[j]+' has been repeated twice.';
				 }
				names.push(this.state['name['+i+']']);
			}
		}
		catch (msg){
			this.setState({ infoMessage: msg, button: 'Next' });
			return;
		}
		
		firebase.firestore().collection('colleges').doc(firebase.auth().currentUser.uid).set({
			events: this.state.events,
			names
		},{ merge: true }).then(() => {
			route('/register/step-3');
		});
	}
	input(e){
		this.setState({ [e.target.name]: e.target.value });
	}
	render() {
		return (
			<div class={style.register}>
				<div class={style.section}>
					<h1>Register your team - Step 2/3</h1>
				
					<div>
						Select events: <span class={style.info}>Click the icons to select/deselect</span>
						<div class={style.selectEvents}>
							{events.map(i => (
								
								<img src={'/assets/events/'+i[2]} data={i[0]} onClick={this.toggleEvent} class={this.state.events[i[0]]?'':style.red} />
							))}
						</div>
					</div>
					<div>
						Total number of participants: {this.state.totalParticipants>14?14:this.state.totalParticipants}
					</div>
					<div>
					
						Enter participants name:
						{'.'.repeat(this.state.totalParticipants>14?14:this.state.totalParticipants).split('.').slice(1).map((i,j) => <div>{j+1}. <input type="text" name={'name['+j+']'} class={style.input} onChange={this.input} value={this.state['name['+j+']']} /></div>)}
					</div>
					
					<Info that={this} />
					<div><button onClick={this.handleSubmit}>{this.state.button}</button></div>

				</div>
			</div>
		);
	}
}

class Step1 extends Component {
	state={
		button: 'Next'
	}
	constructor(props){
		super(props);
		if (firebase.auth().currentUser){
			if (firebase.auth().currentUser.displayName)
				this.setState({ coOrdinator: firebase.auth().currentUser.displayName });
			if (firebase.auth().currentUser.phoneNumber)
				this.setState({ coOrdinator: firebase.auth().currentUser.phoneNumber });
		}
		this.handleSubmit=this.handleSubmit.bind(this);
		this.input=this.input.bind(this);

		firebase.firestore().doc('colleges/'+firebase.auth().currentUser.uid).onSnapshot(d => {
			this.setState(d.data());
		});
	}
	handleSubmit(e){
		this.setState({ button: 'Please wait...' });
		try {
			if (empty(this.state.neft))
				throw 'Please enter NEFT UTI Code. Note: you can skip this by entering *.';
			
			if (empty(this.state.college))
				throw `Please enter the name of your college`;

			if (empty(this.state.city))
				throw `Please enter the city name of your college`;

			if (empty(this.state.coOrdinator))
				throw `Please enter the name of the student/staff with whom we can communicate.`;
			
			if (empty(this.state.phoneNumber))
				throw 'Please enter the phone number of your co-ordinator.';
			
			
		}
		catch (msg){
			this.setState({ infoMessage: msg, button: 'Next' });
			return;
		}
		firebase.firestore().collection('colleges').doc(firebase.auth().currentUser.uid).set({
			college: this.state.college,
			neft: this.state.neft,
			city: this.state.city,
			coOrdinator: this.state.coOrdinator,
			phoneNumber: this.state.phoneNumber,
			date: Date.now()
		},{ merge: true }).then(() => {
			route('/register/step-2');
		});
		
	}
	input(e){
		this.setState({ [e.target.name]: e.target.value });
	}
	render(){
		return (
			<div class={style.register}>
				<div class={style.section}>
					<h1>Register your team - Step 1/3</h1>
					<div class={style.note}>
						<h4>Note:</h4>
						<ul>
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
							<li>If you have already done the transaction, then you can procceed by entering the UTI code of your NEFT transaction below</li>
						</ul>

					</div>
					<div>Enter NEFT UTI Code: <input type="text" class={style.input} name="neft" value={this.state.neft} onChange={this.input} /></div>
					<div>Enter your college name: <input type="text" class={style.input} name="college" value={this.state.college} onChange={this.input} /></div>
					<div>Enter city: <input type="text" class={style.input} name="city" value={this.state.city} onChange={this.input} /></div>
					<div>Enter Student co-ordinator name: <input type="text" class={style.input} name="coOrdinator" value={this.state.coOrdinator} onChange={this.input} /></div>
					<div>Enter phone number: <input type="number" class={style.input} name="phoneNumber" value={this.state.phoneNumber} onChange={this.input} /></div>
					<Info that={this} />
					<div><button onClick={this.handleSubmit}>{this.state.button}</button></div>
				</div>
			</div>
		);
	}
}

export default class Register extends Component {
	constructor(props){
		super(props);
		if (!firebase.auth().currentUser)
			route('/login/?r='+ this.props.url );
		else
			this.setState({ render: true });
		if (typeof(document)!=='undefined')
			document.title='Register | Composite Fest 2K18';
	}
	handleRoute = e => {
		this.currentUrl = e.url;
	};
	render(){
		return (this.state.render?
			<Router onChange={this.handleRoute}>
				<Step1 path="/register/step-1"  />
				<Step1 default />
				<Step2 path="/register/step-2" />
				<Step3 path="/register/step-3" />
			</Router>:'');

	}
}