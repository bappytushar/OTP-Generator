let generateOTP;
let otpResult;
const otpExpiry = document.getElementById('otp-expiry');

function OtpEx() {
  const totalTime = 15000;
  const interval = 1000;
  let slice = totalTime / interval;

  const invId = setInterval(() => {
    otpExpiry.innerText = `OTP will expire is ${slice} seconds`;
    slice = slice - 1;
  }, interval);

  setTimeout(() => {
    if (otpResult === generateOTP) {
      otpExpiry.innerText = '';
      clearInterval(invId);
    } else {
      otpExpiry.innerText = 'OTP Expired';
      clearInterval(invId);
      generatedOtp();
    }
      
  }, totalTime);
}

function tackleOTPBoxes() {
  const boxes = document.getElementById('otp-box-list-id');
  boxes.addEventListener('input', (e) => {
    const target = e.target;
    const value = target.value;

    if (isNaN(value)) {
      target.value = '';
      return;
    }

    const nextElement = target.nextElementSibling;
    if (nextElement) {
      nextElement.focus();
    }
    validOTP();
  })
  
}
tackleOTPBoxes();

function generatedOtp() {
  generateOTP = Math.floor(1000 + Math.random() * 9000);
  const OTPNum = document.getElementById('generated-otp-id');
  OTPNum.innerText = `Your OTP : ${generateOTP}`;

  OtpEx();
}
 
setTimeout(generatedOtp, 2000);

function validOTP() {
  let otpNum = '';
  const otpBoxList = document.getElementById('otp-box-list-id');
  [...otpBoxList.children].forEach((elem) => {
    otpNum = otpNum + elem.value;
   
  })
  const printResult = document.getElementById('result-id');
  otpResult = parseInt(otpNum, 10);
  console.log(otpBoxList.input);

   
 
  if (otpResult === generateOTP) {
    printResult.innerText = 'Your OTP varification is successfull';
    printResult.classList.remove('fail');
    printResult.classList.add('success');
    clearInterval(invId);
  } else {
    printResult.innerText = 'Your OTP is Invalid';
    printResult.classList.remove('success');
    printResult.classList.add('fail');
   
  }
  
}
