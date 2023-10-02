/* eslint-disable react/display-name */
import React, { memo, useState } from 'react'
import { Position, NodeResizer, NodeToolbar } from 'reactflow'
import {
	WrenchIcon,
	ChevronDownIcon,
	ChevronUpIcon,
} from '@heroicons/react/24/outline'
import useZStore from './store'
import Handles from './handles'

const TaskNode = memo(({ data, selected }) => {
	const { isModalOpen, openModal, closeModal } = useZStore()
	const { id, name } = data
	return (
		<>
			<NodeToolbar isVisible={data.toolbarVisible} position={'right'}>
				<button
					className="btn btn-square rounded-sm  btn-base-300 btn-xs ml-1"
					onClick={() => {
						isModalOpen ? closeModal() : openModal(<TaskModal data={data} />)
					}}
				>
					<WrenchIcon className="w-6 h-6" />
				</button>
			</NodeToolbar>
			<div
				className={`card border ${
					selected ? 'border-base-300' : 'border-black'
				} border-2 bg-white w-fit z-10 `}
			>
				<div className="card-body p-2 w-35 h-15">
					<p className="card-text text-ellipsis text-sm">
						{' '}
						{name || '[new task]'}
					</p>
					<Handles id={id} />
				</div>
			</div>
		</>
	)
})

const TaskModal = ({ data }) => {
	const { closeModal, updateNode } = useZStore()
	const [name, setName] = useState(data.name || '')
	const [taskType, setTaskType] = useState(data.taskType || '')
	const [description, setDescription] = useState(data.description || '')
	const [frontendDescription, setFrontendDescription] = useState(
		data.frontendDescription || ''
	)
	const [taskInput, setTaskInput] = useState(data.taskInput || [])
	const [taskOutput, setTaskOutput] = useState(data.taskOutput || [])
	const [testCases, setTestCases] = useState(data.testCases || [])
	const [nextTasks, setNextTasks] = useState(data.nextTasks || [])
	const [accordion, setAccordion] = useState('task')
	const onAccordionChange = (event) => {
		setAccordion(event.target.value)
	}
	const onAccordinoClick = (event) => {
		if (event.target.value === accordion) setAccordion('')
	}
	return (
		<div className="h-full w-2/3 bg-base-100 pt-10 p-5 overflow-scroll join join-vertical">
			<div className="join join-vertical">
				<div class="collapse bg-base-200 collapse-arrow border border-base-300 ">
					<input
						type="radio"
						name="modal"
						value="task"
						className="min-h-unset"
						checked={accordion === 'task'}
						onChange={onAccordionChange}
						onClick={onAccordinoClick}
					/>
					<div class="collapse-title min-h-unset text-lg font-medium">
						Task Properties
					</div>
					<div class="collapse-content">
						<label className="label">
							<span className="label-text">Task name</span>
							<input
								type="text"
								placeholder="Task Name"
								className="input input-bordered input-sm  w-full "
								value={name}
								onChange={(event) => setName(event.target.value)}
							/>
						</label>
						<label className="label">
							<span className="label-text">Task Type</span>
							<select
								className="select select-bordered select-sm w-full max-w-xs"
								onChange={(event) => setTaskType(event.target.value)}
							>
								<option disabled selected={data.taskType ? false : true}>
									Select a Task Type
								</option>
								<option
									value="B"
									selected={data.taskType === 'B' ? true : false}
								>
									Backend Task
								</option>
								<option
									value="F"
									selected={data.taskType === 'F' ? true : false}
								>
									Frontend Task
								</option>
							</select>
						</label>
						<label className="label">
							<span className="label-text">Task Backend Descriptions</span>
						</label>
						<textarea
							placeholder="Task Description"
							className="textarea textarea-bordered textarea-xs rounded-md w-full"
							value={description}
							onChange={(event) => setDescription(event.target.value)}
						></textarea>
						<label className="label">
							<span className="label-text">Task Frontend Descriptions</span>
						</label>
						<textarea
							placeholder="Task Description"
							className="textarea textarea-bordered textarea-xs rounded-md w-full"
							value={frontendDescription}
							disabled={taskType === 'F' ? false : true}
							onChange={(event) => setFrontendDescription(event.target.value)}
						></textarea>
						<label className="label">
							<span className="label-text">Task Input</span>
						</label>
						<textarea
							placeholder="Task Description"
							className="textarea textarea-bordered textarea-xs rounded-md w-full"
							value={taskInput}
							onChange={(event) => setTaskInput(event.target.value)}
						></textarea>
						<label className="label">
							<span className="label-text">Task Output</span>
						</label>
						<textarea
							placeholder="Task Description"
							className="textarea textarea-bordered textarea-xs rounded-md w-full"
							value={taskOutput}
							onChange={(event) => setTaskOutput(event.target.value)}
						></textarea>
					</div>
				</div>
				<div className="collapse border border-base-300 bg-base-200 ">
					<input
						type="radio"
						name="modal"
						value="test-cases"
						className="min-h-unset hidden"
						checked={accordion === 'test-cases'}
						onChange={onAccordionChange}
						onClick={onAccordinoClick}
					/>
					<div className="collapse-title text-lg p-2 pl-4 min-h-unset">
						<div className="flex justify-between">
							Test cases
							<button
								className="btn btn-square rounded-sm  btn-base-300 btn-xs ml-1 "
								onClick={() => {
									accordion === 'test-cases'
										? setAccordion('')
										: setAccordion('test-cases')
								}}
							>
								{accordion === 'test-cases' ? (
									<ChevronUpIcon className="w-6 h-6" />
								) : (
									<ChevronDownIcon className="w-6 h-6" />
								)}
							</button>
						</div>
					</div>
					<div className="collapse-content">proximamente nextTasks</div>
				</div>
				<div className="collapse border border-base-300 bg-base-200 ">
					<input
						type="radio"
						name="modal"
						value="next-tasks"
						className="min-h-unset hidden"
						checked={accordion === 'next-tasks'}
						onChange={onAccordionChange}
						onClick={onAccordinoClick}
					/>
					<div className="collapse-title text-lg p-2 pl-4 min-h-unset">
						<div className="flex justify-between">
							Next Tasks
							<button
								className="btn btn-square rounded-sm  btn-base-300 btn-xs ml-1 "
								onClick={() => {
									accordion === 'next-tasks'
										? setAccordion('')
										: setAccordion('next-tasks')
								}}
							>
								{accordion === 'next-tasks' ? (
									<ChevronUpIcon className="w-6 h-6" />
								) : (
									<ChevronDownIcon className="w-6 h-6" />
								)}
							</button>
						</div>
					</div>
					<div className="collapse-content">proximamente nextTasks</div>
				</div>
			</div>
			<div className="modal-action pt-2 ">
				<button
					className="btn btn-sm btn-primary"
					onClick={() => {
						updateNode({
							id: data.id,
							data: {
								...data,
								name,
								description,
								testCases,
								nextTasks,
							},
						})
						closeModal()
					}}
				>
					Save
				</button>
				<button
					className="btn btn-sm btn-secondary"
					onClick={() => {
						closeModal()
					}}
				>
					Close
				</button>
			</div>
		</div>
	)
}

export default TaskNode
