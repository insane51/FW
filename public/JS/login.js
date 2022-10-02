

axios.defaults.withCredentials = true;


const baseUrl = `127.0.0.1:5000`;

const myForm = document.getElementById('myloginForm');
const mh = document.getElementById('msgHead');

//API Call for Login the User
myForm.addEventListener('submit',async (e)=>{
    e.preventDefault();
    const logUser = document.getElementById('logUserInput').value;
    const password = document.getElementById('passordInput').value;
    
    try{
        const res = await axios.post(`/api/auth/login`,
        {logUser:logUser,password:password});

        mh.innerText = res.data.message;
        if(res.status === 202){
            window.location=res.data.redirectURL;
        }
    }catch(err){
        mh.innerText = "Something went Wrong";
        console.log(err);
    }
});

    