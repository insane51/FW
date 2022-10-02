//For reqests are going with all credentials like cookie
axios.defaults.withCredentials = true;

//LOGOUT Button working
const logoutbtn = document.getElementById(`logoutButton`);
logoutbtn.addEventListener('click',async(e)=>{
    try{
        //we add direct path without adding base URL,so it completely work in heroku
        const res = await axios.get(`/api/auth/logout`);
        window.location = `/`;
    }catch(err){
        console.log(err);
    }
});

//CHECK for password checkbox and new password DOM
const passwordBox = document.getElementsByClassName(`forPassword`);
const checkbox = document.querySelector("input[id=passwordCheckbox]");
const ele1 = document.getElementById(`forPassword1`);
const ele2 = document.getElementById(`forPassword2`);

checkbox.addEventListener('change', function() {
    if (this.checked) {
      ele1.style.visibility = `visible`;
      ele1.style.opacity = `1`;
      ele2.style.visibility = `visible`;
      ele2.style.opacity = `1`;
    } else {
        ele1.style.visibility = `hidden`;
        ele1.style.opacity = `0`;
        ele2.style.visibility = `hidden`;
        ele2.style.opacity = `0`;
    }
});

//ALL elements
const profileImageDisplay = document.getElementById(`profileImageDisplay`);
const profileImageInput = document.getElementById(`profileImageInput`);
const profileUsernameShow = document.getElementById(`profileUsernameShow`);
const inputName = document.getElementById(`inputName`);
const username = document.getElementById(`inputUsername`);
const mobile = document.getElementById(`inputMobile`);
const email = document.getElementById(`inputEmail`);
const inputOldPassword = document.getElementById(`inputOldPassword`);
const newPassword = document.getElementById(`inputNewPassord`);
const confirmNewPassword = document.getElementById(`inputNewConfirmPassword`);
const updateButton = document.getElementById(`updateButton`);
const messageDisplay = document.getElementById(`messageDisplay`);
const messageBox = document.getElementById('messageBox');


const myUpdateForm = document.getElementById(`myUpdateForm`);

//Display message function acc to response
const messageBoxController = (msgc,bgc)=>{
    messageDisplay.innerText = msgc;
    messageDisplay.style = `visibility:visible;`;
    messageBox.style = `background-color:${bgc}`;
    setTimeout(()=>{
        messageDisplay.innerText = '';
        messageBox.style = `background-color:white;`;
        messageDisplay.style = `visibility:hidden;`;
    },3000);
};

//UPDATE request function
myUpdateForm.addEventListener('submit', async (e)=>{
    e.preventDefault();
    //Check for User enter the new password
    if(checkbox.checked){
        if(newPassword.value ===''){
            messageBoxController('Please enter new password',`#e72020`);
            return;
        }else if(newPassword.value !== confirmNewPassword.value){
            messageBoxController('new password and confirm password not match',`#e72020`);
            return;
        }
    }

    const data ={
        name : inputName.value,
        username : username.value,
        email : email.value,
        mobile: mobile.value,
        isPassword:checkbox.checked,
        newPassword : newPassword.value,
        oldPassword : inputOldPassword.value
    };

    //API call for User Update
    try{
        const res = await axios.put(`/api/user/update/${getUserId}`,data);
        if(res.status === 201){
            messageBoxController(res.data.message,`#30ac30`);
            profileUsernameShow.innerText = username.value;
        }else if(res.status === 200){
            messageBoxController(res.data.message,`#e72020`);
        }
    }catch(err){
        messageBoxController('Something went wrong!!!',`#e72020`);
        console.log(err);
    }
});
