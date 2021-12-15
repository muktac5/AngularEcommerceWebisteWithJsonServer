import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, EmailValidator } from '@angular/forms';
import { User } from './users';
import { RestService } from 'src/app/services/rest.service';
@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.scss']
})
export class UserdetailsComponent implements OnInit {

  formValue!:FormGroup;
  searchKey:string="";
  userObj:User=new User();
  userData !: any;
  showAdd:boolean=true;
  showUpdate!:boolean;
  constructor(private formbuilder:FormBuilder,private restService:RestService) { }

  ngOnInit(): void {
    this.formValue=this.formbuilder.group({
      name:[''],
      phoneno:[''],
      loc:[''],
      email:[''],
    })
    this.getAllEmployee();
  }

  postPolicyDetails(){
    this.userObj.name=this.formValue.value.name;
    this.userObj.phoneno=this.formValue.value.phoneno;
    this.userObj.loc=this.formValue.value.loc;
    this.userObj.email=this.formValue.value.email;

    this.restService.postPolicy(this.userObj).subscribe(res=>{
      console.log(res);
      //alert("Policy details added successfully");
      let ref=document.getElementById("cancel");
      ref?.click();
      this.formValue.reset();
      this.getAllEmployee();
    },

    err=>{
      alert("Something went wrong");
    }
    )
  }

  getAllEmployee(){
    this.restService.getPolicy().subscribe(res=>{
      this.userData=res;
    })
  }


  deleteEmployee(row:any){
    this.restService.deletePolicy(row.id).subscribe(res=>
      alert("user details deleted"))
      this.getAllEmployee();
  }

  editPolicy(row:any){
    this.showUpdate=true;
    this.showAdd=false;
    this.userObj.id=row.id;
    this.formValue.controls['name'].setValue(row.name);
    this.formValue.controls['phoneno'].setValue(row.phoneno);
    this.formValue.controls['loc'].setValue(row.loc);
    this.formValue.controls['email'].setValue(row.email);
  }

  updatePolicy(){
    this.userObj.name=this.formValue.value.name;
    this.userObj.phoneno=this.formValue.value.phoneno;
    this.userObj.loc=this.formValue.value.loc;
    this.userObj.email=this.formValue.value.email;
    this.restService.updatePolicy(this.userObj,this.userObj.id).subscribe(res=>{
      alert('User details updated successfully');
      let ref=document.getElementById("cancel");
      ref?.click();
      this.formValue.reset();
      this.getAllEmployee();
    })
  }


}
