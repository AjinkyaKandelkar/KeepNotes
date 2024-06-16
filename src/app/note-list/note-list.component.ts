import { Component,HostListener, OnInit} from '@angular/core';
import { Note } from '../Note';
import { NoteService } from '../note.service';
import { NoteDialogComponent } from '../note-dialog/note-dialog.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css']
})
export class NoteListComponent implements OnInit {

  notes: Note[] = [];

  paginatedNotes: Note[] = [];
  totalNotes = 0;
  pageSize = 6;
  pageIndex = 0;
  gridCols = 4;

  paginatedPinnedNotes: Note[] = [];
  paginatedUnpinnedNotes: Note[] = [];

  hovered:boolean=false;
  
  constructor(private noteService: NoteService, public dialog: MatDialog) {}
  @HostListener('mouseenter') onMouseEnter() {
    this.hovered = true;
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.hovered = false;
  }

  ngOnInit(): void {
    this.loadNotes();
    this.adjustGridCols(window.innerWidth);
  }

  
  adjustGridCols(width: number) {
    console.log(width)
    if (width < 600) {
      this.gridCols = 1;
    } else if (width < 960) {
      this.gridCols = 2;
    } else if (width < 1280) {
      this.gridCols = 3;
    } else {
      this.gridCols = 4;
    }
    }

    
  loadNotes()
  {
    this.noteService.getAllNotes().subscribe(
      data=>{
        data.sort((a,b)=>{
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        })
        this.notes = data;
        this.totalNotes = data.length;
        this.updatePaginatedNotes();
      }
    );
  }
  
  updatePaginatedNotes() {

    const pinnedNotes = this.notes.filter(note => note.pinned);
    const unpinnedNotes = this.notes.filter(note => !note.pinned);
    
    const allNotes = [...pinnedNotes, ...unpinnedNotes];

    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;

    this.paginatedNotes = allNotes.slice(startIndex, Math.min(endIndex, allNotes.length));
    this.paginatedPinnedNotes = this.paginatedNotes.filter(note => note.pinned);
    this.paginatedUnpinnedNotes = this.paginatedNotes.filter(note => !note.pinned);
    
  }

  onPageChange(event:any)
  {
     this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePaginatedNotes();
  }
  pinNote(note:Note)
  {
    note.pinned==false? note.pinned=true:note.pinned=false
    this.noteService.updateValue(note).subscribe(
      (some)=>{
        this.loadNotes();
      }
    );
  }
  
  openDialog(note:Note)
  {
    const dialogRef = this.dialog.open(NoteDialogComponent
      , {
      width: 'auto',
      data: { note: { ...note }, isEdit: true }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateNote(result);
      }
    });
  }
  
  updateNote(note: Note): void {
    this.noteService.updateValue(note).subscribe(updatenote=>{
      this.loadNotes();
    })

  }
  delete(id:any)
  {
    
    this.noteService.deleteNote(id).subscribe(
      result=>{
        if(result){
          this.noteService.Toast.fire({
            icon: "success",
            title: "deleted Succesfully"
          });
          this.loadNotes();
        }
      }
    )
  }

}
