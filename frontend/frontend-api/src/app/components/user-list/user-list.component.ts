import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  private svc = inject(UserService);
  private router = inject(Router);
  users: User[] = [];
  loading = true;
  error: string | null = null;

  ngOnInit() {
    this.load();
  }

  load() {
    this.loading = true;
    this.svc.getUsers().subscribe({
      next: data => { this.users = data; this.loading = false; },
      error: err => { this.error = err.message || 'Erro ao carregar'; this.loading = false; }
    });
  }

  edit(nick: string) { this.router.navigate(['/user', 'edit', nick]); }
  view(nick: string) { this.router.navigate(['/user', nick]); }
  remove(nick: string) {
    if (!confirm('Confirma exclusão do usuário ' + nick + '?')) return;
    this.svc.delete(nick).subscribe({ next: () => this.load(), error: () => alert('Erro ao excluir') });
  }
}
