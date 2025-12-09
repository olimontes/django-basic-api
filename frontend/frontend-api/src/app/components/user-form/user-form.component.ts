import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private svc = inject(UserService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  form = this.fb.group({
    user_nickname: [''],
    username: [''],
    email: [''],
    user_age: [0]
  });

  isEdit = false;

  ngOnInit() {
    const nick = this.route.snapshot.paramMap.get('nick');
    if (nick) {
      this.isEdit = true;
      this.form.get('user_nickname')?.setValue(nick);
      this.svc.getByNick(nick).subscribe(u => this.form.patchValue(u));
    }
  }

  submit() {
    const payload = this.form.getRawValue();
    if (this.isEdit) {
      this.svc.update(payload).subscribe(() => this.router.navigate(['/']));
    } else {
      this.svc.create(payload).subscribe(() => this.router.navigate(['/']));
    }
  }
}
