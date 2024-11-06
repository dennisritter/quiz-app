import { Component } from '@angular/core';
import * as data from '../../../assets/aws_cp_questions-1.json';
import { NgFor } from '@angular/common';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-aws-cp-quiz',
  standalone: true,
  imports: [NgFor],
  templateUrl: './aws-cp-quiz.component.html',
  styleUrl: './aws-cp-quiz.component.css'
})
export class AwsCpQuizComponent {
    questions: any = data
    currentQuestion: any = this.getNewRandomQuestion()

    isOptionLocked: boolean = false
    isCorrectOption: boolean = false
    countSelectedOptions: number = 0
    countSelectedOptionsCorrect: number = 0

    count_correct: number = 0
    count_wrong: number = 0

    @HostListener('document:keyup', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        if ((event.key === "Enter" || event.key === " ") && this.isOptionLocked) {
            this.currentQuestion = this.getNewRandomQuestion();
            this.isOptionLocked = false
        }
    }

    getRandomInt(max: number) {
        return Math.floor(Math.random() * max);
    }

    getNewRandomQuestion(){
        // let idx = this.getRandomInt()
        let max: number = Object.keys(this.questions).length
        return this.questions[(this.getRandomInt(max))]
    }

    onOptionClick(e: Event, optionLetter: String){
        if (!e.target) return
        const target = e.target as HTMLButtonElement
        // Question Type "Select one option"
        if (this.currentQuestion["answer"].length === 1) {
            this.isCorrectOption = (optionLetter === this.currentQuestion["answer"])
            // target.classList.toggle("active")
            this.isOptionLocked = true
            target.classList.toggle(this.isCorrectOption ? "bg-success-subtle":"bg-danger-subtle")
            if (this.isCorrectOption) {
                this.count_correct += 1
            } else {
                this.count_wrong += 1
            }
        }
        // Question Type "Select Two options"
        else if (this.currentQuestion["answer"].length === 2) {
            if (!target.classList.contains("bg-primary-subtle")) {
                this.countSelectedOptions += 1
                if (this.currentQuestion["answer"].includes(optionLetter)) {
                    this.countSelectedOptionsCorrect += 1
                }
            } else {
                this.countSelectedOptions -= 1
                if (this.currentQuestion["answer"].includes(optionLetter)) {
                    this.countSelectedOptionsCorrect -= 1
                }
            }
            target.classList.toggle("bg-primary-subtle")
            if (this.countSelectedOptions === 2) {
                this.isOptionLocked = true
                if (this.countSelectedOptionsCorrect === 2) {
                    this.count_correct += 1
                } else {
                    this.count_wrong += 1
                }
                this.countSelectedOptions = 0
                this.countSelectedOptionsCorrect = 0
            }
        }
    }

    onNextClick(e: Event){
        this.currentQuestion = this.getNewRandomQuestion();
        this.isOptionLocked = false
    }
}