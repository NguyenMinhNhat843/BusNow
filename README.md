**\*\*** Chức năng Auth

- login
- register: client bấm register --> call api sendotp qtoiws email ---> client nhập otp vào UI --> call api tạo user
  ---> register thành công
- forgot pasword: client bấm forgot pasword --> yêu cầu nhập email --> call api gửi link reset pasword tới email đã nhập
  --> client bấm vào link reset đó --> hiện UI để nhập new pasword --> nhập xong call api resetPassword
- login with social account: google

\*\*\* Flow đăng nhập với google:
Test API login with google:
Nhập vào thanh tìm kiếm trên website: localhost:3000/auth/google
--> Bởi vì api này ko phải REST api mà là dạng api redirect nên ko test trên postman được

====> Những thứ chưa làm được:

- đăng nhập với facebook
- đăng nhập bằng qr trên phone: vid yêu cầu phải làm thêm mobile app nên hiện chưa làm
