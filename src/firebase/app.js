import { initializeApp } from 'firebase/app';

const firebaseConfig = {
	apiKey: 'AIzaSyD-FhsxgNHW3QGUYPfU9c57KYb25RYZEZE',
	authDomain: 'melodimatch.firebaseapp.com',
	projectId: 'melodimatch',
	storageBucket: 'melodimatch.appspot.com',
	messagingSenderId: '284320619042',
	appId: '1:284320619042:web:bb01fa3a62bbc69b8d087b',
	measurementId: 'G-7N6JMSCXT9'
};

export const app = initializeApp(firebaseConfig);
