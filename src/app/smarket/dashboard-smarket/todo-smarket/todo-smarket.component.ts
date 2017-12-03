import { Component, ViewEncapsulation } from '@angular/core';
import { TodoSmarketService } from './todo-smarket.service';

@Component({
  selector: 'app-todo-smarket',
  templateUrl: './todo-smarket.component.html',
  styleUrls: ['./todo-smarket.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [ TodoSmarketService ]
})
export class TodoSmarketComponent {
  public todoList:Array<any>;
  public newTodoText:string = '';

  constructor( private _todoService:TodoSmarketService) {
    this.todoList = this._todoService.getTodoList();
  }

  public  getNotDeleted() {
    return this.todoList.filter((item:any) => {
      return !item.deleted
    })
  }


  public addToDoItem($event) {
    if (($event.which === 1 || $event.which === 13) && this.newTodoText.trim() != '') {
      this.todoList.unshift({
          text: this.newTodoText
      });
      this.newTodoText = '';
    }
  }

}
