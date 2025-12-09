import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  private svc = inject(UserService);
  private route = inject(ActivatedRoute);
  user: any = null;
  loading = true;

  ngOnInit() {
    const nick = this.route.snapshot.paramMap.get('nick');
    if (nick) {
      this.svc.getByNick(nick).subscribe({ next: u => { this.user = u; this.loading = false; }, error: () => { this.loading = false; } });
    }
  }
}
