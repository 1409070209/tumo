import React, {JSX, useCallback, useEffect, useState} from 'react';
import {Button, Form, Input, InputNumber, message, Modal, ModalProps} from 'antd';
import {addScore} from '../service';


type ModalFormProps = ModalProps & {
	name: 'nuo.lei',
	score: number | null
}

export function PushScore(): JSX.Element {
	const maxRequestLimit = 100;
	const name = 'nuo.lei';

	const [eventId, setEventId] = useState<NodeJS.Timeout>();
	const [modalOption, setModalOption] = useState<ModalFormProps>({
		title: '上传你的分数',
		width: 800,
		open: false,
		name,
		score: null
	});

	const sendRequest = () => {
		if (eventId !== undefined) {
			return message.error(`already have 1 event error`);
		}
		const id = setTimeout(() => {
			const scoreList = Array(maxRequestLimit).fill(0).map(() => {
				return Math.floor(Math.random() * 1e10);
			});
			const getTaskList = () => {
				return scoreList.map(score => {
					return addScore(`${name}_${Math.ceil(Math.random() * 100)}`, score);
				});
			};

			Promise.all(getTaskList()).then(() => {
				setEventId(undefined);
				return message.info(`push 100 success`);
			});
		}, 1e3);

		setEventId(id);
	};


	const stopEvent = () => {
		if (eventId === undefined) {
			return message.error(`have 0 event error`);
		}
		clearInterval(eventId);
	};

	const pushScoreAction = () => {
		setModalOption({
			...modalOption,
			open: true
		});
	};


	const sendScoreAction = () => {
		addScore(modalOption.name, modalOption.score || -1).then(() => {
			setModalOption({...modalOption, open: false});
		});
	};
	return <div style={{width: 800, margin: '0 auto'}}>
		<div>
			<Button onClick={sendRequest} type={'primary'}>push {maxRequestLimit} score every 1 second</Button>
			<Button onClick={stopEvent} type={'primary'}>Stop</Button>
		</div>
		<div>
			<Button onClick={pushScoreAction} type={'primary'}>input your score</Button>
		</div>
		<Modal {...modalOption} onOk={sendScoreAction} onCancel={() => setModalOption({...modalOption, open: false})}>
			<p>Your name is: </p>
			<Input value={modalOption.name} disabled={true}></Input>
			<p>your score is: </p>
			<InputNumber value={modalOption.score || ''} onChange={(e) => {
				setModalOption({
					...modalOption,
					score: e || 0
				});
			}}/>
			<Button onClick={() => {
				setModalOption({
					...modalOption,
					score: Math.floor(Math.random() * 1e9)
				});
			}} type={'primary'}>生成随机数</Button>
		</Modal>
	</div>;
}