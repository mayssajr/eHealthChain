import {Layout, Menu, Typography,Card, Form, Input, Button} from 'antd';
import {React, useState, useEffect} from "react";
import { PieChartOutlined, UserAddOutlined} from '@ant-design/icons';
import LogoutButton from '../LogoutButton/LogoutButton';
import { Link} from "react-router-dom";
import { useEth } from '../../contexts/EthContext';


const { Header, Sider, Content } = Layout;
const { Title } = Typography;


function Patient() {
  const { state: { contract, accounts, web3 } } = useEth();

  const [accountAddress, setAccountAddress] = useState("");
  const [ethBalance, setEthBalance] = useState(0);

  const [inputId, setInputId] = useState(0);
  const [inputLogin, setInputLogin] = useState(0);
  const [inputPassword, setInputPassword] = useState(0);
  const [inputName, setInputName] = useState(0);
  const [inputRole, setInputRole] = useState(0);
  const [inputAge, setInputAge] = useState(0);
  const [inputTemp, setInputTemp] = useState(0);

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
  

  const Addpatient = async () => {
    try {
      const result = await contract.methods
        .addPatient(inputId, inputLogin, inputPassword, inputName, inputRole, inputAge, inputTemp)
        .send({ from: accounts[0] });
      console.log(result);
    } catch (error) {
      console.error(error);
    }
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
<img src="/admin.jpg" alt="Admin" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
</div>        
  <br />
    <h2 style={{ color: "gray", position: "center", marginLeft: '90px' }}>
      Admin : 
    </h2>
    <p style={{ textAlign: "center" }}>{accountAddress}</p>
    <p style={{ textAlign: "center" }}>Balance ETH: {ethBalance}</p>
  <br />
  
  <Menu theme="light" defaultSelectedKeys={['1']} mode="inline">
  

    <Menu.Item key="1" icon={<PieChartOutlined />}>
      <Link to="/dashboard" />
      Dashboard
    </Menu.Item>

    <Menu.Item key="2" icon={<UserAddOutlined />} >
        <Link to="/editdoctor" />
        Docteur
    </Menu.Item>

    <Menu.Item key="3" icon={<UserAddOutlined />}>
        <Link to="/editnurse" />
        Infirmier
    </Menu.Item>

    <Menu.Item key="4" icon={<UserAddOutlined />}>
        <Link to="/editpatient" />
        Patient
    </Menu.Item>

    

  </Menu>
  
  
  
</Sider>
<Layout className="site-layout">
    <Header className="site-layout-background" style={{ padding: 0 }} />
    <Content style={{ margin: '0 16px' }}>

    <Card title="Add a Patient  :"
      style={{
      position: "center",
      width: "70%",
      left: "265px",
      top: "70px",
      borderRadius: "7px",
      }}>

      <Form  labelCol={{ span: 3 }}
            wrapperCol={{ span: 15 }}
            initialValues={{ remember: true }}
         >

        <Form.Item label="Name" rules={[{ required: true, message: 'Please enter the name of the patient' }]}>
          <Input placeholder="Name"
               className="input"
               type="text"
               name="uint"
               onChange={(t) => 
				   {
						setInputName(t.target.value);
					}} />
        </Form.Item>

        <Form.Item label="Ethereum address " rules={[{ required: true, message: 'Please enter the address of the patient' }]}>
          <Input placeholder="Ethereum address" 
                className="input"
                type="text"
                name="uint"
                onChange={(t) => 
				   {
						setInputId(t.target.value);
					}}/>
        </Form.Item>

        <Form.Item label="Username" rules={[{ required: true, message: 'Please enter the username of the patient' }]}>
          <Input placeholder="Username"
          className="input"
          type="text"
          name="uint"
          onChange={(t) => 
      {
       setInputLogin(t.target.value);
     }} />
        </Form.Item>

        <Form.Item label="Password" rules={[{ required: true, message: 'Please enter the password of the patient' }]}>
          <Input placeholder="Password" 
                className="input"
               type="password"
               name="uint"
               onChange={(t) => 
				   {
						setInputPassword(t.target.value);
					}} />
        </Form.Item>

        <Form.Item label="Role" rules={[{ required: true, message: 'Please enter the role of the patient' }]}>
          <Input placeholder="Role" 
                className="input"
               type="text"
               name="uint"
               onChange={(t) => 
				   {
						setInputRole(t.target.value);
					}} />
        </Form.Item>

        <Form.Item label="Age" rules={[{ required: true, message: 'Please enter the age of the patient' }]}>
          <Input placeholder="Age" 
                className="input"
               type="text"
               name="uint"
               onChange={(t) => 
				   {
						setInputAge(t.target.value);
					}} />
        </Form.Item>

        <Form.Item label="Temperature" rules={[{ required: true, message: 'Please enter the temperature of the patient' }]}>
          <Input placeholder="Temperature" 
                className="input"
               type="text"
               name="uint"
               onChange={(t) => 
				   {
						setInputTemp(t.target.value);
					}} />
        </Form.Item>

        <Form.Item 
        wrapperCol={{
          offset: 9,
          span: 10,
        }}>
          <Button type="primary" htmlType="submit" onClick={Addpatient}>
            Add patient
          </Button>
        </Form.Item>
      </Form>
    </Card>
    </Content>
      </Layout>
    </Layout>
    );
}

export default Patient;
