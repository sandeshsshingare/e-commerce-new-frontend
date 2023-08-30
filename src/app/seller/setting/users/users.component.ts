import { Component, OnInit } from '@angular/core';
import { SettingService } from '../service/setting.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  constructor(private _setting: SettingService) {}
  usersData: any;
  isAddUser: boolean = false;
  editId!: string;
  isRoleEdit: boolean = false;
  updateRole!: string;
  updateUserToggle: boolean = false;
  userId!: string;
  userInfo: any;
  paginationControl = {
    page: 1,
    itemsPerPage: 5,
  };
  totalResults: any;
  ngOnInit(): void {
    this.getAllUsers();
  }
  getAllUsers() {
    let obj = {
      limit: this.paginationControl.itemsPerPage,
      page: this.paginationControl.page,
    };
    this._setting.allUsers(obj).subscribe({
      next: (data: any) => {
        this.usersData = data.results;
        console.log(this.usersData);
        this.totalResults = data.totalResults;
      },
    });
  }
  resetForm(addUserForm: NgForm) {
    addUserForm.resetForm();
    if (this.isAddUser) this.isAddUser = !this.isAddUser;

    if (this.updateUserToggle) this.updateUserToggle = !this.updateUserToggle;
  }
  addUser(data: any) {
    let fullName = data['first-name'] + ' ' + data['last-name'];

    let obj = {
      name: fullName,
      email: data.email,
      role: data.role,
      password: data.password,
    };
    if (this.isAddUser) {
      this._setting.createUser(obj).subscribe({
        next: (data) => {
          console.log('User created successfully');
          this.getAllUsers();
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'New user has been added successfully',
            showConfirmButton: false,
            timer: 1500,
          });
          if (this.isAddUser) this.isAddUser = !this.isAddUser;
        },
      });
    } else if (this.updateUserToggle) {
      delete obj['role'];
      console.log(obj + this.userId);
      this._setting.updateUserInfo(obj, this.userId).subscribe({
        next: (data) => {},
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          console.log('user deleted successfully');
          this.getAllUsers();
          this.updateUserToggle = !this.updateUserToggle;
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'User has been updated successfully',
            showConfirmButton: false,
            timer: 1500,
          });
        },
      });
    }
    console.log(obj);
  }

  deleteUser(id: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this._setting.deleteUser(id).subscribe({
          next: (data) => {},
          error: (err) => {
            console.log(err);
          },
          complete: () => {
            console.log('user deleted successfully');
            this.getAllUsers();
          },
        });
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
      }
    });
  }
  editRoleToggle(id: any) {
    if (this.editId !== id) {
      this.isRoleEdit = true;
    } else {
      this.isRoleEdit = !this.isRoleEdit;
    }
    this.editId = id;
  }
  updateToggle(user: any) {
    this.updateUserToggle = !this.updateUserToggle;
    this.userId = user._id;

    let name = user.name.split(' ');
    let firstName = name[0];

    this.userInfo = {
      firstName: name[0],
      lastName: name[1],
      email: user.email,
    };
  }
  saveUpdatedRole(data: any) {
    this._setting.editRole(this.updateRole, this.editId).subscribe({
      next: (data) => {},
      error: (err) => {
        console.log('Error occurred while updating role');
      },
      complete: () => {
        console.log('Role updated successfully');
        this.getAllUsers();
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'New role has been saved',
          showConfirmButton: false,
          timer: 1500,
        });
      },
    });
    this.isRoleEdit = false;
    this.editId = '';
  }
}
