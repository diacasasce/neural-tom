import { getBusinessObject, is } from 'bpmn-js/lib/util/ModelUtil';
import { TextAreaProp, TextFieldProp } from '../../common/property-fields';
import { createElement } from '../../common/utils';

export default function TestCaseProps(props) {
	const { element, injector } = props;
	const testCases =
		getTestCases(getBusinessObject(element))?.get('testCases') || [];
	return {
		items: testCases.map((testCase) =>
			TestCaseItem({ testCase, element, injector })
		),
		add: addItem({ injector, element }),
		shouldSort: false,
	};
}

function TestCaseItem(props) {
	const { testCase, element, injector } = props;
	const modeling = injector.get('modeling');
	return {
		id: `${testCase.id}_section`,
		label: testCase.name || '[ New Test Case ]',
		entries: [
			TextFieldProp({
				element,
				id: `${testCase.id}_name`,
				propertyId: 'name',
				caseId: testCase.id,
				label: 'Name',
				getValue: GetValue,
				setValue: SetValue,
			}),
			TextAreaProp({
				element,
				id: `${testCase.id}_description`,
				propertyId: 'tc_description',
				caseId: testCase.id,
				label: 'Description',
				getValue: GetValue,
				setValue: SetValue,
				autoResize: false,
			}),
			TextAreaProp({
				element,
				id: `${testCase.id}_input`,
				propertyId: 'tc_input',
				caseId: testCase.id,
				label: 'Input',
				getValue: GetValue,
				setValue: SetValue,
				autoResize: false,
			}),
			TextAreaProp({
				element,
				id: `${testCase.id}_output`,
				propertyId: 'tc_output',
				caseId: testCase.id,
				label: 'Output',
				getValue: GetValue,
				setValue: SetValue,
				autoResize: false,
			}),
		],
		autoFocusEntry: `${testCase.id}_name`,
		remove: removeItem({ modeling, element, testCase }),
	};
}

function SetValue({ modeling, props }) {
	return (value) => {
		const { propertyId, caseId, element } = props;
		const testCases = getTestCases(getBusinessObject(element)).get('testCases');
		const testCase = testCases.find(
			(testCase) => testCase.get('id') === caseId
		);
		modeling.updateModdleProperties(element, testCase, {
			[propertyId]: value,
		});
	};
}

function GetValue({ props }) {
	return (element) => {
		const testCases = getTestCases(getBusinessObject(element)).get('testCases');
		const { propertyId, caseId } = props;
		const testCase = testCases.find((testCase) => testCase.id === caseId);
		return testCase ? testCase[propertyId] : '';
	};
}

function getTestCases(businessObject) {
	const BO = is(businessObject, 'bpmn:ExtensionElements')
		? businessObject
		: businessObject.get('extensionElements');
	if (!BO) return null;
	const values = BO.get('values');
	const testCases = values.find((value) => value.$type === 'tom:TestCases');
	if (!testCases) return null;
	return testCases;
}

function addItem({ injector, element }) {
	const modeling = injector.get('modeling');
	const bpmnFactory = injector.get('bpmnFactory');
	const moddle = injector.get('moddle');

	return function (event) {
		event.stopPropagation();
		//const testCases = getTestCases(element);
		const businessObject = getBusinessObject(element);

		// ensure extensionsElements exists
		let extensionElements = businessObject.get('extensionElements');
		if (!extensionElements) {
			extensionElements = createElement(
				'bpmn:ExtensionElements',
				{
					values: [],
				},
				businessObject,
				bpmnFactory
			);
			modeling.updateModdleProperties(element, businessObject, {
				extensionElements,
			});
		}

		// ensure testCases exists
		let testCases = getTestCases(extensionElements);
		if (!testCases) {
			testCases = createElement(
				'tom:TestCases',
				{
					id: moddle.ids.nextPrefixed('tests_'),
					testCases: [],
				},
				extensionElements,
				bpmnFactory
			);
			modeling.updateModdleProperties(element, extensionElements, {
				values: [...extensionElements.get('values'), testCases],
			});
		}

		const testCase = createElement(
			'tom:TestCase',
			{
				name: '',
				tc_description: '',
				tc_input: '',
				tc_output: '',
			},
			testCases,
			bpmnFactory
		);
		testCase.id = moddle.ids.nextPrefixed('case_', testCase);
		modeling.updateModdleProperties(element, testCases, {
			testCases: [...testCases.get('testCases'), testCase],
		});
	};
}

function removeItem({ modeling, element, testCase }) {
	return function (event) {
		event.stopPropagation();
		const testCasesBO = getTestCases(getBusinessObject(element));
		const testCases = testCasesBO.get('testCases');
		modeling.updateModdleProperties(element, testCasesBO, {
			testCases: testCases.filter((TC) => TC.get('id') !== testCase.id),
		});
	};
}
