import React from "react";
import {Button, Tooltip} from "antd";
import {LinkOutlined} from "@ant-design/icons"

const NormativaLink = ({link}) => {
 
  return (
    <Tooltip title={link.titolo}>
      <Button icon={<LinkOutlined />} target="_blank" href={link.path} onClick={(e) => {e.stopPropagation();}} />
    </Tooltip>
)
}

export default NormativaLink;

