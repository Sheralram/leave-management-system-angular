import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SignInModel } from '../model/sign-in';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseURL =  'http://localhost:9091';
  constructor( private http: HttpClient) { }


  generateToken(credentials: any){
    return this.http.post(this.baseURL + "/token", credentials)
  }

  exportIntoExcel(){
    return this.http.get(this.baseURL + "/records/export/excel", {responseType: 'arraybuffer' as  'json'})
  }
  loginUser(token: any){
    
    localStorage.setItem("token",token);
    this.getUserByToken().subscribe((n:any)=>{
      localStorage.setItem("userId", n.data.id.toString());
      localStorage.setItem("userName",n.data.fullName);
    })
    return true;
  }

  isLoggedIn(){
    let token = localStorage.getItem("token");
    if(token == null || token === ""){
      return false;
    }else{
      return true;
    }
  }

  logout(){
    localStorage.removeItem("token")
    localStorage.removeItem("userId")
    localStorage.removeItem("userName")
    return true;
    }

    getToken(){
      return localStorage.getItem("token")
    }

  getUserByToken() {
    let token = localStorage.getItem("token")
    return this.http.get<any>(this.baseURL + "/id/" +token)
  }

  signInUser(userInFo: SignInModel){
    return this.http.post<any>(this.baseURL + '/signup', userInFo)
  }

  passwordReset(inputToken: string, inputNewPassword: string){
    return this.http.post<any>(this.baseURL + '/reset-password',{"token":inputToken,"newPassword":inputNewPassword})
  }
}
