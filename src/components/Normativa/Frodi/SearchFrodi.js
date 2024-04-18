import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import moment from "moment";
import {
    Button,
    Collapse,
    DatePicker,
    Form,
    Input,
    Row,
    Col,
    Card
} from "antd";
import {TreeSelect} from "antd";

import {searchFrodi,showSpinner} from "../../../appRedux/actions";

import {disabledDate} from "../../../constants/Functions"

function NormativaSearchFrodi(props) {

    //const {p} = props;

    const {Panel} = Collapse;
    const {RangePicker} = DatePicker;

    const onFinish = (searchFilters) => {
        dispatch(showSpinner("Ricerca frodi in corso"));
        dispatch(searchFrodi(searchFilters));
    };
    const onReset = () => {
        form.resetFields();
    };

    const dispatch = useDispatch();

    const [form] = Form.useForm();

    const searchFilters = useSelector(({frodiStore}) => frodiStore.searchFilters);
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
                            <Form.Item name={'soggetto'} label="Soggetto:">
                                <Input placeholder={'inserisci testo'}/>
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
                        </Col >
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
                        </Col >
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
                                <Button inline onClick={onReset}>
                                    Reset
                                </Button>
                            </Form.Item >
                        </Col>
                    </Row>
                </Form >
            </Panel>
        </Collapse>
        </Card>
    )
}
export default NormativaSearchFrodi;