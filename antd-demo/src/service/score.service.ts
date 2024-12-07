import {io} from 'socket.io-client';
import axios from 'axios';

const baseUrl = 'http://localhost:3001';

const socketUrl = 'http://localhost:3001';

export const GET_SCORE_LIST_EVENT_NAME = 'getScoreList';

export const GET_RANK_EVENT_NAME = 'getRank';

export const socket = io(socketUrl);

export let state = false;

function connect() {
	setInterval(() => socket.connect(), 5e3);
}

connect();
socket.on('connect', () => {
	console.log('connect');
	state = true;
});

socket.on('disconnect', () => {
	state = false;
});

export async function addScore(name: string, score: number): Promise<any> {
	return axios.post(`${baseUrl}/score`, {name, score});
}

export async function getScoreByName(name: string) {
	return axios.get(`${baseUrl}/score/${name}`);
}

export async function getRankByName(name: string) {
	return axios.get(`${baseUrl}/score/${name}/rank`);
}

export async function getAllScore() {
	return axios.get(`${baseUrl}/score`);
}