<?php

namespace App\Models;

use Core\Model;

/**
 * RDV Model
 * 
 * @package App\Models
 * @uses Core\Model Core Model
 * @author Mohammed-Aymen Benadra
 */
class RDV extends Model
{
    public function __construct()
    {
        parent::__construct([
            'id' => 'numeric',
            'client_id' => 'required|numeric', // uniqId("client_")
            'date' => 'required|date',
            'time_slot' => 'required|numeric|min:1|max:5',
            'description' => 'required|string|max:1000',
        ]);
        $this->table = 'rdvs';
    }

    /**
     * Get all records from database
     *
     * @return array
     */
    public function getAll()
    {
        $this->db->query("SELECT r.id, r.date, t.time_slot, r.description FROM rdvs r INNER JOIN time_slots t ON r.time_slot = t.id");
        return $this->db->resultSet();
    }

    
    /**
     * Get specific record from database
     * 
     * @param int $id
     * @return array
     */
    public function get($id)
    {
        $this->db->query("SELECT r.id, r.date, t.time_slot, r.description FROM rdvs r INNER JOIN time_slots t ON r.time_slot = t.id WHERE r.id = :id");
        $this->db->bind(':id', $id);
        return $this->db->single();
    }

    /**
     * Get reserved time_slots for a given date
     * 
     * @param ?string $date
     * @return array
     */
    public function getTimeSlots(string $date = null)
    {
        if ($date) {
            $this->db->query("SELECT t.id, t.time_slot FROM rdvs r INNER JOIN time_slots t ON r.time_slot = t.id WHERE r.date = :date");
            $this->db->bind(':date', $date);
        } else {
            $this->db->query("SELECT t.id, t.time_slot FROM time_slots t");
        }
        return $this->db->resultSet();
    }
}
