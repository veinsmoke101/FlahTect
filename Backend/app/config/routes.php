<?php

// Login Routes
$router->get('/api/register', 'Auth@register'); // ?
$router->get('/api/login', 'Auth@login');
$router->get('/api/login/admin', 'Auth@adminLogin');

// Admin Dashboard Routes
$router->get('/api/clients', 'Clients@index'); // *
$router->get('/api/client', 'Clients@show'); // *
$router->post('/api/client', 'Clients@store'); // *
$router->put('/api/client', 'Clients@update'); // *
$router->delete('/api/client', 'Clients@delete'); // *

// Client Dashboard Routes
$router->get('/api/rdvs', 'RDV@index');
$router->get('/api/rdvs/timeslots', 'RDV@timeslots');
$router->get('/api/rdv', 'RDV@show');
$router->post('/api/rdv', 'RDV@store');
$router->put('/api/rdv', 'RDV@update');
$router->delete('/api/rdv', 'RDV@delete');