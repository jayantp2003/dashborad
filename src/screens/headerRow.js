import React,{useState, useEffect} from 'react'
import Heading from '../components/heading'
import styled from 'styled-components'
import { Col, Row } from 'antd';
import SmallTwo from '../components/smallTwo';
import { read } from '../webBle';
import { useSelector, useDispatch } from 'react-redux';
import {dataAction} from '../store';
const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding : 28px 24px;
    
`;
const FeatureContainer = styled.div`
  width:180px;
  height:140px;
    display: flex;
    flex-direction: column;
    padding : 24px 20px;
    box-shadow: 0px 0px 20px rgba(94, 98, 120, 0.04);
    border-radius : 12px;
    cursor: pointer;
  `;

const SizedBox = styled.div`
    display: flex;
    height: 32px;
`;
const SizedBox2 = styled.div`
    display: flex;
    height: 16px;
`;
const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const GreenButton = styled.div`
margin-top: auto;
display: flex;
padding: 8px 16px;
background-color: #C9F7F5;
border-radius: 6px;
color: #1BC5BD;
cursor:pointer;
font-family: Poppins;
font-size: 12px;
justify-content: center;
align-items: center;
font-weight : 700;
&:hover{
  color: #C9F7F5;
  background-color: #1BC5BD;
}
`;

const HeaderRow = () => {
  const bms = useSelector((state) => state.bms);
  const cells = useSelector((state) => state.cells);
  const deviceConnected = useSelector((state) => state.deviceConnected);
  const dispatch = useDispatch()


  useEffect(() => {
    if(deviceConnected == true){
      dispatch(dataAction.setBMS());
      dispatch(dataAction.setCells());
      dispatch(dataAction.setVoltage(27));   
      dispatch(dataAction.setTemp(8)); 
      dispatch(dataAction.setCurrent(78));  
    }  
  }, [deviceConnected])
  
  useEffect(() => {
    if(deviceConnected == true){
      const interval = setInterval(()=>{
        dispatch(dataAction.setVoltage(27));
        dispatch(dataAction.setTemp(8));   
        dispatch(dataAction.setCurrent(78)); 
      },4000)
    
      return () => {
        clearInterval(interval);
      }
    }
  }, [deviceConnected])
  

  return (
    <Container>
      <Header>
        <Heading children="Dashboard - BMS"/>
        <GreenButton onClick={()=>{
          read();
          dispatch(dataAction.setDeviceConnected(true));
        }}>Pair BMS</GreenButton>
      </Header>
     
      <SizedBox2/>
      <Row gutter={[12,12]}>
      <Col>
        <FeatureContainer style={{
            backgroundColor: '#B4F1FF', 
          }} >
        <Heading style={{color:'grey'}}>{bms==0? "No Device" : 1}</Heading>
        <SizedBox/>
        <SmallTwo children='Master BMS'/>
        </FeatureContainer>
      </Col>
      <Col >
        <FeatureContainer style={{
            backgroundColor: '#B4F1FF', 
          }} >
        <Heading style={{color:'grey'}}>{bms==0? "No Device" : bms-1}</Heading>
        <SizedBox/>
        <SmallTwo children='Number of Slaves BMS'/>
        </FeatureContainer>
      </Col>
      <Col>
        <FeatureContainer style={{
          backgroundColor: 'white', 
        }} >
        <Heading style={{color:'grey'}}>{bms==0? "No Device" : cells}</Heading>
        <SizedBox/>
        <SmallTwo children="Total number of cells"/>
        </FeatureContainer>
      </Col>
       
      
      
      </Row>
      
    
      
    </Container>
  )
}

export default HeaderRow