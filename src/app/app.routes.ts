import { Routes } from '@angular/router';
import { adminGuard } from './core/guards/admin-guard';
import { medicoGuard } from './core/guards/medico-guard';
import { authGuard } from './core/guards/auth-guard';
import { Login } from './features/auth/login/login';
import { ForgotPassword } from './features/auth/forgot-password/forgot-password';

export const routes: Routes = [

    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        loadComponent: () =>
            import('./features/auth/login/login')
            .then(c => c.Login)
    },

    {
        path: 'admin',

        canActivate: [adminGuard],

        loadComponent: () =>
            import('./layouts/admin-layout/admin-layout')
            .then(c => c.AdminLayout),
        children: [
            { path: 'home', loadComponent: () => import('./pages/admin/home/home').then(c => c.HomeAdmin)},
            { path: 'usuarios', loadComponent: () => import('./features/admin/usuarios/usuarios').then(c => c.Usuarios)},
            { path: 'medicos', loadComponent: () => import('./features/admin/medicos/medicos').then(c => c.Medicos)},
            { path: 'relatorios', loadComponent: () => import('./features/admin/relatorios/relatorios').then(c => c.Relatorios)},
            { path: 'consultas', loadComponent: () => import('./features/admin/consultas/consultas').then(c => c.Consultas)},
            { path: 'alterar/:id', loadComponent: () => import('./features/auth/alterar/alterar').then(c => c.Alterar) },
            { path: 'sair', loadComponent: () => import('./features/auth/login/login').then(c => c.Login) }
        ]
    },
    {
        path: 'medico',

        canActivate: [medicoGuard],

        loadComponent: () =>
            import('./layouts/medico-layout/medico-layout')
            .then(c => c.MedicoLayout),
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', loadComponent: () => import('./pages/medico/home/home').then(c => c.HomeMedico) },
            { path: 'agenda', loadComponent: () => import('./features/medico/agenda/agenda').then(c => c.Agenda) },
            { path: 'consultas', loadComponent: () => import('./features/medico/consultas/consultas').then(c => c.Consultas) },
            { path: 'pacientes', loadComponent: () => import('./features/medico/pacientes/pacientes').then(c => c.Pacientes) },
            { path: 'prontuarios', loadComponent: () => import('./features/medico/prontuarios/prontuarios').then(c => c.Prontuarios) },
            { path: 'sair', loadComponent: () => import('./features/auth/login/login').then(c => c.Login) },
            { path: '**', redirectTo: 'home' }
        ]    
    },
    {
        path: 'usuario',

        canActivate: [authGuard],

        loadComponent: () =>
            import('./layouts/usuario-layout/usuario-layout')
            .then(c => c.UsuarioLayout),
        children: [
            { path: 'home', loadComponent: () => import('./pages/usuario/home/home').then(c => c.HomeUsuario) },
            { path: 'consultas', loadComponent: () => import('./features/usuario/consultas/consultas').then(c => c.Consultas) },
            { path: 'historico', loadComponent: () => import('./features/usuario/historico/historico').then(c => c.Historico) },
            { path: 'perfil', loadComponent: () => import('./features/usuario/perfil/perfil').then(c => c.Perfil) },
            { path: 'sair', loadComponent: () => import('./features/auth/login/login').then(c => c.Login) }
        ]    
    },
    {
        path: 'register',
        loadComponent: () =>
            import('./features/auth/register/register')
            .then(c => c.Register)
    },
    {
        path: 'forgot-password',
        component: ForgotPassword
    }

];
