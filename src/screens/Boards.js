import { Table } from 'antd';
import React, { useState, useEffect } from 'react'
import Heading from '../components/heading'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux';
const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding : 28px 24px;
`;

const SizedBox = styled.div`
    display: flex;
    height: 32px;
`;

const TableCellContainer2 = styled.div`
display: flex;
flex-direction: column;
justify-content:center;
align-items:left;
`;

const TableText2 = styled.div`
font-family: Poppins;
font-size: 12px;
font-weight : 700;
color : #B5B5C3;
`;

const CustomerText = styled.div`
font-family: Poppins;
font-size: 13.5px;
font-weight : 700;
color : #3F4254;
`;

const TableContainer = styled.div`
display: flex;
flex-direction :column;
justify-content:center;
align-items:left;
padding: 24px 12px 24px 24px;
background-color: white;
border-radius: 12px;
`;

const colors = ["#F1416C","#00B2FF",'#50CD89', "#8950FC"];
const images = ['images/avatar.png','images/avatar2.png','images/avatar3.png','images/avatar4.png'];
const valuation = [
  { amt:"$ 8,000,000", type:"High Business Value" },{ amt:"$ 11,000,000", type:"High Business Value" },
  { amt:"$ 6,000,000", type:"High Business Value" },{ amt:"$ 2,500,000", type:"Medium Business Value" },
  { amt:"$ 1,600,000", type:"Medium Business Value" },{ amt:"$ 700,000", type:"Low Business Value" },
  { amt:"$ 200,000", type:"Low Business Value" },{ amt:"$ 500,000", type:"Low Business Value" },
  { amt:"$ 4,000,000", type:"Medium Business Value" },{ amt:"$ 1,000,000", type:"Medium Business Value" }
];

function randomNumberInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


const BMSTable = styled(Table)`
  .ant-table-thead .ant-table-cell {
    background-color: white;
    font-family: Poppins;
    font-size: 12px;
    font-weight : 700;
    color : #B5B5C3;
  }
`;
const columns = [
  
  {
    title: 'Name',
    dataIndex: 'key',
    key: '1',
    width: 100,
    render: (key) => 
    <TableCellContainer2>
      <CustomerText>{`BMS ${key+1}`}</CustomerText>
    </TableCellContainer2>
  },
  {
    title: 'Current',
    dataIndex: 'current',
    key: '2',
    width: 80,
    render: (current) => 
    <TableCellContainer2>
      <TableText2>{current}</TableText2>
    </TableCellContainer2>
  },

];
for(var i=0;i<16;i++){
  var v = `v ${i}`;
  columns.push({
    title: `V ${i+1}`,
    dataIndex: v,
    key:  i+3,
    width: 80,
    render: (v) => 
    <TableCellContainer2>
      <TableText2>{v}</TableText2>
    </TableCellContainer2>
  })
}
for(var i=0;i<5;i++){
  var t = `t ${i}`;
  columns.push({
    title: `T ${i+1}`,
    dataIndex: t,
    key:  i+19,
    width: 80,
    render: (t) => 
    <TableCellContainer2>
      <TableText2>{t}</TableText2>
    </TableCellContainer2>
  })
}

const Customers = () => {
  const voltage = useSelector((state) => state.voltage);
  const temp = useSelector((state) => state.temp);
  const current = useSelector((state) => state.current);
  const num_bms = useSelector((state) => state.bms);
  const [td,setTD] = useState([]);
  const data = [];
  
  useEffect(() => {
    if(voltage['bms 0']&& temp['bms 0'] != undefined){
      
      var table_data = [];
      for(let i=0;i<num_bms;i++){
        var cur_bms = {};
        cur_bms['key'] = i;
        for(var j=0;j<16;j++){
          cur_bms[`v ${j}`] = voltage[`bms ${i}`][voltage[`bms ${i}`].length-1][j] == undefined ? "-" : voltage[`bms ${i}`][voltage[`bms ${i}`].length-1][j];
        }
        for(let j=0;j<5;j++){
          cur_bms[`t ${j}`] = temp[`bms ${i}`][temp[`bms ${i}`].length -1][j] == undefined ? "-" :temp[`bms ${i}`][temp[`bms ${i}`].length -1][j];
        }
        cur_bms['current'] = current[current.length -1];
        table_data.push(cur_bms);
      }
      
      console.log(table_data);
      setTD(table_data)
    }

  }, [voltage,current,temp])
   
  
  for (let i = 0; i < 100; i++) {
    data.push({
      key: i,
      name: [`BMS ${i+1}`, images[i%4]],
      companyValuation: valuation[i%10],
      renewalrate: [randomNumberInRange(1,99), colors[i%4]],
      churnrate: [randomNumberInRange(1,99), colors[i%4]],
      satisfaction: [randomNumberInRange(1,9), colors[i%4]],
      upsell: [randomNumberInRange(1,99), colors[i%4]],
    });
  }
    return (
        <Container>
            <Heading children="Dynamic data"/>
      <SizedBox/>
     
      { <TableContainer>
      <BMSTable
            columns={columns}
            dataSource={td}
            scroll={{
              x: 200,
              y: 900,
            }}
      />
      </TableContainer>}
        </Container>
  );
};
export default Customers;