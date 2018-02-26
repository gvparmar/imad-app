var submit= document.getElementById('submit_btn');
submit.onclick=function (){
    var request = new XMLHttpRequest();
    request.onreadystatechange = function(){
        if (request.readystate===XMLHttpRequest.Done){
            if(request.status===200){
                alert('Login Sucessfully');
            }else if(request.status===403){
                alert('Use Username/paswword incorrect');
            }else if(request.status===500){
                alert('Some thing went rong on server');
            }
        }
    };
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    console.log(username);
    console.log(password);
    request.open('POST','http://parmarsir71@ssh.imad.hasura-app.io',true);
    request.setRequestHeader('Content-Type','application/json');
    request.send(JSON.stringify({username: username,password: password}));
};