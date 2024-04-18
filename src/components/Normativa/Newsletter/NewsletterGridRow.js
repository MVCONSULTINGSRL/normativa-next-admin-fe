import { Col, Row,Divider ,Tooltip } from 'antd';
import { InfoCircleOutlined ,FieldTimeOutlined , SettingOutlined}  from "@ant-design/icons"
import NormativaNewsletterFile from './NewsletterFile';


function NormativaNewsletterGridRow(props) {

  var periodo = props.periodo;

  var norme = props.norme;
  var allerte = props.allerte;
  var sentenze = props.sentenze;
  var ritiri = props.ritiri;
  var frodi = props.frodi;
  var normeusa = props.normeusa;


  var normeActive   = props.normeActive;
  var allerteActive = props.allerteActive;
  var sentenzeActive= props.sentenzeActive;
  var ritiriActive  = props.ritiriActive;
  var frodiActive   = props.frodiActive;
  var normeusaActive= props.normeusaActive;

  const workingInProgress = 'Pubblicata a breve'
  const longWorkingInProgress = 'In lavorazione'
  const noNormaNewsletter = 'Nessuna norma nella settimana ' + periodo.week + '-' + periodo.year
  const noAllertaNewsletter = 'Nessuna allerta nella settimana ' + periodo.week + '-' + periodo.year
  const noSentenzaNewsletter = 'Nessuna sentenza nella settimana ' + periodo.week + '-' + periodo.year
  const noRitiroNewsletter = 'Nessun richiamo/ritiro nella settimana ' + periodo.week + '-' + periodo.year
  const noFrodeNewsletter = 'Nessuna frode nella settimana ' + periodo.week + '-' + periodo.year
  const noNormaUsaNewsletter = 'Nessuna norma USA nella settimana ' + periodo.week + '-' + periodo.year


  return (
    <>
    <Row justify="space-between" align="top" gutter={[10,30]}>

      {/* periodo */}
      <Col span={6}>
        <div style={{ textAlign:'center',padding: '15px 6px' }}>
          <div style={{fontWeight: 'bold'}}>
          Anno {periodo.year} - Settimana {periodo.week}
          </div>
          <div style={{fontSize:'12px'}}>
          dal {periodo.dayFrom} al {periodo.dayTo}  
          </div>
        </div>
      </Col>

      {/* norme */}
      <Col span={3}>
          <div style={{ textAlign:'center',padding: '15px 6px' }}>
          {norme.count > 0 && 
              <NormativaNewsletterFile active={normeActive} count={norme.count} category={'norma'} hash={norme.hash} colorBg={'#002447'}/>
          }
          {norme.count === 0 && 
            <Tooltip title={noNormaNewsletter}>
              <InfoCircleOutlined style={{ fontSize: '24px', color: '#999999' }} />
            </Tooltip>
          }
          {norme.count === -1 && 
            <Tooltip title={workingInProgress}>
              <FieldTimeOutlined style={{ fontSize: '24px', color: '#999999' }} />
            </Tooltip>
          }
          {norme.count === -2 && 
            <Tooltip title={longWorkingInProgress}>
              <SettingOutlined style={{ fontSize: '24px', color: '#999999' }} />
            </Tooltip>
          }
          </div>
      </Col>

      {/* allerte */}
      <Col span={3}>
          <div style={{ textAlign:'center',padding: '15px 6px' }}>
            {allerte.count > 0 && 
              <NormativaNewsletterFile active={allerteActive} count={allerte.count} category={'allerta'} hash={allerte.hash} colorBg={'#ED6F07'}/>
           }
          {allerte.count === 0 && 
            <Tooltip title={noAllertaNewsletter}>
              <InfoCircleOutlined style={{ fontSize: '24px', color: '#999999' }} />
            </Tooltip>
          }
          {allerte.count === -1 && 
            <Tooltip title={workingInProgress}>
              <FieldTimeOutlined style={{ fontSize: '24px', color: '#999999' }} />
            </Tooltip>
          }
          {allerte.count === -2 && 
            <Tooltip title={longWorkingInProgress}>
              <SettingOutlined style={{ fontSize: '24px', color: '#999999' }} />
            </Tooltip>
          }
        </div>
      </Col>

      {/* sentenze */}
      <Col span={3}>
          <div style={{ textAlign:'center',padding: '15px 6px' }}>
            {sentenze.count > 0 && 
              <NormativaNewsletterFile active={sentenzeActive} count={sentenze.count} category={'sentenza'} hash={sentenze.hash} colorBg={'#89898b'}/>
            }
          {sentenze.count === 0 && 
            <Tooltip title={noSentenzaNewsletter}>
              <InfoCircleOutlined style={{ fontSize: '24px', color: '#999999' }} />
            </Tooltip>
          }
          {sentenze.count === -1 && 
            <Tooltip title={workingInProgress}>
              <FieldTimeOutlined style={{ fontSize: '24px', color: '#999999' }} />
            </Tooltip>
          }
          {sentenze.count === -2 && 
            <Tooltip title={longWorkingInProgress}>
              <SettingOutlined style={{ fontSize: '24px', color: '#999999' }} />
            </Tooltip>
          }
        </div>  
      </Col>

      {/* ritiri */}
      <Col span={3}>
          <div style={{ textAlign:'center',padding: '15px 6px' }}>
            {ritiri.count > 0 && 
              <NormativaNewsletterFile active={ritiriActive} count={ritiri.count} category={'ritiro'} hash={ritiri.hash} colorBg={'#CF2B29'}/>
            }
          {ritiri.count === 0 && 
            <Tooltip title={noRitiroNewsletter}>
              <InfoCircleOutlined style={{ fontSize: '24px', color: '#999999' }} />
            </Tooltip>
          }
          {ritiri.count === -1 && 
            <Tooltip title={workingInProgress}>
              <FieldTimeOutlined style={{ fontSize: '24px', color: '#999999' }} />
            </Tooltip>
          }
          {ritiri.count === -2 && 
            <Tooltip title={longWorkingInProgress}>
              <SettingOutlined style={{ fontSize: '24px', color: '#999999' }} />
            </Tooltip>
          }
          </div>
        </Col>

      {/* frodi */}
      <Col span={3}>
          <div style={{ textAlign:'center',padding: '15px 6px' }}>
            {frodi.count > 0 && 
              <NormativaNewsletterFile active={frodiActive} count={frodi.count} category={'frode'} hash={frodi.hash} colorFg={'#444444'} colorBg={'#F4DE61'}/>
            }
          {frodi.count === 0 && 
            <Tooltip title={noFrodeNewsletter}>
              <InfoCircleOutlined style={{ fontSize: '24px', color: '#999999' }} />
            </Tooltip>
          }
          {frodi.count === -1 && 
            <Tooltip title={workingInProgress}>
              <FieldTimeOutlined style={{ fontSize: '24px', color: '#999999' }} />
            </Tooltip>
          }
          {frodi.count === -2 && 
            <Tooltip title={longWorkingInProgress}>
              <SettingOutlined style={{ fontSize: '24px', color: '#999999' }} />
            </Tooltip>
          }
          </div>
        </Col>

      {/* USA */}
      <Col span={3}>
          <div style={{ textAlign:'center',padding: '15px 6px' }}>
            {normeusa.count > 0 && 
              <NormativaNewsletterFile active={normeusaActive} count={normeusa.count} category={'normausa'} hash={normeusa.hash} colorBg={'#002447'}/>
            }
           {normeusa.count === 0 && 
            <Tooltip title={noNormaUsaNewsletter}>
              <InfoCircleOutlined style={{ fontSize: '24px', color: '#999999' }} />
            </Tooltip>
          }
          {normeusa.count === -1 && 
            <Tooltip title={workingInProgress}>
              <FieldTimeOutlined style={{ fontSize: '24px', color: '#999999' }} />
            </Tooltip>
          }
          {normeusa.count === -2 && 
            <Tooltip title={longWorkingInProgress}>
              <SettingOutlined style={{ fontSize: '24px', color: '#999999' }} />
            </Tooltip>
          }
         </div>
        </Col>
    </Row>
    <Divider />
    </>
  )
}

export default NormativaNewsletterGridRow;

