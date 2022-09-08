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
    }
    //mapping(uint=> Company) c1;
    mapping(address => Company) c1;
    mapping (address => User) u1;
    // Creating array of student structure
    User[] person;
    Company[] company;
    //mapping(uint => User) public studs;

    // Function to add students into the student structure
    function addUser(uint _aid,string memory _name, string memory _location, uint _age, string memory _gender, uint _contact, address _add ) public {
        _u_id=_u_id++;
        UserRegister.User memory x = User(_aid,_name, _location, _age, _gender,_contact, _add,_u_id);
        person.push(x);
        u1[_add] = x;
    }

    function checkUser(address _add) view public returns(uint) {
        uint _find = 0;
        for (uint _i = 0; _i < person.length; _i++) {
            if (person[_i].add == _add) {
                _find = 1;
            }
        }

        return (_find);
    }

    function showUser(address _addr) public view returns(uint, string memory,string memory, uint,string memory,uint, uint ){
        return(u1[_addr].Addhaarid,u1[_addr].name,u1[_addr].location,u1[_addr].age,u1[_addr].gender,u1[_addr].contact,u1[_addr].id);
    }
    
     function addcom(uint _cid,string memory _cname, string memory _clocation, address _cadd) public {
        UserRegister.Company memory c = Company(_cid,_cname, _clocation, _cadd);
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

        return (_find);
    }
    function showcom(address _cadd) public view returns(uint, string memory,string memory ){
        return(c1[_cadd].lice,c1[_cadd].name,c1[_cadd].blocation);
    }
}