var ROUTES_INDEX = {"name":"<root>","kind":"module","className":"AppModule","children":[{"name":"route","filename":"src/app/admin/admin.module.ts","module":"AdminModule","children":[{"path":"admin","canActivate":["AuthGuardService"],"component":"AdminComponent"},{"path":"admin/client/ajoute","canActivate":["AuthGuardService"],"component":"AjouteClientComponent"},{"path":"admin/client/supprimer","canActivate":["AuthGuardService"],"component":"SuppClientComponent"},{"path":"admin/employe/ajoute","canActivate":["AuthGuardService"],"component":"AjouterEmpComponent"},{"path":"admin/employe/modifier","canActivate":["AuthGuardService"],"component":"ModifierEmpComponent"},{"path":"admin/employe/supprimer","canActivate":["AuthGuardService"],"component":"SupprimerEmpComponent"},{"path":"admin/ruche/ajouter","canActivate":["AuthGuardService"],"component":"AjouterucheComponent"},{"path":"admin/ruche/maintenance","canActivate":["AuthGuardService"],"component":"MaintenancerucheComponent"},{"path":"admin/ListModifierEmploye","canActivate":["AuthGuardService"],"component":"RechMEComponent"},{"path":"admin/ListSupprimerEmploye","canActivate":["AuthGuardService"],"component":"RechSeComponent"},{"path":"admin/ListAjouteRuche","canActivate":["AuthGuardService"],"component":"RechARComponent"},{"path":"admin/ListSupprimerClient","canActivate":["AuthGuardService"],"component":"RechSCComponent"},{"path":"admin/ModifierEmploye","canActivate":["AuthGuardService"],"component":"ModifierEmployeeComponent"},{"path":"admin/client/ruche/ajouter","canActivate":["AuthGuardService"],"component":"AjouteRucheRechComponent"}],"kind":"module"},{"name":"route","filename":"src/app/client/client.module.ts","module":"ClientModule","children":[{"path":"client","canActivate":["AuthGuardService"],"component":"ClientComponent"},{"path":"client/modifier","canActivate":["AuthGuardService"],"component":"ModifierProfileComponent"}],"kind":"module"},{"name":"routes","filename":"src/app/employee/employee.module.ts","module":"EmployeeModule","children":[{"path":"employee","canActivate":["AuthGuardService"],"component":"EmployeeComponent"},{"path":"employee/notification","component":"NotificationComponent"},{"path":"employee/note","component":"NoteComponent"}],"kind":"module"}]}
