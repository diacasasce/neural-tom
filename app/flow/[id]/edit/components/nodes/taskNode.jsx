/* eslint-disable react/display-name */
import React, { memo, useState } from 'react'
import { Position, NodeResizer, NodeToolbar } from 'reactflow'
import {
	WrenchIcon,
	ChevronDownIcon,
	ChevronUpIcon,
} from '@heroicons/react/24/outline'
import useZStore from '../store'
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
		<div className="h-full w-2/3 bg-base-100 pt-10 p-3 overflow-scroll join join-vertical">
			<div className="join join-vertical">
				<div className="collapse bg-base-200 collapse-arrow border border-base-300 ">
					<input
						type="radio"
						name="modal"
						value="task"
						className="min-h-unset"
						checked={accordion === 'task'}
						onChange={onAccordionChange}
						onClick={onAccordinoClick}
					/>
					<div className="collapse-title min-h-unset text-lg font-medium">
						Task Properties
					</div>
					<div className="collapse-content">
						<label className="label">
							<span className="label-text">Task name</span>
							<input
								type="text"
								placeholder="Task Name"
								className="input input-bordered input-sm  w-full rounded-md "
								value={name}
								onChange={(event) => setName(event.target.value)}
							/>
						</label>
						<label className="label">
							<span className="label-text">Task Type</span>
							<select
								className="select select-bordered select-sm w-full max-w-xs  rounded-md"
								onChange={(event) => setTaskType(event.target.value)}
								value={taskType}
							>
								<option disabled>Select a Task Type</option>
								<option value="B">Backend Task</option>
								<option value="F">Frontend Task</option>
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
				{/* <div
					className={`collapse bg-base-200 border border-base-300 ${
						testCases.length && 'collapse-arrow '
					}`}
				>
					<input
						type="radio"
						name="modal"
						value="test-cases"
						className="min-h-unset"
						disabled={!testCases.length}
						checked={accordion === 'test-cases'}
						onChange={onAccordionChange}
						onClick={onAccordinoClick}
					/>
					<div className="collapse-title text-lg p-2 pl-4 min-h-unset">
						<div className="flex justify-between">Test cases</div>
					</div>
					<div className="collapse-content">proximamente nextTasks</div>
				</div> */}
				<div
					className={`collapse border border-base-300 bg-base-200 ${
						nextTasks.length && 'collapse-arrow '
					}`}
				>
					<input
						type="radio"
						name="modal"
						value="next-tasks"
						className="min-h-unset"
						checked={accordion === 'next-tasks'}
						onChange={onAccordionChange}
						onClick={onAccordinoClick}
					/>
					<div className="collapse-title text-lg p-2 pl-4 min-h-unset">
						<div className="flex justify-between">Next Tasks</div>
					</div>
					<div className="collapse-content">
						{!nextTasks.length && (
							<div className="text-center">
								create and route tasks to see next task
							</div>
						)}
						{nextTasks.length &&
							nextTasks.map((nextTask) => {
								return (
									<div
										className={`collapse border border-base-300 bg-base-100 ${
											nextTasks.length > 1 && 'collapse-arrow '
										}`}
										key={`ntDiv-${nextTask.next}`}
									>
										<input
											type="radio"
											name="taskAcordion"
											className="min-h-unset"
											checked="checked"
										/>
										<div className="collapse-title min-h-unset ">
											{nextTask.name}
										</div>
										<div className="collapse-content border-t border-base-300 rounded-t-none">
											<label className="label ">
												<span className="label-text">Rule Name</span>
											</label>
											<input
												type="text"
												placeholder="Rule Name"
												className="input input-bordered input-sm  w-full rounded-md "
												value={nextTask.name}
												onChange={(event) => {
													const nextTasksCopy = [...nextTasks]
													nextTasksCopy[
														nextTasks.findIndex(
															(nt) => nt.next === nextTask.next
														)
													].name = event.target.value
													setNextTasks(nextTasksCopy)
												}}
											/>
											<label className="label">
												<span className="label-text">Next Task Id</span>
												<input
													type="text"
													placeholder="Next Id"
													className="input input-bordered input-sm  w-full "
													disabled
													value={nextTask.next}
												/>
											</label>
										</div>
									</div>
								)
							})}
					</div>
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
