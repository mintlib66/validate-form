const form = document.querySelector("#form");
const username = document.querySelector("#username");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const passwordConfirm = document.querySelector("#passwordConfirm");

//잘못된 입력에 대한 반응
function showError(input, message){
    const formControl = input.parentElement;
    formControl.className ="form-control error";

    const small = formControl.querySelector("small");
    small.innerText = message;
    small.style.visibility = 'visible';
}
//올바른 입력에 대한 반응
function showSuccess(input){
    const formControl = input.parentElement;
    formControl.className ="form-control success";

    const small = formControl.querySelector("small");
    small.innerText = "✔";
    small.style.visibility = 'visible';
}
function checkEmail(field){
    const reg =  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    if(!reg.test(String(field.value).toLowerCase())){
        showError(field, '잘못된 이메일 주소입니다.');
    }else{
        showSuccess(field);
    }
}

//필수입력란 확인
function checkRequired(fieldArr, msg){
    fieldArr.forEach(field => {
        if(field.value === ''){
            showError(field, `${checkName(field)} 입력해주세요.`);
        }else{
            showSuccess(field);
        }
    });
}
//필드 이름 확인
function checkName(field){
    const name = field.parentElement.querySelector("label").innerText;

    //마지막 글자의 utf-16코드 
    const charCode = name.charCodeAt(name.length - 1);
    //한글 범위 내에서 받침 여부 확인
    const consonantCode = (charCode - 44032) % 28;
    if(consonantCode === 0){
        //0이면 받침 없음 -> 를
        return `${name}를`;
    }
    return `${name}을`;
}
//필드 입력값 길이 확인
function checkLength(field, min, max){
    if(field.value.length < min || field.value.length > max){
        showError(field, `${min}자 이상, ${max}자 이하로 입력해주세요.`);
    }else{
        showSuccess(field);
    }
}
//비밀번호 확인란
function checkPasswordConfirm(field, pwField){
    if(field.value !== pwField.value){
        showError(field, `비밀번호가 일치하지 않습니다.`);
    }else if(pwField.value ==='' ){
        showError(field, `비밀번호를 먼저 입력해주세요.`);
    }else{
        showSuccess(field);
    }
}

//이벤트 리스너
form.addEventListener("submit", (e)=>{
    e.preventDefault();

    checkRequired([username, email, password, passwordConfirm]);
    checkLength(username, 3, 15);
    checkEmail(email);
    checkLength(password, 6, 25);
    checkPasswordConfirm(passwordConfirm, password);
});

