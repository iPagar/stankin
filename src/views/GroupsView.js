import React, { useState, useEffect } from "react";
import {
	View,
	Panel,
	PanelHeader,
	PanelSpinner,
	PanelHeaderBack,
	Cell,
	Group,
} from "@vkontakte/vkui";
import { useSelector } from "react-redux";
import { api } from "../services";

const GroupsView = ({ id, onBack, onCellClick }) => {
	const [groups, setGroups] = useState("");
	const stgroup = useSelector((state) => state.schedule.stgroup);
	const [isLoading, setIsLoading] = useState(true);

	const getGroups = async () => {
		await api
			.get(`/schedule/groups?stgroup=${stgroup}`)
			.then(({ data }) => {
				setGroups(data);
			});

		setIsLoading(false);
	};

	useEffect(() => {
		getGroups();
	}, []);

	return (
		<View id={id} activePanel="main">
			<Panel id="main">
				<PanelHeader
					left={<PanelHeaderBack onClick={onBack} />}
					separator={false}
				>
					Выбор подгруппы
				</PanelHeader>
				{!isLoading ? (
					<Group>
						{groups.length > 1 ? (
							groups
								.filter((group) => group !== "Без подгруппы")
								.map((group) => (
									<Cell
										key={group}
										onClick={async (e) => {
											setIsLoading(true);

											onCellClick(e);
										}}
										data-group={group}
										data-stgroup={stgroup}
									>
										{group}
									</Cell>
								))
						) : (
							<Cell
								onClick={async (e) => {
									setIsLoading(true);

									onCellClick(e);
								}}
								data-group={groups[0]}
								data-stgroup={stgroup}
							>
								{groups[0]}
							</Cell>
						)}
					</Group>
				) : (
					<PanelSpinner size="large" />
				)}
			</Panel>
		</View>
	);
};

export default GroupsView;
