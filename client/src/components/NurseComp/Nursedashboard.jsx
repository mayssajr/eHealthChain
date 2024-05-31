import React, { useState, useEffect } from "react";
import { Layout, Menu, Breadcrumb, Typography, Card, Statistic } from 'antd';
import {
  PieChartOutlined,
  FileOutlined,
  FileAddOutlined
} from '@ant-design/icons';
import LogoutButton from '../LogoutButton/LogoutButton';
import { useEth } from "../../contexts/EthContext";


const { Header, Content, Sider } = Layout;
const { Title } = Typography;




const NurseDashboard = () => {

  const [accountAddress, setAccountAddress] = useState("");
  const [ethBalance, setEthBalance] = useState(0);



  const { state: { contract, accounts,web3 } } = useEth();

  const [showinfo, setShowinfo] = useState(false);
  const [patientInfo, setPatientInfo] = useState({ name: "", age: 0, temperature: 0 });



  useEffect(() => {
    if (accounts.length > 0) {
      setAccountAddress(accounts[0]);
    }
  }, [accounts]);

  useEffect(() => {
    const fetchEthBalance = async () => {
      if (web3 && accountAddress) {
        const balance = await web3.eth.getBalance(accountAddress);
        const ethBalance = web3.utils.fromWei(balance, "ether");
        setEthBalance(ethBalance);
      }
    };

    fetchEthBalance();
  }, [web3, accountAddress]);


  const getPatientInfo = async () => {
    const result = await contract.methods.getPatientInfo("0x1ab519b52DD71911C22E2277F14dB910B5B28CDd").call();
    setPatientInfo({ name: result[0], age: result[1], temperature: result[2] });
  };

  // Call the function to get the patient info on component mount
  useEffect(() => {
    getPatientInfo();
  }, []);

  const handleClickInfo = () => {
    setShowinfo(true);
    getPatientInfo();
  };



  
 
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header
          style={{
            zIndex: 1,
            width: "100%",
            backgroundColor: "#9371a3",
            position: "fixed",
          }}
        >
          <Title
            level={3}
            style={{
              position: "relative",
              color: "white",
              float: "left",
              top: "15px",
              marginLeft: "7px",
            }}
          >
            eHealthCare
          </Title>
          <img src="/icone.ico" alt="logo" 
          style={{ width: '80px',
                   height: '50px', 
                   borderRadius: '50%',
                   marginLeft: '20px' }} />
          <LogoutButton></LogoutButton>
        </Header>

      <Sider width={"18%"}
      style={{ backgroundColor: "#ffffff"}}>
      <br />
      <br />
      <br />
      <br />

      <div style={{ display: 'flex', justifyContent: 'center' }}>
      <img src="/nurse.png" alt="Patient" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />      </div>        
        <br />
          <h2 style={{ color: "gray", display: 'flex', justifyContent: 'center' }}>
            Nurse : 
          </h2>

          <p style={{ textAlign: "center" }}>{accountAddress}</p>
          <p style={{ textAlign: "center" }}>Balance ETH: {ethBalance}</p>

        <br />
        <Menu theme="light" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1" icon={<PieChartOutlined />}>
            Dashboard
          </Menu.Item>
          <Menu.Item key="2" icon={<FileOutlined />} onClick={handleClickInfo}>
            Medical records
          </Menu.Item>
          <Menu.Item key="3" icon={<FileAddOutlined />} >
          Fix an appointment
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
            <Breadcrumb.Item>Nurse's dashboard</Breadcrumb.Item>
          </Breadcrumb>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
          {showinfo && (
              <Card title="Patient'\s dashboard"
              style={{
                position: "center",
                width: "25%",
                left: "265px",
                top: "70px",
                borderRadius: "7px",
              }}>
              <img src="/mayssa.jpg" alt="Patient" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />       
      
              <Statistic title="Name" value={patientInfo.name} />
              <Statistic title="Age" value={patientInfo.age} />
              <Statistic title="Temperature" value={patientInfo.temperature} />
            </Card>)
            }          
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default NurseDashboard;
