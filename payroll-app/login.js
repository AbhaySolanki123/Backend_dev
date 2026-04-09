import fs from 'fs';
function login(req, res) {
    let{email,password}=req.body;
    try {
        let users=JSON.parse(fs.readFileSync('user.json'));
        let ob={
            id:new Date(),email,password
        }
 if(fs.existsSync('user.json')){
            let user =JSON.parse(fs.readFileSync('user.json'));
            let isUser=user.find((u)=>u.email===email && u.password===password);
            if(isUser){
                res.send("user exists");
                return;
        }
    }catch (error) {
        res.send("error");
}
}
}export default login;