import React, { useState, useEffect } from "react";
import { Layout, Menu, Typography, Card, Table } from 'antd';
import { PieChartOutlined, UserAddOutlined} from '@ant-design/icons';
import LogoutButton from '../LogoutButton/LogoutButton';
import { Link} from "react-router-dom";
import { useEth } from '../../contexts/EthContext';


const { Header, Sider, Content } = Layout;
const { Title } = Typography;

function AdminDashboard() {
  const { state: { contract, accounts, web3 } } = useEth();
  const [doctors, setDoctors] = useState([]);
  const [nurses, setNurses] = useState([]);
  const [patients, setpatients] = useState([]);

  const [accountAddress, setAccountAddress] = useState("");
  const [ethBalance, setEthBalance] = useState(0);



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
 
  

  const getDoctor = async () => {
    const result = await contract.methods.getDoctor().call({ from: accounts[0] });
    const formattedDoctors = result.map(doctors => ({
      doctor_id: doctors.doctor_id,
      name: doctors.name,
      speciality: doctors.speciality,
      hospital: doctors.hospital,
    }));
  
    return formattedDoctors;
  };

  const getNurse = async () => {
    const result = await contract.methods.getNurse().call({ from: accounts[0] });
    const formattedNurses = result.map(nurses => ({
      nurse_id: nurses.nurse_id,
      name: nurses.name,
      gender: nurses.gender,
      hospital: nurses.hospital,
    }));
  
    return formattedNurses;
  };

  const getPatient = async () => {
    const result = await contract.methods.getPatient().call({ from: accounts[0] });
  
    const formattedPatients = result.map(patient => ({
      patient_id: patient.patient_id,
      name: patient.name,
      age: patient.age,
      temperature: patient.temperature,
    }));
  
    return formattedPatients;
  };
  

  // const getPatientInfo = async () => {
  //   const result = await contract.methods.getPatientInfo("0x1ab519b52DD71911C22E2277F14dB910B5B28CDd").call();
  //   setpatients({ name: result[0], age: result[1], temperature: result[2] });
  // };

//**************************************************************************************************************************************************** */
//**************************************************************************************************************************************************** */


  const columns1 = [
    {
      title: 'Id',
      dataIndex: 'nurse_id',
      key: 'nurse_id',
    }, 
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
    },
    {
      title: 'Hospital',
      dataIndex: 'hospital',
      key: 'hospital',
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const result = await getNurse();
      setNurses(result);
    };
    fetchData();
  }, []);

//**************************************************************************************************************************************************** */
//**************************************************************************************************************************************************** */


  const columns = [
    {
      title: 'Id',
      dataIndex: 'doctor_id',
      key: 'doctor_id',
    }, 

    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    
    {
      title: 'Speciality',
      dataIndex: 'speciality',
      key: 'speciality',
    },
    {
      title: 'Hospital',
      dataIndex: 'hospital',
      key: 'hospital',
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const result = await getDoctor();
      setDoctors(result);
    };
    fetchData();
  }, []);

//**************************************************************************************************************************************************** */
//**************************************************************************************************************************************************** */
  
  const columns2 = [
    {
      title: 'Id',
      dataIndex: 'patient_id',
      key: 'patient_id',
    },

    {
      title: 'Name ',
      dataIndex: 'name',
      key: 'name',
    },
    
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    
  ];

  useEffect(() => {
    const fetchData = async () => {
      const result = await getPatient();
      setpatients(result);
    };
    fetchData();
  }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const result2 = await getPatientInfo();
  //     console.log("resultat" , result2);
  //     setpatients(result2);
  //   };
  //   fetchData();
  // }, []);


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
            Admin: 
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
              Add Docteur
          </Menu.Item>

          <Menu.Item key="3" icon={<UserAddOutlined />}>
              <Link to="/editnurse" />
              Add Nurse
          </Menu.Item>

          <Menu.Item key="4" icon={<UserAddOutlined />}>
              <Link to="/editpatient" />
              Add Patient
          </Menu.Item>

          

        </Menu>
        
        
        
      </Sider>

      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: '0 16px' }}>

        <Card
        title="List of  Doctors :"
        style={{
          position: "center",
          width: "70%",
          left: "265px",
          top: "70px",
          borderRadius: "7px",
        }}
      >
        <Table columns={columns} dataSource={doctors} />
      </Card>

      <br />
      <br />

      <Card
        title="List of Nurses :"
        style={{
          position: "center",
          width: "70%",
          left: "265px",
          top: "70px",
          borderRadius: "7px",
        }}
      >
        <Table columns={columns1} dataSource={nurses} />
      </Card>

      <br />
      <br />

      <Card
        title="List of Patients :"
        style={{
          position: "center",
          width: "70%",
          left: "265px",
          top: "70px",
          borderRadius: "7px",
        }}
      >
        <Table columns={columns2} dataSource={patients} />
      </Card>

      <br />
      <br />

          
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminDashboard;
