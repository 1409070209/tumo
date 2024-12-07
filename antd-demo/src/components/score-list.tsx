import {JSX, useEffect, useState} from 'react';
import {List, message} from 'antd';
import {
	GET_RANK_EVENT_NAME,
	GET_SCORE_LIST_EVENT_NAME,
	getAllScore,
	getRankByName,
	getScoreByName,
	socket
} from '../service';

export function ScoreList(): JSX.Element {
	const name = 'nuo.lei';
	const [rank, setRank] = useState(-1);
	const [score, setScore] = useState({
		name, score: -1
	});
	const [allScoreList, setAllScoreList] = useState([{
		name: 'nuo.lei',
		score: 100
	}]);

	useEffect(() => {
		socket.on(GET_SCORE_LIST_EVENT_NAME, (data) => {
			setAllScoreList(data);
		});


	}, []);

	useEffect(() => {
		socket.on(`${GET_RANK_EVENT_NAME}_${name}`, data => {
			console.log(data, rank);
			if (Number(data) > 20 && rank < 20) {
				message.error(`赶紧冲钱，你的排名是${data}`)

			}
			if (Number(data) <= 20 && rank > 20) {
				message.error(`你的排名到了${data},牛皮`)
			}
			setRank(data);
		});
	}, [rank]);

	useEffect(() => {
		getRankByName(name).then(res => {
			const data = res.data;
			setRank(data);
		});
		getScoreByName(name).then(res => {
			const data = res.data;
			setScore({
				name, ...data
			});
		});
		getAllScore().then((res: any) => {
			setAllScoreList(res.data);
		});
	}, []);
	return <>
		<p>Your name is {name}</p>
		<p>Your rank is {rank}</p>
		<List>
			{allScoreList.map(item => {
				return <List.Item>{item.name}'s score is {item.score}</List.Item>;
			})}
		</List>
	</>;
}