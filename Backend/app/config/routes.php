<?php

// Login Routes
$router->post('api/register', 'Auth@register', ['Validation@firstname|lastname|age|profession']); //*🚀
$router->post('api/login', 'Auth@login', ['Validation@clientRef']); //*🚀
$router->post('api/register/admin', 'Auth@registerAdmin', ['Validation@username|password']); //*
$router->post('api/login/admin', 'Auth@loginAdmin', ["Validation@username|password"]); //*

// Admin Dashboard Routes
$router->get('api/clients', 'Clients@index'); //*🚀
$router->get('api/client', 'Clients@show', ['Validation@id']); //*🚀
$router->post('api/client', 'Clients@store', ['Validation@firstname|lastname|age|profession']); //*🚀
$router->put('api/client', 'Clients@update', ['Validation@id|firstname|lastname|age|profession']); //*🚀
$router->delete('api/client', 'Clients@delete', ['Validation@id']); //*

// Client Dashboard Routes
$router->get('api/rdvs', 'RDV@index', ['Validation@client_id']); //*🚀
$router->get('api/rdvs/timeslots', 'RDV@timeslots', ['Validation@date']); //*🚀
$router->get('api/rdv', 'RDV@show', ['Validation@id']); //*🚀
$router->post('api/rdv', 'RDV@store', ['Validation@client_id|date|time_slot|description']); //*🚀
$router->put('api/rdv', 'RDV@update', ['Validation@id|client_id|date|time_slot|description']); //*🚀
$router->delete('api/rdv', 'RDV@delete', ['Validation@id']); //*🚀