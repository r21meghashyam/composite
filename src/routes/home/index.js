import { h, Component } from 'preact';

import Landing from './landing';
import Events from './events';
import Venue from './venue';
import Video from './video';
import Time from './time';
import People from './people';


export default class Home extends Component {
	constructor(props){
		super(props);
		if (typeof(document)!=='undefined')
			window.document.title='Composite Fest 2K18';
	}
	handleRoute = e => {
		this.currentUrl = e.url;
	};

	render() {
		return (
			<div>
				<Landing />
				<Events />
				<Venue />
				<People />
				<Video />
				<Time />
				
			</div>
		);
	}
}
