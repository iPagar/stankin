import React from "react";
import {
	Panel,
	PanelHeaderBack,
	PanelHeaderSimple,
	List,
	Cell,
	Header,
	InfoRow,
	CellButton,
	Placeholder,
	Button,
} from "@vkontakte/vkui";
import { connect } from "react-redux";
import { setStory, setView, exit } from "../redux/actions";

import Icon24Notification from "@vkontakte/icons/dist/24/notification";
import Icon56UserCircleOutline from "@vkontakte/icons/dist/56/user_circle_outline";

const mapStateToProps = (state) => {
	return {
		student: state.init.student,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onSetView: (name) => {
			dispatch(setView(name));
		},
		onSetStory: (name) => {
			dispatch(setStory(name));
		},
		onExitClick: () => {
			dispatch(exit());
		},
	};
};

class Profile extends React.Component {
	onExit = () => {
		this.props.onExitClick();
	};

	renderExit() {
		return (
			<CellButton mode={"danger"} onClick={this.onExit}>
				Выйти
			</CellButton>
		);
	}

	renderProfile() {
		const { student } = this.props;

		return (
			<div>
				<Header level="secondary">Информация о студенте</Header>
				<List>
					<Cell>
						<InfoRow header="ФИО">
							{`${student.surname} ${student.initials}`}
						</InfoRow>
					</Cell>
					<Cell>
						<InfoRow header="Студенческий билет">
							{student.student}
						</InfoRow>
					</Cell>
					<Cell>
						<InfoRow header="Группа">{student.stgroup}</InfoRow>
					</Cell>
				</List>
			</div>
		);
	}

	render() {
		return (
			<Panel id="profile" theme="white" separator={false}>
				<PanelHeaderSimple
					left={
						<PanelHeaderBack onClick={this.props.onCancelClick} />
					}
				>
					Профиль
				</PanelHeaderSimple>
				{this.props.student.hasOwnProperty("student") ? (
					<React.Fragment>
						{this.renderProfile()}
						<List>{this.renderExit()}</List>
					</React.Fragment>
				) : (
					<Placeholder
						action={
							<Button
								size="l"
								onClick={() => {
									this.props.onSetStory("marksRoot");
									this.props.onSetView("loginView");
								}}
							>
								Войти
							</Button>
						}
						icon={<Icon56UserCircleOutline />}
						stretched
					/>
				)}
			</Panel>
		);
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Profile);
