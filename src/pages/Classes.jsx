import React, { useEffect, useRef, useState } from 'react';
import { ScheduleComponent, ViewsDirective, ViewDirective, Week, WorkWeek, Month, TimelineViews, TimelineMonth, Inject, Resize, DragAndDrop, Agenda, Day } from '@syncfusion/ej2-react-schedule';
import { Link } from 'react-router-dom';
import { applyCategoryColor } from '../data/helper';

import { extend } from '@syncfusion/ej2-base';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { PropertyPane } from '../data/property-pane';

import { scheduleData } from '../data/data';

import { Header, Sidebar } from '../components';
/*
 * Schedule Work days sample
 */
const Classes = () => {
	const [scheduleObj, setScheduleObj] = useState();

	const isCalendar = false

	const change = (args) => {
	  scheduleObj.selectedDate = args.value;
	  scheduleObj.dataBind();
	};
  
	const onDragStart = (arg) => {
	  // eslint-disable-next-line no-param-reassign
	  arg.navigation.enable = true;
	};

    return (
		<div className='content with-sidebar classes'>
			<Sidebar/>
			<div className='container'>
				<Header/>
				<h1 className="h1">Уроки</h1>
				{
					isCalendar ? 
					<div className='schedule-control-section'>
						<div className='control-section'>
							<div className='control-wrapper'>
							<ScheduleComponent
								height="650px"
								ref={(schedule) => setScheduleObj(schedule)}
								selectedDate={new Date(2024, 0, 10)}
								eventSettings={{ dataSource: scheduleData }}
								dragStart={onDragStart}
							>
								<ViewsDirective>
								{ ['Day', 'Week', 'Month', 'Agenda'].map((item) => <ViewDirective key={item} option={item} />)}
								</ViewsDirective>
								<Inject services={[Day, Week, Month, Agenda, Resize, DragAndDrop]} />
							</ScheduleComponent>
							</div>
						</div>
					</div> :
					<div className='lessons'>
						<ul className="lessons__list">
							<li className="lessons__list-title">
								<span className="date">Дата</span>
								<span className="time">Время</span>
								<span className="group">Группа</span>
								<span className="class">Урок</span>
							</li>
							<li className="lessons__list-item">
								<Link to='/classes/math'>
									<span className="date">30.05.2023</span>
									<span className="time">08:45 — 10:15</span>
									<span className="group">ALA_M_6KOY_A(5)</span>
									<span className="class">Математика</span>
								</Link>
								<Link to='/classes/math'>
									<span className="date">30.05.2023</span>
									<span className="time">08:45 — 10:15</span>
									<span className="group">ALA_M_6KOY_A(5)</span>
									<span className="class">Математика</span>
								</Link>
								<Link to='/classes/math'>
									<span className="date">30.05.2023</span>
									<span className="time">08:45 — 10:15</span>
									<span className="group">ALA_M_6KOY_A(5)</span>
									<span className="class">Математика</span>
								</Link>
								<Link to='/classes/math'>
									<span className="date">30.05.2023</span>
									<span className="time">08:45 — 10:15</span>
									<span className="group">ALA_M_6KOY_A(5)</span>
									<span className="class">Математика</span>
								</Link>
							</li>
						</ul>
					</div>
				}
				
			</div>	
		</div>
	);
};
export default Classes;