import React from 'react'
import Accordion from "react-bootstrap/Accordion";
import styles from "../CourseView/CourseView.module.scss";

const ModuleEdit = ({index})=> {
  return (
    <div className='py-1 accordion-panel'>
      <Accordion defaultActiveKey={index}>
      
        <Accordion.Item eventKey={index} >
          <Accordion.Header>Modulo {index}</Accordion.Header>
          <Accordion.Body>
          Datos
          </Accordion.Body>
        </Accordion.Item>
        
      
      </Accordion>
    </div>
  )
}

export default ModuleEdit