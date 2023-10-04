import { create } from 'zustand'
import {
	addEdge,
	applyNodeChanges,
	applyEdgeChanges,
	updateEdge,
} from 'reactflow'

// this is our useStore hook that we can use in our components to get parts of the store and call actions
const useStore = create((set, get) => ({
	nodes: [],
	edges: [],
	rfInstance: null,
	isModalOpen: false,
	modalComponent: <></>,
	setNodes: (nodes) => {
		set({ nodes })
	},
	setEdges: (edges) => {
		set({ edges })
	},
	setRfInstance: (instance) => {
		set({ rfInstance: instance })
	},
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
	updateEdge: (edge, connection) => {
		set({
			edges: updateEdge(edge, connection, get().edges),
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
	addEdge: (edge) => {
		set({
			edges: addEdge(edge, get().edges),
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
