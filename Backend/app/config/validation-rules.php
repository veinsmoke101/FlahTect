<?php

use App\Models\{Admin, Client, RDV};

/**
 * Validation Rules
 * 
 * @package App\Config
 * @author Mohammed-Aymen Benadra
 */

$admin = new Admin;
$client = new Client;
$rdv = new RDV;

return array_merge(
    $admin->getRequiredSchema(),
    $client->getRequiredSchema(),
    $rdv->getRequiredSchema()
);
