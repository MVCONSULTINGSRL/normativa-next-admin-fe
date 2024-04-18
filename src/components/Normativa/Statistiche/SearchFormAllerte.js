import React from "react";

import {TreeSelect} from "antd";
import {Card} from "antd";
import {useDispatch} from "react-redux";
import {statistiche, showSpinner} from "../../../appRedux/actions";
import {message} from "antd";
import {useState} from "react";
import {useEffect} from "react";

import {disabledDate} from "../../../constants/Functions"

import {
    Button,
    Collapse,
    DatePicker,
    Form,
    Row,
    Col,
    Slider,
    Tooltip
} from "antd";
import {QuestionCircleOutlined} from '@ant-design/icons';

import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors
} from '@dnd-kit/core';
import {arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy} from '@dnd-kit/sortable';

import {SortableItem} from './SortableItem';

function SearchForm() {

    const [items,
        setItems] = useState(["Categoria", "Pericolo", "Paese di origine"]);

    const sensors = useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor, {coordinateGetter: sortableKeyboardCoordinates}));

    function handleDragEnd(event) {
        const {active, over} = event;

        if (active.id !== over.id) {
            setItems((items) => {
                const oldIndex = items.indexOf(active.id);
                const newIndex = items.indexOf(over.id);

                return arrayMove(items, oldIndex, newIndex);
            });
        }
    }

    useEffect(() => {
        //console.log("Statistica search form allerte reloaded")
    }, []);

    const {Panel} = Collapse;
    const {RangePicker} = DatePicker;
    const [form] = Form.useForm();

    const dispatch = useDispatch();

    const onFinish = (searchFilters) => {
        searchFilters.ordine_di_aggregazione = items;

        var mandatoryField;
        switch (searchFilters.ordine_di_aggregazione[0]) {
            case "Categoria":
                {
                    mandatoryField = searchFilters.categoria;
                    break;
                }
            case "Pericolo":
                {
                    mandatoryField = searchFilters.pericolo;
                    break;
                }
            case "Paese di origine":
                {
                    mandatoryField = searchFilters.paese_di_origine;
                    break;
                }
            default:
                {
                    mandatoryField = undefined;
                }
        }
        if (mandatoryField === undefined || mandatoryField.length === 0) {
            message.error("Il campo " + searchFilters.ordine_di_aggregazione[0] + " deve contenere almeno un valore")
        } else {
            //console.log("--- SEARCH FORM - search dispatched - ", searchFilters)
            dispatch(statistiche(searchFilters));
            dispatch(showSpinner("Generazione statistica allerte in corso"));
        }

    };

    const onReset = () => {
        form.resetFields();
    };

    return (
        <Card>
            <Collapse defaultActiveKey={['1']}>
                <Panel header="Ricerca" key="1">
                    <Form
                        name="searchForm"
                        form={form}
                        onFinish={onFinish}
                        labelCol={{
                        span: 8
                    }}
                        wrapperCol={{
                        span: 16
                    }}
                        layout="horizontal">
                        <Row>
                            <Col span={12}>
                                <Form.Item name={'data'} label="Data:">
                                    <RangePicker
                                        style={{
                                        width: '100%'
                                    }}
                                        disabledDate={disabledDate}
                                        format={['D/M/YYYY', 'D-M-YYYY']}
                                        placeholder={['dal', 'al']}
                                        allowEmpty={[true, true]}/>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <Form.Item name={'categoria'} label="Categoria:">
                                    <TreeSelect
                                        treeDataSimpleMode={{
                                        pId: 'pid'
                                    }}
                                        treeData={JSON.parse(localStorage.getItem('categorie'))}
                                        showSearch
                                        placeholder="Seleziona categorie"
                                        allowClear
                                        multiple
                                        treeNodeFilterProp='title'/>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <Form.Item name={'pericolo'} label="Pericolo:">
                                    <TreeSelect
                                        treeDataSimpleMode={{
                                        pId: 'pid'
                                    }}
                                        treeData={JSON.parse(localStorage.getItem('pericoli'))}
                                        showSearch
                                        placeholder="Seleziona pericoli..."
                                        allowClear
                                        multiple
                                        treeNodeFilterProp='title'/>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <Form.Item name={'paese_di_origine'} label="Paese di origine:">
                                    <TreeSelect
                                        treeDataSimpleMode={{
                                        pId: 'pid'
                                    }}
                                        treeData={JSON.parse(localStorage.getItem('countries'))}
                                        showSearch
                                        placeholder="Seleziona paese di origine......"
                                        allowClear
                                        multiple
                                        treeNodeFilterProp='title'/>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <Form.Item name={'ordine_di_aggregazione'} label="Ordine di aggregazione:">
                                    <DndContext
                                        sensors={sensors}
                                        collisionDetection={closestCenter}
                                        onDragEnd={handleDragEnd}>
                                        <SortableContext items={items} strategy={verticalListSortingStrategy}>
                                            {items.map(id => <SortableItem key={id} id={id}/>)}
                                        </SortableContext>
                                    </DndContext>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <Form.Item name={'soglia'} label="Livello di dettaglio:">
                                    <div
                                        style={{
                                        position: 'relative'
                                    }}>
                                        <Slider
                                            min={1}
                                            max={99}
                                            step={1}
                                            defaultValue={30}
                                            marks={{
                                            1: '1%',
                                            99: '99%'
                                        }}/>
                                        <Tooltip title="Variando il livello di dettaglio puoi ottenere maggiori informazioni grafiche. Attenzione: la rappresentazione Grafica può risultare più difficile con valori progressivamente inferiori. Per un livello di dettaglio ideale si consiglia un valore compreso tra 20 e 30 percento">
                                            <QuestionCircleOutlined
                                                style={{
                                                position: 'absolute',
                                                right: -30,
                                                top: -1
                                            }}/>
                                        </Tooltip>
                                    </div>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>

                                <Form.Item
                                    label={' '}
                                    colon={false}
                                    wrapperCol={{
                                    offset: 9,
                                    span: 15
                                }}>
                                    <Button type="primary" inline htmlType="submit">Cerca</Button>
                                    < Button inline onClick={onReset}>
                                        Reset
                                    </Button>
                                </Form.Item >
                            </Col>
                        </Row>
                    </Form >
                </Panel>
            </Collapse>
        </Card >
    )

}

export default SearchForm;