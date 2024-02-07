import React, { useState, useEffect } from 'react';
import { applyCategoryColor } from '../data/helper';
import { ScheduleComponent, ViewsDirective, ViewDirective, Week, WorkWeek, Month, TimelineViews, TimelineMonth, Inject, Resize, DragAndDrop, Agenda, Day } from '@syncfusion/ej2-react-schedule';

import { extend } from '@syncfusion/ej2-base';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { PropertyPane } from '../data/property-pane';


const Calendar = ({scheduleData}) => {
	const [scheduleObj, setScheduleObj] = useState();

    const change = (args) => {
        scheduleObj.selectedDate = args.value;
        scheduleObj.dataBind();
      };
    
      const onDragStart = (arg) => {
        arg.navigation.enable = true;
      };
  return (
    <div className='schedule-control-section'>
        <div className='control-section'>
            <div className='control-wrapper'>
            <ScheduleComponent
                height="650px"
                ref={(schedule) => setScheduleObj(schedule)}
                selectedDate={new Date(2024, 0, 10)}
                eventSettings={{ dataSource: scheduleData }}
                dragStart={onDragStart}
                readOnly={true}
            >
                <ViewsDirective>
                { ['Day', 'Week', 'Month', 'Agenda'].map((item) => <ViewDirective key={item} option={item} />)}
                </ViewsDirective>
                <Inject services={[Day, Week, Month, Agenda, Resize, DragAndDrop]} />
            </ScheduleComponent>
            </div>
        </div>
    </div>
  )
}

export default Calendar