

const mySignUpForm = document.getElementById('signupForm');
const mh = document.getElementById('msgHead');

const baseUrl = 'http://127.0.0.1:5000';

mySignUpForm.addEventListener('submit', async (e)=>{
    e.preventDefault();
    const name = document.getElementById("inputName1").value;
    const username = document.getElementById("inputUsername1").value;
    const email = document.getElementById("exampleInputEmail1").value;
    const mobile = document.getElementById("mobileNumber").value;
    const password = document.getElementById("exampleInputPassword1").value;

    const logUser = {
        name: name,
        username: username,
        email: email,
        mobile: mobile,
        password:password
    };
    console.log(logUser);
    
    try{
        const res = await axios.post(`${baseUrl}/api/auth/register`,{
            name: logUser.name,
            username: logUser.username,
            email: logUser.email,
            mobile: logUser.mobile,
            password: logUser.password
        })
        console.log(res);
        console.log("try block")
        mh.innerText = res.data.message;
        if(res.status === 201 ) {
            window.location = `${baseUrl}/login`;
        }       
        
    }catch(err){
        mh.innerText = err;
        // mh.innerText = `Something went wrong!!!`;
    }  
});