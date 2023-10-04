import React from 'react'
import StartIcon from './icons/start.svg'
import TaskIcon from './icons/task.svg'
import EndIcon from './icons/end.svg'
import LaneIcon from './icons/lane.svg'

const Sidebar = () => {
	const onDragStart = (event, nodeType) => {
		event.dataTransfer.setData('application/reactflow', nodeType)
		event.dataTransfer.effectAllowed = 'move'
	}
	return (
		<div className="h-full grid grid-cols-1 pt-20 gap-3 ">
			<div
				className="w-10 h-fit rounded-md hover:bg-opacity-10 hover:bg-white hover:cursor-grab active:cursor-grabbing"
				onDragStart={(event) => onDragStart(event, 'start')}
				draggable
			>
				<StartIcon />
			</div>
			<div
				className="w-10 h-fit rounded-md hover:bg-opacity-10 hover:bg-white hover:cursor-grab active:cursor-grabbing"
				onDragStart={(event) => onDragStart(event, 'task')}
				draggable
			>
				<TaskIcon />
			</div>
			<div
				className="w-10 h-fit rounded-md hover:bg-opacity-10 hover:bg-white hover:cursor-grab active:cursor-grabbing"
				onDragStart={(event) => onDragStart(event, 'end')}
				draggable
			>
				<EndIcon />
			</div>
			<div
				className="w-10 h-fit rounded-md hover:bg-opacity-10 hover:bg-white hover:cursor-grab active:cursor-grabbing"
				onDragStart={(event) => onDragStart(event, 'lane')}
				draggable
			>
				<LaneIcon />
			</div>
		</div>
	)
}

export default Sidebar
