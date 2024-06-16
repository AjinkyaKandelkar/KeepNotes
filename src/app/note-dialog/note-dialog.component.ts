import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NoteService } from '../note.service';

@Component({
  selector: 'app-note-dialog',
  templateUrl: './note-dialog.component.html',
  styleUrls: ['./note-dialog.component.css']
})
export class NoteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<NoteDialogComponent>,
    public noteService:NoteService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if(this.data.note.title != null)
      {
        this.dialogRef.close(this.data.note);
      }
    else{
      this.noteService.Toast.fire({
        icon: "warning",
        title: "Note requires a title."
      });
    }
  }

}
