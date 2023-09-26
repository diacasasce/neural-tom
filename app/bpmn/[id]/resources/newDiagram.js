const newDiagram = `
<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL"
  xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI"
  xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" id="Definitions_1" targetNamespace="http://bpmn.io/schema/bpmn">
  <bpmn:collaboration id="Collaboration_1esnoyn">
    <bpmn:participant id="Participant_075h3xm" processRef="Process_1" />
  </bpmn:collaboration>
  <bpmn:process id="Process_1" isExecutable="false">
    <bpmn:laneSet id="LaneSet_19rvuat">
      <bpmn:lane id="Lane_09z6jc5">
        <bpmn:flowNodeRef>Event_0oh94cx</bpmn:flowNodeRef>
      </bpmn:lane>
    </bpmn:laneSet>
    <bpmn:startEvent id="Event_0oh94cx" />
  </bpmn:process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Collaboration_1esnoyn">
      <bpmndi:BPMNShape id="Participant_075h3xm_di" bpmnElement="Participant_075h3xm" isHorizontal="true">
        <dc:Bounds x="170" y="160" width="330" height="190" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Lane_09z6jc5_di" bpmnElement="Lane_09z6jc5" isHorizontal="true">
        <dc:Bounds x="200" y="160" width="300" height="190" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Event_0oh94cx_di" bpmnElement="Event_0oh94cx">
        <dc:Bounds x="222" y="232" width="36" height="36" />
      </bpmndi:BPMNShape>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn:definitions>
`

export default newDiagram
