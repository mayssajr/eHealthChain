import {React, useState, useEffect} from "react";
import { Layout, Menu, Typography, Breadcrumb, Calendar, theme, ConfigProvider, Table, Card, Statistic} from "antd";
import {
  PieChartOutlined,
  UserOutlined,
  FileOutlined,
  TeamOutlined 
} from "@ant-design/icons";
import LogoutButton from '../LogoutButton/LogoutButton';
import { useEth } from '../../contexts/EthContext';
import { Link} from "react-router-dom";


const { Sider, Content, Header } = Layout;
const { SubMenu } = Menu;
const { Title } = Typography;


const DoctorDashboard = () => {
  const { state: { contract, accounts, web3 } } = useEth();

  
//Calendrier
  const onPanelChange = (value, mode) => {
    console.log(value.format('YYYY-MM-DD'), mode);
  };
  const { token } = theme.useToken();
  const wrapperStyle = {
    width: 300,
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
  };



  const [showPatient, setShowPatient] = useState(false);
  const [patientInfo, setPatientInfo] = useState({ name: "", age: 0, temperature: 0 });
  const [showinfo, setShowinfo] = useState(false);






  const [accountAddress, setAccountAddress] = useState("");
  const [ethBalance, setEthBalance] = useState(0);


  const [showPersonnel, setShowPersonnel] = useState(false);
  const [nurses, setNurses] = useState([]);

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
  


  const [patients, setpatients] = useState([]);

  const getNurse = async () => {
    const result = await contract.methods.getNurse().call();
    return result;
  };

  const getPatient = async () => {
    const result = await contract.methods.getPatient().call({ from: accounts[0] });
    return result;
  };

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

        const columns = [
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
        const fetchData = async () => {
          const result2 = await getPatient();
  
          setpatients(result2);
        };
        fetchData();

      const handleClickPatient = () => {
        setShowPatient(true);
        fetchData();
      };

      /******************************************************************************************** */

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
      const fetchNurses = async () => {
        const result = await getNurse();
        setNurses(result);
      };
    
      const handleClickPersonnel = () => {
        setShowPersonnel(true);
        fetchNurses();
      };


  return (
    <ConfigProvider theme="light">
    <Layout style={{ minHeight: "100vh" }}>
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
      style={{ backgroundColor: "#ffffff"}} >
      <br />
      <br />
      <br />
      <br />

      <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div className="sidebar-header">
      <img src="/avatar.png" alt="Docteur" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
              
        <br />
          <h2 style={{ color: "gray", display: 'flex', justifyContent: 'center' }}>
            Doctor : 
          </h2>
        <br />
        <p style={{ textAlign: "center" }}>{accountAddress}</p>
          <p style={{ textAlign: "center" }}>Balance ETH: {ethBalance}</p>
        </div>
        </div>


        <Menu  defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item key="1" icon={<PieChartOutlined />}>
            Dashboard
          </Menu.Item>

          <SubMenu key="sub1" icon={<UserOutlined />} title="Patients">
            <Menu.Item key="2" >
            <Link to="/addpatient" />
            Add a patient

            </Menu.Item>
            <Menu.Item key="3"onClick={handleClickPatient}>
            List of patients
            </Menu.Item>

            
          </SubMenu>
          <Menu.Item key="4" icon={<FileOutlined />} onClick={handleClickInfo}>
            Medical records
          </Menu.Item>
          <SubMenu key="sub2" icon={<TeamOutlined />} title="Personnel">
            <Menu.Item key="5"onClick={handleClickPersonnel}>List of personnel</Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>



      <Layout className="site-layout">

        <Header className="site-layout-background" style={{ padding: 0 }} />

        <Content style={{ margin: '0 16px' }}>

          <Breadcrumb style={{ margin: '16px 0' }}>

            <Breadcrumb.Item>Dashboard</Breadcrumb.Item>

            <Breadcrumb.Item>Doctor's dashboard</Breadcrumb.Item>

          </Breadcrumb>
          
          <div style={wrapperStyle}>
            <Calendar fullscreen={false} onPanelChange={onPanelChange} />
          </div>

          <div >
          {showPatient && (
          <Card
        title="List of patients :"
        style={{
          position: "center",
          width: "70%",
          left: "265px",
          top: "70px",
          borderRadius: "7px",
        }}
      >
        <Table columns={columns} dataSource={patients} />
      </Card>)}

      {showinfo && (
        
        <Card title="Patient's informations"
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


      {showPersonnel && (
              <Card
                title="List of personnel :"
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
            )}
          </div>
        </Content>
      </Layout>
    </Layout>
    </ConfigProvider>
  );
};

export default DoctorDashboard;
