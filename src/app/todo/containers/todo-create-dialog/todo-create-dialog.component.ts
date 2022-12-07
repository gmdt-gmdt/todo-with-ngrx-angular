import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';

import * as TodoActions from '../../store/actions';
import { TodoCreateDto } from '../../models';
import { selectLoading } from '../../store/reducers';

@Component({
  selector: 'app-todo-create-dialog',
  templateUrl: './todo-create-dialog.component.html',
  styleUrls: ['./todo-create-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoCreateDialogComponent {
  form = this.fb.group({
    text: ['', Validators.required],
  });
  loading$ = this.store.pipe(select(selectLoading));

  constructor(private fb: FormBuilder, private store: Store) {}

  save(): void {
    const title: string = this.form.get('text')?.value;
    const todo: TodoCreateDto = {
      title,
    };
    this.store.dispatch(TodoActions.create({ todo }));
  }
}
