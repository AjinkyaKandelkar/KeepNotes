import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Note } from './Note';
import { BehaviorSubject } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(private http:HttpClient) { }

  private notes: Note[] = [];
  singlenote:Note={
    title:"",
    content:"",
    pinned:false
  };

  Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });
  
  private notesSubject = new BehaviorSubject<Note[]>(this.notes);
  notes$ = this.notesSubject.asObservable();
  Apiurl:string="http://localhost:3000/notes";
  
  createNote(title: string, content: string)
  {
    debugger
    this.singlenote.title = title;
    this.singlenote.content = content;
    // this.singlenote.pinned=false;

    return this.http.post(this.Apiurl,this.singlenote);
  }
  getAllNotes()
  {
    return this.http.get<Note[]>(this.Apiurl);  
  }
  updateValue(note:Note)
  {
    return this.http.put(this.Apiurl+"/"+note.id,note);
  }
  getNote(id:string)
  {
    return this.http.get(this.Apiurl+"/"+id);
  }
  deleteNote(id:any)
  {
    
    return this.http.delete(this.Apiurl+"/"+id);
  }
  
}