<?php

// Login Routes
$router->post('api/register', 'Auth@register', ['Validation@firstname|lastname|age|profession']); //*🚀
$router->post('api/login', 'Auth@login', ['Validation@clientRef']); //*🚀
$router->post('api/register/admin', 'Auth@registerAdmin', ['Validation@username|password']); //*
$router->post('api/login/admin', 'Auth@loginAdmin', ["Validation@username|password"]); //*

// Admin Dashboard Routes (JWT Token)
$router->get('api/clients', 'Clients@index', ['Auth@admin']); //*🚀
$router->get('api/client', 'Clients@show', ['Auth@admin','Validation@id']); //*🚀
$router->post('api/client', 'Clients@store', ['Auth@admin','Validation@firstname|lastname|age|profession']); //*🚀
$router->put('api/client', 'Clients@update', ['Auth@admin','Validation@id|firstname|lastname|age|profession']); //*🚀
$router->delete('api/client', 'Clients@delete', ['Auth@admin','Validation@id']); //*

// Client Dashboard Routes (Header-based Api Key)
$router->get('api/rdvs', 'RDV@index', ['Auth@client','Validation@client_id']); //*🚀
$router->get('api/rdvs/timeslots', 'RDV@timeslots', ['Auth@client','Validation@date']); //*🚀
$router->get('api/rdv', 'RDV@show', ['Auth@client','Validation@id']); //*🚀
$router->post('api/rdv', 'RDV@store', ['Auth@client','Validation@client_id|date|time_slot|description']); //*🚀
$router->put('api/rdv', 'RDV@update', ['Auth@client','Validation@id|client_id|date|time_slot|description']); //*🚀
$router->delete('api/rdv', 'RDV@delete', ['Auth@client','Validation@id']); //*🚀