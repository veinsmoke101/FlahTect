<?php

namespace App\Models;

use Core\Model;

/**
 * Admin Model
 * 
 * @package App\Models
 * @uses Core\Model Core Model
 * @author Mohammed-Aymen Benadra
 */
class Admin extends Model
{
    public function __construct()
    {
        parent::__construct([
            'username' => 'required|string|max:255',
            'password' => 'required|string|max:255'
        ]);
        $this->table = 'admins';
    }
}
