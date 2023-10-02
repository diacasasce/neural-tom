import StartNode from './startNode'
import TaskNode from './taskNode'
import EndNode from './endNode'
import LaneNode from './laneNode'

export const nodeTypes = {
	start: StartNode,
	task: TaskNode,
	end: EndNode,
	lane: LaneNode,
}
