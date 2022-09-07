App = {
  web3Provider: null,
  contracts: {},

  init: async function () {

    return await App.initWeb3();
  },

  initWeb3: async function () {

    // Modern dapp browsers...
    if (window.ethereum) {
      App.web3Provider = window.ethereum;
      try {
        // Request account access
        await window.ethereum.request({ method: "eth_requestAccounts" });;
      } catch (error) {
        // User denied account access...
        console.error("User denied account access")
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      App.web3Provider = window.web3.currentProvider;
    }
    // If no injected web3 instance is detected, fall back to Ganache
    else {
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
    }
    web3 = new Web3(App.web3Provider);

    return App.initContract();
  },

  initContract: function () {

    $.getJSON('UserRegister.json', function (data) {
      // Get the necessary contract artifact file and instantiate it with @truffle/contract
      App.contracts.UserRegister = TruffleContract(data);

      // Set the provider for our contract
      App.contracts.UserRegister.setProvider(App.web3Provider);

    });

  },

  // Button click function for 'Add Student' button
  btn_addUser_menu: function () {
    $('#addUser').show();
    $('#viewUser').hide();
    $('#add_err').text('');
  },

  // Button click function for 'View Student' button
  btn_viewUser_menu: function () {
    $('#viewUser').show();
    $('#addUser').hide();
    $('#view_result').hide();
    $('#view_err').text('');

  },
  // Button click function for 'add company' button

  btn_AddCom_menu : function () {
    $('#addIns').show();
    $('#viewCom').hide();
    $('#add_err').text('');
  },

  // button click functon for "show company"
  btn_viewcom_menu: function () {
    $('#viewCom').show();
    $('#addIns').hide();
    $('#view_result').hide();
    $('#view_err').text('');

  },

  // Button click function for 'ADD' button to add student details
  btnAddUser: function () {
    $('#add_err').text('');

    // Fetching the values from the input fields
    var id = $('#new_id').val();
    var name = $('#new_name').val();
    var address = $('#new_address').val();
    //var percentage = $('#new_percentage').val();
    var age = $('#new_age').val();
    var gender = $('#new_gen').val();
    var contact =$('#new_con').val()

    if (id=="" || name == "" || address == "" || age == ""  || gender=="" ||contact=="") {
      $('#add_err').text('* Kindly fill all the fields !');
    }
    else {
      // Fetching account address
      web3.eth.getAccounts(function (error, accounts) {
        if (error) {
          console.log(error);
        }
        account = accounts[0];
        //console.log(account);
        // Calling checkStudent function to check whether the student has already exist or not
        App.contracts.UserRegister.deployed().then(function (instance) {

          return instance.addUser(parseInt(id),name, address, parseInt(age),gender,parseInt(contact), { from: account });

        }).then(function (result) {
          $('#add_err').text('User Record Successfully Added');
          console.log(result);

        }).catch(function (err) {
          $('#add_err').text('* Unable to save record. Please try again!');
          console.log(err.message);
        });

      });

    }
  },

  // Button click function for 'VIEW' button to show the student details
  btnViewUser: function () {
    $('#view_err').text('');

    var govt_id = $('#view_govt_id').val();
    if (govt_id == "") {
      $('#view_err').text('* Kindly enter ID to proceed !');
    }
    else {
      
          App.contracts.UserRegister.deployed().then(function (instance) {
            return instance.showUser(parseInt(govt_id));

          }).then(function (result) {
            //console.log(result);
            // Displaying the values
            //$('#view_rollno').text(result[0].toNumber());
            $('#view_id').text(result[0].toNumber());
            $('#view_name').text(result[1]);
            $('#view_location').text(result[2]);
            $('#view_age').text(result[3].toNumber());
            $('#view_gender').text(result[4]);
            $('#view_contact').text(result[5].toNumber());
            $('#view_result').show();

          }).catch(function (err) {
            $('#view_err').text('* Something went wrong, Please try again !');
            console.log(err.message);
            $('#view_result').hide();

          });
    //    }
    //   }).catch(function (err) {
    //     $('#view_err').text('* Something went wrong, Please try again !');
    //     console.log(err.message);
    //   });
     }
  },

  btnAddCom : function () {
    $('#add_err').text('');

    // Fetching the values from the input fields
    var cid = $('#new_cid').val();
    var cname = $('#new_cname').val();
    var caddress = $('#new_caddress').val();

    if (cid=="" || cname == "" || caddress == "" ) {
      $('#add_err').text('* Kindly fill all the fields !');
    }
    else {
      // Fetching account address
      web3.eth.getAccounts(function (error, accounts) {
        if (error) {
          console.log(error);
        }
        account = accounts[0];
        //console.log(account);
        // Calling checkStudent function to check whether the student has already exist or not
        App.contracts.UserRegister.deployed().then(function (instance) {

          return instance.addcom(parseInt(cid),cname, caddress, { from: account });

        }).then(function (result) {
          $('#add_err').text('User Record Successfully Added');
          console.log(result);

        }).catch(function (err) {
          $('#add_err').text('* Unable to save record. Please try again!');
          console.log(err.message);
        });

      });

    }
  },
  btnViewcom: function () {
    $('#view_err').text('');

    var _id = $('#li_id').val();
    if (_id == "") {
      $('#view_err').text('* Kindly enter ID to proceed !');
    }
    else {
      
          App.contracts.UserRegister.deployed().then(function (instance) {
            return instance.showcom(parseInt(_id));

          }).then(function (result) {
            console.log(result);
            // Displaying the values
            //$('#view_rollno').text(result[0].toNumber());
            $('#view_cid').text(result[0].toNumber());
            $('#view_cname').text(result[1]);
            $('#view_clocation').text(result[2]);
            $('#view_result').show();

          }).catch(function (err) {
            $('#view_err').text('* Something went wrong, Please try again !');
            console.log(err.message);
            $('#view_result').hide();

          });
    //    }
    //   }).catch(function (err) {
    //     $('#view_err').text('* Something went wrong, Please try again !');
    //     console.log(err.message);
    //   });
     }
  },
};


$(function () {

  $('#viewUser').hide();
  $('#viewCom').hide();
  $(window).load(function () {
    App.init();
  });
});

