// SPDX-License-Identifier: MIT

pragma solidity ^0.8;

contract UserRegister {
    // structure for User
    struct User {
        uint id;
        string name;
        string location;
        uint age;
        string gender;
        uint contact;
    }
    struct Company{
        uint lice;
        string name;
        string blocation;
    }
    mapping(uint=> Company) c1;
    mapping (uint => User) u1;
    // Creating array of student structure
    User[] person;
    Company[] company;
    //mapping(uint => User) public studs;

    // Function to add students into the student structure
    function addUser(uint _id,string memory _name, string memory _location, uint _age, string memory _gender, uint _contact) public {
        UserRegister.User memory x = User(_id,_name, _location, _age, _gender,_contact);
        person.push(x);
        u1[_id] = x;
    }
    function showUser(uint _id) public view returns(uint, string memory,string memory, uint,string memory,uint ){
        return(u1[_id].id,u1[_id].name,u1[_id].location,u1[_id].age,u1[_id].gender,u1[_id].contact);
    }
    
     function addcom(uint _cid,string memory _cname, string memory _clocation) public {
        UserRegister.Company memory c = Company(_cid,_cname, _clocation);
        company.push(c);
        c1[_cid] = c;
    }
    function showcom(uint _id) public view returns(uint, string memory,string memory ){
        return(c1[_id].lice,c1[_id].name,c1[_id].blocation);
    }
}