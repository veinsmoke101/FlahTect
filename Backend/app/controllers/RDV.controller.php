<?php

namespace App\Controllers;

use Core\{Controller, Router};
use Core\Helpers\Response;

/**
 * RDV Controller
 *
 * @author Mohammed-Aymen Benadra
 * @package App\Controllers
 */
class RDV extends Controller
{
    /**
     * Set headers for JSON response
     *
     * @return void
     */
    public function __construct()
    {
        Response::headers();
        Response::code();
    }

    /**
     * Get all RDVs
     * 
     * @param array $data
     * @return void
     */
    public function index($data = [])
    {
        // check if client with clientRef exists
        if (!$this->model('Client')->get($data['client_id'])) {
            Router::abort(404, json_encode([
                'status' => 'error',
                'message' => 'Client not found'
            ]));
        }

        $rdvs = $this->model('RDV')->getAllBy('client_id', $data['client_id']);

        if ($rdvs === false) {
            Router::abort(500, json_encode([
                'status' => 'error',
                'message' => 'Server error'
            ]));
        }

        Response::send([
            'status' => 'success',
            'data' => $rdvs,
            'count' => count($rdvs)
        ]);
    }

    /**
     * Get Time Slots for a given date
     * 
     * @param string $data
     * @return void
     */
    public function timeslots($data = [])
    {
        $timeSlots = $this->model('RDV')->getTimeSlots($data['date']);

        $timeSlots = array_map(function($timeSlot) {
            return $timeSlot->id;
        }, $timeSlots);

        if ($timeSlots === false) {
            Router::abort(500, json_encode([
                'status' => 'error',
                'message' => 'Server error'
            ]));
        }

        Response::send([
            'status' => 'success',
            'data' => $timeSlots,
            'count' => count($timeSlots)
        ]);
    }

    /**
     * Get a RDV
     * 
     * @param array $data
     * @return void
     */
    public function show($data = [])
    {
        $rdv = $this->model('RDV')->get($data['id']);

        if ($rdv === false) {
            Router::abort(500, json_encode([
                'status' => 'error',
                'message' => 'Server error'
            ]));
        }

        Response::send([
            'status' => 'success',
            'data' => $rdv
        ]);
    }

    /**
     * Store a RDV
     * 
     * @param array $data
     * @return void
     */
    public function store($data = [])
    {
        // check if user is exists
        $client = $this->model('Client')->get($data['client_id']);

        if (!$client) {
            Router::abort(400, json_encode([
                'status' => 'error',
                'message' => 'Client not found'
            ]));
        }

        // check if time slot is available
        $timeSlots = $this->model('RDV')->getTimeSlots($data['date']);

        foreach ($timeSlots as $timeslot) {
            if ($timeslot->id == $data['time_slot']) {
                Router::abort(400, json_encode([
                    'status' => 'error',
                    'message' => 'Time slot is not available'
                ]));
            }
        }

        if (!$this->model('RDV')->add($data)) {
            Router::abort(500, json_encode([
                'status' => 'error',
                'message' => 'Server error'
            ]));
        }

        $rdv = $this->model('RDV')->get(
            $this->model('RDV')->getLastInsertedId()
        );

        Response::send([
            'status' => 'success',
            'data' => $rdv
        ]);
    }

    /**
     * Update a RDV
     * 
     * @param object $data
     * @return void
     */
    public function update($data = [])
    {
        // Check if RDV exists
        $rdv = $this->model('RDV')->get($data['id']);

        if (!$rdv) {
            Router::abort(400, json_encode([
                'status' => 'error',
                'message' => 'RDV not found'
            ]));
        }

        // check if user exists
        $client = $this->model('Client')->get($data['client_id']);

        if (!$client) {
            Router::abort(400, json_encode([
                'status' => 'error',
                'message' => 'Client Reference is not valid'
            ]));
        }

        // Check if date RDV already passed
        if (strtotime($rdv->date) <= strtotime(date('Y-m-d'))) {
            Router::abort(400, json_encode([
                'status' => 'error',
                'message' => 'Too late to update RDV'
            ]));
        }

        // check if date is possible
        if (strtotime($data['date']) < strtotime(date('Y-m-d'))) {
            Router::abort(400, json_encode([
                'status' => 'error',
                'message' => 'Date is not possible'
            ]));
        }

        // check if time slot is available
        $timeSlots = $this->model('RDV')->getTimeSlots($data['date']);

        foreach ($timeSlots as $timeSlot) {
            if ($timeSlot->id === $data['time_slot']) {
                Router::abort(400, json_encode([
                    'status' => 'error',
                    'message' => 'Time slot is not available'
                ]));
            }
        }

        $id = $data['id'];
        unset($data['id']);

        if (!$this->model('RDV')->update($id,$data)) {
            Router::abort(500, json_encode([
                'status' => 'error',
                'message' => 'Server error'
            ]));
        }

        $rdv = $this->model('RDV')->get($id);

        Response::send([
            'status' => 'success',
            'data' => $rdv
        ]);
    }

    /**
     * Delete a RDV
     * 
     * @param array $data
     * @return void
     */
    public function delete($data = [])
    {
        // Check if RDV exists
        $rdv = $this->model('RDV')->get($data['id']);

        if (!$rdv) {
            Router::abort(400, json_encode([
                'status' => 'error',
                'message' => 'RDV not found'
            ]));
        }

        // Check if date RDV already passed
        if (strtotime($rdv->date) <= strtotime(date('Y-m-d'))) {
            Router::abort(400, json_encode([
                'status' => 'error',
                'message' => 'Too late to delete RDV'
            ]));
        }

        if (!$this->model('RDV')->delete($data['id'])) {
            Router::abort(500, json_encode([
                'status' => 'error',
                'message' => 'Server error'
            ]));
        }

        Response::send([
            'status' => 'success'
        ]);
    }
}
