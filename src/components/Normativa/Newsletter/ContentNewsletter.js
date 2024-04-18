import React, {useEffect} from "react";
import {useSelector} from "react-redux";
import NormativaNewsletterList from "./NewsletterList";
import {Col, Row, Card} from 'antd';
import { hideSpinner } from "../../../appRedux/actions";
import {useDispatch} from "react-redux";

function NormativaContentNewsletter(props) {

    var search = props.search;
    if (!search) {
        search = {}
    }

    const dispatch = useDispatch();
    const listNewsletter = useSelector(({newsletterStore}) => newsletterStore.searchResults);

    // at load
    useEffect(() => {
        console.log("at load")
    }, []);

    // everytime
    useEffect(() => {
        console.log("everytime")
    });

    //
    useEffect(() => {
        console.log("listNewsletter changed")
        if (listNewsletter !== undefined) {
            dispatch(hideSpinner("Ricerca newsletter completata"))
            console.log("listNewsletter value is ", listNewsletter)
        }
    }, [listNewsletter]);

    return (
            <Card>

                <Row justify="space-between" align="top" gutter={[10, 30]}>
                    <Col span={6}>
                        <div
                            style={{
                            textAlign: 'center',
                            padding: '15px 6px'
                        }}>
                            Periodo
                        </div>
                    </Col>
                    <Col span={3}>
                        <div
                            style={{
                            textAlign: 'center',
                            padding: '15px 6px'
                        }}>
                            Norme
                        </div>
                    </Col>
                    <Col span={3}>
                        <div
                            style={{
                            textAlign: 'center',
                            padding: '15px 6px'
                        }}>
                            Allerte
                        </div>
                    </Col>
                    <Col span={3}>
                        <div
                            style={{
                            textAlign: 'center',
                            padding: '15px 6px'
                        }}>
                            Sentenze
                        </div>
                    </Col>
                    <Col span={3}>
                        <div
                            style={{
                            textAlign: 'center',
                            padding: '15px 6px'
                        }}>
                            Ritiri e Richiami
                        </div>
                    </Col>
                    <Col span={3}>
                        <div
                            style={{
                            textAlign: 'center',
                            padding: '15px 6px'
                        }}>
                            Frodi
                        </div>
                    </Col>
                    <Col span={3}>
                        <div
                            style={{
                            textAlign: 'center',
                            padding: '15px 6px'
                        }}>
                            USA
                        </div>
                    </Col>
                </Row>
                <NormativaNewsletterList list={listNewsletter}/>
            </Card>
    )
}

export default NormativaContentNewsletter;
