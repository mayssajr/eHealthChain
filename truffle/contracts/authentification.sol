// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
pragma experimental ABIEncoderV2;
 

contract authentification {

    address public Admin = 0x06F219FC817dAF89fF4865e1eBE8AA343ddE9d9C;
    address public Patient = 0x1ab519b52DD71911C22E2277F14dB910B5B28CDd;
    mapping(address => _Admin) public listAdmin;
    mapping(address => _doctor) public listDoctor;
    mapping(address => _nurse) public listNurse;
    mapping(address => _patient) public listPatient;

    _Admin[] public Admins; 
    _doctor[] public Doctors;
    _nurse[] public Nurses;
    _patient[] public Patients;




    struct _Admin {
        string login;
        string password ;
        string role;
    }

    

    struct _doctor {
        address doctor_id;
        string name;
        string speciality ;
        string hospital;
    }

    struct _nurse {
        address nurse_id;
        string name;
        string gender;
        string hospital;
    }

    struct _patient {
        address patient_id;
        string name;
        uint age;
        uint256 temperature;        
    }

    constructor() {
        Admins.push(_Admin("MayssaAdmin", "admin", "Admin"));
        Admins.push(_Admin("Docteur", "admindoc", "Doctor"));
        Admins.push(_Admin("Infirmier", "adminnurse", "Nurse"));
        Admins.push(_Admin("Mayssa", "adminpatient", "Patient"));

        
        Doctors.push(_doctor(0xeE0b403Ed1eCb1BD2a894aA3A480E1491f3750a2, "Dr.", "Cardologue", "Hopital"));
        listDoctor[0xeE0b403Ed1eCb1BD2a894aA3A480E1491f3750a2]= _doctor(0xeE0b403Ed1eCb1BD2a894aA3A480E1491f3750a2, "Dr.", "Cardiologue", "Hopital");

        Nurses.push(_nurse(0x330759BcF2b8e5C79adE380B5F1e9B5cFdDEeE82, "Mme infirmiere", "Femme", "Hopital"));
        listNurse[0x330759BcF2b8e5C79adE380B5F1e9B5cFdDEeE82]= _nurse(0x330759BcF2b8e5C79adE380B5F1e9B5cFdDEeE82, "Mme infirmiere", "Femme", "Hopital");

        Patients.push(_patient(0x1ab519b52DD71911C22E2277F14dB910B5B28CDd, "Mayssa", 22, 37));
        listPatient[0x1ab519b52DD71911C22E2277F14dB910B5B28CDd]= _patient(0x1ab519b52DD71911C22E2277F14dB910B5B28CDd, "Mayssa", 22, 37);
    }

    function getRole(string memory _login, string memory _password) external view returns (string memory) {
        string memory role ="false";
        for (uint i=0; i<Admins.length; i++)
        {
            if ((keccak256(abi.encodePacked(_login))) == (keccak256(abi.encodePacked(Admins[i].login))))
            {
                if ((keccak256(abi.encodePacked(_password))) == (keccak256(abi.encodePacked(Admins[i].password)))){
                    role= Admins[i].role;
                } 
            }   
        }
     return role;
    }
    

    modifier onlyAdmin() {
    require(msg.sender == Admin);
    _;
    }

    modifier onlyDoctor() {
    require(listDoctor[msg.sender].doctor_id != address(0));
    _;
    }

    modifier onlyNurse() {
    require(listNurse[msg.sender].nurse_id != address(0));
    _;
    }


    modifier onlyPatient() {
    require(listPatient[msg.sender].patient_id != address(0));
    _;
    }





    function addDoctor(
        address doctor_id, 
        string memory _login,
        string memory _password,
        string memory _name, 
        string memory _speciality, 
        string memory _role, 
        string memory _hospital ) 
        public onlyAdmin {
                
                Doctors.push(_doctor(doctor_id, _name, _speciality, _hospital));
                Admins.push(_Admin(_login, _password, _role));
        }
    
    function getDoctor()public view returns (_doctor[] memory ) {

        _doctor[] memory doc = new _doctor[](Doctors.length);
        for (uint i=0; i<Doctors.length; i++){
            doc[i] = Doctors[i];
        }
        return doc;
    }

    function addNurse(
        address nurse_id, 
        string memory _login, 
        string memory _password, 
        string memory _name,
        string memory _role, 
        string memory _gender, 
        string memory _hospital) 
        public onlyAdmin{
                
                Nurses.push(_nurse(nurse_id, _name, _gender, _hospital));
                Admins.push(_Admin(_login, _password, _role));
        }

    function getNurse()public view returns (_nurse[] memory ) {

        _nurse[] memory nur = new _nurse[](Nurses.length);
        for (uint i=0; i<Nurses.length; i++){
            nur[i] = Nurses[i];
        }
        return nur;
    }

    function addPatient(
        address patient_id, 
        string memory _login, 
        string memory _password, 
        string memory _name,
        string memory _role, 
        uint _age, 
        uint _temperature) 
        public {
                Patients.push(_patient(patient_id, _name, _age, _temperature));
                Admins.push(_Admin(_login, _password, _role));
        }
    
    function getPatient()public view returns (_patient[] memory ) {

        _patient[] memory patient = new _patient[](Patients.length);
        for (uint i=0; i<Patients.length; i++){
            patient[i] = Patients[i];
        }
        return patient;
    }

    function addTemperature (uint256 _temperature, string memory _name) public {
        address pa = msg.sender; 
        listPatient[pa].temperature = _temperature;
        listPatient[pa].name =_name;

    }

    function getPatientInfo(address addr) public view returns(string memory, uint, uint256){
        _patient memory temp = listPatient[addr];
    
    return ( temp.name,
                        temp.age,
                        temp.temperature);
    }






}
