import { Routes } from '@angular/router';
import { Component } from '@angular/core';

import { SplashscreenComponent } from './pages/splashscreen/splashscreen.component';
import { WalkthroughComponent } from './pages/walkthrough/walkthrough.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { CreateComponent } from './pages/create/create.component';
import { NoteComponent } from './pages/note/note.component';
import { NotesComponent } from './pages/notes/notes.component';
import { HomeComponent } from './pages/home/home.component';
import { ArchivedComponent } from './pages/archived/archived.component';
import { EditComponent } from './pages/edit/edit.component';

export const routes: Routes = [
    {path: '', component: SplashscreenComponent},
    {path: 'walkthrough', component: WalkthroughComponent},
    {path: 'signup', component: SignupComponent},
    {path: 'login', component :LoginComponent},
    {path: 'create', component:CreateComponent},
    {path: 'notes/:id', component:NoteComponent},
    {path: 'edit/:id', component:EditComponent},
    {path: 'notes', component:NotesComponent},
    {path: 'home', component:HomeComponent},
    {path: 'archived', component:ArchivedComponent}

];
