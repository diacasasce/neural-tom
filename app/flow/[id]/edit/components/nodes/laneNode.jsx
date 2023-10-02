/* eslint-disable react/display-name */
import React, { memo, useState } from 'react'
import { NodeResizer, NodeToolbar } from 'reactflow'
import useZStore from './store'
import {
	ChevronDownIcon,
	ChevronUpIcon,
	WrenchIcon,
} from '@heroicons/react/24/outline'

const LaneNode = memo(({ data, selected }) => {
	const { isModalOpen, openModal, closeModal } = useZStore()
	return (
		<>
			<NodeToolbar isVisible={data.toolbarVisible} position={'right'}>
				<button
					className="btn btn-square rounded-sm  btn-base-300 btn-xs ml-1"
					onClick={() => {
						isModalOpen
							? closeModal()
							: openModal(<LanePropertiesModal data={data} />)
					}}
				>
					<WrenchIcon className="w-6 h-6" />
				</button>
			</NodeToolbar>
			<NodeResizer
				isVisible={selected}
				lineClassName="!border-primary !border-4"
				handleClassName="!opacity-100 !h-3 !w-3"
				minWidth={200}
				minHeight={250}
			/>
			<div className="h-full w-full">
				<div className="bg-white relative bg-opacity-70 border border-black z-0 h-full w-full join join-vertical rounded-none">
					<div className="join-item border border-black text-center min-h-10">
						{data.role || '[new lane]'}
					</div>
					<div className="join-item border border-black h-full">
						<div className=" py-28 px-40"></div>
					</div>
				</div>
			</div>
		</>
	)
})

const LanePropertiesModal = ({ data }) => {
	const { closeModal, updateNode } = useZStore()
	const [Role, setRole] = useState(data.role || '')
	const [Description, setDescription] = useState(data.description || '')
	const [canWrite, setCanWrite] = useState(data.canWrite || false)
	const [canRead, setCanRead] = useState(data.canRead || false)
	const [canUpdate, setCanUpdate] = useState(data.canUpdate || false)
	const [canDelete, setCanDelete] = useState(data.canDelete || false)
	const [permissions, setPermissions] = useState(false)
	return (
		<div className="h-full w-1/3 bg-base-100 pt-10 p-5 overflow-scroll">
			<h1 className=" text-center">Lane Properties</h1>
			<div className="divider m-0 "></div>
			<label className="label">
				<span className="label-text">Role name</span>
				<input
					type="text"
					placeholder="Lane Name"
					className="input input-bordered rounded-md input-sm w-full max-w-xs"
					value={Role}
					onChange={(event) => setRole(event.target.value)}
				/>
			</label>
			<label className="label">
				<span className="label-text">Lane Descriptions</span>
			</label>
			<textarea
				placeholder="Lane Description"
				className="textarea textarea-bordered rounded-md textarea-xs w-full max-w-xs"
				value={Description}
				onChange={(event) => setDescription(event.target.value)}
			></textarea>
			<div className="divider m-0"></div>
			<div className="collapse border border-base-300 bg-base-200">
				<input
					type="checkbox"
					className="min-h-unset hidden"
					checked={permissions}
				/>
				<div className="collapse-title text-lg p-2 pl-4 min-h-unset">
					<div className="flex justify-between">
						Permissions
						<button
							className="btn btn-square rounded-sm  btn-base-300 btn-xs ml-1 "
							onClick={() => {
								console.log('edit permissions')
								setPermissions(!permissions)
							}}
						>
							{permissions ? (
								<ChevronUpIcon className="w-6 h-6" />
							) : (
								<ChevronDownIcon className="w-6 h-6" />
							)}
						</button>
					</div>
				</div>
				<div className="collapse-content">
					<div className="flex flex-wrap">
						<div className="form-control w-full">
							<label className="cursor-pointer label">
								<span className="label-text">Can Write</span>
								<input
									type="checkbox"
									className="toggle toggle-primary"
									checked={canWrite}
									onChange={() => setCanWrite(!canWrite)}
								/>
							</label>
						</div>
						<div className="form-control w-full">
							<label className="cursor-pointer label">
								<span className="label-text">Can Read</span>
								<input
									type="checkbox"
									className="toggle toggle-secondary"
									checked={canRead}
									onChange={() => setCanRead(!canRead)}
								/>
							</label>
						</div>
						<div className="form-control w-full">
							<label className="cursor-pointer label">
								<span className="label-text">Can Update</span>
								<input
									type="checkbox"
									className="toggle toggle-accent"
									checked={canUpdate}
									onChange={() => setCanUpdate(!canUpdate)}
								/>
							</label>
						</div>
						<div className="form-control w-full">
							<label className="cursor-pointer label">
								<span className="label-text">Can Delete</span>
								<input
									type="checkbox"
									className="toggle toggle-accent"
									checked={canDelete}
									onChange={() => setCanDelete(!canDelete)}
								/>
							</label>
						</div>
					</div>
				</div>
			</div>

			<div className="modal-action">
				<button
					className="btn btn-sm btn-primary"
					onClick={() => {
						updateNode({
							id: data.id,
							data: {
								...data,
								role: Role,
								description: Description,
								canWrite,
								canRead,
								canUpdate,
								canDelete,
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

export default LaneNode
