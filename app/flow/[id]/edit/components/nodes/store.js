import { create } from 'zustand'
import { addEdge, applyNodeChanges, applyEdgeChanges } from 'reactflow'

const initialNodes = [
	{
		id: '1',
		type: 'lane',
		position: { x: 200, y: 0 },
		data: { role: 'Lane 1', id: '1', canWrite: true },
	},
	{
		id: '2',
		type: 'start',
		position: { x: 0, y: 0 },
		data: { label: 'start', id: '2' },
	},
	{
		id: '3',
		type: 'task',
		position: { x: 100, y: 0 },
		data: { label: 'task', id: '3' },
	},
	{
		id: '4',
		type: 'task',
		position: { x: 100, y: 100 },
		data: { label: 'task', id: '4' },
	},
]
const initialEdges = []

// this is our useStore hook that we can use in our components to get parts of the store and call actions
const useStore = create((set, get) => ({
	nodes: initialNodes,
	edges: initialEdges,
	isModalOpen: false,
	modalComponent: <></>,
	addNode: (node) => {
		set({
			nodes: [...get().nodes, node],
		})
	},
	updateNode: (node) => {
		set({
			nodes: get().nodes.map((n) => (n.id === node.id ? { ...n, ...node } : n)),
		})
	},
	getNode: (nodeId) => {
		return get().nodes.find((node) => node.id === nodeId)
	},
	onNodesChange: (changes) => {
		set({
			nodes: applyNodeChanges(changes, get().nodes),
		})
	},
	updateEdge: (edge, newConnection) => {
		set({
			edges: updateEdge(edge, newConnection, get().edges),
		})
	},
	removeEdge: (edgeId) => {
		set({
			edges: get().edges.filter((edge) => edge.id !== edgeId),
		})
	},
	onEdgesChange: (changes) => {
		set({
			edges: applyEdgeChanges(changes, get().edges),
		})
	},
	onConnect: (connection) => {
		set({
			edges: addEdge(connection, get().edges),
		})
	},
	openModal: (component) => {
		set({
			isModalOpen: true,
			modalComponent: component,
		})
	},
	closeModal: () => {
		set({
			isModalOpen: false,
			modalComponent: <></>,
		})
	},
}))
export const selector = (state) => ({
	nodes: state.nodes,
	edges: state.edges,
	addNode: state.addNode,
	onNodesChange: state.onNodesChange,
	onEdgesChange: state.onEdgesChange,
	onConnect: state.onConnect,
})

export default useStore
