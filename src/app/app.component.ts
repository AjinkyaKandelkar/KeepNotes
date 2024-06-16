import { Component } from '@angular/core';
import { NoteDialogComponent } from './note-dialog/note-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { NoteService } from './note.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'KeepNotes';

  


  // note:Note={title:"",content:"",pinned:false};
  constructor(public dialog: MatDialog, private noteService: NoteService ){}
  openDialog()
  {
    const dialogRef = this.dialog.open(NoteDialogComponent
      , {
      width: 'auto',
      data: { note: { }, isEdit: false }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (Object.keys(result).length != 0) {
        this.noteService.createNote(result.title, result.content).subscribe(
          (data)=>{
            this.noteService.Toast.fire({
              icon: "success",
              title: "created Note"
            });
            setTimeout(()=>{
              window.location.reload(); 
            },1500);
          },
          error =>{
            this.noteService.Toast.fire({
              icon: "error",
              title: "Error Creating Note"
            });
          }
          
        )
      }
    });
  }
}
