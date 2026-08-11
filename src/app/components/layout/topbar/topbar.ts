import { Component, input } from '@angular/core';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [],
  templateUrl: './topbar.html',
  styleUrl: './topbar.scss',
})
export class Topbar {
  title = input<string>('Kanban Project Management Tool');
  userInitials = input<string>('SM');
}
