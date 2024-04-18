import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import moment from "moment";
import {
    Button,
    Collapse,
    DatePicker,
    Form,
    Tooltip,
    Input,
    Checkbox,
    Row,
    Col,
    Card
} from "antd";
import {TreeSelect} from "antd";

import {searchSentenze,showSpinner} from "../../../appRedux/actions";

import {disabledDate} from "../../../constants/Functions"

function NormativaSearchSentenze(props) {

    //const {} = props;

    const {Panel} = Collapse;
    const {RangePicker} = DatePicker;

    const onFinish = (values) => {
        dispatch(searchSentenze(values));
        dispatch(showSpinner("Ricerca sentenze in corso"));
    };
    const onReset = () => {
        form.resetFields();
    };

    const dispatch = useDispatch();

    const [form] = Form.useForm();

    const searchFilters = useSelector(({sentenzeStore}) => sentenzeStore.searchFilters);
    useEffect(() => {
        if (searchFilters !== undefined) {
            if (searchFilters.data_pubblicazione) {
                if (searchFilters.data_pubblicazione[0]) {
                    searchFilters.data_pubblicazione[0] = moment(searchFilters.data_pubblicazione[0])
                }
                if (searchFilters.data_pubblicazione[1]) {
                    searchFilters.data_pubblicazione[1] = moment(searchFilters.data_pubblicazione[1])
                }
            }
            form.setFieldsValue(searchFilters)
        }
    }, [searchFilters]);

    return (
        <Card>
        <Collapse>
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
                            <Form.Item name={'data_pubblicazione'} label="Data di pubblicazione:">
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
                            <Form.Item name={'numero_sentenza'} label="Numero sentenza:">
                                <Input placeholder={'inserisci testo'}/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <Form.Item name={'causa'} label="Descrizione:">
                                <Input placeholder={'inserisci testo'}/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                labelCol={{
                                span: 0
                            }}
                                wrapperCol={{
                                span: 24
                            }}
                                name={'in_files'}
                                valuePropName="checked">
                                <Tooltip
                                    title="Questa opzione permette la ricerca all’interno dei file PDF caricati. La ricerca non è applicabile ai link esterni e può essere effettuata solo per parole superiori a 3 lettere">
                                    <Checkbox>Ricerca nei files</Checkbox>
                                </Tooltip>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <Form.Item name={'riferimento'} label="Riferimento:">
                                <Input placeholder={'inserisci testo'}/>
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
                                <Button inline onClick={onReset}>Reset</Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Panel>
        </Collapse>
        </Card>
    )
}

export default NormativaSearchSentenze;