import './style';
import App from './components/app';
import * as firebase from 'firebase';
import 'firebase/firestore';


let config = {
	//YOUR FIREBASE CONFIG
};

firebase.initializeApp(config);

export default App;
