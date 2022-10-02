//For reqests are going with all credentials like cookie
axios.defaults.withCredentials = true;
const mySignUpForm = document.getElementById('signupForm');
const mh = document.getElementById('msgHead');


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
    
    try{
        const res = await axios.post(`/api/auth/register`,{
            name: logUser.name,
            username: logUser.username,
            email: logUser.email,
            mobile: logUser.mobile,
            password: logUser.password
        })
        mh.innerText = res.data.message;
        if(res.status === 201 ) {
            window.location = `/login`;
        }       
        
    }catch(err){
        mh.innerText = `Something went wrong!!!`;
        console.log(err);
    }  
});