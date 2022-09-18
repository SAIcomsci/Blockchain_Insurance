App = {
  web3Provider: null,
  account: null,
  isUser: 0,
  isCompany: 0,
  policyList: null,
  policySize: 0,
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

      return App.initAccount();

    });

  },

  // Fetching account address
  initAccount: function () {
    web3.eth.getAccounts(function (error, accounts) {
      if (error) {
        console.log(error);
      }
      App.account = accounts[0];
      console.log('Current account: ' + App.account);
    });

    return App.checkCompany();

  },

  // Function to check the status of company
  checkCompany: function () {

    App.contracts.UserRegister.deployed().then(function (instance) {

      return instance.checkCompany(App.account);

    }).then(function (result) {
      //result = result.toNumber();
      console.log(result);
      if (result == 1) {
        App.isCompany = 1;
        $('#addInsLink').show();
        console.log('yes company');
      }
      else if (result == 2) {
        App.isUser = 1;
        $('#applyInsLink').show();
        console.log('yes user');
      }
    }).catch(function (err) {
      console.log(err.message);
    });

    return App.getPolicySize();

  },

  getPolicySize: function () {
    App.contracts.UserRegister.deployed().then(function (instance) {
      return instance.getPolicySize();
    }).then(function (result) {
      policySize = result.toNumber();
      console.log('Policy Nums: '+policySize);
    }).catch(function (err) {
      console.log(err.message);
    });
  },

  // **************************************************** //

  // Button click function for 'ADD' button to add student details
  btnAddUser: function () {
    $('#add_err').text('');

    // Fetching the values from the input fields
    var id = $('#new_aid').val();
    var name = $('#new_name').val();
    var address = $('#new_address').val();
    //var percentage = $('#new_percentage').val();
    var age = $('#new_age').val();
    var gender = $('#new_gen').val();
    var contact = $('#new_con').val()

    if (id == "" || name == "" || address == "" || age == "" || gender == "" || contact == "") {
      $('#add_err').text('* Kindly fill all the fields !');
    }
    else {


      if (App.isUser == 1) {
        $('#add_err').text('* User already exists !');
      }
      else if (App.isCompany == 1) {
        $('#add_err').text('* You cannot create user account, you are a company !');
      }
      else {
        // Calling addUser function to add the student details
        App.contracts.UserRegister.deployed().then(function (instance) {

          return instance.addUser(parseInt(id), name, address, parseInt(age), gender, parseInt(contact), App.account, { from: App.account });

        }).then(function (result) {
          $('#add_err').text('User Record Successfully Added');
          $('#applyInsLink').show();
          console.log(result);

        }).catch(function (err) {
          $('#add_err').text('* Unable to save record. Please try again!');
          console.log(err.message);
        });
      }

    }
  },

  // Button click function for 'VIEW' button to show the student details
  btnViewUser: function () {
    $('#view_err').text('');

    App.contracts.UserRegister.deployed().then(function (instance) {
      //return instance.showUser(parseInt(govt_id));
      return instance.showUser(App.account)

    }).then(function (result) {
      console.log(result);
      // Displaying the values
      //$('#view_rollno').text(result[0].toNumber());
      $('#view_aid').text(result[0].toNumber());
      $('#view_name').text(result[1]);
      $('#view_location').text(result[2]);
      $('#view_age').text(result[3].toNumber());
      $('#view_gender').text(result[4]);
      $('#view_contact').text(result[5].toNumber());
      $('#view_id').text(result[6].toNumber());
      $('#view_result').show();

    }).catch(function (err) {
      $('#view_err').text('* Something went wrong, Please try again !');
      console.log(err.message);
      $('#view_result').hide();

    });

  },


  btnAddCom: function () {
    $('#add_err').text('');

    // Fetching the values from the input fields
    var cid = $('#new_cid').val();
    var cname = $('#new_cname').val();
    var caddress = $('#new_caddress').val();

    if (cid == "" || cname == "" || caddress == "") {
      $('#add_err').text('* Kindly fill all the fields !');
    }
    else {

      if (App.isCompany == 1) {
        $('#add_err').text('* Company already exists !');
      }
      else if (App.isUser == 1) {
        $('#add_err').text('* You cannot create company account, you are a user !');
      }
      else {
        App.contracts.UserRegister.deployed().then(function (instance) {

          return instance.addcom(parseInt(cid), cname, caddress, App.account, { from: App.account });

        }).then(function (result) {
          $('#add_err').text('Company Record Successfully Added');
          $('#addInsLink').show();
          console.log(result);

        }).catch(function (err) {
          $('#add_err').text('* Unable to save record. Please try again!');
          console.log(err.message);
        });

      }
    }

  },

  btnViewcom: function () {
    $('#view_err').text('');

    App.contracts.UserRegister.deployed().then(function (instance) {
      //return instance.showcom(parseInt(_id));
      return instance.showcom(App.account);

    }).then(function (result) {
      console.log(result);
      // Displaying the values
      $('#view_cad').text(App.account);
      $('#view_id').text(result[0].toNumber());
      $('#view_cname').text(result[1]);
      $('#view_clocation').text(result[2]);
      $('#view_cid').text(result[3]);
      $('#view_result2').show();

    }).catch(function (err) {
      $('#view_err').text('* Something went wrong, Please try again !');
      console.log(err.message);
      $('#view_result').hide();

    });

  },


  // Button click function for 'ADD' button to add student details
  btnAddIns: function () {
    $('#add_err').text('');

    // Fetching the values from the input fields
    var id = $('#new_iid').val();
    var name = $('#new_iname').val();
    var pm = $('#new_pre').val();
    var ip = $('#new_pri').val();
    var rm = $('#new_rem').val();


    if (id == "" || name == "" || pm == "" || ip == "" || rm == "") {
      $('#add_err').text('* Kindly fill all the fields !');
    }
    else {

      // Calling checkpolicy function to check whether the student has already exist or not

      App.contracts.UserRegister.deployed().then(function (instance) {

        return instance.checkPolicy(id);

      }).then(function (result) {
        if (result == 1) {
          $('#add_err').text('* Policy already exists !');
        }
        else {
          // Calling addUser function to add the student details
          App.contracts.UserRegister.deployed().then(function (instance) {

            return instance.addPolicy(parseInt(id), name, parseInt(pm), parseInt(ip), parseInt(rm), App.account, { from: App.account });

          }).then(function (result) {
            $('#add_err').text('Policy Record Successfully Added');
            console.log(result);

          }).catch(function (err) {
            $('#add_err').text('* Unable to save record. Please try again!');
            console.log(err.message);
          });
        }

      }).catch(function (err) {
        $('#view_err').text('* Something went wrong, Please try again !');
        console.log(err.message);
      });

    }
  },

  btnViewIns: function () {
    $('#view_err').text('');
    var _insvid=$("#insvid").val();
    App.contracts.UserRegister.deployed().then(function (instance) {
      //return instance.showUser(parseInt(govt_id));
      return instance.showIns(_insvid);

    }).then(function (result) {
      console.log(result);
      // Displaying the values
      //$('#view_rollno').text(result[0].toNumber());
      $('#view_iid').text(result[0].toNumber());
      $('#view_iname').text(result[1]);
      $('#view_ipm').text(result[2]);
      $('#view_ipriod').text(result[3].toNumber());
      $('#view_irem').text(result[4]);
      $('#view_cname').text(result[5]);
      $('#view_cadd').text(App.account);
      $('#view_cid').text(result[7]);
      $('#view_result3').show();

    }).catch(function (err) {
      $('#view_err').text('* Something went wrong, Please try again !');
      console.log(err.message);
      //$('#view_result3').hide();

    });

  },

  btnPolicyList: function () {
    
    for (var i = 0; i < policySize; i++) {
      App.showPolicy1(i);
    }

    $('#btnPolicyList').hide();

    //console.log(App.policyList);

  },

  showPolicy1: function(times) {
    App.contracts.UserRegister.deployed().then(function (instance) {
      return instance.getPolicyByIndex(times);
    }).then(function (result) {
      //console.log(result);
      var x = "<tr><td>" + result[0].toNumber() + "</td><td>" + result[1] + "</td><td>" + result[2].toNumber() + "</td><td>" + result[3].toNumber() + "</td><td>" + result[4].toNumber() + "</td><td>" + result[5] + "</td><td><button class='btn btn-sm btn-primary' type='button' onclick='App.btnUserApplyIns(" + result[0].toNumber() + ")'>APPLY</button></td></tr>";
      $('#insList').append(x);
    }).catch(function (err) {
      console.log(err.message);
    });
  },


  btnUserApplyIns: function (_id) {
    App.contracts.UserRegister.deployed().then(function (instance) {
      return instance.BuyIns(_id,App.account);
    }).then(function (result) {
      //console.log(result);
      ('#add_err').text('Company Record Successfully By');
    }).catch(function (err) {
      console.log(err.message);
    });
    
  }

};

$(function () {
  $(window).load(function () {
    App.init();
  });
});

