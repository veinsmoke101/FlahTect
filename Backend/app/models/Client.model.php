<?php

namespace App\Models;

use Core\Model;

/**
 * Client Model
 * 
 * @package App\Models
 * @uses Core\Model Core Model
 * @author Mohammed-Aymen Benadra
 */
class Client extends Model
{
    public function __construct()
    {
        parent::__construct([
            'id' => 'numeric',
            'clientRef' => 'string|min:20|max:25',// uniqId("client_")
            'firstname' => 'required|string|max:255',
            'lastname' => 'required|string|max:255',
            'age' => 'required|numeric|min:18|max:100',
            'profession' => 'required|string|max:255',
        ]);
        $this->table = 'clients';
    }
}
