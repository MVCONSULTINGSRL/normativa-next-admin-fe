import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import moment from "moment";
import {
  Button,
  Collapse,
  DatePicker,
  Form,
  Row,
  Col,
  Card,
  message
} from "antd";

import {searchNewsletter, showSpinner} from "../../../appRedux/actions";

import {disabledDate,isDateRangeLessThanDays} from "../../../constants/Functions"

function NormativaSearchNewsletter(props) {

    //const {} = props;

    const {Panel} = Collapse;
    const {RangePicker} = DatePicker;

    const onFinish = (filters) => {
        //console.log("onFinish ", filters)

        if (filters.data_pubblicazione === null || filters.data_pubblicazione === undefined) {
            message.warning("Inserisci un intervallo di ricerca")
            return
        }

        if (filters.data_pubblicazione[1] === null || filters.data_pubblicazione[1] === undefined) {
            filters.data_pubblicazione[1] = moment(new Date())
        }

        if (filters.data_pubblicazione[0] === null || filters.data_pubblicazione[0] === undefined) {
            const startDate = new Date(filters.data_pubblicazione[1]);
            startDate.setDate(startDate.getDate() - 90)
            filters.data_pubblicazione[0] = moment(startDate)
        }

        //console.log("new filters ", filters)

        if (isDateRangeLessThanDays(filters.data_pubblicazione[0], filters.data_pubblicazione[1], 365)) {
            dispatch(showSpinner("Ricerca newsletter in corso"))
            dispatch(searchNewsletter(filters));    
        } else {
            message.warning("L'intervallo di date richiesto supera i limiti consentiti (52 settimane). Modifica i criteri di ricerca")
        }
    };
    const onReset = () => {
        form.resetFields();
    };

    const dispatch = useDispatch();

    const [form] = Form.useForm();  

    const searchFilters = useSelector(({newsletterStore}) => newsletterStore.searchFilters);

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
                            <Form.Item name={'data_pubblicazione'} label="Data di pubblicazione:">
                                <RangePicker
                                    style={{
                                    width: '100%'
                                }}
                                    disabledDate={disabledDate}
                                    format={['D/M/YYYY','D-M-YYYY']}
                                    placeholder={['dal', 'al']}
                                    allowEmpty={[true, true]}/>
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

export default NormativaSearchNewsletter;