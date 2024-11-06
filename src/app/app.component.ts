import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { AwsCpQuizComponent } from './aws-cp-quiz/aws-cp-quiz.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AwsCpQuizComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'quiz-app';
}
