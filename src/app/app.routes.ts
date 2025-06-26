import { Routes } from '@angular/router';
import { Component } from '@angular/core';

import { SplashscreenComponent } from './pages/splashscreen/splashscreen.component';
import { WalkthroughComponent } from './pages/walkthrough/walkthrough.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { CreateNoteComponent } from './pages/create/create.component';
import { NoteComponent } from './pages/note/note.component';
import { NotesComponent } from './pages/notes/notes.component';
import { HomeComponent } from './pages/home/home.component';
import { ArchivedComponent } from './pages/archived/archived.component';
import { EditComponent } from './pages/edit/edit.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    {path: '', component: SplashscreenComponent},
    {path: 'walkthrough', component: WalkthroughComponent},
    {path: 'signup', component: SignupComponent},
    {path: 'login', component :LoginComponent},
    {path: 'create', component:CreateNoteComponent, canActivate: [AuthGuard]},
    {path: 'notes/:id', component:NoteComponent, canActivate: [AuthGuard]},
    {path: 'edit/:id', component:EditComponent, canActivate: [AuthGuard]},
    {path: 'notes', component:NotesComponent, canActivate: [AuthGuard]},
    {path: 'home', component:HomeComponent, canActivate: [AuthGuard]},
    {path: 'archived', component:ArchivedComponent, canActivate: [AuthGuard]}

];
