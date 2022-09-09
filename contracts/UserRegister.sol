// SPDX-License-Identifier: MIT

pragma solidity ^0.8;

contract UserRegister {


    uint public _c_id =0;
    uint public _u_id =0;
    //uint public _t_id=0;

    // structure for User
    struct User {
        uint Addhaarid;
        string name;
        string location;
        uint age;
        string gender;
        uint contact;
        address add;
        uint id;
    }
    struct Company{
        uint lice;
        string name;
        string blocation;
        address cadd;
        uint cid;
    }

    struct Policy {
        uint policy_id;
        string policy_name;
        uint premium_monthly;
        uint ploy_year;
        uint reimburse;
        string company_name;
        address company;
    }
    //mapping(uint=> Company) c1;
    mapping(address => Company) c1;
    mapping (address => User) u1;
    mapping(uint => Policy) p1;

    // Creating array of student structure
    User[] person;
    Company[] company;
    Policy[] policy;
    //mapping(uint => User) public studs;

    // Function to add User into the User structure
    function addUser(uint _aid,string memory _name, string memory _location, uint _age, string memory _gender, uint _contact, address _add ) public {
        _u_id=_u_id+1;
        UserRegister.User memory x = User(_aid,_name, _location, _age, _gender,_contact, _add,_u_id);
        person.push(x);
        u1[_add] = x;
    }

    // Function to check User who are already registered or not!!!!!

    function checkUser(address _add) view public returns(uint) {
        uint _find = 0;
        for (uint _i = 0; _i < person.length; _i++) {
            if (person[_i].add == _add) {
                _find = 1;
            }
        }
        for (uint _i = 0; _i < company.length; _i++) {
            if (company[_i].cadd == _add) {
                _find = 2;
            }
        }

        return (_find);
    }

     // Function to show User 

    function showUser(address _addr) public view returns(uint, string memory,string memory, uint,string memory,uint, uint ){
        return(u1[_addr].Addhaarid,u1[_addr].name,u1[_addr].location,u1[_addr].age,u1[_addr].gender,u1[_addr].contact,u1[_addr].id);
    }

    // Function to add company into the company structure

     function addcom(uint _li,string memory _cname, string memory _clocation, address _cadd) public {
        _c_id=_c_id+1;
        UserRegister.Company memory c = Company(_li,_cname, _clocation, _cadd,_c_id);
        company.push(c);
        c1[_cadd] = c;
    }


    function checkCompany(address _add) view public returns(uint) {
        uint _find = 0;
        for (uint _i = 0; _i < company.length; _i++) {
            if (company[_i].cadd == _add) {
                _find = 1;
            }
        }
        for (uint _i = 0; _i < person.length; _i++) {
            if (person[_i].add == _add) {
                _find = 2;
            }
        }

        return (_find);
    }


    // Function to show company

    function showcom(address _cadd) public view returns(uint, string memory,string memory,uint ){
        return(c1[_cadd].lice,c1[_cadd].name,c1[_cadd].blocation,c1[_cadd].cid);
    }



    // function to add policy

    function addPolicy(uint _pid,string memory _pname, uint _premium, uint _myear, uint _reimburse,  address _cadd ) public {
        _u_id=_u_id+1;
        UserRegister.Policy memory p = Policy(_pid,_pname, _premium,_myear, _reimburse,c1[_cadd].name, _cadd);
        policy.push(p);
        p1[_pid] = p;
    }

    // Function to check Policys  are already registered or not!!!!!

    function checkPolicy(uint _pid) view public returns(uint) {
        uint _find = 0;
        for (uint _i = 0; _i < policy.length; _i++) {
            if (policy[_i].policy_id == _pid) {
                _find = 1;
            }
        }

        return (_find);
    }
}